import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultAvatar from "../../src/assets/avatar.png";
import defaultCoverpage from "../../src/assets/bits profile page.jpg";
import "./profilePage.scss";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";

function ProfilePage() {
  const { currentUser } = useContext(AuthContext); // Access the current user from context
  const navigate = useNavigate();

  if (!currentUser) {
    return <div>Loading...</div>; // Show loading if user data is not available
  }

  // Define the logout function
  const handleLogout = async () => {
    try {
      await apiRequest.post(`http://localhost:8800/api/auth/logout`); // Adjust the endpoint path if needed
      navigate("/login"); // Redirect to the login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleUpdateClick = () => {
    navigate("/update");
  };

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <div className="profile-header">
          <div className="avatar-container">
            <div className="avatar-background">
              <img src={defaultCoverpage} alt="Profile Cover" />
            </div>
            <div className="avatar">
              <img
                src={currentUser.avatar || defaultAvatar}
                alt="Profile Avatar"
              />
            </div>
          </div>
          <h2>{currentUser.username}</h2>
          <p className="bio">{currentUser.info?.bio}</p>
          <div className="follow-info">
            <span>{currentUser.info?.followers || 0} followers</span> ·{" "}
            <span>{currentUser.info?.connections || 0} connections</span>
          </div>
        </div>

        <div className="profile-info">
          <h3>Profile Information</h3>
          <div className="info-item">
            <strong>Name:</strong> {currentUser.info?.name}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {currentUser.email}
          </div>
          <div className="info-item">
            <strong>Hostel:</strong> {currentUser.info?.hostel}
          </div>
          <div className="info-item">
            <strong>Room No.:</strong> {currentUser.info?.room}
          </div>
          <div className="info-item">
            <strong>Contact Number:</strong> {currentUser.info?.contactNumber}
          </div>
          <div className="info-item">
            <strong>LinkedIn:</strong>{" "}
            <a
              href={currentUser.info?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentUser.info?.linkedin}
            </a>
          </div>
          <div className="info-item">
            <strong>GitHub:</strong>{" "}
            <a
              href={currentUser.info?.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currentUser.info?.github}
            </a>
          </div>
          <div className="info-item">
            <strong>Hobbies:</strong> {currentUser.info?.hobbies}
          </div>
          <div className="button-container">
            <button className="update-button" onClick={handleUpdateClick}>
              Update Profile
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
