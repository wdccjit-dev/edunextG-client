import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="container cta-inner">
        <div>
          <h2>
            Let’s Build a
            <br />
            <span>Smarter Institution Together</span>
          </h2>

          <p>
            We bring technology, expertise and commitment together to help you
            create a better learning environment.
          </p>
        </div>

        <Link to="/contact" className="cta-button">
          Contact Us
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default CTA;