import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import classRoutes from './routes/classRoute.js';
import reportRoutes from './routes/reportRoute.js';
import submissionRoutes from './routes/submissionRoute.js';
import testRoutes from './routes/testRoute.js';
import aiRoutes from "./routes/aiRoute.js";
import quizRoutes from "./routes/quizRoute.js";
import morgan from "morgan";
const app = express();
app.use(morgan("dev"));

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use('/api/classes', classRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/test',testRoutes)

app.use("/api/eval", aiRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/reports", reportRoutes);

export default app;