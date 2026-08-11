import React, { useState, useRef } from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import AboutMe from '../components/AboutMe';

const stepsData = [
  {
    id: 'ironSwords_main',
    // פופ-אפ 1: חרבות ברזל
    text: "עם פרוץ המלחמה והכרזת 'מצב מיוחד בעורף', עברה המכללה להפעלה במצב חירום. במסגרת מאמצי הפיקוד, הובילה המכללה שני מוקדי סיוע לאומיים - המרס\"ל (מרכז סיוע לאזרח) שמקדם תהליך של מיצוי יכולות בתוך פקע\"ר בהתאם להכוונת הסיוע לרשויות המקומיות, והשני, משל\"ט ינאי, שריכז את משימת המפונים והמתפנים בבתי המלון וסיפק תמונת מצב לאומית."
  },
  {
    id: 'ironSwords_marsal',
    subTitle: 'מרס"ל',
    // פופ-אפ 2: חרבות ברזל, שאגת הארי, עם כלביא
    icons: [
      { src: `${process.env.PUBLIC_URL}/assets/AtWar/all/haravot-barzel.svg`, alt: 'חרבות ברזל' },
      { src: `${process.env.PUBLIC_URL}/assets/AtWar/all/Ari-1.svg`, alt: 'שאגת הארי' },
      { src: `${process.env.PUBLIC_URL}/assets/AtWar/all/am-kelavie.svg`, alt: 'עם כלביא' }
    ],
    text: 'במהלך הפעלת המרס"ל מאוקטובר 2023 עד פברואר 2024, טיפלו במרס"ל בלמעלה מ-700 פניות שעלו מהמחוזות בתחומים שונים כמו אספקת מנות מזון, חיתולים, מטרנה, מתנדבים, שינוע תרופות ועוד משימות ייחודיות וערכיות, שלא ניתן להן כל מענה ממקורות אחרים.'
  },
  {
    id: 'ironSwords_yanai',
    subTitle: 'משל"ט ינאי',
    // פופ-אפ 3: חרבות ברזל
    icons: [
      { src: `${process.env.PUBLIC_URL}/assets/AtWar/all/haravot-barzel.svg`, alt: 'חרבות ברזל' }
    ],
    text: 'אפשר לומר שחוץ מראש הממשלה כולם הגיעו לבקר - מהנשיא ורעייתו, הרמטכ"ל, שרים, מנכ"לי משרדי ממשלה, אלופי המטכ"ל ועוד. המשל"ט ניהל, ריכז ותכלל את תמונת המצב של המפונים בבתי המלון עם למעלה מרבע מיליון ישראלים שיצאו מביתם, 97 יישובים מתפנים ו-456 מלונות בשיא.'
  },
  {
    id: 'ironSwords_emergency',
    subTitle: "מרכז למידה מבצעית",
    // פופ-אפ 4: עם כלביא ושאגת הארי
    icons: [
      { src: `${process.env.PUBLIC_URL}/assets/AtWar/all/am-kelavie.svg`, alt: 'עם כלביא' },
      { src: `${process.env.PUBLIC_URL}/assets/AtWar/all/Ari-1.svg`, alt: 'שאגת הארי' }
    ],
    text: `מרכז הלמידה המבצעית של פיקוד העורף, מופעל במכללה בשעת חירום. המרכז מוביל את תהליכי התחקור והפקת הלקחים בפיקוד. בזמן מלחמה עולים למרכז פערים מהשטח בזמן אמת, ובתהליך למידה מקצועי מופקים לקחים ותכנים לדרגי הפיקוד והשליטה בשטח, כדי להשפיע ולקדם למידה מיטבית תחת אש.`
  },
  {
    id: 'ironSwords_visit',
    text: `לצד שתי המשימות הלאומיות, המכללה המשיכה להכשיר בחירום קורסים לבעלי תפקידים שהיו נחוצים בשטח, הנגשנו תוכן מקצועי ומתוקף לבעלי התפקידים ברשויות, ביצענו 'זמן יקר' במפקדות, הפצנו תוכן דיגיטלי לצוותי הצח"י ומנהלי המכלולים, ערכנו אבחון לקריית שמונה לסיוע בהתמודדות הרשות עם אתגרי הפינוי ופיצול הרשות ועוד פעולות רבות כחלק מהמאמץ המלחמתי בעורף.`
  },
  {
    id: 'ironSwords_video',
    videoElement: (
      <video
        src="https://inri-pkrf.github.io/know-college/assets/media/war.mp4"
        controls
        controlsList="nodownload"
        playsInline
        className="war-embedded-video"
      />
    )
  }
];

function AtWar({ onGoHome, progress, onProgress }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      // הכיוונים ההפוכים:
      if (deltaX > 0) {
        goToPrevStep(); // החלקה שמאלה מחזירה אחורה
      } else {
        goToNextStep(); // החלקה ימינה מקדמת קדימה
      }
    }
  };

  return (
    <div className="page-container at-war-page">
      <HomeButton onClick={onGoHome} progress={progress} />
      <AboutMe />

      <div className="atwar-content-wrapper">
        <div className="atwar-header-container">
          <h1 id="AtWar-title">המכללה בעת מלחמה</h1>
          <p id="AtWar-title2">
            עם פרוץ המלחמה והכרזת 'מצב מיוחד בעורף', עברה המכללה להפעלה במצב חירום.
          </p>
          <p id="AtWar-dir">ניתן לדפדף בין העמודים כדי לגלות עוד</p>
        </div>

        <div 
          className="war-popup-card"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="war-step-container">
            {/* 1. האייקונים - מופיעים ראשונים (מעל הכותרת) */}
            {currentStep.icons && currentStep.icons.length > 0 && (
              <div className="war-icons-container">
                {currentStep.icons.map((icon, index) => (
                  <img
                    key={index}
                    src={icon.src}
                    alt={icon.alt}
                    className="war-operation-icon"
                  />
                ))}
              </div>
            )}

            {/* 2. הכותרת */}
            {currentStep.subTitle && (
              <h2 className="war-subtitle">{currentStep.subTitle}</h2>
            )}
            
            {/* 3. הטקסט */}
            {currentStep.text && (
              <p className="war-short-text">{currentStep.text}</p>
            )}

            {/* 4. הוידאו (אם קיים) */}
            {currentStep.videoElement && (
              <div className="war-video-wrapper">
                {currentStep.videoElement}
              </div>
            )}
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
      </div>

      <img
        className="bomb"
        src={`${process.env.PUBLIC_URL}/assets/AtWar/all/bomb.svg`}
        alt="background graphic"
      />

      <NextButton onClick={handleExitPage} />
    </div>
  );
}

export default AtWar;