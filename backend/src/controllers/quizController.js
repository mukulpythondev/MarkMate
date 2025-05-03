import { fastapi } from "../utils/fastapiclient.js";
import ApiError from "../utils/apiError.js";

export const generateQuiz = async (req, res) => {
  try {
    const { topic } = req.body;
    const response = await fastapi.post("/generate-quiz", { topic });
    res.status(200).json(response.data);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const response = await fastapi.post(`/submit-quiz`, { quizId, answers });
    res.status(200).json(response.data);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
