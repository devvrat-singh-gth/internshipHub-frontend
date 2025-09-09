// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CircleStat = ({ label, target }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.ceil(target / 100);
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(start);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="gray"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="teal"
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={
              2 * Math.PI * 50 - (value / target) * 2 * Math.PI * 50
            }
            fill="transparent"
            className="transition-all duration-300"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-bold text-lg text-gray-800 dark:text-gray-100">
          {value}+
        </span>
      </div>
      <p className="mt-3 text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
};

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

      {/* Stats Section with Circle Animation */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <CircleStat label="Active Internships" target={1000} />
        <CircleStat label="Partner Companies" target={500} />
        <CircleStat label="Students Placed" target={50000} />
        <CircleStat label="Success Rate (%)" target={95} />
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

      {/* Courses Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1581090700227-4c4f50d6ca9e?auto=format&fit=crop&w=800&q=80"
                alt="Full Stack"
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">
                Full-Stack Web Development
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn MERN stack development from scratch.
              </p>
              <Link
                to="/courses"
                className="mt-4 inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Explore Courses
              </Link>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                alt="Data Science"
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Data Science & AI</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Master ML, AI, and advanced analytics.
              </p>
              <Link
                to="/courses"
                className="mt-4 inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Explore Courses
              </Link>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="UI UX Design"
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create stunning interfaces with real-world projects.
              </p>
              <Link
                to="/courses"
                className="mt-4 inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Scholarships You Can Apply For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80"
                alt="Google Scholarship"
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Google Scholarship</h3>
              <p className="text-gray-600 dark:text-gray-400">
                For CS undergrads excelling in academics.
              </p>
              <Link
                to="/scholarships"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                View Scholarships
              </Link>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Microsoft Research"
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">
                Microsoft Research Fellowship
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Graduate students focusing on AI/ML.
              </p>
              <Link
                to="/scholarships"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                View Scholarships
              </Link>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1590402494682-4072c1a9a91e?auto=format&fit=crop&w=800&q=80"
                alt="Women in Tech"
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">
                Women in Tech Scholarship
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Supporting female students in STEM fields.
              </p>
              <Link
                to="/scholarships"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                View Scholarships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
