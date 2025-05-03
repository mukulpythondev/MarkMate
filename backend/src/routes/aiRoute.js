import express from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import {
  submitEvaluation,
  uploadNotes,
  getEvaluationResult,
  chatWithNotes,
} from "../controllers/aiController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { uploadEvaluationFiles } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/submit", verifyJWT, uploadEvaluationFiles, submitEvaluation);
router.post("/notes", verifyJWT, upload.single("file"), uploadNotes);
router.get("/result/:id", verifyJWT, getEvaluationResult);
router.post("/chat", verifyJWT, chatWithNotes);

export default router;
