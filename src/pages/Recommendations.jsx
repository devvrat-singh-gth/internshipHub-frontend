// src/pages/Recommendations.jsx
import React, { useEffect, useState } from "react";
import InternshipCard from "../components/InternshipCard";
import API from "../utils/api";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await API.get("/internships/recommendations");
        setRecommendations(data);
      } catch (err) {
        console.error("Failed to load recommendations:", err);
      }
    };
    fetchRecommendations();
  }, []);

  // Apply function
  const handleApply = async (id) => {
    try {
      await API.post(`/internships/${id}/apply`);
      alert("Applied successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  // Save function
  const handleSave = async (id) => {
    try {
      await API.post(`/internships/${id}/save`);
      alert("Saved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Recommended for You</h1>
      {recommendations.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No recommendations yet. Update your profile!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((internship) => (
            <InternshipCard
              key={internship._id}
              internship={internship}
              onApply={() => handleApply(internship._id)}
              onSave={() => handleSave(internship._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
