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

function HomePage2() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <>
      <section className="homePage">
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
            <Link to="/update" className="btn btn-primary">
              Select Your Room
            </Link>
          </div>
        </div>
      </section>

      <HeaderSection />
      <CardsSection />

      <TestimonialsSection />
      <HostelMates />
      <AccordionSection />
      <ContactForm />
      <ContactUs />
    </>
  );
}

export default HomePage2;
