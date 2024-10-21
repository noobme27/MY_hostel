import "./hostel.scss";
import { useEffect, useState } from "react";

const Hostel = () => {
  const [layout, setLayout] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchLayoutAndUsers = async () => {
      try {
        const [layoutResponse, usersResponse] = await Promise.all([
          fetch("http://localhost:8800/api/room-layout/Vyas"),
          fetch("http://localhost:8800/api/users"),
        ]);

        if (!layoutResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const layoutData = await layoutResponse.json();
        const usersData = await usersResponse.json();
        setLayout(layoutData.layout);
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching layout and user data:", err);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchLayoutAndUsers();
  }, []);

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
    console.log("Hovered Room:", room); // Log the room being hovered
    setHoveredRoom(room);
  };

  const getUserByRoom = (roomNumber) => {
    const user = users.find(
      (user) => user.info && user.info.room === roomNumber
    );
    console.log("User for Room", roomNumber, ":", user); // Log the user found for the room
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

  return (
    <div className="map_container">
      <div className="zoom-buttons">
        <button className="zoom-button" onClick={handleZoomIn}>
          Zoom In
        </button>
        <button className="zoom-button" onClick={handleZoomOut}>
          Zoom Out
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Error message */}
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
                const roomUser = getUserByRoom(cell);
                const { info } = roomUser || {}; // Destructure info from roomUser

                return (
                  <div
                    key={colIndex}
                    className={`cell ${roomTypeClasses[cell] || "room"}`}
                    onMouseEnter={() => handleMouseEnter(cell)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {cell === "H" && (
                      <div className="btn btn-primary hallway">Hallway</div>
                    )}
                    {cell === "T" && <div className="toilet">Toilet</div>}
                    {cell === "S" && <div className="stairs">Stairs</div>}
                    {cell === "EN" && <div className="entrance">Entrance</div>}
                    {cell === "W" && <div className="water">Water</div>}
                    {cell === "CR" && (
                      <div className="common-room">Common Room</div>
                    )}
                    {cell !== "H" &&
                      cell !== "E" &&
                      cell !== "T" &&
                      cell !== "S" &&
                      cell !== "EN" &&
                      cell !== "W" &&
                      cell !== "CR" && (
                        <button className="room-button room">{cell}</button>
                      )}

                    {hoveredRoom === cell && info && (
                      <div
                        className="info-box"
                        aria-labelledby={`info-${cell}`}
                      >
                        <img
                          src={info.avatar || "./../../src/assets/avatar.png"}
                          alt="Profile"
                          className="profile-pic"
                        />
                        <div className="user-info">
                          <h3>{info.name || "Unknown User"}</h3>{" "}
                          {/* Default name if null */}
                          <p>Room: {info.room}</p>
                          <p>Institute ID: {info.instituteId || "N/A"}</p>{" "}
                          {/* Default for institute ID */}
                          <p>Hobbies: {info.hobbies || "N/A"}</p>{" "}
                          {/* Default for hobbies */}
                          <div className="social-links">
                            {info.whatsapp && (
                              <a
                                href={info.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                              >
                                WhatsApp
                              </a>
                            )}
                            {info.instagram && (
                              <a
                                href={info.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                              >
                                Instagram
                              </a>
                            )}
                            {info.linkedin && (
                              <a
                                href={info.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                              >
                                LinkedIn
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
  );
};

export default Hostel;
