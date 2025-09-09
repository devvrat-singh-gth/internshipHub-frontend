// src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/api/courses"
        );
        setCourses(data);
      } catch (err) {
        console.error("❌ Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Recommended Courses
        </h1>

        {loading ? (
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>{" "}
            <span className="text-2xl text-black dark:text-white">
              Loading...
            </span>
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No courses available right now.
          </p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course._id}
                className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow"
              >
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-500">{course.provider}</p>
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-teal-600 hover:underline"
                >
                  View Course →
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Courses;
