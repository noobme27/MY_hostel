import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./profilePage.scss";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../src/assets/avatar.png"; // Default avatar image
import defaultCoverpage from "../../src/assets/bits profile page.jpg";
function ProfilePage() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!currentUser) {
    return <div>Loading...</div>; // or a message to indicate loading
  }
  const handleUpdateClick = () => {
    navigate("/update");
  };
  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate("/login"); // Redirect to the login page (or your desired route)
  };
  // Sample complaints data
  const complaints = [
    { id: 1, title: "Internet Issue", description: "Slow internet speed in room." },
    { id: 2, title: "Maintenance", description: "AC not working in the common room." },
    { id: 3, title: "Noise Disturbance", description: "Loud noise from nearby construction." },
  ];

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar-background">
          <img src={defaultCoverpage} alt="Profile Avatar"/>
          </div> {/* Just a div for the background */}
          <div className="avatar">
            <img src={currentUser.avatar || defaultAvatar} alt="Profile Avatar" />
          </div>
        </div>
        <h2>{currentUser.username}</h2>
        <p className="bio">{currentUser.info?.bio}</p>
        <div className="follow-info">
          <span>{currentUser.info?.followers || 0} followers</span> · <span>{currentUser.info?.connections || 0} connections</span>
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
            <strong>LinkedIn:</strong> <a href={currentUser.info?.linkedin} target="_blank" rel="noopener noreferrer">{currentUser.info?.linkedin}</a>
          </div>
          <div className="info-item">
            <strong>GitHub:</strong> <a href={currentUser.info?.github} target="_blank" rel="noopener noreferrer">{currentUser.info?.github}</a>
          </div>
          <div className="info-item">
            <strong>Hobbies:</strong> {currentUser.info?.hobbies}
          </div>
          <div class="button-container">
          <button className="update-button" onClick={handleUpdateClick}>
            Update Profile
          </button>
          <button className="logout-button" onClick={handleLogout} >
            Logout
          </button>
          </div>
        </div>
      </div>
      <div className="complaints-section">
        <h3>Your Complaints</h3>
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-item">
            <h4>{complaint.title}</h4>
            <p>{complaint.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
