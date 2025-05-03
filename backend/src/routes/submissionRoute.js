// src/routes/submission.routes.js
import express from 'express';
import {
  createSubmission,
  getSubmissions,
  updateEvaluation
} from '../controllers/submissionController.js';

import { authorizeRoles, verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(verifyJWT);

// Student submission upload
router.post('/', authorizeRoles('teacher'), createSubmission);

// Get submissions by teacher or student
router.get('/', authorizeRoles('teacher', 'student'), getSubmissions);

// Update feedback and score (AI service or teacher)
router.put('/:id', authorizeRoles('teacher'), updateEvaluation);

export default router;
