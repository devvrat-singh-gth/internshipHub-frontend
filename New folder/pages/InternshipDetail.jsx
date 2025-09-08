// src/pages/InternshipDetail.js
import React from "react";
import { useParams } from "react-router-dom";

const InternshipDetail = () => {
  const { id } = useParams();

  return (
    <div id="detailPage" className="page py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline text-blue-600">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/internships" className="hover:underline text-blue-600">
            Search
          </a>
          <span className="mx-2">/</span>
          <span id="breadcrumbTitle" className="font-medium text-gray-800">
            Internship Details
          </span>
        </nav>

        <div
          className="internship-detail bg-white p-6 rounded shadow"
          id="internshipDetail"
        >
          <h2 className="text-2xl font-bold mb-4">Internship ID: {id}</h2>
          <p className="text-gray-600">Details for internship ID: {id}</p>
          {/* Future dynamic content can be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
