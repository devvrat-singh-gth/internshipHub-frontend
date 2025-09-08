// src/pages/Landing.jsx
import React from "react";

const Landing = () => {
  return (
    <div id="homePage" className="page active">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Dream Internship</h1>
            <p className="hero-description">
              Discover amazing opportunities from top companies across India.
              Start your career journey today.
            </p>

            <div className="search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search for internships, companies, or skills..."
                  id="homeSearchInput"
                />
                <button
                  className="btn btn--primary search-btn"
                  id="homeSearchBtn"
                >
                  <span>Search</span>
                </button>
              </div>
              <div
                className="search-suggestions"
                id="searchSuggestions"
                style={{ display: "none" }} // Optional: Replace `hidden` class with inline style
              ></div>
            </div>

            <div className="quick-filters">
              {["Technology", "Marketing", "Finance", "Design"].map(
                (category) => (
                  <button
                    className="filter-chip"
                    key={category}
                    data-category={category}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>1000+</h3>
              <p>Active Internships</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Partner Companies</p>
            </div>
            <div className="stat-card">
              <h3>50,000+</h3>
              <p>Students Placed</p>
            </div>
            <div className="stat-card">
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Internships</h2>
          <div className="internships-grid" id="featuredInternships">
            {/* TODO: Render featured internships here */}
          </div>
          <div className="section-actions">
            <button className="btn btn--outline" id="viewAllBtn">
              View All Internships
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
