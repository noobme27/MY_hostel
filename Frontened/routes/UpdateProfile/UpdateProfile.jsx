import { useContext, useState } from "react";
import "./updateProfile.scss";

import heroImage from "../../src/assets/avatar.png";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize form data based on currentUser
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "", // For updating the password only if needed
    avatar: currentUser?.avatar || "",
    info: {
      name: currentUser?.info?.name || "",
      hostel: currentUser?.info?.hostel || "",
      room: currentUser?.info?.room || "",
      hobbies: currentUser?.info?.hobbies || "",
      bio: currentUser?.info?.bio || "",
      contactNumber: currentUser?.info?.contactNumber || "",
      linkedin: currentUser?.info?.linkedin || "",
      github: currentUser?.info?.github || "",
    },
  });
  const [profilePicture, setProfilePicture] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("info.")) {
      const infoField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        info: {
          ...prevData.info,
          [infoField]: infoField === "room" ? parseInt(value, 10) || "" : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle file input change and preview the image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    // Create a local URL for the selected image to update the preview dynamically
    const imageUrl = URL.createObjectURL(file);
    setFormData((prevData) => ({
      ...prevData,
      avatar: imageUrl, // Update avatar field with the image URL
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("username", formData.username);
    formDataObj.append("email", formData.email);
    if (formData.password) {
      formDataObj.append("password", formData.password);
    }
    if (profilePicture) {
      formDataObj.append("avatar", profilePicture); // Send the profile picture to the backend
    }
    Object.entries(formData.info).forEach(([key, value]) => {
      formDataObj.append(`info.${key}`, value);
    });

    try {
      const res = await apiRequest.put(
        `https://backened-7u3h.onrender.com/api/users/update/${currentUser.id}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      updateUser(res.data);
      navigate(`/`);
      window.location.reload();
    } catch (err) {
      console.error("Error during update:", err);
    }
  };

  return (
    <div className="profile">
      <div className="profile-update">
        <h2>Update Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="image-wrapper">
              <img
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : heroImage || currentUser.avatar
                }
                alt="Hero"
              />
              <label htmlFor="file-upload" className="edit-btn">
                <FaEdit /> Edit
              </label>
              <input
                id="file-upload"
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                hidden
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="info.name"
              value={formData.info.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Hostel</label>
            <input
              type="text"
              name="info.hostel"
              value={formData.info.hostel}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Room No.</label>
            <input
              type="text"
              name="info.room"
              value={formData.info.room}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="info.bio"
              value={formData.info.bio}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="info.contactNumber"
              value={formData.info.contactNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              name="info.linkedin"
              value={formData.info.linkedin}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              name="info.github"
              value={formData.info.github}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Hobbies</label>
            <input
              type="text"
              name="info.hobbies"
              value={formData.info.hobbies}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
