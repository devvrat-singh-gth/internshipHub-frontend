import React from "react";
import { useNavigate } from "react-router-dom";
import getImage from "../utils/getImage";

const ScholarshipCard = ({ scholarship }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group flex flex-col justify-between bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700 rounded-lg 
                 shadow-sm hover:shadow-md transition overflow-hidden"
    >
      {/* Image */}
      <img
        src={getImage(scholarship, "scholarship")}
        alt={scholarship.title}
        className="h-40 w-full object-cover"
        onError={(e) => {
          e.target.src = `https://source.unsplash.com/600x400/?scholarship,education`;
        }}
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <h2
            onClick={() => navigate(`/scholarships/${scholarship._id}`)}
            className="cursor-pointer text-xl font-bold group-hover:text-blue-500"
          >
            {scholarship.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {scholarship.organization || "Unknown Organization"}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
            {scholarship.description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <strong>Eligibility:</strong> {scholarship.eligibility}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-gray-800 dark:text-gray-400">
            Issued on: {new Date(scholarship.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={() => navigate(`/scholarships/${scholarship._id}`)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md text-center"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
