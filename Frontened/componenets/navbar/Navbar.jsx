import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8800/api/users/with-avatar/${currentUser.id}`,
            { withCredentials: true }
          );
          if (response.data.avatar !== userAvatar) {
            setUserAvatar(response.data.avatar);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [currentUser, userAvatar]); // Only trigger if currentUser or avatar changes

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="./../../src/assets/enhanced_hd_image.png" alt="" />
          <span>LitedIn</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About Us</a>
        <a href="/">Contact Us</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={userAvatar || "../../src/assets/avatar.png"}
              alt="User Avatar"
              onError={(e) => (e.target.src = "../../src/assets/avatar.png")}
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
