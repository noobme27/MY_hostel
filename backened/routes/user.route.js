import express from "express";

const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  savePost,
  profilePosts,
  getNotificationNumber,
} from "../controllers/user.controller.js";

router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
//router.post("/save", verifyToken, savePost);
//router.get("/profilePosts", verifyToken, profilePosts);
//router.get("/notification", verifyToken, getNotificationNumber);

export default router;
