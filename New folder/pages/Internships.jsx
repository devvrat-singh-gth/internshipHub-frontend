// src/pages/Internships.jsx
import React, { useState } from "react";

const TYPES = ["Remote", "On-site", "Hybrid"];
const COMPANY_TYPES = ["Private", "Government"];

const Internships = () => {
  const [internships, setInternships] = useState([]);

  return (
    <div
      id="searchPage"
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="search-layout flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar md:w-1/4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="filters-header flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button
                className="btn btn--outline btn--sm text-sm px-3 py-1 border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                id="clearFilters"
              >
                Clear All
              </button>
            </div>

            <div className="filter-group mb-6">
              <h4 className="font-semibold mb-2">Location</h4>
              <div className="filter-options" id="locationFilters">
                {/* Dynamically load location checkboxes here */}
              </div>
            </div>

            <div className="filter-group mb-6">
              <h4 className="font-semibold mb-2">Category</h4>
              <div className="filter-options" id="categoryFilters">
                {/* Dynamically load category checkboxes here */}
              </div>
            </div>

            <div className="filter-group mb-6">
              <h4 className="font-semibold mb-2">Type</h4>
              <div className="filter-options space-y-2">
                {TYPES.map((type) => (
                  <label
                    key={type}
                    className="filter-option flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={type}
                      name="type"
                      className="form-checkbox rounded text-blue-600"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group mb-6">
              <h4 className="font-semibold mb-2">Company Type</h4>
              <div className="filter-options space-y-2">
                {COMPANY_TYPES.map((type) => (
                  <label
                    key={type}
                    className="filter-option flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={type}
                      name="companyType"
                      className="form-checkbox rounded text-blue-600"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group mb-6">
              <h4 className="font-semibold mb-2">Duration</h4>
              <select
                className="form-control w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2"
                id="durationFilter"
              >
                <option value="">Any Duration</option>
                <option value="1-3 months">1–3 months</option>
                <option value="3-6 months">3–6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </aside>

          {/* Search Results */}
          <div className="search-content md:w-3/4 flex flex-col">
            <div className="search-header mb-6">
              <form
                className="search-bar flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  className="form-control flex-grow rounded-l-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Search internships..."
                  id="searchInputMain"
                />
                <button
                  className="btn btn--primary rounded-r-md bg-blue-600 hover:bg-blue-700 text-white px-6 font-semibold"
                  id="searchBtn"
                >
                  Search
                </button>
              </form>

              <div className="search-meta flex flex-col sm:flex-row justify-between mt-4 text-gray-700 dark:text-gray-300 text-sm">
                <span id="resultsCount">
                  {internships.length} internships found
                </span>
                <div className="sort-options mt-2 sm:mt-0 flex items-center space-x-2">
                  <label htmlFor="sortSelect" className="font-medium">
                    Sort by:
                  </label>
                  <select
                    className="form-control rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1"
                    id="sortSelect"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Latest</option>
                    <option value="stipend">Stipend</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="internships-list grid grid-cols-1 gap-6"
              id="searchResults"
            >
              {/* Map <InternshipCard /> components here */}
            </div>

            <div
              className="pagination flex justify-center mt-6"
              id="pagination"
            >
              {/* Pagination buttons here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internships;
