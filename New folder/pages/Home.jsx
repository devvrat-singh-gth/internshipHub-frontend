// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div
      id="homePage"
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="hero-content max-w-3xl mx-auto text-center space-y-6">
            <h1 className="hero-title text-5xl font-extrabold">
              Find Your Dream Internship
            </h1>
            <p className="hero-description text-lg">
              Discover amazing opportunities from top companies across India.
              Start your career journey today.
            </p>

            {/* Search Bar */}
            <div className="search-container mt-6">
              <div className="search-wrapper flex max-w-xl mx-auto">
                <input
                  type="text"
                  className="form-control flex-grow rounded-l-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Search for internships, companies, or skills..."
                  id="homeSearchInput"
                />
                <button
                  className="btn btn--primary rounded-r-md bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold"
                  id="homeSearchBtn"
                >
                  Search
                </button>
              </div>
              <div
                className="search-suggestions hidden mt-2 text-left text-sm text-gray-500"
                id="searchSuggestions"
              ></div>
            </div>

            {/* Quick Filters */}
            <div className="quick-filters mt-8 flex justify-center gap-4 flex-wrap">
              {["Technology", "Marketing", "Finance", "Design"].map(
                (category) => (
                  <button
                    key={category}
                    className="filter-chip px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-600 hover:text-white transition"
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

      {/* Stats Section */}
      <section className="stats-section mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-card bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold">1000+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Active Internships
              </p>
            </div>
            <div className="stat-card bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Partner Companies
              </p>
            </div>
            <div className="stat-card bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold">50,000+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Students Placed
              </p>
            </div>
            <div className="stat-card bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold">95%</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Success Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="featured-section mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="section-title text-3xl font-bold mb-6">
            Featured Internships
          </h2>
          <div
            className="internships-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            id="featuredInternships"
          >
            {/* Map InternshipCard components here */}
          </div>
          <div className="section-actions mt-8 text-center">
            <button
              className="btn btn--outline border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded transition"
              id="viewAllBtn"
            >
              View All Internships
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
