import React from 'react';
import '../style/WelcomePage.css';


function WelcomePage({ onNavigate }) {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">ברוכות הבאות וברוכים הבאים  </h1>
      <p className="welcome-subtitle">
       ברוכים הבאים לשיעור הדיגיטלי “ת”ז מכללה”!
באמצעות לומדה זו תבינו קצת יותר לאן הגעתם... 
מקווים שאתם מתרגשים כמעט כמונו
      </p>
      <img
        className={`welcomePage-logo`}
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />
      <img
        className={`welcomePage-nameTag`}
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/name-tag.png`}
        alt="img"
      />

      <button onClick={onNavigate} className="start-learning-btn">
        קדימה, מתחילים! 🚀
      </button>
    </div>
  );
}

export default WelcomePage;