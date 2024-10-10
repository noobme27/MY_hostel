import "./hostel.scss";
import { useEffect, useState } from "react";

const Hostel = () => {
  const [layout, setLayout] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1); // State for zoom level
  const [hoveredRoom, setHoveredRoom] = useState(null); // State for hovered room
  const [users, setUsers] = useState([]); // State for user data

  // Fetch layout and user data from the backend
  useEffect(() => {
    fetch("http://localhost:8800/api/room-layout/Vyas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setLayout(data.layout); // Set room layout
        setUsers(data.users); // Set user data
      })
      .catch((err) =>
        console.error("Error fetching layout and user data:", err)
      );
  }, []);

  // Zoom in function
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom level
  };

  // Zoom out function
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Min zoom level
  };

  // Handle mouse hover
  const handleMouseEnter = (room) => {
    setHoveredRoom(room);
  };

  const handleMouseLeave = () => {
    setHoveredRoom(null);
  };

  // Find user by room number
  const getUserByRoom = (roomNumber) => {
    return users.find((user) => user.room === roomNumber);
  };
  return (
    <div className="map_container">
      {/* Zoom buttons positioned at the top */}
      <div className="zoom-buttons">
        <button className="zoom-button" onClick={handleZoomIn}>
          Zoom In
        </button>
        <button className="zoom-button" onClick={handleZoomOut}>
          Zoom Out
        </button>
      </div>
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
                const roomUser = getUserByRoom(cell); // Get user for the current room

                return (
                  <div
                    key={colIndex}
                    className={`cell ${
                      cell === "H"
                        ? "hallway"
                        : cell === "E"
                        ? "empty"
                        : cell === "T"
                        ? "toilet"
                        : cell === "S"
                        ? "stairs"
                        : cell === "EN"
                        ? "entrance"
                        : cell === "W"
                        ? "water"
                        : cell === "CR"
                        ? "common-room"
                        : "room" // Default class for other rooms
                    }`}
                    onMouseEnter={() => handleMouseEnter(cell)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Check for room types and render accordingly */}
                    {cell === "H" && (
                      <div className=" btn btn-primary hallway ">Hallway</div>
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

                    {/* Show info box when room is hovered */}
                    {hoveredRoom === cell && roomUser && (
                      <div className="info-box">
                        <img
                          src={roomUser.profilePic}
                          alt="Profile"
                          className="profile-pic"
                        />
                        <div className="user-info">
                          <h3>{roomUser.name}</h3>
                          <p>Institute ID: {roomUser.instituteId}</p>
                          <p>Hobbies: {roomUser.hobbies}</p>
                          <div className="social-links">
                            <a
                              href={roomUser.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              WhatsApp
                            </a>
                            <a
                              href={roomUser.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Instagram
                            </a>
                            <a
                              href={roomUser.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              LinkedIn
                            </a>
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
