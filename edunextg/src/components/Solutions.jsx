import { useState } from "react";
import { solutions } from "../data/homeData";

function Solutions() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  return (
    <section className="solutions" id="services">
      <div className="container">
        <div className="section-heading">
          <span>WHAT WE DO</span>
          <h2>End to End Technology solutions</h2>
        </div>

        <div className="solutions-grid">
          {solutions.map(({ title, description, icon: Icon }, index) => (
            <article
              className={`solution-card ${
                activeCard === index ? "active" : ""
              }`}
              key={title}
              onClick={() => handleCardClick(index)}
            >
              <div className="solution-icon">
                <Icon className="solution-icon-svg" />
              </div>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Solutions;