import React, { useState } from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import Popup from '../components/Popup'; // שימוש בפופ-אפ הגנרי מהדוגמה שלך
import StepNumber from '../components/StepNumber'; // שימוש בעיגול המספר הגנרי מהדוגמה שלך

// פונקציית העזר המקורית שלך מהדוגמה להחשכת צבע ה-Border של המספרים שכבר ביקרו בהם
const getDarkTranslucentColor = (hex, alpha = 0.8) => {
  const cleanHex = hex.replace('#', '');
  let r = parseInt(cleanHex.slice(0, 2), 16);
  let g = parseInt(cleanHex.slice(2, 4), 16);
  let b = parseInt(cleanHex.slice(4, 6), 16);
  r = Math.floor(r * 0.6);
  g = Math.floor(g * 0.6);
  b = Math.floor(b * 0.6);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ========================================================
// נתוני המלחמות - מותאמים בול למבנה הפופ-אפים והמספרים
// ========================================================
const warsData = {
  ironSwords: {
    title: "מלחמת חרבות ברזל",
    date: "7 באוקטובר 2023 - הווה",
    shortDescription: " עם פרוץ המלחמה והכרזת 'מצב מיוחד בעורף', עברה המכללה להפעלה במצב חירום. ",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    videoThumbnail: `${process.env.PUBLIC_URL}/assets/AtWar/all/play-icon.png`,
    longDescription: ` במסגרת מאמצי הפיקוד, הובילה המכללה שני מוקדי סיוע לאומיים - המרס"ל (מרכז סיוע לאזרח) שמקדם תהליך של מיצוי יכולות בתוך פקע"ר בהתאם להכוונת הסיוע לרשויות המקומיות, והשני, משל"ט ינאי, שריכז את משימת המפונים והמתפנים בבתי המלון וסיפק תמונת מצב לאומית. `,
    bgImage: `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.png`,
    popups: [
      // x, y, width, height: מגדירים את הדיב השקוף של הבניין (לפי אחוזי מיכל התמונה)
      // topNum, leftNum: מגדירים איפה יצוף עיגול המספר של הלומדה
      { 
        id: 1, 
        title: "חמ״ל מתנדבים", 
        content: "הקמת מערך סיוע אזרחי שסיפק ציוד ומזון.", 
        borderColor: "#52AECA",
        x: "15%", y: "20%", width: "20%", height: "55%",
        topNum: "35%", leftNum: "23%" 
      },
      { 
        id: 2, 
        title: "תמיכה נפשית", 
        content: "הפעלת קו חם וסדנאות חוסן מיוחדות.", 
        borderColor: "#52AECA",
        x: "38%", y: "15%", width: "18%", height: "60%",
        topNum: "42%", leftNum: "46%" 
      },
      { 
        id: 3, 
        title: "המשכיות אקדמית", 
        content: "מעבר מהיר ללמידה היברידית.", 
        borderColor: "#52AECA",
        x: "58%", y: "30%", width: "16%", height: "48%",
        topNum: "50%", leftNum: "65%" 
      },
      { 
        id: 4, 
        title: "סיוע לרשויות", 
        content: "שילוב מומחים מטעם המכללה במפקדות העורף.", 
        borderColor: "#52AECA",
        x: "76%", y: "25%", width: "20%", height: "60%",
        topNum: "45%", leftNum: "84%" 
      }
    ]
  },
  yomKippur: {
    title: "מלחמת יום הכיפורים",
    date: "אוקטובר 1973",
    shortDescription: "כאן נכנס תקציר קצר על מלחמת יום כיפור...",
    videoUrl: "https://www.youtube.com/embed/קישור_לסרטון_אחר?autoplay=1",
    videoThumbnail: `${process.env.PUBLIC_URL}/assets/AtWar/all/play-icon.png`,
    longDescription: "כאן נכנסת הפסקה המורחבת של העמוד השני עבור מלחמת יום כיפור...",
    bgImage: `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.png`, 
    popups: [
      { id: 1, title: "כותרת פופאפ 1", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "15%", y: "40%", width: "20%", height: "40%", topNum: "50%", leftNum: "25%" },
      { id: 2, title: "כותרת פופאפ 2", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "55%", y: "30%", width: "20%", height: "40%", topNum: "40%", leftNum: "65%" },
      { id: 3, title: "כותרת פופאפ 3", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "40%", y: "60%", width: "20%", height: "40%", topNum: "70%", leftNum: "50%" },
      { id: 4, title: "כותרת פופאפ 4", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "80%", y: "70%", width: "20%", height: "40%", topNum: "80%", leftNum: "90%" }
    ]
  }
};

function AtWar({ onGoHome }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activePopup, setActivePopup] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // מנגנון סדר הלחיצות המקורי מהדוגמה שלך
  const [nextRequiredId, setNextRequiredId] = useState(1);

  const currentWarKey = 'ironSwords'; 
  const data = warsData[currentWarKey];

  // לוגיקת ניהול הלחיצות על הבניינים התואמת לחלוטין את הדוגמה שנתת
  const handleBuildingClick = (id, popupInfo) => {
    if (id === nextRequiredId) {
      setActivePopup({
        title: popupInfo.title,
        content: popupInfo.content,
        borderColor: popupInfo.borderColor,
        isWarning: false
      });
      setNextRequiredId(prev => prev + 1);
    } else if (id > nextRequiredId) {
      setActivePopup({
        title: "אופס, הלכת רחוק מדי",
        content: "יש ללחוץ לפי הסדר",
        borderColor: "#000641",
        isWarning: true
      });
    } else {
      setActivePopup({
        title: popupInfo.title,
        content: popupInfo.content,
        borderColor: popupInfo.borderColor,
        isWarning: false
      });
    }
  };

  const handleNextClick = () => {
    if (currentPage === 1) {
      setCurrentPage(2); 
      setIsVideoPlaying(false); 
    } else {
      onGoHome(); 
    }
  };

  return (
    <div className="page-container at-war-page">
      <HomeButton onClick={onGoHome} />
      
      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />
      
      <h1 id="AtWar-title">המכללה בעת מלחמה</h1>

      {/* --- עמוד 1: פרטים כלליים ותמונת וידאו לחיצה --- */}
      {currentPage === 1 && (
        <div className="war-step-container step-one">
          <h2 className="war-name">{data.title}</h2>
          <span className="war-date">{data.date}</span>
          <p className="war-short-text">{data.shortDescription}</p>
          
          <div className="video-wrapper">
            <div className="video-thumbnail-container" onClick={() => setIsVideoPlaying(true)}>
              <img 
                className="video-poster-img"
                src={data.videoThumbnail} 
                alt="לחץ להפעלת סרטון" 
              />
            </div>
          </div>
        </div>
      )}

      {/* --- עמוד 2: פסקה מורחבת ותמונה אינטראקטיבית עם פופאפים לפי סדר --- */}
      {currentPage === 2 && (
        <div className="war-step-container step-two">
          <h2 className="war-title2"> לחצו על הבניינים כדי לגלות עוד </h2>
          <p className="war-long-text">{data.longDescription}</p>
          
          <div className="interactive-image-container">
            <img 
              src={data.bgImage} 
              alt="בנייני המכללה" 
              className="war-interactive-img"
            />
            
            {/* שטחי הלחיצה השקופים מעל הבניינים */}
            {data.popups.map((popup) => (
              <button
                key={`btn-${popup.id}`}
                className="building-click-area"
                style={{ 
                  left: popup.x, 
                  top: popup.y, 
                  width: popup.width, 
                  height: popup.height 
                }}
                onClick={() => handleBuildingClick(popup.id, popup)}
              />
            ))}

            {/* עיגולי המספרים (StepNumber) הצפים מעל הבניינים עם לוגיקת הצבעים מהדוגמה */}
            {data.popups.map((popup) => {
              const isVisited = nextRequiredId > popup.id;
              const currentBg = isVisited ? getDarkTranslucentColor(popup.borderColor, 0.6) : '#ffffff';
              const currentBorder = popup.borderColor;
              const currentText = isVisited ? '#ffffff' : popup.borderColor;

              return (
                <div 
                  key={`num-${popup.id}`} 
                  onClick={() => handleBuildingClick(popup.id, popup)} 
                  className="number-component-wrapper"
                  style={{ top: popup.topNum, left: popup.leftNum }}
                >
                  <StepNumber 
                    number={popup.id} 
                    top="0" /* מאופס כי המיקום מנוהל על ידי קופסת העטיפה */
                    left="0"
                    bgColor={currentBg}
                    borderColor={currentBorder}
                    textColor={currentText}
                  />
                </div>
              );
            })}
          </div>      
          
          <button className="back-to-video-btn" onClick={() => { setCurrentPage(1); setActivePopup(null); }}>
              לעמוד הקודם
          </button>
        </div>
      )}

      {/* --- קומפוננטת הפופ-אפ הגנרית שלך --- */}
      {activePopup && (
        <Popup 
          title={activePopup.title}
          content={activePopup.content}
          borderColor={activePopup.borderColor}
          isWarning={activePopup.isWarning}
          onClose={() => setActivePopup(null)}
        />
      )}

      {/* --- פופ-אפ סרטון עצמאי ומחשיך --- */}
      {isVideoPlaying && (
        <div className="video-modal-overlay" onClick={() => setIsVideoPlaying(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoPlaying(false)}>×</button>
            <div className="video-modal-responsive">
              <iframe
                src={data.videoUrl}
                title={`סרטון - ${data.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <NextButton onClick={handleNextClick} />
    </div>
  );
}

export default AtWar;