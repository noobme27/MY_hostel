// src/components/TestimonialsSection.js
import "./testimonialsSection.scss";

// Import images directly
import img1 from "./assets/tanna.jpeg";
import img2 from "./assets/vasu.jpg";
import img3 from "./assets/loya.jpg";
import img4 from "./assets/muthia.jpeg";
import img5 from "./assets/sandhu.jpeg";
import img6 from "./assets/yash2.jpeg";

const TestimonialsSection = () => {
  const testimonialsData = [
    {
      name: "Hitansh Tanna",
      text: "Litedin made finding my friends super easy!",
      imgSrc: img1,
    },
    {
      name: "Vasu Sharma",
      text: "Finally, a way to connect with my hostel mates!",
      imgSrc: img2,
    },
    {
      name: "Kushal Loya",
      text: "The complaint feature is a lifesaver!",
      imgSrc: img3,
    },
    {
      name: "Aditya Singh",
      text: "I love the vibrant community here!",
      imgSrc: img4,
    },
    {
      name: "Saksham Sandhu",
      text: "Finding my roomie was a breeze!",
      imgSrc: img5,
    },
    {
      name: "Yashvardhan Singh",
      text: "Best platform for hostel life at BITS!",
      imgSrc: img6,
    },
  ];

  return (
    <section className="testimonials-section">
      <h3 className="section-title">Buzz</h3>
      <div className="rows">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card col-12 col-md-6 col-lg-4"
          >
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="img-wrapper">
              <img src={testimonial.imgSrc} alt={testimonial.name} />
            </div>
            <h5 className="testimonial-name">
              <b>{testimonial.name}</b>
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
