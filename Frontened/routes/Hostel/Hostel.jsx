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
    setHoveredRoom(room);
  };

  // Function to get user by room, with room number converted to string
  const getUserByRoom = (roomNumber) => {
    if (isNaN(roomNumber)) return null; // Only compare if it's a valid room number
    return users.find((user) => {
      const userRoom =
        user.info && user.info.room ? user.info.room.toString() : null;
      return userRoom === roomNumber;
    });
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
    <div className="parent-container">
      <div className="map_container">
        <div className="zoom-buttons">
          <button className="zoom-button" onClick={handleZoomIn}>
            Zoom In
          </button>
          <button className="zoom-button" onClick={handleZoomOut}>
            Zoom Out
          </button>
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
                  const roomUser = getUserByRoom(cell);
                  const { info } = roomUser || {};

                  return (
                    <div
                      key={colIndex}
                      className={`cell ${roomTypeClasses[cell] || "room"}`}
                      onMouseEnter={() => handleMouseEnter(cell)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {cell === "H" && (
                        <div className="btn btn-primary hallway"></div>
                      )}
                      {cell === "T" && (
                        <button
                          className="toilet toilet-button"
                          onClick={() => handleButtonClick()}
                        ></button>
                      )}
                      {cell === "S" && <div className="stairs"></div>}
                      {cell === "EN" && <div className="entrance"></div>}
                      {cell === "W" && (
                        <button
                          className="water water-button"
                          onClick={() => handleButtonClick()}
                        ></button>
                      )}
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
                            <h3>{info.name || "Unknown User"}</h3>
                            <p>Room: {info.room}</p>
                            <p>Institute ID: {info.instituteId || "N/A"}</p>
                            <p>Hobbies: {info.hobbies || "N/A"}</p>
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
    </div>
  );
};

export default Hostel;
