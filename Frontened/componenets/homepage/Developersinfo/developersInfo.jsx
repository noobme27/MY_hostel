import React, { useState } from "react";
import "./DevelopersInfo.scss";
import apoorv from './assets/20231226_175040.jpg';
import dhruv from './assets/pfp.jpg';

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
          <h1>Hi, I'm <span className="name">Apoorv</span> 👋</h1>
          <p>I'm a Full Stack Developer.</p>
          <ul>
            <li><span>☕</span> fueled by coffee</li>
            <li><span>🌍</span> based in the India</li>
            <li><span>💼</span> Student at Bits Pilani</li>
            <li><span>📧</span> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=f20212603@pilani.bits-pilani.ac.in" target="_blank" rel="noopener noreferrer">f20212603@pilani.bits-pilani.ac.in</a></li>
            </ul>
          <div className="social-links">
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://github.com/noobapoo99" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/apoorv-nath-tripathi-787848231/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> */}
          </div>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-image">
          <img src={dhruv} alt="John" />
        </div>
        <div className="profile-details">
          <h1>Hi, I'm <span className="name">Dhruv</span> 👋</h1>
          <p>I'm a Software Developer.</p>
          <ul>
            <li><span>☕</span> fueled by coffee</li>
            <li><span>🌍</span> based in the India</li>
            <li><span>💼</span> Student at Bits Pilani</li>
            <li><span>📧</span> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=f20212711@pilani.bits-pilani.ac.in" target="_blank" rel="noopener noreferrer">f20212711@pilani.bits-pilani.ac.in</a></li>
            </ul>
          <div className="social-links">
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://github.com/medhruv27" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/dhruv-verma-59659722b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DevelopersInfo;