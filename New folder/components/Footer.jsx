// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>InternshipHub</h3>
            <p>Your gateway to amazing internship opportunities.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#" data-page="home">
                  Home
                </a>
              </li>
              <li>
                <a href="#" data-page="search">
                  Search Internships
                </a>
              </li>
              <li>
                <a href="#" data-page="about">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" data-page="contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li>
                <a href="#">Technology</a>
              </li>
              <li>
                <a href="#">Marketing</a>
              </li>
              <li>
                <a href="#">Finance</a>
              </li>
              <li>
                <a href="#">Design</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" target="_blank">
                LinkedIn
              </a>
              <a href="#" target="_blank">
                Twitter
              </a>
              <a href="#" target="_blank">
                Facebook
              </a>
              <a href="#" target="_blank">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 InternshipHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
