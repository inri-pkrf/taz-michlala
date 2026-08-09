import React, { useState, useRef } from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import AboutMe from '../components/AboutMe';


const stepsData = [
  // --- חרבות ברזל ---
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
    subTitle: " מרכז למידה מבצעית ",
    text: ` להכניס טקסט  `
  },
  {
    id: 'ironSwords_visit',
    text: ` לצד שתי המשימות הלאומיות, המכללה המשיכה להכשיר בחירום קורסים לבעלי תפקידים שהיו נחוצים בשטח, הנגשנו תוכן מקצועי ומתוקף לבעלי התפקידים ברשויות, ביצענו 'זמן יקר' במפקדות, הפצנו תוכן דיגיטלי לצוותי הצח"י ומנהלי המכלולים, ערכנו אבחון לקריית שמונה לסיוע בהתמודדות הרשות עם אתגרי הפינוי ופיצול הרשות ועוד פעולות רבות כחלק מהמאמץ המלחמתי בעורף. `
  },
];

function AtWar({ onGoHome, progress, onProgress }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // מזהים לניהול מחוות מגע (Touch Swipe)
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const currentStep = stepsData[currentStepIndex];

  // מעבר לשלב הבא באמצעות החצים
  const goToNextStep = () => {
    if (currentStepIndex < stepsData.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onProgress?.(`atWar_step_${stepsData[nextIndex].id}`);
    }
  };

  // חזרה לשלב הקודם באמצעות החצים
  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      onProgress?.(`atWar_step_${stepsData[prevIndex].id}`);
    }
  };

  // לחיצה על כפתור 'המשך' - יציאה מהעמוד
  const handleExitPage = () => {
    onProgress?.(`atWar_step_${currentStep.id}`);
    onGoHome();
  };

  // טיפול במחוות מגע (Swipe)
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].clientX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNextStep();
    } else if (distance < -minSwipeDistance) {
      goToPrevStep();
    }
  };

  return (
    <div 
      className="page-container at-war-page" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <HomeButton onClick={onGoHome} progress={progress} />
      <AboutMe />

      {/* כותרת העמוד הראשית שיושבת מחוץ לפופ-אפ בראש המסך */}
      <h1 id="AtWar-title">
        המכללה בעת מלחמה
      </h1>
      <p id="AtWar-title2">
        עם פרוץ המלחמה והכרזת 'מצב מיוחד בעורף', עברה המכללה להפעלה במצב חירום.
      </p>
      <p id="AtWar-dir">
        ניתן לדפדף בין העמודים כדי לגלות עוד
      </p>

      {/* פופ-אפ מרכזי */}
      <div className="war-popup-card">
        {/* אזור התוכן הנגלל */}
        <div className="war-step-container">
          {/* כותרת השלב */}
          {currentStep.subTitle && (
            <h2 className="war-subtitle">
              {currentStep.subTitle}
            </h2>
          )}

          {/* הטקסט הראשי */}
          <p className="war-short-text">
            {currentStep.text}
          </p>
        </div>

        {/* בר ניווט תחתון בתוך הפופ-אפ */}
        <div className="war-bottom-navigation">
          {/* חץ ימינה (הקודם ב-RTL) */}
 

          {/* חץ שמאלה (הבא ב-RTL) */}
          <button 
            onClick={goToNextStep} 
            disabled={currentStepIndex === stepsData.length - 1}
            aria-label="הבא"
            className="war-nav-btn"
          >
            ⬅
          </button>

                   {/* אינדיקטור מספרי */}
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
      {/* כפתור יציאה מהעמוד */}
      <NextButton onClick={handleExitPage} />
    </div>
  );
}

export default AtWar;