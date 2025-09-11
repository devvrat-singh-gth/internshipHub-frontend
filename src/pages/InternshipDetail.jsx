import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch internship details
  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get(
          `https://internshiphub-backend.onrender.com/api/internships/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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

  // Apply
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

  // Save
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
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>{" "}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
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

        {/* Internship Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Title + Buttons row */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {internship.title}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={handleApply}
                className="text-sm lg:text-lg px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Apply
              </button>
              <button
                onClick={handleSave}
                className="text-sm lg:text-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>

          {/* Company / Location */}
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-semibold">{internship.company}</span> •{" "}
            {internship.location}
          </p>

          {/* Duration + Stipend with trimming and fallback */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Duration: {(internship.duration || "").trim() || "N/A"} | Stipend:{" "}
            {internship.stipend || "N/A"}
          </p>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {internship.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
