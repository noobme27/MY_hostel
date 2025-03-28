import axios from "axios";
import Complaint from "../Complaint/Complaint";
import "./hostel.scss";
import { useEffect, useState } from "react";

const Hostel = () => {
  const [layout, setLayout] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showComplaint, setShowComplaint] = useState(false);
  const [complaintPosition, setComplaintPosition] = useState({
    top: 0,
    left: 0,
  });
  const [selectedFloor, setSelectedFloor] = useState("ground"); // Default floor

  useEffect(() => {
    const fetchLayoutAndUsers = async () => {
      try {
        const layoutResponse = await fetch(
          `http://localhost:8800/api/room-layout/Vyas/${selectedFloor}`
        );
        const usersResponse = await fetch("http://localhost:8800/api/users");

        if (!layoutResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const layoutData = await layoutResponse.json();
        const usersData = await usersResponse.json();

        // Fetch avatars for each user
        const usersWithAvatars = await Promise.all(
          usersData.map(async (user) => {
            const avatar = await fetchUserAvatar(user.id); // Fetch avatar for each user
            return { ...user, avatar };
          })
        );

        setLayout(layoutData.layout);
        setUsers(usersWithAvatars);
      } catch (err) {
        console.error("Error fetching layout and user data:", err);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchLayoutAndUsers();
  }, [selectedFloor]); // Fetch data whenever selectedFloor changes

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  const handleMouseLeave = () => {
    setHoveredRoom(null);
  };

  const handleMouseEnter = (room) => {
    setHoveredRoom(room);
  };

  const fetchUserAvatar = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/users/with-avatar/${userId}`,
        { withCredentials: true }
      );
      return response.data.avatar || "../../src/assets/avatar.png"; // Default fallback image
    } catch (error) {
      console.error("Error fetching user avatar:", error);
      return "../../src/assets/avatar.png"; // Fallback image if error occurs
    }
  };

  const getUserByRoom = (roomNumber) => {
    if (isNaN(roomNumber)) return null;

    const user = users.find((user) => {
      const userRoomInfo = user.info.find((info) => info.room === roomNumber);
      return userRoomInfo ? userRoomInfo.room === roomNumber : false;
    });

    // If user is found, assign the avatar URL; else, set a fallback avatar
    if (user) {
      if (!user.avatar) {
        user.avatar = "../../src/assets/avatar.png"; // Fallback if avatar is missing
      } else {
        user.avatar = `${user.avatar}`;
        console.log(user.avatar); // Construct the full avatar URL
      }
    }

    return user;
  };

  const roomTypeClasses = {
    H: "hallway",
    E: "empty",
    T: "toilet",
    S: "stairs",
    EN: "entrance",
    W: "water",
    CR: "common-room",
  };

  const handleComplaintClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setComplaintPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowComplaint(true);
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  return (
    <div className="parent-container">
      {/* Floor selection dropdown using DaisyUI */}
      <div className="map_container">
        <div className="zoom-buttons">
          <button className="zoom-button" onClick={handleZoomIn}>
            Zoom In
          </button>
          <button className="zoom-button" onClick={handleZoomOut}>
            Zoom Out
          </button>

          <details className="dropdown">
            <summary className="btn m-1">Select Floor</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <a onClick={() => handleFloorChange("ground")}>Ground Floor</a>
              </li>
              <li>
                <a onClick={() => handleFloorChange("first")}>First Floor</a>
              </li>
            </ul>
          </details>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div
          className="scroll-container"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
            width: "fit-content",
          }}
        >
          <div className="room-layout">
            {layout.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => {
                  // Ensure you get the user by the room number
                  const user = getUserByRoom(cell); // This will return either a user or null/undefined
                  const userInfo = user ? user.info : []; // Use user info only if user exists

                  return (
                    <div
                      key={colIndex}
                      className={`cell ${roomTypeClasses[cell] || "room"}`}
                      onMouseEnter={() => handleMouseEnter(cell)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {cell === "H" && <div className="hallway"></div>}
                      {cell === "T" && (
                        <button
                          className="toilet toilet-button"
                          onClick={handleComplaintClick}
                        ></button>
                      )}
                      {cell === "W" && (
                        <button
                          className="water water-button"
                          onClick={handleComplaintClick}
                        ></button>
                      )}
                      {cell === "S" && <div className="stairs"></div>}
                      {cell === "EN" && <div className="entrance"></div>}
                      {cell === "CR" && <div className="common-room"></div>}
                      {cell !== "H" &&
                        cell !== "E" &&
                        cell !== "T" &&
                        cell !== "S" &&
                        cell !== "EN" &&
                        cell !== "W" &&
                        cell !== "CR" && (
                          <button className="room-button room">{cell}</button>
                        )}

                      {/* Check if room is hovered and user info exists */}
                      {hoveredRoom === cell && userInfo.length > 0 && (
                        <div
                          className="room-info-panel"
                          aria-labelledby={`info-${cell}`}
                        >
                          <img
                            src={user.avatar || "../../src/assets/avatar.png"} // Safe fallback
                            alt="Profile"
                            className="profile-pic"
                          />
                          <div className="user-info">
                            <h3>{userInfo[0].name || "Unknown User"}</h3>
                            <p>Room: {userInfo[0].room}</p>
                            <p>
                              Institute ID: {userInfo[0].instituteId || "N/A"}
                            </p>
                            <p>Hobbies: {userInfo[0].hobbies || "N/A"}</p>
                            <div className="social-links">
                              {userInfo[0].whatsapp && (
                                <a
                                  href={userInfo[0].whatsapp}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="WhatsApp"
                                >
                                  WhatsApp
                                </a>
                              )}
                              {userInfo[0].instagram && (
                                <a
                                  href={userInfo[0].instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Instagram"
                                >
                                  Instagram
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showComplaint && (
        <Complaint
          onClose={() => setShowComplaint(false)}
          position={complaintPosition}
        />
      )}
    </div>
  );
};

export default Hostel;
