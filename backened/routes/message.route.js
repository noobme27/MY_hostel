import express from "express";
import { addMessage, getMessages } from "../controllers/message.controller.js"; // Import the new function
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route to add a message
router.post("/:chatId", verifyToken, addMessage);

// Route to get messages for a specific chat
router.get("/:chatId", verifyToken, getMessages); // Add this line

export default router;
