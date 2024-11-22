import express from "express";
import { verifyToken } from "../middleware/verifyToken.js"; // Token verification middleware
import upload from "../middleware/multer.js"; // Multer setup for file uploads
import {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  getUserWithAvatar,
} from "../controllers/user.controller.js"; // Controller functions

const router = express.Router();

// Routes
router.get("/", getUsers); // Get all users
router.get("/:id", verifyToken, getUser); // Get a specific user by ID

// Update user profile (with avatar upload support)
router.put("/update/:id", verifyToken, upload.single("avatar"), updateUser);

// Delete a user by ID
router.delete("/:id", verifyToken, deleteUser);
router.get("/with-avatar/:id", verifyToken, getUserWithAvatar);

export default router;
