import prisma from "../lib/prisma.js";

// Get all chats for the logged-in user
export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Fetch chats where the user is a participant
    const userChats = await prisma.userChat.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        chat: {
          include: {
            messages: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });

    const chats = await Promise.all(
      userChats.map(async (userChat) => {
        const chat = userChat.chat;
        const otherUserChat = await prisma.userChat.findFirst({
          where: {
            chatId: chat.id,
            userId: {
              not: tokenUserId,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        });

        return {
          ...chat,
          receiver: otherUserChat.user,
        };
      })
    );

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

// Get a specific chat by ID for the logged-in user
export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Ensure the user is a participant in the chat
    const userChat = await prisma.userChat.findFirst({
      where: {
        chatId: req.params.id,
        userId: tokenUserId,
      },
    });

    if (!userChat) {
      return res.status(403).json({ message: "Access denied to this chat!" });
    }

    // Fetch the chat and its messages
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    // Mark chat as seen by the user
    await prisma.userChat.update({
      where: {
        id: userChat.id,
      },
      data: {
        seenBy: {
          set: [tokenUserId], // Reset seenBy list to only the current user
        },
      },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

// Create a new chat between the logged-in user and another user
// In chat.controller.js

export const addChat = async (req, res) => {
  try {
    const { userIds, initialMessage } = req.body; // Assuming you're passing user IDs and an initial message from the client

    const newChat = await prisma.chat.create({
      data: {
        createdAt: new Date(),
        seenBy: [], // Or any initial setup for seenBy if required
        lastMessage: initialMessage,
        users: {
          create: userIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
    });

    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Failed to create chat", error });
  }
};

// Mark a chat as read by the logged-in user
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Ensure the user is a participant in the chat
    const userChat = await prisma.userChat.findFirst({
      where: {
        chatId: req.params.id,
        userId: tokenUserId,
      },
    });

    if (!userChat) {
      return res.status(403).json({ message: "Access denied to this chat!" });
    }

    // Update the seenBy field for the chat
    await prisma.userChat.update({
      where: {
        id: userChat.id,
      },
      data: {
        seenBy: {
          set: [tokenUserId], // Mark chat as read by this user
        },
      },
    });

    res.status(200).json({ message: "Chat marked as read" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to mark chat as read!" });
  }
};
