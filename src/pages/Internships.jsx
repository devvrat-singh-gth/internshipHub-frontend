import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InternshipCard from "../components/InternshipCard";
import API from "../utils/api";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/api/internships/public"
        );
        setInternships(data);
      } catch (err) {
        console.error("Error fetching internships:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Search Internships
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-28 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="text-2xl text-black dark:text-white">
              Loading...
            </span>
          </div>
        ) : internships.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No internships available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {internships.map((internship) => (
              <Link
                key={internship._id}
                to={`/internships/${internship._id}`}
                className="h-full"
              >
                <InternshipCard internship={internship} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
