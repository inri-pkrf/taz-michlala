import React, { useState, useRef } from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import AboutMe from '../components/AboutMe';

const stepsData = [
  {
    id: 'ironSwords_main',
    text: "עם פרוץ המלחמה והכרזת 'מצב מיוחד בעורף', עברה המכללה להפעלה במצב חירום. במסגרת מאמצי הפיקוד, הובילה המכללה שני מוקדי סיוע לאומיים - המרס\"ל (מרכז סיוע לאזרח) שמקדם תהליך של מיצוי יכולות בתוך פקע\"ר בהתאם להכוונת הסיוע לרשויות המקומיות, והשני, משל\"ט ינאי, שריכז את משימת המפונים והמתפנים בבתי המלון וסיפק תמונת מצב לאומית."
  },
  {
    id: 'ironSwords_marsal',
    subTitle: 'מרס"ל',
    text: 'במהלך הפעלת המרס"ל מאוקטובר 2023 עד פברואר 2024, טיפלו במרס"ל בלמעלה מ-700 פניות שעלו מהמחוזות בתחומים שונים כמו אספקת מנות מזון, חיתולים, מטרנה, מתנדבים, שינוע תרופות ועוד משימות ייחודיות וערכיות, שלא ניתן להן כל מענה ממקורות אחרים.'
  },
  {
    id: 'ironSwords_yanai',
    subTitle: 'משל"ט ינאי',
    text: 'אפשר לומר שחוץ מראש הממשלה כולם הגיעו לבקר - מהנשיא ורעייתו, הרמטכ"ל, שרים, מנכ"לי משרדי ממשלה, אלופי המטכ"ל ועוד. המשל"ט ניהל, ריכז ותכלל את תמונת המצב של המפונים בבתי המלון עם למעלה מרבע מיליון ישראלים שיצאו מביתם, 97 יישובים מתפנים ו-456 מלונות בשיא.'
  },
  {
    id: 'ironSwords_emergency',
    subTitle: "מרכז למידה מבצעית",
    text: `להכניס טקסט`
  },
  {
    id: 'ironSwords_visit',
    text: `לצד שתי המשימות הלאומיות, המכללה המשיכה להכשיר בחירום קורסים לבעלי תפקידים שהיו נחוצים בשטח, הנגשנו תוכן מקצועי ומתוקף לבעלי התפקידים ברשויות, ביצענו 'זמן יקר' במפקדות, הפצנו תוכן דיגיטלי לצוותי הצח"י ומנהלי המכלולים, ערכנו אבחון לקריית שמונה לסיוע בהתמודדות הרשות עם אתגרי הפינוי ופיצול הרשות ועוד פעולות רבות כחלק מהמאמץ המלחמתי בעורף.`
  },
];

function AtWar({ onGoHome, progress, onProgress }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // שמירת נקודות ההתחלה ב-X וב-Y
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const currentStep = stepsData[currentStepIndex];

  const goToNextStep = () => {
    if (currentStepIndex < stepsData.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onProgress?.(`atWar_step_${stepsData[nextIndex].id}`);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      onProgress?.(`atWar_step_${stepsData[prevIndex].id}`);
    }
  };

  const handleExitPage = () => {
    onProgress?.(`atWar_step_${currentStep.id}`);
    onGoHome();
  };

  // תחילת הנגיעה במיכל או בפופ-אפ
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  // סיום הנגיעה וחישוב מחווה
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    // בודקים שההחלקה היא אופקית בעיקרה ולא גלילה אנכית של הטקסט
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      // בעברית (RTL):
      // החלקה שמאלה (deltaX > 0) -> מעבר לשלב הבא
      // החלקה ימינה (deltaX < 0) -> מעבר לשלב הקודם
      if (deltaX > 0) {
        goToNextStep();
      } else {
        goToPrevStep();
      }
    }
  };

  return (
    <div className="page-container at-war-page">
      <HomeButton onClick={onGoHome} progress={progress} />
      <AboutMe />

      <h1 id="AtWar-title">המכללה בעת מלחמה</h1>
      <p id="AtWar-title2">
        עם פרוץ המלחמה והכרזת 'מצב מיוחד בעורף', עברה המכללה להפעלה במצב חירום.
      </p>
      <p id="AtWar-dir">ניתן לדפדף בין העמודים כדי לגלות עוד</p>

      {/* חיבור אירועי הטאץ' ישירות לפופ-אפ המרכזי */}
      <div 
        className="war-popup-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="war-step-container">
          {currentStep.subTitle && (
            <h2 className="war-subtitle">{currentStep.subTitle}</h2>
          )}
          <p className="war-short-text">{currentStep.text}</p>
        </div>

        <div className="war-bottom-navigation">
          <button 
            onClick={goToNextStep} 
            disabled={currentStepIndex === stepsData.length - 1}
            aria-label="הבא"
            className="war-nav-btn"
          >
            ⬅
          </button>

          <span className="war-step-indicator">
            {currentStepIndex + 1} / {stepsData.length}
          </span>

          <button 
            onClick={goToPrevStep} 
            disabled={currentStepIndex === 0}
            aria-label="הקודם"
            className="war-nav-btn"
          >
            ➡
          </button>
        </div>
      </div>

      <img
        className="bomb"
        src={`${process.env.PUBLIC_URL}/assets/AtWar/all/bomb.svg`}
        alt="img"
      />

      <NextButton onClick={handleExitPage} />
    </div>
  );
}

export default AtWar;