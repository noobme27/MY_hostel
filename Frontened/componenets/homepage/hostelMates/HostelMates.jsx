import { useState } from "react";
import "./hostelMates.scss";

const HostelMates = () => {
  const [cards, setCards] = useState([
    {
      name: "Rahul Sharma",
      subtitle: "Computer Science",
      description: "Solutions",
      image:
        "https://r.mobirisesite.com/874700/assets/images/photo-1692558588242-57cec1e32bba.jpeg",
    },
    {
      name: "Ananya Gupta",
      subtitle: "Electrical Engineering",
      description: "Sphere Innovations",
      image:
        "https://r.mobirisesite.com/874700/assets/images/photo-1497485692312-a26e1cc30f1d.jpeg",
    },
    {
      name: "Vikram Singh",
      subtitle: "Mechanical Engineering",
      description: "Biz TechnoWorks",
      image:
        "https://r.mobirisesite.com/874700/assets/images/photo-1676385901160-a86dc9ccdfe1.jpeg",
    },
    {
      name: "Riya Verma",
      subtitle: "Civil Engineering",
      description: "Biz TechnoWorks",
      image:
        "https://r.mobirisesite.com/874700/assets/images/photo-1509988892867-8bf3ee9e3afa.jpeg",
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
