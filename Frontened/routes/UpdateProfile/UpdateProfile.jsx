import { useState } from "react";
import "./updateProfile.scss";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
    bio: "",
    contactNumber: "",
    socialLinks: {
      linkedin: "",
      github: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value,
      },
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
    console.log(formData);
  };

  return (
    <div className="profile-update">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formData.socialLinks.linkedin}
            onChange={handleSocialChange}
          />
        </div>

        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            name="github"
            value={formData.socialLinks.github}
            onChange={handleSocialChange}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;