// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-24 w-full">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to InternAdda
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Connecting students with top companies across India. Start your
            journey today and land your dream internship.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-md shadow hover:bg-gray-100 transition"
            >
              Explore Internships
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">1. Sign Up</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create your free account and set up your profile in minutes.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">2. Apply</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse internships and apply to opportunities that match your
              skills.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">3. Get Hired</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Kickstart your career by gaining hands-on experience in top
              companies.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
            Thousands of students have already found their dream internships
            with us. Don’t wait — start today!
          </p>
          <Link
            to="/register"
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-md shadow hover:bg-teal-700 transition"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
