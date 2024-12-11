import React from "react";
import "./contact.scss";

const ContactUs = () => {
  return (
    <section className="contacts01">
      <div className="mbr-fallback-image disabled" />

      {/* Overlay if necessary */}
      <div
        className="mbr-overlay"
        style={{ opacity: 0.5, backgroundColor: "#ffffff" }}
      />

      {/* Container for content */}
      <div className="container">
        <div className="row justify-content-center">
          {/* Section Title and Subtitle */}
          <div className="col-12 content-head">
            <div className="mbr-section-head mb-5">
              <h3 className="mbr-section-title align-center mb-0">
                <b>Contact Us</b>
              </h3>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="card-row">
          <div className="card-item">
            <div className="item-wrapper">
              <div className="text-wrapper">
                <h6 className="card-title mb-3">
                  <b>Phone</b>
                </h6>
                <p>
                  <a href="tel:+91-123-456-7890" className="text-black mb-3">
                    +91-9205102348/+91-9455506704
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="card-item">
            <div className="item-wrapper">
              <div className="text-wrapper">
                <h6 className="card-title mb-3">
                  <b>Email</b>
                </h6>
                <p>
                  <a href="mailto:support@litedin.com" className="text-black">
                    support@litedin.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="card-item">
            <div className="item-wrapper">
              <div className="text-wrapper">
                <h6 className="card-title mb-3">
                  <b>Address</b>
                </h6>
                <p>BITS Pilani, Rajasthan, India</p>
              </div>
            </div>
          </div>

          <div className="card-item">
            <div className="item-wrapper">
              <div className="text-wrapper">
                <h6 className="card-title mb-3">
                  <b>Support Hours</b>
                </h6>
                <p>Every day between 5-7pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
