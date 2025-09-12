import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/api";

const ScholarshipDetail = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const { data } = await API.get(
          `https://internshiphub-backend.onrender.com/api/scholarships/${id}`
        );
        setScholarship(data);
      } catch (err) {
        console.error("Error fetching scholarship:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        `https://internshiphub-backend.onrender.com/api/scholarships/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Scholarship saved successfully!");
      window.dispatchEvent(new Event("authChange"));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save scholarship");
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

  if (!scholarship) {
    return (
      <p className="text-center mt-10 text-red-600">Scholarship not found.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>{" "}
          /
          <Link to="/scholarships" className="text-blue-600 hover:underline">
            {" "}
            Scholarships
          </Link>{" "}
          /
          <span className="text-gray-800 dark:text-gray-300">
            {scholarship.title}
          </span>
        </nav>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 relative">
          {/* Title and Buttons */}
          <div className="flex flex-col sm:flex-row">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 pr-20 sm:pr-0">
              {scholarship.title}
            </h1>

            <div className="absolute top-6 right-6 flex flex-col sm:flex-row sm:items-start sm:space-x-3 space-y-2 sm:space-y-0">
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-24 sm:w-auto text-xs sm:text-base px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-center"
              >
                Apply
              </a>
              <button
                onClick={handleSave}
                className="w-24 sm:w-auto text-xs sm:text-base px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">
            {scholarship.organization || "Unknown Organization"}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {scholarship.description}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>Eligibility:</strong> {scholarship.eligibility}
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Issued on: {new Date(scholarship.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
