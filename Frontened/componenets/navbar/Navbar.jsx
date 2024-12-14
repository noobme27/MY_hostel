import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import imaag from "./assets/enhanced_hd_image.png";
function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://backened-7u3h.onrender.com/api/users/with-avatar/${currentUser.id}`,
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

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src={imaag} alt="" />
          <span>LitedIn</span>
        </Link>
        <Link to="#" onClick={() => handleScrollTo("join-us")}>
          Join Us
        </Link>
        <Link to="#" onClick={() => handleScrollTo("develops-info")}>
          About Us
        </Link>
        <Link to="#" onClick={() => handleScrollTo("contact-us")}>
          Contact Us
        </Link>
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
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
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
          <Link to="#" onClick={() => handleScrollTo("join-us")}>
            Join Us
          </Link>
          <Link to="#" onClick={() => handleScrollTo("develops-info")}>
            About Us
          </Link>
          <Link to="#" onClick={() => handleScrollTo("contact-us")}>
            Contact Us
          </Link>
          <Link to="/">Agents</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
