import React from 'react';
import '../style/Activity.css';
import HomeButton from '../components/HomeButtons'; 

function Activity({ onGoHome }) {
  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* הנה כפתור הבית! בלחיצה עליו הוא יפעיל את הפונקציה שמחזירה ל-App */}
      <HomeButton onClick={onGoHome} />

      {/* תוכן העמוד שלך */}
      <h1>נושא 1: פעילות</h1>
      <p>כאן יבוא התוכן המגניב של פעילות בארץ ובחזית...</p>
    </div>
  );
}
export default Activity;
