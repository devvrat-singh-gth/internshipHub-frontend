import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <div>
            <h3 className="text-xl font-semibold text-teal-600 mb-3">
              InternshipHub
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your gateway to amazing internship opportunities.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  Search Internships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal-500">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  Finance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  Design
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-teal-500">
                LinkedIn
              </a>
              <a href="#" className="hover:text-teal-500">
                Twitter
              </a>
              <a href="#" className="hover:text-teal-500">
                Facebook
              </a>
              <a href="#" className="hover:text-teal-500">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 InternshipHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
