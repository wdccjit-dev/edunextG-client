import {
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiEye,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import heroImage from "../assets/Heroimage1.jpeg";

function About() {
  return (
    <div className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="about-hero-overlay">
          <div className="container about-hero-content">
            <span>ABOUT EDUNEXTG</span>

            <h1>
              SMART TECHNOLOGY.
              <br />
              BETTER EDUCATION
            </h1>

            <p>
              Complete software, hardware and IT solutions
              for schools, colleges and educational institutions.
            </p>
          </div>
        </div>
      </section>


      {/* =====================================================
          WHO WE ARE
      ===================================================== */}
      <section className="about-intro">
        <div className="container about-intro-grid">

          <div className="about-intro-content">

            <span className="about-section-label">
              WHO WE ARE
            </span>

            <h2>
              Technology Designed for
              <span> Modern Education</span>
            </h2>

            <p>
              EduNextG provides technology solutions designed
              specifically for schools, colleges, educational
              institutions, and other organizations.
            </p>

            <p>
              From education management systems and websites to
              smart classroom solutions and IT infrastructure,
              our goal is to make technology simple, reliable,
              and useful.
            </p>

            <Link
              to="/contact"
              className="about-primary-button"
            >
              Talk to Us
              <FiArrowRight />
            </Link>

          </div>


          <div className="about-intro-card">

            <div className="about-card-icon">
              <FiUsers />
            </div>

            <h3>Technology With Purpose</h3>

            <p>
              We focus on understanding real institutional
              requirements before developing solutions. This
              helps us create systems that are practical,
              scalable, and easy to use.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          MISSION & VISION
      ===================================================== */}
      <section className="about-mission">
        <div className="container">

          <div className="about-section-heading">

            <span>OUR FOUNDATION</span>

            <h2>What Drives Us</h2>

            <p>
              Our approach is built around technology, people,
              and long-term partnerships.
            </p>

          </div>


          <div className="about-mission-grid">

            {/* Mission */}
            <article className="about-mission-card">

              <div className="about-mission-icon">
                <FiTarget />
              </div>

              <div>
                <h3>Our Mission</h3>

                <p>
                  To provide dependable and accessible technology
                  solutions that help educational institutions
                  improve their daily operations and deliver
                  better experiences.
                </p>
              </div>

            </article>


            {/* Vision */}
            <article className="about-mission-card">

              <div className="about-mission-icon">
                <FiEye />
              </div>

              <div>
                <h3>Our Vision</h3>

                <p>
                  To create a connected education ecosystem where
                  technology enables institutions to work smarter,
                  communicate better, and prepare for the future.
                </p>
              </div>

            </article>

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY EDUNEXTG
      ===================================================== */}
      <section className="about-why">
        <div className="container">

          <div className="about-section-heading">

            <span>WHY EDUNEXTG</span>

            <h2>Built Around Your Needs</h2>

            <p>
              Practical technology solutions designed for
              real-world educational requirements.
            </p>

          </div>


          <div className="about-feature-grid">

            <article className="about-feature-card">
              <FiCheckCircle />

              <h3>Reliable Solutions</h3>

              <p>
                Solutions designed with reliability and
                long-term usability in mind.
              </p>
            </article>


            <article className="about-feature-card">
              <FiCheckCircle />

              <h3>Education Focused</h3>

              <p>
                Technology created around the practical
                requirements of educational institutions.
              </p>
            </article>


            <article className="about-feature-card">
              <FiCheckCircle />

              <h3>Scalable Technology</h3>

              <p>
                Systems that can grow alongside your
                institution and its changing requirements.
              </p>
            </article>


            <article className="about-feature-card">
              <FiCheckCircle />

              <h3>Long-Term Support</h3>

              <p>
                We aim to build lasting relationships with
                the institutions and organizations we serve.
              </p>
            </article>

          </div>

        </div>
      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="about-cta">

        <div className="container about-cta-inner">

          <div>

            <span>LET'S WORK TOGETHER</span>

            <h2>
              Ready to Transform
              <br />
              Your Institution?
            </h2>

            <p>
              Let's discuss how EduNextG can help your
              organization use technology more effectively.
            </p>

          </div>


          <Link
            to="/contact"
            className="about-cta-button"
          >
            Contact Us
            <FiArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;