import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./chat.scss"; // Import the SCSS file for styling

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const [chats, setChats] = useState([]); // Initialize as empty array for chats
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]); // Messages for the current chat
  const [newMessage, setNewMessage] = useState(""); // New message input

  useEffect(() => {
    // Fetch chats from backend when component mounts
    const fetchChats = async () => {
      try {
        console.log("Fetching chats..."); // Log when fetching starts
        const response = await fetch(
          "https://backened-7u3h.onrender.com/api/chats",
          {
            credentials: "include",
          }
        );

        if (response.status === 401) {
          console.warn("Unauthorized. Redirecting to login.");
          // Redirect to login if unauthorized
          window.location.href = "/login";
          return;
        }
        if (!response.ok) {
          throw new Error(`Failed to fetch chats: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched chats data:", data); // Log fetched data
        setChats(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setChats([]);
      }
    };

    fetchChats();

    // Handle incoming messages
    const handleIncomingMessage = (data) => {
      console.log("Received message:", data); // Log the incoming message
      setMessages((prev) => [...prev, data]); // Append the new message
    };

    socket?.on("getMessage", handleIncomingMessage);

    return () => {
      socket?.off("getMessage", handleIncomingMessage); // Cleanup listener
    };
  }, [socket]);

  const handleChatClick = async (chatId) => {
    setCurrentChat(chatId);
    try {
      // Fetch messages for the selected chat
      const response = await fetch(
        `https://backened-7u3h.onrender.com/api/messages/${chatId}`,
        {
          credentials: "include", // Ensure credentials are included in the request
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]); // Handle error by setting to an empty array
    }
  };

  const handleSendMessage = async () => {
    if (newMessage && currentChat) {
      const messageData = {
        chatId: currentChat,
        text: newMessage,
      };
      try {
        // Send message to backend
        const response = await fetch(
          `https://backened-7u3h.onrender.com/api/messages/${currentChat}`, // Use correct endpoint for adding a message
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to send message: ${response.status}`);
        }

        // Emit message through socket to notify other clients
        console.log("Emitting sendMessage:", messageData);
        socket.emit("sendMessage", {
          receiverId: currentChat,
          data: messageData,
        });
        setNewMessage(""); // Clear message input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="lay">
      <div className="chat-container">
        <div className="chat-list">
          <h2>Chats</h2>
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className="chat-item"
              >
                {chat.receiver.username}{" "}
                {/* Displaying the username of the receiver */}
              </div>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </div>
        <div className="message-container">
          {currentChat ? (
            <>
              <h2>Messages</h2>
              <div className="message-list">
                {Array.isArray(messages) && messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div key={index} className="message-item">
                      <strong>{msg.userId}: </strong>
                      {msg.text}
                    </div>
                  ))
                ) : (
                  <p>No messages yet</p>
                )}
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
