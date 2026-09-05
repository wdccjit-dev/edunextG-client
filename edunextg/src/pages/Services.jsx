import {
  FiMonitor,
  FiCode,
  FiServer,
  FiWifi,
  FiTool,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import heroImage from "../assets/Heroimage1.jpeg";

function Services() {
  const services = [
    {
      icon: FiMonitor,
      title: "IT Infrastructure",
      description:
        "Complete IT infrastructure solutions designed for reliable and efficient institutional operations.",
    },
    {
      icon: FiCode,
      title: "Software Solutions",
      description:
        "Custom software and web applications built around your institution's specific requirements.",
    },
    {
      icon: FiServer,
      title: "School Management",
      description:
        "Digital solutions that simplify administration, academic management, and daily operations.",
    },
    {
      icon: FiWifi,
      title: "Smart Classroom",
      description:
        "Modern classroom technology that creates an engaging and connected learning environment.",
    },
    {
      icon: FiTool,
      title: "Technical Support",
      description:
        "Reliable technical assistance and maintenance to keep your systems running smoothly.",
    },
    {
      icon: FiShield,
      title: "Security Solutions",
      description:
        "Technology and security solutions designed to protect your systems and institutional data.",
    },
  ];

  return (
    <div className="services-page">

      <section
        className="services-page-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="services-page-hero-overlay">
          <div className="container services-page-hero-content">
            <span>SERVICES</span>
            <h1>Technology Solutions for Modern Education</h1>
            <p>
              Practical technology solutions designed for real-world
              educational requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="services-page-intro">
        <div className="container">
          <div className="services-page-heading">
            <span>WHAT WE DO</span>
            <h2>Our Expertise</h2>
            <p>
              We provide dependable technology solutions that help educational
              institutions operate efficiently and grow with confidence.
            </p>
          </div>

          <div className="services-page-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="services-page-card" key={service.title}>
                  <div className="services-page-icon">
                    <Icon />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Link to="/contact" className="services-page-link">
                    Learn More
                    <FiArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-page-cta">
        <div className="container services-page-cta-inner">
          <div>
            <span>NEED A SOLUTION?</span>
            <h2>Let's Build the Right Technology for Your Institution</h2>
            <p>
              Tell us about your requirements and our team can help you find
              the right solution.
            </p>
          </div>

          <Link to="/contact" className="services-page-cta-button">
            Contact Us
            <FiArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Services;