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
      include: { info: true },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare data for the user update
    const updateData = {
      ...inputs,
      ...(updatedPassword && { password: updatedPassword }),
      ...(avatar && { avatar }),
    };

    const infoData = {
      name: info.name,
      hostel: info.hostel,
      room: info.room,
      hobbies: info.hobbies,
      bio: info.bio,
      contactNumber: info.contactNumber,
      linkedin: info.linkedin,
      github: info.github,
    };

    // Handle upsert logic for `info` field
    if (existingUser.info && existingUser.info.length > 0) {
      updateData.info = {
        upsert: {
          where: { id: existingUser.info[0].id },
          create: infoData,
          update: infoData,
        },
      };
    } else {
      updateData.info = {
        create: infoData,
      };
    }

    // Execute update
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: { info: true }, // Return the updated info
    });

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error("Error updating user:", err); // Log the error
    console.error("Request body:", req.body); // Log the request body for further inspection
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
