import {
  FiBookOpen,
  FiMonitor,
  FiUsers,
  FiBarChart2,
  FiDatabase,
  FiCloud,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import heroImage from "../assets/Heroimage1.jpeg";

function Products() {
  const products = [
    {
      icon: FiBookOpen,
      title: "Education Management System",
      description:
        "A centralized platform to manage academic and administrative activities efficiently.",
    },
    {
      icon: FiMonitor,
      title: "Institutional Website",
      description:
        "Professional and responsive websites designed for schools, colleges, and institutions.",
    },
    {
      icon: FiUsers,
      title: "Student Management",
      description:
        "Organize student information, records, and institutional workflows in one place.",
    },
    {
      icon: FiBarChart2,
      title: "Reports & Analytics",
      description:
        "Useful reports and insights that help institutions make informed decisions.",
    },
    {
      icon: FiDatabase,
      title: "Digital Data Solutions",
      description:
        "Structured digital systems for managing institutional information securely.",
    },
    {
      icon: FiCloud,
      title: "Cloud Solutions",
      description:
        "Flexible cloud-based solutions designed to provide accessibility and scalability.",
    },
  ];

  return (
    <div className="products-page">

      <section
        className="products-page-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="products-page-hero-overlay">
          <div className="container products-page-hero-content">
            <span>OUR PRODUCTS</span>
            <h1>Technology Products Built for Education</h1>
            <p>
              Digital products designed to simplify institutional management
              and improve everyday operations.
            </p>
          </div>
        </div>
      </section>

      <section className="products-page-section">
        <div className="container">

          <div className="products-page-heading">
            <span>OUR SOLUTIONS</span>
            <h2>Products Designed for Institutions</h2>
            <p>
              Explore our range of technology products created to address
              practical educational requirements.
            </p>
          </div>

          <div className="products-page-grid">
            {products.map((product) => {
              const Icon = product.icon;

              return (
                <article className="products-page-card" key={product.title}>
                  <div className="products-page-icon">
                    <Icon />
                  </div>

                  <h3>{product.title}</h3>

                  <p>{product.description}</p>

                  <Link to="/contact" className="products-page-link">
                    Enquire Now
                    <FiArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      <section className="products-page-cta">
        <div className="container products-page-cta-inner">
          <div>
            <span>HAVE A REQUIREMENT?</span>
            <h2>Find the Right Product for Your Institution</h2>
            <p>
              Contact our team to discuss your requirements.
            </p>
          </div>

          <Link to="/contact" className="products-page-cta-button">
            Get in Touch
            <FiArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Products;