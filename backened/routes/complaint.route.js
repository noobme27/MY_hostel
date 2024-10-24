import express from "express";
import {
  createComplaint,
  updateComplaintStatus,
  getComplaints,
} from "../controllers/complaint.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/create", verifyToken, createComplaint);
router.post("/:id/update", updateComplaintStatus);
router.get("/get", verifyAdmin, getComplaints);

export default router;
