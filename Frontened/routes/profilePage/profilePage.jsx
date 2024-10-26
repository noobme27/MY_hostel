import React ,{ useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./profilePage.scss";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../src/assets/avatar.png"; // Default avatar image

function ProfilePage() {
  const { currentUser ,logout } = useContext(AuthContext);
  if (!currentUser) {
    return <div>Loading...</div>; // or a message to indicate loading
  }
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar">
          <img src={currentUser.avatar || defaultAvatar} alt="Profile Avatar" />
        </div>
        <h2>{currentUser.username}</h2>
        <p className="bio">{currentUser.info?.bio}</p>
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
          <strong>LinkedIn:</strong> <a href={currentUser.info?.linkedin} target="_blank" rel="noopener noreferrer">{currentUser.info?.linkedin}</a>
        </div>
        <div className="info-item">
          <strong>GitHub:</strong> <a href={currentUser.info?.github} target="_blank" rel="noopener noreferrer">{currentUser.info?.github}</a>
        </div>
        <div className="info-item">
          <strong>Hobbies:</strong> {currentUser.info?.hobbies}
        </div>
        <button>Update Profile</button>
      </div>
    </div>
  );
}

export default ProfilePage;
