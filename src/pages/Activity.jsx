import React from 'react';
import '../style/Activity.css';
import HomeButton from '../components/HomeButtons'; 

function Activity({ onGoHome }) {
  return (
    <div className="page-container">
      <HomeButton onClick={onGoHome} />
      <img
        className={`welcomePage-logo`}
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />
      
      <img
        className={`activity-queen`}
        src={`${process.env.PUBLIC_URL}/assets/Activity/crown-queen.png`}
        alt="queen"
      />

      <img
        className={`activity-king`}
        src={`${process.env.PUBLIC_URL}/assets/Activity/crown-king.png`}
        alt="king"
      />

      <img
        className={`activity-building`}
        src={`${process.env.PUBLIC_URL}/assets/Activity/building.png`}
        alt="building"
      />

      <h1 id="activity-title"> פעילות המכללה </h1>
      <p id="activity-text1"> ברוכים הבאים וברוכות הבאות למכללה הלאומית לאיתנות ישראלית </p>
      <p id="activity-text2"> המכללה מכשירה מנהלים ומנהלות שיש להם תפקיד בשעת חירום ממשרדי הממשלה, רשויות ייעודיות, הרשויות המקומיות ובמפקדות צבאיות, לתפקוד מיטבי וניהול מצבי חירום כמו במצב מלחמה, טרור, אסון טבע, אסון אזרחי, מגיפה ועוד.</p>
      <p id="activity-text3"> המכללה הוקמה בכדי להוות בית להכשרות בתחום ניהול מצבי החירום. בניין אחד המרכז את כל מחלקות פקע"ר בשיתוף פעולה עם רשות החירום הלאומית (רח"ל). </p>
      <p id="activity-show-image"> ראו תמונה </p>
    </div>

  );
}
export default Activity;
