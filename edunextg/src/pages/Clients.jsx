import {
  FiBriefcase,
  FiBook,
  FiUsers,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import heroImage from "../assets/Heroimage1.jpeg";

function Clients() {
  const clientTypes = [
    {
      icon: FiBook,
      title: "Schools",
      description:
        "Technology solutions that help schools manage academics, administration, and communication.",
    },
    {
      icon: FiBriefcase,
      title: "Colleges",
      description:
        "Scalable digital solutions designed to support growing college operations.",
    },
    {
      icon: FiUsers,
      title: "Educational Institutions",
      description:
        "Technology systems tailored to the operational needs of educational organizations.",
    },
    {
      icon: FiAward,
      title: "Organizations",
      description:
        "Reliable IT and digital solutions for organizations looking to improve their technology infrastructure.",
    },
  ];

  return (
    <div className="clients-page">

      <section
        className="clients-page-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="clients-page-hero-overlay">
          <div className="container clients-page-hero-content">
            <span>OUR CLIENTS</span>
            <h1>Supporting Institutions Through Technology</h1>
            <p>
              We work with educational institutions and organizations to
              deliver practical and reliable technology solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="clients-page-section">
        <div className="container">

          <div className="clients-page-heading">
            <span>WHO WE SERVE</span>
            <h2>Our Clients</h2>
            <p>
              Our solutions are designed to support organizations with
              different requirements, sizes, and technology needs.
            </p>
          </div>

          <div className="clients-page-grid">
            {clientTypes.map((client) => {
              const Icon = client.icon;

              return (
                <article className="clients-page-card" key={client.title}>
                  <div className="clients-page-icon">
                    <Icon />
                  </div>

                  <h3>{client.title}</h3>

                  <p>{client.description}</p>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      <section className="clients-page-cta">
        <div className="container clients-page-cta-inner">
          <div>
            <span>WORK WITH US</span>
            <h2>Let's Create Better Technology Together</h2>
            <p>
              Have a technology requirement? We would be happy to discuss it
              with you.
            </p>
          </div>

          <Link to="/contact" className="clients-page-cta-button">
            Contact Us
            <FiArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Clients;