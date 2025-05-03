// src/controllers/submission.controller.js
import Submission from '../models/Submission.js';
import Test from '../models/Test.js';
import Class from '../models/Class.js';
import User from '../models/User.js';

// 2.1 Create a new submission (student upload flow)
export async function createSubmission(req, res) {
  try {
    const { classId, aiFeedback, ocrText, roll_no,score, explanation } = req.body;

    const test = await Test.findById(testId);
    const cls = await Class.findById(classId);
    if (!test || !cls) return res.status(404).json({ message: 'Test or class not found' });
    const user = User.findOne({roll_no})
    const newSubmission = await Submission.create({
      teacher: req.user._id,
      student: user._id,
      class: classId,
      // test: testId,
      ocrText,
      aiFeedback,
      score,
      explanation
    });

    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 2.2 Get submissions for a student (or all if teacher)
export async function getSubmissions(req, res) {
  const { testId } = req.query;
  const filter = {};

  if (req.user.role === 'student') {
    filter.student = req.user._id;
  } else if (req.user.role === 'teacher') {
    filter.teacher = req.user._id;
  }

  if (testId) filter.test = testId;

  const submissions = await Submission.find(filter)
    .populate('student', 'name')
    .populate('test', 'title')
    .sort({ submittedAt: -1 });

  res.json(submissions);
}

// 2.3 Update AI feedback & score after evaluation
export async function updateEvaluation(req, res) {
  const { id } = req.params;
  const { aiFeedback, score } = req.body;

  const updated = await Submission.findByIdAndUpdate(
    id,
    { aiFeedback, score },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: 'Submission not found' });
  res.json(updated);
}
