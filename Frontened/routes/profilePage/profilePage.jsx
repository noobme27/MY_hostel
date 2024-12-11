import React, { useContext, useEffect, useState } from "react";
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
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const avatarUrl = `http://localhost:8800${userDetails.avatar}`;

  const handleLogout = async () => {
    try {
      await apiRequest.post(`http://localhost:8800/api/auth/logout`);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleUpdateClick = () => {
    navigate("/update");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/users/info/${currentUser.id}`,
          { withCredentials: true }
        );
        console.log("API Response:", response.data); // Ensure the response is what we expect
        const data = response.data;

        // Debug log to inspect the structure of data
        console.log("Data Info:", data.info);

        // Handle the `info` array
        if (Array.isArray(data.info) && data.info.length > 0) {
          data.info = data.info[0]; // Get the first item if it's an array
        }
        console.log("User Avatar:", userDetails.avatar);

        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.id) {
      fetchUserDetails();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Error loading user details.</div>;
  }

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
                src={userDetails.avatar ? avatarUrl : defaultAvatar}
                alt="Profile Avatar"
              />
            </div>
          </div>
          <h2>{userDetails.username}</h2>
          <p className="bio">{userDetails.info?.bio}</p>
          <div className="follow-info">
            <span>{userDetails.info?.followers || 0} followers</span> ·{" "}
            <span>{userDetails.info?.connections || 0} connections</span>
          </div>
        </div>

        <div className="profile-info">
          <h3>Profile Information</h3>
          <div className="info-item">
            <strong>Name:</strong> {userDetails.info?.name}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {userDetails.email}
          </div>
          <div className="info-item">
            <strong>Hostel:</strong> {userDetails.info?.hostel}
          </div>
          <div className="info-item">
            <strong>Room No.:</strong> {userDetails.info?.room}
          </div>
          <div className="info-item">
            <strong>Contact Number:</strong> {userDetails.info?.contactNumber}
          </div>
          <div className="info-item">
            <strong>LinkedIn:</strong>{" "}
            <a
              href={userDetails.info?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userDetails.info?.linkedin}
            </a>
          </div>
          <div className="info-item">
            <strong>GitHub:</strong>{" "}
            <a
              href={userDetails.info?.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userDetails.info?.github}
            </a>
          </div>
          <div className="info-item">
            <strong>Hobbies:</strong> {userDetails.info?.hobbies}
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
