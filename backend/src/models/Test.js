// src/models/Test.js
import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  subject:      { type: String },

  class:        { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  teacher:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  questions:    [{ type: String }], // Optional: Manually entered questions
  notes:        { type: String },   // Optional: for student quiz support

  createdAt:    { type: Date, default: Date.now }
});

export default mongoose.model('Test', testSchema);
