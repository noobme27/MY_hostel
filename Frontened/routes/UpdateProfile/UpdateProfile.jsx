import { useContext, useState } from "react";
import "./updateProfile.scss";
import heroImage from "../../src/assets/avatar.png";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UpdateProfile() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize the navigate hook

  // State to handle form data and file upload
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    info: {
      hostel: "",
      room: "",
      bio: "",
      contactNumber: "",
      linkedin: "",
      github: "",
    },
  });
  const [profilePicture, setProfilePicture] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update nested info state if name starts with "info."
    if (name.startsWith("info.")) {
      const infoField = name.split(".")[1]; // Get the field name after "info."
      setFormData((prevData) => ({
        ...prevData,
        info: {
          ...prevData.info,
          [infoField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    const updatedData = { ...formData };

    // If a new profile picture is uploaded, handle the upload
    if (profilePicture) {
      const fileData = new FormData();
      fileData.append("avatar", profilePicture);
      updatedData.avatar = profilePicture; // Attach the file to formData for the backend
    }

    console.log("Updated data:", updatedData);

    try {
      const res = await apiRequest.put(
        `/users/update/${currentUser.id}`,
        updatedData
      );
      console.log("Response:", res.data);

      updateUser(res.data); // Update user context with the new data

      // Refresh the page or navigate to the updated profile
      navigate(`/`);
      window.location.reload(); // Force page refresh after navigation
    } catch (err) {
      console.log("Error during update:", err); // Log any errors
    }
  };

  return (
    <div className="profile">
      <div className="profile-update">
        <h2>Update Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="image-wrapper">
              <img src={heroImage || currentUser.avatar} alt="Hero" />
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
            <label>Hostel</label>
            <input
              type="text"
              name="info.hostel" // Updated name to reflect nested structure
              value={formData.info.hostel}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Room No.</label>
            <input
              type="text"
              name="info.room" // Updated name to reflect nested structure
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
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="info.bio" // Updated name to reflect nested structure
              value={formData.info.bio}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="info.contactNumber" // Updated name to reflect nested structure
              value={formData.info.contactNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              name="info.linkedin" // Updated name to reflect nested structure
              value={formData.info.linkedin}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              name="info.github" // Updated name to reflect nested structure
              value={formData.info.github}
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
