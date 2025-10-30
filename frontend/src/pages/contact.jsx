import React, { useRef } from "react";
import "./contact.css";

const ContactPage = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just alert form submission
    alert("Thank you! Your message has been sent.");
    formRef.current.reset();
  };

  return (
    <section className="contact-section">
      <h1 className="contact-heading">Get in Touch with PrepMate AI</h1>
      <p className="contact-subtitle">
        Have questions or feedback? Reach out to us anytime.
      </p>

      <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <input type="text" placeholder="Subject" />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" className="contact-btn">Send Message</button>
      </form>

      <div className="contact-details">
        <p>Email: <a href="khushishrivas82@gmail.com">khushishrivas82@gmail.com</a></p>
        <p>Instagram: <a href="https://instagram.com/prepmateai">@PrepMateAI</a></p>
      </div>
    </section>
  );
};

export default ContactPage;
