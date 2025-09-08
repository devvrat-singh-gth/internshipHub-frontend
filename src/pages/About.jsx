import React from "react";

const About = () => {
  return (
    <div className="py-12 px-6 max-w-5xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">
        About Internship Hub
      </h1>

      <p className="text-lg leading-relaxed mb-8">
        Internship Hub is a platform built to bridge the gap between ambitious
        students and top companies across India. Our mission is to empower
        students with real-world experiences by providing access to a wide range
        of high-quality internship opportunities.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Why Internship Hub?</h2>
      <ul className="list-disc list-inside space-y-2 text-lg">
        <li>🌟 1000+ active internship listings from verified companies</li>
        <li>🏢 500+ industry-leading partner organizations</li>
        <li>🎓 50,000+ students placed in meaningful internships</li>
        <li>🚀 95% success rate in matching students with the right role</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h2>
      <p className="text-lg leading-relaxed">
        We believe internships are not just a checkbox — they’re the launchpad
        for a student’s professional journey. By fostering strong connections
        between academia and industry, we aim to create a future where every
        student has the opportunity to gain practical experience and thrive in
        their chosen field.
      </p>

      <div className="text-center mt-12">
        <p className="font-bold text-lg">Ready to start your journey?</p>
        <a href="/internships">
          <button className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
            View Internships
          </button>
        </a>
      </div>
    </div>
  );
};

export default About;
