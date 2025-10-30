import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import debugRoutes from "./routes/debug.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/debug", debugRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "🚀 PrepMate AI Backend Running Successfully" });
});

app.use((req, res, next) => res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` }));
app.use((err, req, res, next) => res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" }));

export default app;
