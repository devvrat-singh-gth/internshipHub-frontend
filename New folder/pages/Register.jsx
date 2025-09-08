// src/pages/Register.js
import React from "react";

const Register = () => {
  return (
    <div className="page active">
      <div className="modal active" style={{ display: "block" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Sign Up</h2>
          </div>
          <div className="modal-body">
            <form id="signupForm">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">User Type</label>
                <select className="form-control" required>
                  <option value="">Select Type</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full-width"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
