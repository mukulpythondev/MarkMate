// src/models/Class.js
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  classCode:   { type: String, required: true, unique: true },
  teacher:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  students:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }]
}, { timestamps: true });

export default mongoose.model('Class', classSchema);
