// src/controllers/class.controller.js
import Class from '../models/Class.js';
import User from '../models/User.js';

// Create a new class
export async function createClass(req, res) {
  try {
    const { name, classCode } = req.body;
    const teacherId = req.user._id;

    // Create the new class
    const newClass = await Class.create({ name, classCode, teacher: teacherId });

    // Update the teacher's classCode
    await User.findByIdAndUpdate(
      teacherId,
      { classCode: classCode }, // store the ObjectId reference
      { new: true }
    );

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Update existing class
export async function updateClass(req, res) {
  const { id } = req.params;
  const updates = req.body;
  const updated = await Class.findOneAndUpdate(
    { _id: id, teacher: req.user._id },
    updates,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Class not found' });
  res.json(updated);
}

// Delete a class
export async function deleteClass(req, res) {
  const { id } = req.params;
  const deleted = await Class.findOneAndDelete({ _id: id, teacher: req.user._id });
  if (!deleted) return res.status(404).json({ message: 'Class not found' });
  res.json({ message: 'Class deleted' });
}

// (Optional) Get all classes for this teacher
export async function listClasses(req, res) {
  const classes = await Class.find({ teacher: req.user._id });
  res.json(classes);
}
