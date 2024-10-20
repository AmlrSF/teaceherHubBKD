const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Teacher schema
const teacherSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  etablissement: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
  upvotes: {
    type: [String], // Array of strings for upvotes
    default: [],
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
        required: true,
      },
      commentText: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shares: {
    type: Number,
    default: 0,
  },
  approve: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Teacher model
const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
