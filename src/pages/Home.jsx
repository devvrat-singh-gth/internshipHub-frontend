// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Internship
          </h1>
          <p className="text-lg mb-8">
            Discover amazing opportunities from top companies across India.
            Start your career journey today.
          </p>
          <Link
            to="/internships"
            className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-md shadow hover:bg-gray-100 transition"
          >
            Search Internships
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            1000+
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Active Internships
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            500+
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Partner Companies
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            50,000+
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Students Placed
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            95%
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Success Rate</p>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Internships
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Software Developer Intern
            </h3>
            <p className="text-gray-600 dark:text-gray-400">ABC Tech Pvt Ltd</p>
            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
              View Details
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Marketing Intern
            </h3>
            <p className="text-gray-600 dark:text-gray-400">XYZ Solutions</p>
            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
              View Details
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              UI/UX Design Intern
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Creative Studio</p>
            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
              View Details
            </button>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/internships"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
          >
            View All Internships
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
