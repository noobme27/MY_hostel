// middlewares/partyMiddleware.js
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

// Middleware to check if the user can create a party
export const canCreateParty = async (req, res, next) => {
  const userId = req.user.id; // Access the user ID set by partyVerifyToken

  // Fetch the user to perform necessary checks or retrieve additional data
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If user is not found, respond with a 404 error
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Proceed to the next middleware/controller if the user exists
  next();
};

// Middleware to validate party creation request body
export const validatePartyBody = (req, res, next) => {
  const { description, capacity } = req.body; // Change limit to capacity to match your schema

  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ message: "Description is required and must be a string." });
  }

  if (!capacity || typeof capacity !== "number" || capacity <= 0) {
    return res
      .status(400)
      .json({ message: "Capacity is required and must be a positive number." });
  }

  next(); // Proceed to the next middleware/controller if the checks pass
};

// Middleware to verify the token for party routes
export const partyVerifyToken = (req, res, next) => {
  const token = req.cookies.token; // Adjust based on how you're sending the token
  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });

    // Set req.user for party-specific middleware
    req.user = { id: payload.id }; // Include isAdmin if necessary

    next(); // Proceed to the next middleware or route handler
  });
};
