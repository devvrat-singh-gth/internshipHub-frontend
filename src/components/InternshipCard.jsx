import React from "react";
import getImage from "../utils/getImage";

const InternshipCard = ({ internship, onSave }) => {
  return (
    <div
      className="group flex flex-col justify-between bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700 rounded-lg 
                 shadow-sm hover:shadow-md transition p-6 h-full"
    >
      {/* Image */}
      <img
        src={getImage(internship)}
        alt={internship.title}
        className="h-40 w-full object-cover rounded-md mb-4"
        onError={(e) => {
          e.target.src =
            "https://source.unsplash.com/600x400/?internship,career";
        }}
      />

      {/* Main Info */}
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
      </div>

      {/* Save Button */}
      {onSave && (
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-900 
                       hover:bg-gray-300 active:bg-gray-400 
                       dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={(e) => {
              e.preventDefault();
              onSave(internship._id);
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default InternshipCard;
