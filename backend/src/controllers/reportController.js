import Submission from "../models/Submission.js";
import Test from "../models/Test.js";

export const getStudentReport = async (req, res) => {
  const studentId = req.user._id;
  const submissions = await Submission.find({ student: studentId }).populate("test");
  res.status(200).json({ submissions });
};

export const getClassReport = async (req, res) => {
  const classId = req.params.classId;
  const tests = await Test.find({ classId }).populate("submissions");
  res.status(200).json({ tests });
};
