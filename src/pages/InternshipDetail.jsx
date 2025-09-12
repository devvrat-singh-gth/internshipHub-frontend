import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get(
          `https://internshiphub-backend.onrender.com/api/internships/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInternship(data);
      } catch (err) {
        console.error("Error fetching internship:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        `https://internshiphub-backend.onrender.com/api/internships/${id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Applied successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        `https://internshiphub-backend.onrender.com/api/internships/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Saved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save");
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

  if (!internship) {
    return (
      <p className="text-center mt-10 text-red-600">Internship not found.</p>
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
          /{" "}
          <Link to="/internships" className="text-blue-600 hover:underline">
            Internships
          </Link>{" "}
          /{" "}
          <span className="text-gray-800 dark:text-gray-300">
            {internship.title}
          </span>
        </nav>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 relative">
          {/* Title and Buttons Row */}
          <div className="flex flex-col sm:flex-row">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 pr-20 sm:pr-0">
              {internship.title}
            </h1>

            {/* Buttons container */}
            <div className="absolute top-6 right-6 flex flex-col sm:flex-row sm:items-start sm:space-x-3 space-y-2 sm:space-y-0">
              <button
                onClick={handleApply}
                className="w-24 sm:w-auto text-xs sm:text-base px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Apply
              </button>
              <button
                onClick={handleSave}
                className="w-24 sm:w-auto text-xs sm:text-base px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>

          {/* Company / Location */}
          <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">
            <span className="font-semibold">{internship.company}</span> •{" "}
            {internship.location}
          </p>

          {/* Duration + Stipend */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Duration: {(internship.duration || "").trim() || "N/A"} | Stipend:{" "}
            {internship.stipend || "N/A"}
          </p>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {internship.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
