import express from 'express';
import {
  createTest,
  getTeacherTests,
  getTestsByClass,
  getTestById,
  updateTest,
  deleteTest
} from '../controllers/testController.js';

import { verifyJWT, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyJWT);

// Create test
router.post('/', authorizeRoles('teacher'), createTest);

// Get teacher's own tests
router.get('/my', authorizeRoles('teacher'), getTeacherTests);

// Get tests by class
router.get('/class/:classId', authorizeRoles('teacher', 'student'), getTestsByClass);

// Get single test
router.get('/:id', authorizeRoles('teacher', 'student'), getTestById);

// Update test
router.put('/:id', authorizeRoles('teacher'), updateTest);

// Delete test
router.delete('/:id', authorizeRoles('teacher'), deleteTest);

export default router;
