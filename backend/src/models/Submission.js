// src/models/Submission.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  student:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacher:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class:     { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  // test:      { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },

  originalImageUrl: { type: String }, // Optional: If saved
  ocrText:          { type: String, required: true },
  aiFeedback:       { type: String },  // Gemini output or RAG eval
  explanation:       { type: String },  // Gemini output or RAG eval
  score:            { type: Number },

  submittedAt:      { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);
