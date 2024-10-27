import express from "express";
import {
  getRoomLayoutFirst,
  getRoomLayoutGround,
} from "../controllers/layout.controller.js";

const router = express.Router();

router.get("/Vyas/ground", getRoomLayoutGround);
router.get("/Vyas/first", getRoomLayoutFirst);

export default router;
