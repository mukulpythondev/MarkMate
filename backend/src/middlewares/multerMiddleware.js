import multer from "multer";
import path from "path";
import fs from "fs";

// Create folder if it doesn't exist
const uploadDir = path.resolve("public");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // now uses absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

export const uploadEvaluationFiles = upload.fields([
  { name: "question_paper", maxCount: 1 },
  { name: "answer_sheet", maxCount: 1 },
]);
