// src/pages/Admin.js
import React from "react";

const Admin = () => {
  return (
    <div id="adminPage" className="page active">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <button className="btn btn--primary" id="addInternshipBtn">
            Add New Internship
          </button>
        </div>
        <div className="admin-content">
          <div className="card">
            <div className="card__body">
              <h3>Manage Internships</h3>
              <div className="admin-table" id="adminInternships">
                {/* Admin internship list will be loaded here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
