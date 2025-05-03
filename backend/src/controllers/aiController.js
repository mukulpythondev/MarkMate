import ApiError from "../utils/apiError.js";
import fs from "fs";
import FormData from "form-data";
import { fastapi } from "../utils/fastapiclient.js";
export const submitEvaluation = async (req, res) => {
    try {
      const questionPaper = req.files?.question_paper?.[0];
      const answerSheet = req.files?.answer_sheet?.[0];
  
      if (!questionPaper || !answerSheet) {
        throw new ApiError(400, "Both question_paper and answer_sheet are required");
      }
  
      const form = new FormData();
      form.append("question_paper", fs.createReadStream(questionPaper.path));
      form.append("answer_sheet", fs.createReadStream(answerSheet.path));
  
      const response = await fastapi.post("/evaluate", form, {
        headers: form.getHeaders(),
        timeout: 120000 // Very important to let axios set boundary
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      throw new ApiError(500, error.message || "Evaluation submission failed");
    }
  };

  export const uploadNotes = async (req, res) => {
    try {
      const file = req.file;
  
      const formData = new FormData();
      formData.append("file", fs.createReadStream(file.path), file.originalname);
  
      const response = await fastapi.post("/upload-notes", formData, {
        headers: formData.getHeaders(),
        timeout:60000 // Very important to let axios set boundary
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  };
  
export const getEvaluationResult = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fastapi.get(`/evaluation-status/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export const chatWithNotes = async (req, res) => {
  try {
    const { message } = req.body;
    const response = await fastapi.post(`/chat`, { message });
    res.status(200).json(response.data);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
