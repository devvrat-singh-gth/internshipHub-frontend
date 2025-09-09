// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// Circle percentage animation
const CircleStat = ({ label, target, trigger }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setValue(0);
      return;
    }

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
  }, [target, trigger]);

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
  const statsRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Internship
            </h1>
            <p className="text-lg mb-6">
              Explore internships, recommended courses, scholarships, and
              special opportunities like{" "}
              <span className="font-semibold">PM Internships</span>. Start your
              career journey today with InternshipHub.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/internships"
                className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-md shadow hover:bg-gray-100 transition"
              >
                Explore Internships
              </Link>
              <Link
                to="/courses"
                className="px-6 py-3 bg-teal-700 text-white font-semibold rounded-md shadow hover:bg-teal-800 transition hidden sm:inline-block"
              >
                Explore Courses
              </Link>
              <Link
                to="/scholarships"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition hidden md:inline-block"
              >
                Scholarships
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Internship"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <CircleStat label="Active Internships" target={1000} trigger={inView} />
        <CircleStat label="Partner Companies" target={500} trigger={inView} />
        <CircleStat label="Students Placed" target={50000} trigger={inView} />
        <CircleStat label="Success Rate (%)" target={95} trigger={inView} />
      </section>

      {/* Featured Internships */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Internships
        </h2>
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {[
            {
              title: "Software Developer Intern",
              desc: "Work with cutting-edge tech stacks.",
              img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Marketing Intern",
              desc: "Learn digital campaigns & branding.",
              img: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "UI/UX Design Intern",
              desc: "Contribute to real-world product design.",
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            },
          ].map((intern, i) => (
            <div
              key={i}
              className="min-w-[280px] sm:min-w-[350px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <img
                src={intern.img}
                alt={intern.title}
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{intern.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{intern.desc}</p>
              <p className="mt-auto text-base font-semibold text-teal-600 cursor-pointer hover:underline">
                Look More →
              </p>
            </div>
          ))}
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
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
            {[
              {
                title: "Full-Stack Web Development",
                desc: "Learn MERN stack development from scratch.",
                img: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Data Science & AI",
                desc: "Master ML, AI, and advanced analytics.",
                img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "UI/UX Design",
                desc: "Create stunning interfaces with real-world projects.",
                img: "https://images.unsplash.com/photo-1581291518835-938a62a8b490?auto=format&fit=crop&w=800&q=80",
              },
            ].map((course, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[350px] p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <img
                  src={course.img}
                  alt={course.title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {course.desc}
                </p>
                <p className="mt-auto text-base font-semibold text-teal-600 cursor-pointer hover:underline">
                  Look More →
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-md shadow hover:bg-teal-700 transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Scholarships You Can Apply For
          </h2>
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
            {[
              {
                title: "Google Scholarship",
                desc: "For CS undergrads excelling in academics.",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Microsoft Research Fellowship",
                desc: "Graduate students focusing on AI/ML.",
                img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Women in Tech Scholarship",
                desc: "Supporting female students in STEM fields.",
                img: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=800&q=80",
              },
            ].map((scholar, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[350px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <img
                  src={scholar.img}
                  alt={scholar.title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{scholar.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {scholar.desc}
                </p>
                <p className="mt-auto text-base font-semibold text-blue-600 cursor-pointer hover:underline">
                  Look More →
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/scholarships"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
            >
              View Scholarships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
