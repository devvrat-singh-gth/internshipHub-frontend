// src/components/InternshipCard.jsx
import React from "react";

const InternshipCard = ({ internship, onSave }) => {
  return (
    <div
      className="group flex flex-col justify-between bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700 rounded-lg 
                 shadow-sm hover:shadow-md transition p-6 h-full"
    >
      {/* Top Content */}
      <div className="flex-grow">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {internship.title}
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Company:</strong> {internship.company}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Location:</strong> {internship.location}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Duration:</strong> {internship.duration || "N/A"}
        </p>
      </div>

      {/* Save Button */}
      {onSave && (
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-900 
                       hover:bg-gray-300 active:bg-gray-400 
                       dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 
                       whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault(); // ✅ prevent navigation when wrapped in Link
              onSave(internship._id);
            }}
          >
            Save
          </button>
        </div>
      )}

      {/* Hover line */}
      <p
        className="mt-3 text-sm italic text-gray-500 dark:text-gray-400 
                   group-hover:text-blue-600 transition"
      >
        Click to know more →
      </p>

      {/* ✅ Issued on (always at bottom) */}
      <p className="mt-auto text-sm font-medium text-blue-600 dark:text-blue-400">
        Issued on: {new Date(internship.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default InternshipCard;
