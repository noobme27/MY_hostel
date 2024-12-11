// src/components/TestimonialsSection.js
import "./testimonialsSection.scss";

const TestimonialsSection = () => {
  const testimonialsData = [
    {
      name: "Hitansh Tanna",
      text: "Litedin made finding my friends super easy!",
      imgSrc: "./../../../src/assets/tanna.jpeg",
    },
    {
      name: "Vasu Sharma",
      text: "Finally, a way to connect with my hostel mates!",
      imgSrc: "./../../../src/assets/vasu.jpg",
    },
    {
      name: "Kushal Loya",
      text: "The complaint feature is a lifesaver!",
      imgSrc: "./../../../src/assets/loya.jpg",
    },
    {
      name: "Aditya Singh",
      text: "I love the vibrant community here!",
      imgSrc: "./../../../src/assets/muthia.jpeg",
    },
    {
      name: "Saksham Sandhu",
      text: "Finding my roomie was a breeze!",
      imgSrc: "./../../../src/assets/sandhu.jpeg",
    },
    {
      name: "Yashvardhan Singh",
      text: "Best platform for hostel life at BITS!",
      imgSrc: "./../../../src/assets/yash2.jpeg",
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
