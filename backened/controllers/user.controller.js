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

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { password, info, ...inputs } = req.body;

  // Set default for avatarPath
  let avatarPath = null;

  // Check if a file was uploaded and set avatarPath accordingly
  if (req.file) {
    avatarPath = `/uploads/avatars/${req.file.filename}`;
  }

  try {
    // Handle password update if provided
    let updatedPassword = null;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Retrieve existing user details
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: { info: true }, // Include user info for upsert operation
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if info exists, and prepare ID for upsert
    const infoId =
      existingUser.info && existingUser.info.length > 0
        ? existingUser.info[0].id
        : undefined;

    // Build the updateData object
    const updateData = {
      username: inputs.username || existingUser.username,
      email: inputs.email || existingUser.email,
      avatar: avatarPath || existingUser.avatar, // Preserve existing avatar if no new file uploaded
      ...(updatedPassword && { password: updatedPassword }), // Only include password if updated
      info: {
        upsert: {
          where: { id: infoId || undefined },
          create: {
            name: info?.name || "",
            hostel: info?.hostel || "",
            room: info?.room ? parseInt(info.room, 10) : null,
            hobbies: info?.hobbies || "",
            bio: info?.bio || "",
            contactNumber: info?.contactNumber || "",
            linkedin: info?.linkedin || "",
            github: info?.github || "",
          },
          update: {
            name: info?.name || "",
            hostel: info?.hostel || "",
            room: info?.room ? parseInt(info.room, 10) : null,
            hobbies: info?.hobbies || "",
            bio: info?.bio || "",
            contactNumber: info?.contactNumber || "",
            linkedin: info?.linkedin || "",
            github: info?.github || "",
          },
        },
      },
    };

    // Log the update data for debugging
    console.log("Update Data:", updateData);

    // Perform the update
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: { info: true },
    });

    // Omit password from response
    const { password: _, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error("Error updating user:", err);
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
export const getUserWithAvatar = async (req, res) => {
  const { id } = req.params; // Get the id from params

  // Ensure that the id is a valid ObjectId string
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Construct the avatar URL
    const avatarUrl = `http://localhost:8800${user.avatar}`;
    res.status(200).json({ ...user, avatar: avatarUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user with avatar!" });
  }
};
