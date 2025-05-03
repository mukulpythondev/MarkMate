import Test from "../models/Test.js";
import Class from "../models/Class.js";
import ApiError from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";

// Create a test
export const createTest = async (req, res) => {
  const { title, description, subject, classId, questions, notes } = req.body;
  const teacherId = req.user._id;

  const classExists = await Class.findById(classId);
  if (!classExists) throw new ApiError(404, "Class not found");

  const test = await Test.create({
    title,
    description,
    subject,
    class: classId,
    teacher: teacherId,
    questions,
    notes,
  });

  classExists.tests.push(test._id);
  await classExists.save();

  res.status(201).json(new ApiResponse(201, test, "Test created successfully"));
};

// Get all tests for a teacher
export const getTeacherTests = async (req, res) => {
  const tests = await Test.find({ teacher: req.user._id }).populate("class", "name");
  res.json(new ApiResponse(200, tests));
};

// Get all tests in a class
export const getTestsByClass = async (req, res) => {
  const { classId } = req.params;
  const tests = await Test.find({ class: classId });
  res.json(new ApiResponse(200, tests));
};

// Get test by ID
export const getTestById = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(id).populate("class", "name").populate("teacher", "name email");
  if (!test) throw new ApiError(404, "Test not found");
  res.json(new ApiResponse(200, test));
};

// Update test
export const updateTest = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const test = await Test.findByIdAndUpdate(id, updates, { new: true });
  if (!test) throw new ApiError(404, "Test not found");
  res.json(new ApiResponse(200, test, "Test updated successfully"));
};

// Delete test
export const deleteTest = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findByIdAndDelete(id);
  if (!test) throw new ApiError(404, "Test not found");

  // Remove reference from class
  await Class.findByIdAndUpdate(test.class, { $pull: { tests: test._id } });

  res.json(new ApiResponse(200, {}, "Test deleted successfully"));
};
