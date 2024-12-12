// src/components/HeaderSection.js
import "./headerSections.scss";
import { Link } from "react-router-dom";

const HeaderSection = () => {
  return (
    <section className="header09" data-bs-version="5.1">
      <div className="mbr-overlay"></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8">
            <h1 className="mbr-section-title">
              <b>Join the Litedin Community Today!</b>
            </h1>
            <p className="mbr-text">
              Connect, complain, and conquer your hostel life!
            </p>
            <div className="mbr-section-btn">
              <Link to="/profile/update" className="btn btn-primary">
                Get Started
              </Link>
              <a
                href="https://github.com/noobme27/MY_hostel"
                className="btn btn-secondary"
                target="_blank" // Optional: opens the link in a new tab
                rel="noopener noreferrer" // Recommended for security when using target="_blank"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
