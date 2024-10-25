// src/components/Chat.jsx

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./../../context/SocketContext";
import "./chat.scss"; // Import the SCSS file for styling

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch chats from backend when component mounts
    const fetchChats = async () => {
      const response = await fetch("/api/chats"); // Adjust the endpoint as needed
      const data = await response.json();
      setChats(data);
    };

    fetchChats();

    // Handle incoming messages
    socket?.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket?.off("getMessage");
    };
  }, [socket]);

  const handleChatClick = async (chatId) => {
    setCurrentChat(chatId);
    // Fetch messages for the selected chat
    const response = await fetch(`/api/chats/${chatId}/messages`);
    const data = await response.json();
    setMessages(data);
  };

  const handleSendMessage = async () => {
    if (newMessage && currentChat) {
      const messageData = {
        chatId: currentChat,
        text: newMessage,
      };
      // Send message to backend
      await fetch(`/api/chats/${currentChat}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });
      // Emit message through socket
      socket.emit("sendMessage", {
        receiverId: currentChat,
        data: messageData,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="lay">
      <div className="chat-container">
        <div className="chat-list">
          <h2>Chats</h2>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className="chat-item"
            >
              {chat.name}
            </div>
          ))}
        </div>
        <div className="message-container">
          {currentChat ? (
            <>
              <h2>Messages</h2>
              <div className="message-list">
                {messages.map((msg, index) => (
                  <div key={index} className="message-item">
                    <strong>{msg.senderId}: </strong>
                    {msg.text}
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button onClick={handleSendMessage} className="send-button">
                Send
              </button>
            </>
          ) : (
            <h2>Select a chat to start messaging</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
