import React from "react";
import { useNavigate } from "react-router-dom";
import getImage from "../utils/getImage";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group flex flex-col bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-700 rounded-lg 
                  shadow-sm hover:shadow-md dark:hover:shadow-blue-200 transition overflow-hidden"
    >
      {/* Image */}
      <img
        src={getImage(course, "course")}
        alt={course.title}
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1">
          <h2
            onClick={() => navigate(`/courses/${course._id}`)}
            className="cursor-pointer text-xl group-hover:text-blue-500 group-hover:underline font-bold text-gray-900 dark:text-white"
          >
            {course.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {course.provider} • {course.duration || "N/A"}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Issued on: {new Date(course.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={() => navigate(`/courses/${course._id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
          >
            View Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
