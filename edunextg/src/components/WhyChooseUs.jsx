import { whyChooseUs } from "../data/homeData";

function WhyChooseUs() {
  return (
    <section className="why-us" id="clients">
      <div className="container">
        <div className="section-heading">
          <span>WHY CHOOSE US</span>
        </div>

        <div className="why-grid">
          {whyChooseUs.map(({ title, description, image }) => (
            <article className="why-card" key={title}>
              <img src={image} alt={title} />
              <span>{title}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;