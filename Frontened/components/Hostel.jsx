import "./hostel.scss";
import { useEffect, useState } from "react";

const Hostel = () => {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/api/room-layout/Vyas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched layout: ", data);
        setLayout(data);
      })
      .catch((err) => console.error("Error fetching layout:", err));
  }, []);

  return (
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
  );
};

// This is where the fix happens
export default Hostel;
