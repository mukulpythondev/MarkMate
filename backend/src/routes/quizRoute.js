import express from "express";
import { generateQuiz, submitQuiz } from "../controllers/quizController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", verifyJWT, generateQuiz);
router.post("/submit", verifyJWT, submitQuiz);

export default router;
