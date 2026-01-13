import "../styles/Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-wrapper container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We're here to help. Reach out to us anytime.
      </p>

      <div className="contact-grid">
        <div className="contact-card">
          <FaPhoneAlt className="contact-icon" />
          <h3>Call Us</h3>
          <p>+91 99xxxxxxxx</p>
        </div>

        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>support@jaldikaam.com</p>
        </div>

        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Office</h3>
          <p>Prayagraj, India</p>
        </div>
      </div>

      <div className="contact-form-wrapper">
        <form className="contact-form">
          <h2>Send us a message</h2>

          <div className="form-row">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
          </div>

          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
