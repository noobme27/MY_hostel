import express from "express";
import {
  createComplaint,
  updateComplaintStatus,
  getComplaints,
} from "../controllers/complaint.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createComplaint);
router.post("/update", updateComplaintStatus);
router.post("/get", getComplaints);

export default router;
