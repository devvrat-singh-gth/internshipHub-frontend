import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/api";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(
          `https://internshiphub-backend.onrender.com/api/courses/${id}`
        );
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        `https://internshiphub-backend.onrender.com/api/courses/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Course saved successfully!");
      window.dispatchEvent(new Event("authChange"));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save course");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <span className="text-2xl text-black dark:text-white">Loading...</span>
      </div>
    );
  }

  if (!course) {
    return <p className="text-center mt-10 text-red-600">Course not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/courses" className="text-blue-600 hover:underline">
            Courses
          </Link>{" "}
          /{" "}
          <span className="text-gray-800 dark:text-gray-300">
            {course.title}
          </span>
        </nav>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {course.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center text-sm sm:text-base px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                View Course
              </a>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto text-sm sm:text-base px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {course.provider} • {course.duration}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {course.description}
          </p>
          <p className="text-xs text-gray-400">
            Issued on: {new Date(course.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
