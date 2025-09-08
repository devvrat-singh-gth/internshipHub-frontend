// components/InternshipCard.jsx
import React from "react";

const InternshipCard = ({ internship, onApply, onSave }) => {
  return (
    <div className="internshipCard">
      <h4>{internship.title}</h4>
      <p>
        <strong>Company:</strong> {internship.company}
      </p>
      <p>
        <strong>Location:</strong> {internship.location}
      </p>
      <p>
        <strong>Duration:</strong> {internship.duration}
      </p>
      <p>{internship.description}</p>

      <div className="cardActions">
        <button
          className="btn btn--primary"
          onClick={() => onApply(internship.id)}
        >
          Apply
        </button>
        <button
          className="btn btn--secondary"
          onClick={() => onSave(internship.id)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
