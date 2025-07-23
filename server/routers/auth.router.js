import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";

// POST http://localhost:5000/api/v1/auth/signup
router.post("/signup", authController.signup);

export default router;
