import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation
import "./DevelopersInfo.scss";
import apoorv from "./assets/20231226_175040.jpg";
import dhruv from "./assets/pfp.jpg";

const DevelopersInfo = () => {
  return (
    <div className="developers-container">
      <h1 className="title">Meet The Developers</h1>
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-image">
            <img src={apoorv} alt="John" />
          </div>
          <div className="profile-details">
            <h1>
              Hi, I'm <span className="name">Apoorv</span> 👋
            </h1>
            <p>I'm a Software Developer.</p>
            <ul>
              <li>
                <span>☕</span> Lucky to just code
              </li>
              <li>
                <span>🌍</span> From Ghaziabad , India
              </li>
              <li>
                <span>💼</span> Student at Bits Pilani'25
              </li>
              <li>
                <span>📧</span>{" "}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=f20212603@pilani.bits-pilani.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  f20212603@pilani.bits-pilani.ac.in
                </a>
              </li>
            </ul>
            <div className="social-links">
              <a
                href="https://github.com/noobapoo99"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/glyph-neue/64/github.png"
                  alt="github"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/apoorv-nath-tripathi-787848231/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/ios/50/linkedin.png"
                  alt="linkedin"
                />
              </a>
              <a
                href="https://www.instagram.com/apoorvnathtripathi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/ios/500/instagram-new--v1.png"
                  alt="instagram-new--v1"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-image">
            <img src={dhruv} alt="John" />
          </div>
          <div className="profile-details">
            <h1>
              Hi, I'm <span className="name">Dhruv</span> 👋
            </h1>
            <p>I'm a Software Developer.</p>
            <ul>
              <li>
                <span>☕</span> fueled by coffee
              </li>
              <li>
                <span>🌍</span> from Varanasi , India
              </li>
              <li>
                <span>💼</span> Student at Bits Pilani'25
              </li>
              <li>
                <span>📧</span>{" "}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=f20212711@pilani.bits-pilani.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  f20212711@pilani.bits-pilani.ac.in
                </a>
              </li>
            </ul>
            <div className="social-links">
              <a
                href="https://github.com/medhruv27"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/glyph-neue/64/github.png"
                  alt="github"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/dhruv-verma-59659722b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/ios/50/linkedin.png"
                  alt="linkedin"
                />
              </a>
              <a
                href="https://www.instagram.com/me_dhruv._/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/ios/500/instagram-new--v1.png"
                  alt="instagram-new--v1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopersInfo;
