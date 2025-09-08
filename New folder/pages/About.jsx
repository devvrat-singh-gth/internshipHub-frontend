import React from "react";

const About = () => {
  return (
    <div
      className="about-container"
      style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        About Internship Hub
      </h1>

      <p
        style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "2rem" }}
      >
        Internship Hub is a platform built to bridge the gap between ambitious
        students and top companies across India. Our mission is to empower
        students with real-world experiences by providing access to a wide range
        of high-quality internship opportunities.
      </p>

      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Why Internship Hub?
      </h2>
      <ul
        style={{
          lineHeight: "1.8",
          fontSize: "1.05rem",
          paddingLeft: "1.2rem",
        }}
      >
        <li>🌟 1000+ active internship listings from verified companies</li>
        <li>🏢 500+ industry-leading partner organizations</li>
        <li>🎓 50,000+ students placed in meaningful internships</li>
        <li>🚀 95% success rate in matching students with the right role</li>
      </ul>

      <h2
        style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}
      >
        Our Vision
      </h2>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
        We believe internships are not just a checkbox — they’re the launchpad
        for a student’s professional journey. By fostering strong connections
        between academia and industry, we aim to create a future where every
        student has the opportunity to gain practical experience and thrive in
        their chosen field.
      </p>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Ready to start your journey?
        </p>
        <a href="/internships">
          <button
            style={{
              padding: "0.7rem 1.5rem",
              backgroundColor: "#006d77",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              marginTop: "1rem",
            }}
          >
            View Internships
          </button>
        </a>
      </div>
    </div>
  );
};

export default About;
