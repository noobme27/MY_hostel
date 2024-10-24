import express from "express";
import {
  createParty,
  getParties,
  joinParty,
} from "../controllers/party.controller.js";
import {
  canCreateParty,
  partyVerifyToken,
  validatePartyBody,
} from "../middleware/partyMiddleware.js";

const router = express.Router();

// Create a new party (Only for authenticated users)
router.post(
  "/create",
  partyVerifyToken, // Verify token first
  canCreateParty, // Check if the user can create a party
  validatePartyBody, // Validate request body
  createParty // Proceed to create the party
);

// Get all available parties
router.get("/all", getParties);

// Join a party (Only for authenticated users)
router.post("/join/:id", partyVerifyToken, joinParty);

export default router;
