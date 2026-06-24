import React from 'react';
import '../style/WelcomePage.css';


function WelcomePage({ onNavigate }) {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">ברוכים הבאים ללומדה</h1>
      <p className="welcome-subtitle">
        בואו נתחיל לעבור על הנושאים החשובים. מוכנים?
      </p>

      <button onClick={onNavigate} className="start-learning-btn">
        קדימה, מתחילים! 🚀
      </button>
    </div>
  );
}

export default WelcomePage;