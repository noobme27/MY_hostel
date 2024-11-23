import React from "react";
import { Link } from "react-router-dom";
import "./CourseItems.scss"; // Import the SCSS file

const CourseItems = () => {
  return (
    <div className="items">
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {/* Course Items as before */}
          <div className="ag-courses_item">
            <Link to="/searchParty" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                <div className="ag-courses-item_content">Explore</div>
              </div>
            </Link>
          </div>

          <div className="ag-courses_item">
            <Link to="/hostel" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">View Your Bhawans</div>
            </Link>
          </div>

          <div className="ag-courses_item">
            <Link to="/complaint" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Raise a Complain</div>
            </Link>
          </div>

          <div className="ag-courses_item">
            <Link to="/search" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Search Community</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItems;
