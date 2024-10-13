import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import heroImage from './assets/image.jpg';
function Navbar() {
  const [open, setOpen] = useState(false);
  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="" alt="" />
          <span>LitedIn</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About Us</a>
        <a href="/" className="text-red-500">
          Contact Us
        </a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img src={heroImage} alt="Hero" />
            <span>Dhruv Verma</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="register">
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
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
