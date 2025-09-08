// src/pages/Contact.jsx

import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-center mb-12">
          Have questions? We'd love to hear from you. Reach out using the form
          below or contact us directly.
        </p>

        <div className="flex flex-col md:flex-row md:space-x-16">
          {/* Contact Info */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6">Have questions? We'd love to hear from you.</p>
            <div className="space-y-3 text-base">
              <p>
                <strong>Email:</strong> support@internshiphub.com
              </p>
              <p>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>Address:</strong> Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800 p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              >
                Send Message
              </button>
              <div className="bg-red-500 text-white p-4">Test Tailwind</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
