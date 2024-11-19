import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { info: true },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId; // Assuming `req.userId` is set after authentication

  // Authorization check
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { password, avatar, info, ...inputs } = req.body;
  let updatedPassword = null;

  try {
    // Hash the password if it's being updated
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Fetch existing user and its info
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: { info: true }, // Ensure info is included
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare data for the user update
    const updateData = {
      ...inputs,
      ...(updatedPassword ? { password: updatedPassword } : {}),
      ...(avatar ? { avatar } : {}),
    };

    const infoData = info
      ? {
          name: info.name || null,
          hostel: info.hostel || null,
          room: info.room || null,
          hobbies: info.hobbies || null,
          bio: info.bio || null,
          contactNumber: info.contactNumber || null,
          linkedin: info.linkedin || null,
          github: info.github || null,
        }
      : {};

    // Handle upsert logic for the `info` field
    if (existingUser.info && existingUser.info.id) {
      // If info exists, update it
      updateData.info = {
        update: infoData, // Update the existing info
      };
    } else {
      // If no info exists, create a new info record
      updateData.info = {
        create: infoData, // Do not specify userId manually; Prisma will do it based on the relation
      };
    }

    // Execute the update operation for the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData, // The update data including user and info
      include: { info: true }, // Return the updated info relation
    });

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword); // Return the updated user without password
  } catch (err) {
    console.error("Error updating user:", err.message); // Log the error
    console.error("Request body:", JSON.stringify(req.body, null, 2)); // Log the request body for further inspection
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorised" });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.params.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile Posts!" });
  }
};

export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};
