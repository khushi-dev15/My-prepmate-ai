import express from "express";
import { getInterviewQuestions, evaluateInterviewAnswer, submitFinalResult, fetchUserResults } from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST endpoint to get interview questions based on job title
router.post("/questions", protect, getInterviewQuestions);
// POST endpoint to evaluate interview answers (array)
router.post("/evaluate", protect, evaluateInterviewAnswer);
// Submit final aggregated result
router.post("/submit", protect, submitFinalResult);
// Fetch user's previous results
router.get("/results", protect, fetchUserResults);

export default router;
