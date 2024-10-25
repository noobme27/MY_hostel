import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId; // Get the user ID from the token
  const chatId = req.params.chatId; // Get the chat ID from the route parameters
  const { text } = req.body; // Get the message text from the request body

  try {
    // Check if the chat exists and the user is part of the chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        users: {
          // Change 'userIDs' to 'users'
          some: {
            userId: tokenUserId, // Check if the user ID is in the users of the chat
          },
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    // Create the message
    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    // Update chat's last message and reset seenBy to include only the sender
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessage: text,
        seenBy: {
          set: [tokenUserId],
        },
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.error("Error adding message:", err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
