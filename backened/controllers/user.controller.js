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
const transformDotNotationKeys = (body) => {
  const info = {};
  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith("info.")) {
      const subKey = key.split(".")[1]; // Extract the key after "info."
      info[subKey] = value;
    }
  }
  return info;
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { password, ...inputs } = req.body;
  let avatarPath = null;

  if (req.file) {
    avatarPath = `/uploads/avatars/${req.file.filename}`;
  }

  try {
    console.log("Request Body:", req.body); // Debugging

    // Transform dot-notation keys into a nested `info` object
    const info = transformDotNotationKeys(req.body);

    let updatedPassword = null;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: { info: true },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming the first Info record is the one to update (or create if none exists)
    const infoId = existingUser.info?.[0]?.id;

    const sanitizedInfo = {
      name: info?.name || existingUser?.info?.[0]?.name || "",
      hostel: info?.hostel || existingUser?.info?.[0]?.hostel || "",
      room: info?.room
        ? parseInt(info.room, 10)
        : existingUser?.info?.[0]?.room || null,
      hobbies: info?.hobbies || existingUser?.info?.[0]?.hobbies || "",
      bio: info?.bio || existingUser?.info?.[0]?.bio || "",
      contactNumber:
        info?.contactNumber || existingUser?.info?.[0]?.contactNumber || "",
      linkedin: info?.linkedin || existingUser?.info?.[0]?.linkedin || "",
      github: info?.github || existingUser?.info?.[0]?.github || "",
    };

    console.log("Sanitized Info:", sanitizedInfo); // Debugging

    const updateData = {
      username: inputs.username || existingUser.username,
      email: inputs.email || existingUser.email,
      avatar: avatarPath || existingUser.avatar,
      ...(updatedPassword && { password: updatedPassword }),
      info: existingUser.info.length
        ? {
            update: {
              where: { id: infoId }, // Use the `id` of the `Info` record to update
              data: sanitizedInfo,
            },
          }
        : {
            create: sanitizedInfo, // Create a new `Info` if none exists
          },
    };

    console.log("Update Data:", updateData); // Debugging

    // Update the user and their info
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: { info: true },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};
export const getUserInfo = async (req, res) => {
  const id = req.params.id;

  try {
    // Fetch user details and include the related `info`
    const user = await prisma.user.findUnique({
      where: { id },
      include: { info: true }, // Include the `info` relation
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user data, including `info`
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Failed to get user" });
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
