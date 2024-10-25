// socket.js or server.js
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173", // Frontend origin
  },
});

let onlineUsers = []; // Store online users

// Add a new user to the onlineUsers list
const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

// Remove a user when they disconnect
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// Get a user by their userId
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

// Handle socket events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // When a new user connects
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`User added: ${userId}, Socket ID: ${socket.id}`);
  });

  // When a user sends a message
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent to ${receiverId}:`, data);
    } else {
      console.log(`User ${receiverId} not found.`);
    }
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
io.listen(4000, () => {
  console.log("Socket.IO server running on port 4000");
});
