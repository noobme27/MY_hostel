import prisma from "./../lib/prisma.js";

// Create a new complaint
export const createComplaint = async (req, res) => {
  const { description, category } = req.body;
  const userId = req.userId; // Get userId from the verified token

  try {
    // Validate input
    if (!userId || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Basic sanitization
    const sanitizedDescription = description.trim();
    const sanitizedCategory = category.trim();

    // Create a new complaint and save to the database
    const newComplaint = await prisma.complaint.create({
      data: {
        userId,
        description: sanitizedDescription,
        category: sanitizedCategory,
        status: "PENDING", // Set initial status
      },
    });

    console.log(newComplaint);
    res.status(201).json({
      message: "Complaint created successfully",
      complaint: newComplaint,
    });
  } catch (err) {
    console.error("Error creating complaint:", err);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};

// Get all complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      include: {
        user: true, // Include user information with each complaint
      },
    });

    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

// get user complaints
export const getUserComplaints = async (req, res) => {
  const userId = req.userId; // Assuming you set userId in your verifyToken middleware

  try {
    const complaints = await prisma.complaint.findMany({
      where: { userId }, // Filter complaints by the user ID
      include: {
        user: true, // Include user information with each complaint
      },
    });

    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

// Update complaint status
export const updateComplaintStatus = async (req, res) => {
  const { id } = req.params; // Get complaint ID from URL parameters
  const { status } = req.body; // Get new status from request body

  try {
    // Check if the complaint exists before updating
    const complaintExists = await prisma.complaint.findUnique({
      where: { id },
    });

    if (!complaintExists) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    // Update the complaint's status
    const updatedComplaint = await prisma.complaint.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint: updatedComplaint,
    });
  } catch (err) {
    console.error("Error updating complaint status:", err);
    res
      .status(500)
      .json({ message: "Failed to update complaint", error: err.message });
  }
};
