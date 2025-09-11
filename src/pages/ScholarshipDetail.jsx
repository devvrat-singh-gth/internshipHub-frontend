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

  // ✅ Save Scholarship
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        `https://internshiphub-backend.onrender.com/api/scholarships/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Scholarship saved successfully!");
      window.dispatchEvent(new Event("authChange")); // Refresh dashboard
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/scholarships" className="text-blue-600 hover:underline">
            Scholarships
          </Link>{" "}
          /{" "}
          <span className="text-gray-800 dark:text-gray-300">
            {scholarship.title}
          </span>
        </nav>

        {/* Scholarship Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {scholarship.title}
            </h1>
            <div className="flex gap-3">
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-nowrap px-5 py-2 text-xs lg:text-xl bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Apply Now
              </a>
              <button
                onClick={handleSave}
                className="flex items-center whitespace-nowrap text-xs lg:text-xl px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {scholarship.organization || "N/A"} • Deadline:{" "}
            {scholarship.deadline}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {scholarship.description}
          </p>
          <p className=" text-gray-500 dark:text-gray-400 mb-6">
            Eligibility: {scholarship.eligibility}
          </p>
          <p className=" text-gray-500">
            Issued on: {new Date(scholarship.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
