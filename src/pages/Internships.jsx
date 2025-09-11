import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InternshipCard from "../components/InternshipCard";
import API from "../utils/api";

const TYPES = ["Remote", "On-site", "Hybrid", "Part-time", "Full-time"];
const COMPANY_TYPES = ["Private", "Government", "Startup", "NGO"];
const ROLES = [
  "Software Engineering",
  "Product Management",
  "Design",
  "Marketing",
  "PM Internship",
];
const STIPENDS = ["Unpaid", "0–5k", "5k–10k", "10k+"];

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // filter states
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedStipends, setSelectedStipends] = useState([]);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const token = localStorage.getItem("token");

        let data;

        if (token) {
          try {
            const res = await API.get(
              "https://internshiphub-backend.onrender.com/api/internships",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            data = res.data;
          } catch {
            // fallback to public if token invalid/expired
            const res = await API.get(
              "https://internshiphub-backend.onrender.com/api/internships/public"
            );
            data = res.data;
          }
        } else {
          const res = await API.get(
            "https://internshiphub-backend.onrender.com/api/internships/public"
          );
          data = res.data;
        }

        setInternships(data);
      } catch (err) {
        console.error("Error fetching internships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // handle checkbox toggle
  const toggleSelection = (option, setState, current) => {
    if (current.includes(option)) {
      setState(current.filter((o) => o !== option));
    } else {
      setState([...current, option]);
    }
  };

  // clear all filters
  const clearFilters = () => {
    setSearch("");
    setSelectedTypes([]);
    setSelectedCompanies([]);
    setSelectedRoles([]);
    setSelectedStipends([]);
    setDuration("");
  };

  // filtering logic
  const filteredInternships = internships.filter((intn) => {
    // search by title/description/company
    if (
      search &&
      !(
        intn.title?.toLowerCase().includes(search.toLowerCase()) ||
        intn.company?.toLowerCase().includes(search.toLowerCase()) ||
        intn.description?.toLowerCase().includes(search.toLowerCase())
      )
    ) {
      return false;
    }

    // type
    if (selectedTypes.length > 0 && !selectedTypes.includes(intn.type)) {
      return false;
    }

    // company type
    if (
      selectedCompanies.length > 0 &&
      !selectedCompanies.includes(intn.companyType)
    ) {
      return false;
    }

    // role
    if (selectedRoles.length > 0 && !selectedRoles.includes(intn.role)) {
      return false;
    }

    // stipend (basic demo: just matches exact string)
    if (
      selectedStipends.length > 0 &&
      !selectedStipends.includes(intn.stipend)
    ) {
      return false;
    }

    // duration
    if (duration && intn.duration !== duration) {
      return false;
    }

    return true;
  });

  const renderFilters = () => (
    <aside className="min-w-[350px] md:min-w-[200px] lg:min-w-[300px] w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6 shrink-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      {[
        {
          title: "Type",
          options: TYPES,
          state: selectedTypes,
          setter: setSelectedTypes,
        },
        {
          title: "Company Type",
          options: COMPANY_TYPES,
          state: selectedCompanies,
          setter: setSelectedCompanies,
        },
        {
          title: "Role",
          options: ROLES,
          state: selectedRoles,
          setter: setSelectedRoles,
        },
        {
          title: "Stipend",
          options: STIPENDS,
          state: selectedStipends,
          setter: setSelectedStipends,
        },
      ].map(({ title, options, state, setter }) => (
        <div className="mb-6" key={title}>
          <h4 className="font-medium mb-2">{title}</h4>
          <div className="space-y-2">
            {options.map((opt) => (
              <label key={opt} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={state.includes(opt)}
                  onChange={() => toggleSelection(opt, setter, state)}
                  className="form-checkbox text-blue-600 rounded"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h4 className="font-medium mb-2">Duration</h4>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
        >
          <option value="">Any Duration</option>
          <option value="1 to 3 months">1 to 3 months</option>
          <option value="3 to 6 months">3 to 6 months</option>
          <option value="6+ months">6+ months</option>
        </select>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Search Internships
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* 🖥️ Desktop Filters */}
          <div className="hidden md:block">{renderFilters()}</div>

          {/* Main Content */}
          <main className="flex-1">
            {/* 🔍 Search Bar */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2 mb-4"
            >
              <input
                type="text"
                placeholder="Search internships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
              >
                Search
              </button>
            </form>

            {/* 🔽 Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow font-semibold w-full"
              >
                {showMobileFilters ? "Hide Filters" : "Show Filters"}
              </button>
              {showMobileFilters && (
                <div className="mt-4">{renderFilters()}</div>
              )}
            </div>

            {/* 📦 Internship Cards */}
            {loading ? (
              <div className="flex justify-center items-center h-28 gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <span className="text-2xl text-black dark:text-white">
                  Loading...
                </span>
              </div>
            ) : filteredInternships.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No internships match your filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filteredInternships.map((internship) => (
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default Internships;
