import React, { useState } from 'react';
import './App.css'; // External CSS file

// Dummy data for multiple rooms/users
const users = [
  {
    room: 1001,
    name: "John Doe",
    instituteId: "123456789",
    hobbies: "Reading, Traveling, Coding",
    whatsapp: "https://wa.me/123456789",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    profilePic: "https://via.placeholder.com/100"
  },
  {
    room: 1002,
    name: "Jane Smith",
    instituteId: "987654321",
    hobbies: "Photography, Painting",
    whatsapp: "https://wa.me/987654321",
    instagram: "https://instagram.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    profilePic: "https://via.placeholder.com/100"
  },
  {
    room: 1003,
    name: "Sam Wilson",
    instituteId: "654321987",
    hobbies: "Cycling, Blogging",
    whatsapp: "https://wa.me/654321987",
    instagram: "https://instagram.com/samwilson",
    linkedin: "https://linkedin.com/in/samwilson",
    profilePic: "https://via.placeholder.com/100"
  },
  {
    room: 1004,
    name: "Alice Johnson",
    instituteId: "321987654",
    hobbies: "Gaming, Hiking",
    whatsapp: "https://wa.me/321987654",
    instagram: "https://instagram.com/alicejohnson",
    linkedin: "https://linkedin.com/in/alicejohnson",
    profilePic: "https://via.placeholder.com/100"
  },
  {
    room: 1005,
    name: "Bob Lee",
    instituteId: "555555555",
    hobbies: "Surfing, Dancing",
    whatsapp: "https://wa.me/555555555",
    instagram: "https://instagram.com/boblee",
    linkedin: "https://linkedin.com/in/boblee",
    profilePic: "https://via.placeholder.com/100"
  }
];

const UserProfile = () => {
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const handleMouseEnter = (room) => {
    setHoveredRoom(room);
  };

  const handleMouseLeave = () => {
    setHoveredRoom(null);
  };

  return (
    <div className="rooms-container">
      {users.map(user => (
        <div
          key={user.room}
          className="user-container"
          onMouseEnter={() => handleMouseEnter(user.room)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Room Number */}
          <div className="room-number">
            Room {user.room}
          </div>

          {/* Information Box (Shown on Hover) */}
          {hoveredRoom === user.room && (
            <div className="info-box">
              {/* Profile Picture */}
              <img src={user.profilePic} alt="Profile" className="profile-pic" />

              {/* User Information */}
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>Institute ID: {user.instituteId}</p>
                <p>Hobbies: {user.hobbies}</p>

                {/* Social Links */}
                <div className="social-links">
                  <a href={user.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <a href={user.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
