import React from 'react';
import './Popup.css';

function Popup({ isOpen, onClose, title, color }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>×</button>
        <h2 style={{ color: color }}>{title}</h2>
        <div className="popup-body">
          {/* כאן יופיע התוכן של הנושא בהמשך */}
          <p>כאן יופיע התוכן המלא עבור נושא זה.</p>
        </div>
      </div>
    </div>
  );
}

export default Popup;