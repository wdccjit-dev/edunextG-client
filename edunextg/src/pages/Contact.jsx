import { useEffect, useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiSend,
} from "react-icons/fi";
import heroImage from "../assets/Heroimage1.jpeg";

function Contact() {
  const [settings, setSettings] = useState({
    companyName: "EduNextG",
    email: "admin@edunextg.com",
    phone: "+91 98765 43210",
    address:
        "EDUNEXTG INDIA LLP, AF-333, Rabindra Pally Rd, Talbagan, Prafulla Kanan, Kestopur, Kolkata, West Bengal 700102",
    website: "www.edunextg.com",
    mapLocation:
        "EDUNEXTG INDIA LLP, AF-333, Rabindra Pally Rd, Talbagan, Prafulla Kanan, Kestopur, Kolkata, West Bengal 700102",
    mapUrl:
        "https://www.google.com/maps?q=EDUNEXTG%20INDIA%20LLP%2C%20AF-333%2C%20Rabindra%20Pally%20Rd%2C%20Talbagan%2C%20Prafulla%20Kanan%2C%20Kestopur%2C%20Kolkata%2C%20West%20Bengal%20700102&output=embed",
    });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
            "http://localhost:5000/api/settings/public"
        );
        const data = await response.json();

        if (data.success) {
          setSettings((previous) => ({
            ...previous,
            ...data.settings,
          }));
        }
      } catch (error) {
        console.error("Failed to load contact settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setMessage("Your message has been sent successfully.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setMessage(
        error.message || "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      {/* HERO */}
      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="contact-hero-overlay">
          <div className="container contact-hero-content">
            <p className="contact-hero-label">GET IN TOUCH</p>
            <h1>Contact Us</h1>
            <p>
              Have a question or want to work with us? We would love to hear
              from you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="container">
          <div className="section-heading contact-heading">
            <span>CONTACT US</span>
            <h2>Let's Start a Conversation</h2>
          </div>

          <div className="contact-grid">
            {/* FORM */}
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              <p>
                Fill out the form below and our team will get back to you
                shortly.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-submit-button"
                  disabled={loading}
                >
                  <FiSend />

                  {loading ? "Sending..." : "Send Message"}
                </button>

                {message && (
                  <p className="contact-form-message">{message}</p>
                )}
              </form>
            </div>

            {/* CONTACT INFORMATION */}
            <div className="contact-info-card">
              <h3>Contact Information</h3>

              <p className="contact-info-intro">
                Get in touch with {settings.companyName || "EduNextG"} using
                the information below.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FiMapPin />
                  </div>

                  <div>
                    <h4>Our Address</h4>
                    <p>
                        {settings.address ||
                        "Our office location will be updated soon."}
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FiPhone />
                  </div>

                  <div>
                    <h4>Phone</h4>
                    <p>
                      {settings.phone || "Phone number will be updated soon."}
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FiMail />
                  </div>

                  <div>
                    <h4>Email</h4>
                    <p>
                      {settings.email || "Email address will be updated soon."}
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <FiGlobe />
                  </div>

                  <div>
                    <h4>Website</h4>
                    <p>
                      {settings.website || "Website will be updated soon."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="contact-map-section">
        <div className="container">
          <div className="section-heading contact-heading">
            <span>OUR LOCATION</span>
            <h2>Find Us</h2>
          </div>

          <div className="contact-map">
            {settings.mapUrl ? (
              <iframe
                src={settings.mapUrl}
                title="EduNextG location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="contact-map-placeholder">
                <FiMapPin />
                <h3>Location Coming Soon</h3>
                <p>
                  The office location will be displayed here once it is
                  configured by the administrator.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;