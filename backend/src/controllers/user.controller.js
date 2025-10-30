import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { findOneUser, createUser } from "../dao/user.dao.js";
import userModel from "../models/user.model.js";

export async function registerController(req, res) {
    try {
        const { username, email, password } = req.body;

        console.log("Received registration data:", username, email); // Debugging

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if user already exists by username or email
        const isUserExist = await findOneUser({
            $or: [{ username }, { email }]
        });

        if (isUserExist) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in database
        const user = await createUser({
            username,
            email,
            password: hashedPassword
        });

        // Create JWT token
        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });

        // Send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        console.log("User created successfully:", user); // Debugging

        return res.status(201).json({
            message: "User registered successfully!",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        console.error("Error in registerController:", error); // Show full error
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        console.log("Login attempt:", email); // Debugging

        const user = await findOneUser({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        console.log("Login successful:", user); // Debugging

        return res.status(200).json({
            message: "Logged in successfully",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        console.error("Error in loginController:", error); // Show full error
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// return basic profile for authenticated user
export async function getProfile(req, res) {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
        const user = await userModel.findById(userId).select("username email createdAt");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.status(200).json({ success: true, user });
    } catch (err) {
        console.error("getProfile error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
