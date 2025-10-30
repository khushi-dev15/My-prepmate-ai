import express from "express";
import multer from "multer";
import { uploadResume, processResume } from "../controllers/resume.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload route (already working)
router.post("/upload", upload.single("resume"), uploadResume);

// Process route (Next button functionality)
router.post("/process", upload.single("resume"), processResume);

export default router;
