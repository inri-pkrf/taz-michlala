import React, { useState } from 'react';

function ActivityStep4() {
  // סטייט לניהול פתיחה וסגירה של מודאל הסרטון
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      <h1 id="activity-title">פעילות המכללה</h1>
      
      <p id="activity-text1">
        כדי שתוכלו להבין את היקף הפעילות שלנו פה במכללה, הכנו לכם סרטון קצר שימחיש לכם קצת יותר.
      </p>
      
      <p id="activityStep4-text2">
        עצה שלנו- שימו ❤️ טוב טוב למה שמופיע בסרטון
      </p>
      
      <p id="activityStep4-text3">
        בראשות המכללה ניצבת מפקדת בדרגת אל"ם ולרשותה מטה מקצועי המורכב ממשרתי קבע, מילואים ויועצים. סגל המרצים כולל מומחים מקצועיים מפיקוד העורף, רח"ל, משרדי הממשלה, המינהל הציבורי והאקדמיה.
      </p>
      
      {/* תמונת החיילים ברקע */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/Activity/soliders.webp`} 
        alt="חיילים" 
        id="activity-soliders"
        loading="lazy"
      />
      
      {/* אייקון הנגן - לחיצה עליו משנה את הסטייט ל-true ופותחת את הוידאו */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/Activity/play-icon.webp`} 
        alt="סרטון" 
        id="activity-play-icon"
        onClick={() => setIsVideoOpen(true)}
        style={{ cursor: 'pointer' }}
        loading="lazy"
      />            

      {/* מודאל הוידאו הדינמי (מתלבש על ה-CSS הגלובלי שיצרנו בשלב הקודם) */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* כפתור איקס לסגירה */}
            <button className="video-modal-close" onClick={() => setIsVideoOpen(false)}>
              &times;
            </button>
            {/* נגן הוידאו עם קישור ה-mp4 שסיפקת */}
            <video 
              className="video-player" 
              controls 
              autoPlay
              src="https://inri-pkrf.github.io/know-college/assets/media/videoCollage.mp4"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityStep4;