import React from "react";
import { useNavigate } from "react-router-dom";
import getImage from "../utils/getImage";

const ScholarshipCard = ({ scholarship }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group flex flex-col bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700 rounded-lg 
                 shadow-sm hover:shadow-md transition overflow-hidden"
    >
      {/* Image */}
      <img
        src={getImage(scholarship)}
        alt={scholarship.title}
        className="h-40 w-full object-cover"
        onError={(e) => {
          e.target.src =
            "https://source.unsplash.com/600x400/?scholarship,education";
        }}
      />

      <div className="flex flex-col flex-1 p-5">
        <h2
          onClick={() => navigate(`/scholarships/${scholarship._id}`)}
          className="cursor-pointer text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500"
        >
          {scholarship.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {scholarship.organization || "Unknown Organization"}
        </p>
      </div>
    </div>
  );
};

export default ScholarshipCard;
