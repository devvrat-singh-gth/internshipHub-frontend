// src/pages/Recommendations.jsx
import React, { useEffect, useState } from "react";
import InternshipCard from "../components/InternshipCard";
import API from "../utils/api";

const Recommendations = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch AI recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // ✅ must be logged in
        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/api/internships/recommendations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInternships(data);
      } catch (err) {
        console.error("Failed to load recommendations:", err);
        setInternships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Recommended for You
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Based on your profile (skills, education, sector, location)
        </p>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : internships.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No personalized recommendations yet. Update your profile to get
          relevant internships!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((item) => (
            <InternshipCard key={item._id} internship={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
