import React from 'react';
import './Popup.css';

function Popup({ title, content, bgColor = '#ffffff', borderColor = '#000641', isWarning = false, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div 
        className="popup-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ backgroundColor: bgColor, borderColor: borderColor }} // דינמי לפופ-אפ
      >
        {/* אם זה פופ-אפ רגיל (לא אזהרה), נציג כפתור איקס בצבע של הבורדר */}
        {!isWarning && (
          
          <button 
            className="popup-close-x" 
            onClick={onClose}
            style={{ color: borderColor }} // התיקון: האיקס מקבל דינמית את צבע הבורדר
          >
            &times;
          </button>
        )}

        <h3 className="popup-title">{title}</h3>
        <div className="popup-text">{content}</div>
        
        {/* אם זו אזהרה, נציג את כפתור "הבנתי" למטה */}
        {isWarning && (
          <button className="popup-btn" onClick={onClose}>
            הבנתי
          </button>
        )}
      </div>
    </div>
  );
}

export default Popup;