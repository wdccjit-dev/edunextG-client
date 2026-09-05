import { FiArrowRight } from "react-icons/fi";
import { coreServices } from "../data/homeData";
import { Link } from "react-router-dom";

function CoreServices() {
  return (
    <section className="core-services" id="services">
      <div className="container">
        <div className="section-heading section-heading-light">
          <span>FEATURED SERVICES</span>
          <h2>Our Core Services</h2>
        </div>

        <div className="services-grid">
          {coreServices.map(({ title, description, icon: Icon }) => (
            <article className="service-card" key={title}>
              <Icon className="service-icon" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <Link to="/services" className="primary-button services-button">
          View All Services
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default CoreServices;