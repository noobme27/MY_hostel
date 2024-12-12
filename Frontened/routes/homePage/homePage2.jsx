import "./homePage2.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HeaderSection from "../../componenets/homepage/headerSection/HeaderSection";
import CardsSection from "../../componenets/homepage/CardsSection/CardsSection";
import TestimonialsSection from "../../componenets/homepage/TestimonialsSection/TestimonialsSection";
import AccordionSection from "../../componenets/homepage/AccordionSection/AccordionSection";
import HostelMates from "../../componenets/homepage/hostelMates/HostelMates";
import ContactForm from "../../componenets/homepage/contactForm/contactForm";
import ContactUs from "../../componenets/homepage/ContactUs/Contact";
import CourseItems from "../../componenets/homepage/CourseItems/CourseItems";
import DevelopersInfo from "../../componenets/homepage/Developersinfo/developersInfo";

function HomePage2() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <>
      <section className="homePage">
        <video autoPlay muted loop className="background-video">
          <source src="./../../src/assets/pilani_bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="content-container">
          <h1 className="title">Welcome Home</h1>
          <p className="subtitle">
            Your ultimate hostel community at BITS Pilani awaits!
          </p>
          <div className="button-container">
            <Link to="/searchParty" className="btn btn-primary">
              Explore Now
            </Link>
            <Link to="/profile/update" className="btn btn-primary">
              Select Your Room
            </Link>
          </div>
        </div>
      </section>
      <HostelMates />
      <div id="join-us">
        <HeaderSection />
        <CourseItems />
      </div>

      <TestimonialsSection />
      <AccordionSection />
      {/* <ContactForm /> */}
      <div id="develops-info">
        <DevelopersInfo />
      </div>
      <div id="contact-us">
        <ContactUs />
      </div>
    </>
  );
}

export default HomePage2;
