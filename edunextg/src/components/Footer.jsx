import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { socialLinks } from "../data/homeData";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-company">
          <h3>EduNextG India LLP</h3>

          <p>
            EduNextG is Technology driven Company catering to the specific
            requirements of Educational Institutions across India.
            Founded in 2018.
          </p>

          <div className="social-links">
            {socialLinks.map(({ name, image, url }) => (
              <a href={url} aria-label={name} key={name}>
                <img src={image} alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Link</h3>

          <a href="/">-Home</a>
          <a href="#privacy">-Privacy Policy</a>
          <a href="#terms">-Terms of Services</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt />
            AF-333, Rajarampally, Talbagan, P.O Prafulia Kanan,
            Kolkata-700101
          </p>

          <p>
            <FaEnvelope />
            erp.edunextg@gmail.com
          </p>

          <p>
            <FaPhone />
            +91 9088399919 / 033-5600551
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        ©2022 All Rights Reserved. EduNextG India LLP
      </div>
    </footer>
  );
}

export default Footer;