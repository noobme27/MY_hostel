import { useContext, useState } from "react";
import "./updateProfile.scss";
import heroImage from "./../../src/assets/avatar.png";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
function UpdateProfile() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    /*e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        username: inputs.username,
      });
      updateUser(res.data);
    } catch (err) {
      console.log(err);
    }*/
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
                // defaultValue={currentUser.username}
                //onChange={handleFileChange}
                hidden
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              type="text"
              name="username"
              defaultValue={currentUser.username}
              // value={formData.username}
              //onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Hostel</label>

            <input
              type="text"
              name="Hostel"
              // value={formData.Hostel}
              // onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Room No.</label>

            <input
              type="text"
              name="room"
              // value={formData.room}
              // onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              defaultValue={currentUser.email}
              // value={formData.email}
              //onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              // value={formData.password}
              // onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              //  value={formData.bio}
              //  onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              //  value={formData.contactNumber}
              //  onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              //  value={formData.socialLinks.linkedin}
              //  onChange={handleSocialChange}
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              name="github"
              // value={formData.socialLinks.github}
              // onChange={handleSocialChange}
            />
          </div>

          <button type="submit">Update Profile</button>
        </form>
      </div>
      {/* <div className="imageContainer">hello</div> */}
    </div>
  );
}

export default UpdateProfile;
