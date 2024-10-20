const express = require("express");
const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");
const bodyParser = require("body-parser");
const cors = require("cors");
const Teacher = require("../modal/Teacher");
const app = express();
const connectdb = require("../dbConnect/dbconnection")

app.use(bodyParser.json());
app.use(cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dwm5fb9l0",
  api_key: "613126155286866",
  api_secret: "Cj1U1-ppwkqbsvUt8L5354cfK0Y",
});




// GET: Fetch all teachers
app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
});

// POST: Create a new teacher
app.post("/api/teachers", async (req, res) => {
  try {
    const data = req.body;
    const photoUrl = await cloudinary.uploader.upload(data.image);

    const newTeacher = new Teacher({
      ...data,
      image: photoUrl.url,
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: "Error creating teacher", error });
  }
});

// POST: Upvote a teacher
app.post("/api/teachers/:id/upvote", async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from request body
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const hasUpvoted = teacher.upvotes.includes(userId);

    if (hasUpvoted) {
      // Remove upvote if already upvoted
      teacher.upvotes = teacher.upvotes.filter((id) => id !== userId);
    } else {
      // Add upvote
      teacher.upvotes.push(userId);
    }

    await teacher.save();
    res.status(200).json({ success: true, upvotes: teacher.upvotes.length });
  } catch (error) {
    res.status(500).json({ message: "Error updating upvotes", error });
  }
});

// POST: Downvote a teacher
app.post("/api/teachers/:id/downvote", async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from request body
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const hasDownvoted = teacher.upvotes.includes(userId);

    if (hasDownvoted) {
      // Remove downvote (which is treated the same as removing an upvote in this case)
      teacher.upvotes = teacher.upvotes.filter((id) => id !== userId);
    } else {
      // Add downvote (treated similarly to an upvote here)
      teacher.upvotes.push(userId);
    }

    await teacher.save();
    res.status(200).json({ success: true, upvotes: teacher.upvotes.length });
  } catch (error) {
    res.status(500).json({ message: "Error updating downvotes", error });
  }
});


// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, async()=>{

    try {
        connectdb();
        console.log("listning on port 3000")
    } catch (error) {
        console.log(error);
    }

})
