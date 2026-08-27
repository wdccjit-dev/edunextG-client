import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import heroImage from "../assets/Heroimage1.jpeg";

function Hero() {
  return (
    <section className="hero">
      <img
        src={heroImage}
        alt="Technology solutions for education"
        className="hero-background"
      />

      <div className="hero-overlay" />

      <button
        className="hero-arrow hero-prev"
        type="button"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="hero-arrow-icon" />
      </button>

      <div className="container hero-content">
        <p className="hero-label">SMART TECHNOLOGY.</p>

        <h1>
          BETTER <span>EDUCATION.</span>
        </h1>

        <p className="hero-description">
          Complete software, hardware and IT solutions
          <br />
          for schools, colleges and institutions.
        </p>

        <a href="#services" className="primary-button">
          Explore Our Services
          <FiArrowRight className="primary-button-icon" />
        </a>
      </div>

      <button
        className="hero-arrow hero-next"
        type="button"
        aria-label="Next slide"
      >
        <FiChevronRight className="hero-arrow-icon" />
      </button>
    </section>
  );
}

export default Hero;