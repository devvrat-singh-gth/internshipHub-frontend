// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

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

  const [internships, setInternships] = useState([]);
  const [courses, setCourses] = useState([]);
  const [scholarships, setScholarships] = useState([]);

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

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        let intnData;
        if (token) {
          try {
            const res = await API.get("/internships", {
              headers: { Authorization: `Bearer ${token}` },
            });
            intnData = res.data;
          } catch {
            const res = await API.get("/internships/public");
            intnData = res.data;
          }
        } else {
          const res = await API.get("/internships/public");
          intnData = res.data;
        }

        const courseRes = await API.get("/courses");
        const scholRes = await API.get("/scholarships");

        setInternships(intnData.slice(0, 3));
        setCourses(courseRes.data.slice(0, 3));
        setScholarships(scholRes.data.slice(0, 3));
      } catch (err) {
        console.error("❌ Failed fetching home data:", err);
      }
    };
    fetchData();
  }, []);

  // 🔑 Helper for fallback image
  const getImage = (item, fallback) =>
    item.image ||
    item.imageUrl ||
    `https://source.unsplash.com/600x400/?${fallback || "education"}`;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Internship
            </h1>
            <p className="text-lg mb-6">
              Explore internships, recommended courses, scholarships, and
              special opportunities.
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

          {/* Right image with blue background */}
          <div className="hidden md:flex justify-center items-center bg-blue-700 rounded-lg shadow-lg p-6">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Internship"
              className="rounded-lg shadow-lg object-cover h-64"
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
          {internships.map((intn) => (
            <div
              key={intn._id}
              className="min-w-[280px] sm:min-w-[350px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={getImage(intn, "internship")}
                alt={intn.title}
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{intn.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                {intn.description}
              </p>
              <Link
                to={`/internships/${intn._id}`}
                className="mt-auto text-base font-semibold text-teal-600 hover:underline"
              >
                Look More →
              </Link>
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
            {courses.map((course) => (
              <div
                key={course._id}
                className="min-w-[280px] sm:min-w-[350px] p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={getImage(course, "education")}
                  alt={course.title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {course.description}
                </p>
                <Link
                  to={`/courses/${course._id}`}
                  className="mt-auto text-base font-semibold text-teal-600 hover:underline"
                >
                  Look More →
                </Link>
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
            {scholarships.map((sch) => (
              <div
                key={sch._id}
                className="min-w-[280px] sm:min-w-[350px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={getImage(sch, "scholarship")}
                  alt={sch.title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{sch.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {sch.description}
                </p>
                <Link
                  to={`/scholarships/${sch._id}`}
                  className="mt-auto text-base font-semibold text-blue-600 hover:underline"
                >
                  Look More →
                </Link>
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
