// src/components/AccordionSection.js
import { useState } from "react";
import "./accordionSection.scss";

const AccordionSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Litedin?",
      answer: "Litedin is your exclusive hostel community platform!",
    },
    {
      question: "How to find my friends?",
      answer: "Hover over their room on the map!",
    },
    {
      question: "Can I make complaints?",
      answer: "Absolutely! We take complaints seriously.",
    },
    {
      question: "Is it only for BITS Pilani?",
      answer: "Yes, it’s a BITS Pilani exclusive!",
    },
    {
      question: "How to contact support?",
      answer: "Reach out via the contact form!",
    },
  ];

  return (
    <section className="accordion-section">
      <div className="accordion-container">
        <h4 className="accordion-title">Frequently Asked Questions</h4>
        <h5 className="accordion-subtitle">FAQ</h5>
        {faqData.map((item, index) => (
          <div key={index} className="accordion-card">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <h6 className="panel-title">{item.question}</h6>
              <span className={`icon ${activeIndex === index ? "rotate" : ""}`}>
                &#9660;
              </span>
            </div>
            <div
              className={`accordion-body ${
                activeIndex === index ? "show" : ""
              }`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccordionSection;
