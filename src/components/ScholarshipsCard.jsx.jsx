import React from "react";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      {scholarship.image && (
        <img
          src={scholarship.image}
          alt={scholarship.title}
          className="w-full h-40 object-cover rounded"
        />
      )}
      <h3 className="text-lg font-bold mt-3">{scholarship.title}</h3>
      <p className="text-sm text-gray-500">{scholarship.organization}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {scholarship.description?.slice(0, 100)}...
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Issued on: {new Date(scholarship.createdAt).toLocaleDateString()}
      </p>
      <a
        href={scholarship.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
      >
        View Scholarship
      </a>
    </div>
  );
};

export default ScholarshipCard;
