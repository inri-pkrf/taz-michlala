import React from 'react';
import '../style/WelcomePage.css';

function WelcomePage({ onNavigate }) {

  // פונקציה לבקשת מסך מלא שעובדת גם במובייל (Android/iOS)
  const enterFullScreen = () => {
    const docEl = document.documentElement;

    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {});
    } else if (docEl.webkitRequestFullscreen) { /* Safari / iOS */
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) { /* IE11 */
      docEl.msRequestFullscreen();
    }
  };

  const handleStart = () => {
    enterFullScreen();
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className="welcome-container">
      {/* לוגו עליון */}
      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.svg`}
        alt="logo"
      />

      {/* כותרת ראשית */}
      <h1 className="welcome-title">ברוכות הבאות וברוכים הבאים</h1>

      {/* תת כותרת / הסבר */}
      <p className="welcome-subtitle">
        ברוכים הבאים לשיעור הדיגיטלי "ת.ז מכללה"!
        באמצעות לומדה זו תבינו קצת יותר לאן הגעתם...
        מקווים שאתם מתרגשים כמעט כמונו
      </p>

      {/* תמונת תג השם */}
      <img
        className="welcomePage-nameTag"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/name-tag.svg`}
        alt="img"
      />

      {/* כפתור כניסה */}
      <p 
        onClick={handleStart} 
        className="start-learning-btn" 
        role="button" 
        style={{ cursor: 'pointer' }}
      >
        יאללה לעסק
      </p>
    </div>
  );
}

export default WelcomePage;