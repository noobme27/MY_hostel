import React, { useState } from "react";
import "./ContactForm.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formAlert, setFormAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormAlert("Thanks for filling out the form!");
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        {/* Section Title and Subtitle */}
        <div className="content-head">
          <h3 className="mbr-section-title">
            <b>Get in Touch!</b>
          </h3>
        </div>

        {/* Form */}
        <div className="rows justify-content-center">
          <div className="col-lg-8 mx-auto">
            <form onSubmit={handleSubmit} className="form-with-styler">
              {formAlert && (
                <div className="alert alert-success">{formAlert}</div>
              )}
              <div className="rows dragArea">
                <div className="col-md-6 col-sm-12 form-group mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 col-sm-12 form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-12 form-group mb-3">
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-12 align-center">
                  <button type="submit" className="btn btn-primary">
                    Send It!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
