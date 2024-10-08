import "./hostel.scss";
import { useEffect, useState } from "react";

const Hostel = () => {
  const [layout, setLayout] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1); // State for zoom level

  useEffect(() => {
    fetch("http://localhost:8800/api/room-layout/Vyas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setLayout(data);
      })
      .catch((err) => console.error("Error fetching layout:", err));
  }, []);

  // Zoom in function
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom level
  };

  // Zoom out function
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Min zoom level
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
          transformOrigin: "top left", // Ensure scaling starts from the top-left
          width: "fit-content", // Let the content define the width
        }}
      >
        <div className="room-layout">
          {layout.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div key={colIndex} className="cell">
                  {cell === 1 ? (
                    <div className="room">Room</div>
                  ) : cell === "H" ? (
                    <div className="hallway">Hallway</div>
                  ) : (
                    <div className="empty"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hostel;
