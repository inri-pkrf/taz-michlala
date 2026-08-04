import React, { useState } from 'react';
import '../style/Activity.css'; // או נתיב ה-CSS הרלוונטי אצלך

function ActivityStep1() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="page-container activity-page-1"> 
      {/* אלמנטים דקורטיביים ברקע */}
      <img
        className="activity-queen"
        src={`${process.env.PUBLIC_URL}/assets/Activity/crown-queen.png`}
        alt="queen"
      />

      <img
        className="activity-building"
        src={`${process.env.PUBLIC_URL}/assets/Activity/building.png`}
        alt="building"
      />

      {/* התוכן המרכזי בזרימה טבעית */}
      <h1 id="activity-title">פעילות המכללה</h1>
      
      <p id="activity-text1">
        ברוכים הבאים וברוכות הבאות למכללה הלאומית לאיתנות ישראלית
      </p>
      
      <div className="activity-text-container">
        <p id="activity-text2">
          המכללה מכשירה מנהלים ומנהלות שיש להם תפקיד בשעת חירום ממשרדי הממשלה, רשויות ייעודיות, הרשויות המקומיות ובמפקדות צבאיות, לתפקוד מיטבי וניהול מצבי חירום כמו במצב מלחמה, טרור, אסון טבע, אסון אזרחי, מגיפה ועוד.
        </p>
        
        <button 
          id="activity-show-image" 
          onClick={() => setIsImageOpen(true)} 
        >
          צפו בתמונה
        </button>
      </div>
      
      <p id="activity-text3">
        המכללה הוקמה בכדי להוות בית להכשרות בתחום ניהול מצבי החירום. בניין אחד המרכז את כל מחלקות פקע"ר בשיתוף פעולה עם רשות החירום הלאומית (רח"ל).
      </p>

      {/* מודאל פופ-אפ לתמונה */}
      {isImageOpen && (
        <div 
          className="image-modal-overlay"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="image-modal-content">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/Activity/img1.jpg`} 
              alt="פעילות המכללה" 
              className="modal-img"
            />
            <p className="modal-close-hint">
              לחצו מקום כלשהו במסך כדי לחזור
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityStep1;