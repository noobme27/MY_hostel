import prisma from "./../lib/prisma.js";

// Create a new party

export const createParty = async (req, res) => {
  const { title, description, capacity } = req.body; // Use 'capacity' here

  // Validate capacity
  if (!capacity  || capacity <= 0) {
    return res
      .status(400)
      .json({ message: "Capacity is required and must be a positive integer." });
  }
  try {
    const creatorId = req.user.id; // Make sure this is correctly set in your middleware

    const newParty = await prisma.party.create({
      data: {
        title,
        description,
        capacity, // Pass the correct field here
        creatorId,
      },
    });

    res.status(201).json(newParty);
  } catch (err) {
    console.error("Error creating party:", err);
    res.status(500).json({ message: "Failed to create party" });
  }
};

// Get all parties
export const getParties = async (req, res) => {
  try {
    const parties = await prisma.party.findMany({
      include: {
        attendees: true,
        creator: true,
      },
    });
    res.status(200).json(parties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch parties" });
  }
};

// Join a party
export const joinParty = async (req, res) => {
    const partyId = req.params.id; // Get partyId from the URL parameters
    const userId = req.user.id; // User from token
  
    try {
      // Check if the party exists and its capacity
      const party = await prisma.party.findUnique({
        where: { id: partyId },
        include: { attendees: true },
      });
  
      if (!party) {
        return res.status(404).json({ message: "Party not found" });
      }
  
      if (party.attendees.length >= party.capacity) {
        return res.status(400).json({ message: "Party is full" });
      }
  
      // Add the user to the party attendance
      const newAttendee = await prisma.partyAttendance.create({
        data: {
          userId,
          partyId,
        },
      });
  
      res.status(200).json({ message: "Joined party successfully", newAttendee });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to join party" });
    }
  };
  