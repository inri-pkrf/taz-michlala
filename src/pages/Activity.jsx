import React, { useState } from 'react';
import '../style/Activity.css';
import HomeButton from '../components/HomeButtons'; 

function Activity({ onGoHome }) {
  // סטייט לפתיחה וסגירה של התמונה
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="page-container">
      <HomeButton onClick={onGoHome} />
      
      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />
      
      <img
        className="activity-queen"
        src={`${process.env.PUBLIC_URL}/assets/Activity/crown-queen.png`}
        alt="queen"
      />

      <img
        className="activity-king"
        src={`${process.env.PUBLIC_URL}/assets/Activity/crown-king.png`}
        alt="king"
      />

      <img
        className="activity-building"
        src={`${process.env.PUBLIC_URL}/assets/Activity/building.png`}
        alt="building"
      />

      <h1 id="activity-title">פעילות המכללה</h1>
      <p id="activity-text1">ברוכים הבאים וברוכות הבאות למכללה הלאומית לאיתנות ישראלית</p>
      <p id="activity-text2">המכללה מכשירה מנהלים ומנהלות שיש להם תפקיד בשעת חירום ממשרדי הממשלה, רשויות ייעודיות, הרשויות המקומיות ובמפקדות צבאיות, לתפקוד מיטבי וניהול מצבי חירום כמו במצב מלחמה, טרור, אסון טבע, אסון אזרחי, מגיפה ועוד.</p>
      <p id="activity-text3">המכללה הוקמה בכדי להוות בית להכשרות בתחום ניהול מצבי החירום. בניין אחד המרכז את כל מחלקות פקע"ר בשיתוף פעולה עם רשות החירום הלאומית (רח"ל).</p>
      
      {/* כפתור "צפו בתמונה" עם ה-ID שמעוצב ב-CSS שלך */}
      <p 
        id="activity-show-image" 
        onClick={() => setIsImageOpen(true)} 
        style={{ cursor: 'pointer', textAlign: 'center' }} // מוסיף פוינטר ומרכז טקסט
      >
        צפו בתמונה
      </p>

      {/* מודאל פופ-אפ שנפתח מעל הכל בלחיצה */}
      {isImageOpen && (
        <div 
          onClick={() => setIsImageOpen(false)} // לחיצה בכל מקום ברקע תסגור את התמונה
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // רקע כהה חצי שקוף
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999, // מוודא שזה מעל הכל כולל הכפתור
            cursor: 'zoom-out'
          }}
        >
          <div style={{ maxWidth: '80%', maxHeight: '80%', position: 'relative' }}>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/Activity/img1.jpg`} 
              alt="פעילות המכללה" 
              style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '2vh', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }} 
            />
            <p style={{ color: '#fff', textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
              לחצו מקום כלשהו במסך כדי לחזור
            </p>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Activity;