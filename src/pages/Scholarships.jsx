import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ScholarshipCard from "../components/ScholarshipCard.jsx";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/api/scholarships"
        );
        setScholarships(data);
      } catch (err) {
        console.error("❌ Failed to fetch scholarships:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Explore Scholarships
        </h1>

        {loading ? (
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>{" "}
            <span className="text-2xl text-black dark:text-white">
              Loading...
            </span>
          </div>
        ) : scholarships.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No scholarships available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((sch) => (
              <ScholarshipCard key={sch._id} scholarship={sch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;
