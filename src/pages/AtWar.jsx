import React, { useState } from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import Popup from '../components/Popup'; // שימוש בפופ-אפ הגנרי
import StepNumber from '../components/StepNumber'; // שימוש בעיגול המספר הגנרי

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
    videoUrl: "https://inri-pkrf.github.io/know-college/assets/media/war.mp4",
    videoThumbnail: `${process.env.PUBLIC_URL}/assets/AtWar/all/play-icon.png`,
    longDescription: ` במסגרת מאמצי הפיקוד, הובילה המכללה שני מוקדי סיוע לאומיים - המרס"ל (מרכז סיוע לאזרח) שמקדם תהליך של מיצוי יכולות בתוך פקע"ר בהתאם להכוונת הסיוע לרשויות המקומיות, והשני, משל"ט ינאי, שריכז את משימת המפונים והמתפנים בבתי המלון וסיפק תמונת מצב לאומית. `,
    bgImage: `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.png`,
    popups: [
      // x, y, width, height: מגדירים את הדיב השקוף של הבניין (לפי אחוזי מיכל התמונה)
      // topNum, leftNum: מועברים כעת ישירות כ-Props ב-vh ו-vw (כמו בעמוד הדיגיטלי העובד שלך)
      { 
        id: 1, 
        title: `מרס"ל`, 
        content: `במהלך הפעלת המרס"ל מאוקטובר 2023 עד פברואר 2024, טיפלו במרס"ל בלמעלה מ-700 פניות שעלו מהמחוזות בתחומים שונים כמו אספקת מנות מזון, חיתולים, מטרנה, מתנדבים, שינוע תרופות ועוד משימות ייחודיות וערכיות, שלא ניתן להן כל מענה ממקורות אחרים.`, 
        borderColor: "#8D242D",
        x: "70%", y: "5%", width: "20%", height: "35%",
        topNum: "7vh", leftNum: "69vw" 
      },
      { 
        id: 2, 
        title: "משלט ינאי", 
        content: `אפשר לומר שחוץ מראש הממשלה כולם הגיעו לבקר - מהנשיא ורעייתו, הרמטכ"ל, שרים, מנכ"לי משרדי ממשלה, אלופי המטכ"ל ועוד. המשל"ט ניהל, ריכז ותכלל את תמונת המצב של המפונים בבתי המלון עם למעלה מרבע מיליון ישראלים שיצאו מביתם, 97 יישובים מתפנים ו-456 מלונות בשיא.`, 
        borderColor: "#B74548",
        x: "48%", y: "20%", width: "18%", height: "20%",
        topNum: "14vh", leftNum: "35vw" 
      },
      { 
        id: 3, 
        title: "המכללה בחירום", 
        content: `לצד שתי המשימות הלאומיות, המכללה המשיכה להכשיר בחירום קורסים לבעלי תפקידים שהיו נחוצים בשטח, הנגשנו תוכן מקצועי ומתוקף לבעלי התפקידים ברשויות, ביצענו 'זמן יקר' במפקדות, הפצנו תוכן דיגיטלי לצוותי הצח"י ומנהלי המכלולים, ערכנו אבחון לקריית שמונה לסיוע בהתמודדות הרשות עם אתגרי הפינוי ופיצול הרשות ועוד פעולות רבות כחלק מהמאמץ המלחמתי בעורף.`, 
        borderColor: "#924768",
        x: "25%", y: "2%", width: "18%", height: "38%",
        topNum: "2vh", leftNum: "16vw" 
      },
      { 
        id: 4, 
        title: `ביקור נשיא המדינה ורעייתו במרס"ל`, 
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span></span>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/marsel.jpg`} // שים כאן את הנתיב והשם האמיתי של התמונה שלך
              alt="img"
              style={{ 
                width: '100%', 
                borderRadius: '1vh', 
                marginTop: '1vh',
              }} 
            />
          </div>
        ), 
        borderColor: "#585480",
        x: "1%", y: "5%", width: "19%", height: "35%",
        topNum: "7vh", leftNum: "-3vw" 
      }
    ]
  },
  yomKippur: {
    title: "מלחמת יום הכיפורים",
    date: "אוקטובר 1973",
    shortDescription: "כאן נכנס תקציר קצר על מלחמת יום כיפור...",
    videoUrl: "https://inri-pkrf.github.io/know-college/assets/media/war.mp4",
    videoThumbnail: `${process.env.PUBLIC_URL}/assets/AtWar/all/play-icon.png`,
    longDescription: "כאן נכנסת הפסקה המורחבת של העמוד השני עבור מלחמת יום כיפור...",
    bgImage: `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.png`, 
    popups: [
      { id: 1, title: "כותרת פופאפ 1", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "15%", y: "40%", width: "20%", height: "40%", topNum: "50vh", leftNum: "25vw" },
      { id: 2, title: "כותרת פופאפ 2", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "55%", y: "30%", width: "20%", height: "40%", topNum: "40vh", leftNum: "65vw" },
      { id: 3, title: "כותרת פופאפ 3", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "40%", y: "60%", width: "20%", height: "40%", topNum: "70vh", leftNum: "50vw" },
      { id: 4, title: "כותרת פופאפ 4", content: "תוכן שונה למלחמה זו...", borderColor: "#52AECA", x: "80%", y: "70%", width: "20%", height: "40%", topNum: "80vh", leftNum: "90vw" }
    ]
  }
};

function AtWar({ onGoHome, progress, onProgress }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activePopup, setActivePopup] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // מנגנון סדר הלחיצות המקורי מהדוגמה שלך
  const [nextRequiredId, setNextRequiredId] = useState(1);
  
    const playPopSound = () => {
      try {
        const soundPath = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/assets/Audio/pop.mp3`;
        const audio = new Audio(soundPath);
        audio.load();
        audio.play().catch(err => console.log("סאונד נחסם:", err));
      } catch (e) {
        console.log('playPopSound error', e);
      }
    };

  const currentWarKey = 'ironSwords'; 
  const data = warsData[currentWarKey];

  // לוגיקת ניהול הלחיצות
  const handleBuildingClick = (id, popupInfo) => {
    if (id === nextRequiredId) {
      playPopSound();
      setActivePopup({
        title: popupInfo.title,
        content: popupInfo.content,
        borderColor: popupInfo.borderColor,
        isWarning: false
      });
      setNextRequiredId(prev => prev + 1);
    } else if (id > nextRequiredId) {
      playPopSound();
      setActivePopup({
        title: "אופס, הלכת רחוק מדי",
        content: "יש ללחוץ לפי הסדר",
        borderColor: "#000641",
        isWarning: true
      });
    } else {
      playPopSound();
      setActivePopup({
        title: popupInfo.title,
        content: popupInfo.content,
        borderColor: popupInfo.borderColor,
        isWarning: false
      });
    }
  };

  const handleNextClick = () => {
    onProgress?.(`atWar-page-${currentPage}`);
    if (currentPage === 1) {
      setCurrentPage(2); 
      setIsVideoPlaying(false); 
    } else {
      onGoHome(); 
    }
  };

  return (
    <div className="page-container at-war-page" style={{ position: 'relative' }}>
      <HomeButton onClick={onGoHome} progress={progress} />
      
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
          
          <div className="interactive-image-container" style={{ position: 'relative' }}>
            <img 
              src={data.bgImage} 
              alt="img " 
              className="war-interactive-img"
            />
          <img
            className="AtWar-sky"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/sky.png`}
            alt="sky"
          />
          <img
            className="AtWar-jeep"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/jeep.png`}
            alt="jeep"
          />
          <img
            className="AtWar-tank"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/tank.png`}
            alt="tank"
          />
          <img
            className="AtWar-dust"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/dust.png`}
            alt="dust"
          />          
          <img
            className="AtWar-solider1"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/solider1.png`}
            alt="soldier1"
          />
       <img
            className="AtWar-solider2"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/solider2.png`}
            alt="soldier2"
          />          
          <img
            className="AtWar-plane1"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/plane1.png`}
            alt="plane1"
          />
          <img
            className="AtWar-plane2"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/plane2.png`}
            alt="plane2"
          />

          <img
            className="AtWar-bg-building"
            src={`${process.env.PUBLIC_URL}/assets/AtWar/all/bg-building.png`}
            alt="bg-building"
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
                  height: popup.height,
                  backgroundColor: 'transparent',
                  border: 'none',
                  position: 'absolute'
                }}
                onClick={() => handleBuildingClick(popup.id, popup)}
              />
            ))}

            {/* עיגולי המספרים (StepNumber) - מועברים בדיוק בלוגיקה שעובדת לך בעמוד הדיגיטלי */}
            {data.popups.map((popup) => {
              const isVisited = nextRequiredId > popup.id;
              const currentBg = isVisited ? getDarkTranslucentColor(popup.borderColor, 0.6) : '#ffffff';
              const currentBorder = popup.borderColor;
              const currentText = isVisited ? '#ffffff' : popup.borderColor;

              return (
                <div key={popup.id} onClick={() => handleBuildingClick(popup.id, popup)} style={{ cursor: 'pointer' }}>
                  <StepNumber 
                    number={popup.id} 
                    top={popup.topNum} 
                    left={popup.leftNum}
                    bgColor={currentBg}
                    borderColor={currentBorder}
                    textColor={currentText}
                  />
                </div>
              );
            })}
          </div>      
        </div>
      )}

      {/* --- קומפוננטת הפופ-אפ הגנרית --- */}
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