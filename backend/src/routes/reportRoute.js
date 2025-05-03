// src/routes/report.routes.js
import express from 'express';
import { getClassReport, getStudentReport } from '../controllers/reportController.js';
import { verifyJWT, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyJWT);

// Only teachers for class report
router.get('/class/:classId', authorizeRoles('teacher'), getClassReport);

// Students & teachers for student report
router.get('/student/:studentId', authorizeRoles('student','teacher'), getStudentReport);

export default router;
