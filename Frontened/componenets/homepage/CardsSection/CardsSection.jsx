// src/components/CardsSection.js
import "./cardsSection.scss";

const CardsSection = () => {
  const cardsData = [
    {
      title: "Shoes!",
      description: "If a dog chews shoes whose shoes does he choose?",
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      title: "Bags!",
      description: "Discover a range of stylish bags for every occasion.",
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      title: "Watches!",
      description: "Find the perfect watch that suits your style.",
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      title: "Glasses!",
      description: "Choose from a variety of glasses for a fresh look.",
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
  ];

  return (
    <section className="cards-containers">
      {cardsData.map((card, index) => (
        <div key={index} className="custom-cards bg-light-gray shadow-lg">
          <figure className="card-image-wrappers">
            <img src={card.imgSrc} alt={card.title} className="card-images" />
          </figure>
          <div className="card-contents">
            <h2 className="card-titles text-center font-bold">{card.title}</h2>
            <p className="card-descriptions text-sm text-center">
              {card.description}
            </p>
            <div className="card-actions text-right">
              <button className="btn-primarys">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardsSection;
