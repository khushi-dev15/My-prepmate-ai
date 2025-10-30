import express from "express";
import { registerController,loginController } from "../controllers/user.controller.js";
import { getProfile } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router()

router.post("/signup",registerController)
router.post("/login",loginController)
router.get("/profile", protect, getProfile)

export default  router;