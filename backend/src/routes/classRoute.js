// src/routes/class.routes.js
import express from 'express';
import {
  createClass,
  updateClass,
  deleteClass,
  listClasses
} from '../controllers/classController.js';
import { verifyJWT, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyJWT, authorizeRoles('teacher'));

router.post('/',    createClass);
router.get('/',     listClasses);
router.put('/:id',  updateClass);
router.delete('/:id', deleteClass);

export default router;
