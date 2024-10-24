import express from "express";
import {
  login,
  logout,
  makeAdmin,
  register,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/make-admin", verifyAdmin, makeAdmin);

export default router;
