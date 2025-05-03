import { Router } from "express";
import { 
  registerUser,
  loginUser, 
  logoutUser, 
  refreshAccessToken, 
  changeCurrentPassword, 
  currentUser, 
  updateAccountDetails,
  updateClassCode,
  getAllStudents
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/getAllStudents", getAllStudents);
// Protected routes - require authentication
router.use(verifyJWT); // Apply verifyJWT middleware to all routes below

router.get("/current-user", currentUser);
router.post("/logout", logoutUser);
router.patch("/change-password", changeCurrentPassword);
router.patch("/update-account", updateAccountDetails);
router.patch("/update-class-code", updateClassCode);

export default router;