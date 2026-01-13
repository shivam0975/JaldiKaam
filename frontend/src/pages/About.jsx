import "../styles/About.css";
import { FaTruck, FaTools, FaTags, FaHeadset } from "react-icons/fa";

export default function About() {
  return (
    <section className="about container">
      <div className="about-container">

        <h2>About JaldiKaam</h2>
        <p className="about-intro">
          JaldiKaam is a modern service platform that seamlessly connects users with verified local professionals
          across multiple categories — from home services to personal care and professional support.
        </p>

        <div className="about-content">
          
          <div className="about-card">
            <h4>For Customers</h4>
            <p>
              Discover reliable services in one place. Whether it’s fixing a leak, booking a fitness trainer,
              or consulting a professional, JaldiKaam ensures quality, convenience, and peace of mind.
            </p>
          </div>

          <div className="about-card">
            <h4>For Service Providers</h4>
            <p>
              Join a growing platform built to empower professionals. Create your profile, receive leads,
              manage bookings, and grow your business with ease.
            </p>
          </div>

          <div className="about-card">
            <h4>What We Offer</h4>
            <p>
              Home Services, Personal Services, and Professional Services — all accessible through one platform,
              designed for efficiency and reliability.
            </p>
          </div>

        </div>

        <div className="about-quote">
          <q>
            Connecting people to skilled professionals with trust, speed, and simplicity.
          </q>
        </div>

        <div className="features-wrapper">
      <h1 className="features-title">
        Why JaldiKaam is the best place for Services
      </h1>

      <div className="features-grid">
        
        <div className="feature-card">
          <FaTools className="icon-about" />
          <h3>Expert installation.<br />On your schedule.</h3>
          <p>Pick a date & time that works for you.</p>
        </div>

        <div className="feature-card">
          <FaTags className="icon-about" />
          <h3>Best offers & easy EMI options</h3>
          <p>Multiple payment options. Pick what suits you.</p>
        </div>

        <div className="feature-card">
          <FaHeadset className="icon-about" />
          <h3>24×7 customer support</h3>
          <p>If you ever face an issue, help is just a tap away.</p>
        </div>
      </div>
    </div>

      </div>
    </section>
  );
}
