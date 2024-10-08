import express from "express";
import { getRoomLayout } from "../controllers/layout.controller.js";

const router = express.Router();

router.get("/Vyas", getRoomLayout);

export default router;
