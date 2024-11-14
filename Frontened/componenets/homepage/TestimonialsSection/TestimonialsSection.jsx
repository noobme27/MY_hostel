// src/components/TestimonialsSection.js
import "./testimonialsSection.scss";

const TestimonialsSection = () => {
  const testimonialsData = [
    {
      name: "Sneha Patel",
      text: "Litedin made finding my friends super easy!",
      imgSrc:
        "https://r.mobirisesite.com/874700/assets/images/photo-1692558588242-57cec1e32bba.jpeg",
    },
    {
      name: "Karan Mehta",
      text: "Finally, a way to connect with my hostel mates!",
      imgSrc:
        "https://r.mobirisesite.com/874700/assets/images/photo-1497485692312-a26e1cc30f1d.jpeg",
    },
    {
      name: "Riya Singh",
      text: "The complaint feature is a lifesaver!",
      imgSrc:
        "https://r.mobirisesite.com/874700/assets/images/photo-1676385901160-a86dc9ccdfe1.jpeg",
    },
    {
      name: "Amit Kumar",
      text: "I love the vibrant community here!",
      imgSrc:
        "https://r.mobirisesite.com/874700/assets/images/photo-1509988892867-8bf3ee9e3afa.jpeg",
    },
    {
      name: "Neha Joshi",
      text: "Finding my roomie was a breeze!",
      imgSrc:
        "https://r.mobirisesite.com/874700/assets/images/photo-1677520338280-664ae23816eb.jpeg",
    },
    {
      name: "Raj Verma",
      text: "Best platform for hostel life at BITS!",
      imgSrc:
        "https://r.mobirisesite.com/874700/assets/images/photo-1586185018558-ea8f4b4c514f.jpeg",
    },
  ];

  return (
    <section className="testimonials-section">
      <h3 className="section-title">Buzz</h3>
      <div className="row">
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
