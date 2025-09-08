// components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <header className="modalHeader">
          <h3>{title}</h3>
          <button className="modalClose" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
