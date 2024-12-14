import { useState } from "react";
import "./hostelMates.scss";

// Import images directly
import img1 from "./assets/dopa.jpeg";
import img2 from "./assets/radhika.jpeg";
import img3 from "./assets/raghav.jpeg";
import img4 from "./assets/bhanu.jpeg";

const HostelMates = () => {
  const [cards, setCards] = useState([
    {
      name: "Tanay Gupta",
      subtitle: "Chemical",
      description: "Deutsche Bank",
      image: img1,
    },
    {
      name: "Radhika Aggarwal",
      subtitle: "Chemical",
      description: "MBB Labs",
      image: img2,
    },
    {
      name: "Raghav Sharma",
      subtitle: "Mechanical Engineering",
      description: "Biz TechnoWorks",
      image: img3,
    },
    {
      name: "Bhanu Pratap",
      subtitle: "Civil Engineering",
      description: "Biz TechnoWorks",
      image: img4,
    },
  ]);

  return (
    <section className="people03 mbr-parallax-background">
      <div className="container-fluid">
        <div className="content-head text-center">
          <h4 className="mbr-section-title mb-0">
            <b>Meet Your Hostel Mates</b>
          </h4>
          <h5 className="mbr-section-subtitle mt-4">
            Add your own card to the collection!
          </h5>
        </div>

        <div className="row flex-nowrap overflow-auto card-row">
          {cards.map((card, index) => (
            <div className="features-image col-lg-3" key={index}>
              <div className="item-wrapper">
                <div className="item-img mb-3">
                  <img src={card.image} alt={`${card.name}'s avatar`} />
                </div>
                <div className="item-content">
                  <h5 className="item-title">
                    <b>{card.name}</b>
                  </h5>
                  <h6 className="item-subtitle mb-3">{card.subtitle}</h6>
                  <p className="mbr-text mt-3">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostelMates;
