import React, { useState, useEffect, useRef } from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import Popup from '../components/Popup'; 
import StepNumber from '../components/StepNumber'; 
import AboutMe from '../components/AboutMe';

// פונקציית העזר המקורית שלך
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

// נתוני המלחמות
const warsData = {
  ironSwords: {
    title: "מלחמת חרבות ברזל",
    date: "7.10.2023",
    shortDescription: " עם פרוץ המלחמה והכרזת 'מצב מיוחד בעורף', עברה המכללה להפעלה במצב חירום. ",
    videoUrl: "https://inri-pkrf.github.io/know-college/assets/media/war.mp4",
    videoThumbnail: `${process.env.PUBLIC_URL}/assets/AtWar/all/play-icon.png`,
    customImages: [
      {
        src: `${process.env.PUBLIC_URL}/assets/AtWar/IronSwords/sords.webp`,
        className: "IronSwords-sords", // תוכלי למקם ב-CSS באמצעות Class זה
        showOnPage: 1 // יוצג רק בעמוד הראשון
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/AtWar/ironSwords/custom2.png`,
        className: "AtWar-custom-pic-two", 
        showOnPage: 2 // יוצג רק בעמוד השני
      }
    ],
    longDescription: ` במסגרת מאמצי הפיקוד, הובילה המכללה שני מוקדי סיוע לאומיים - המרס"ל (מרכז סיוע לאזרח) שמקדם תהליך של מיצוי יכולות בתוך פקע"ר בהתאם להכוונת הסיוע לרשויות המקומיות, והשני, משל"ט ינאי, שריכז את משימת המפונים והמתפנים בבתי המלון וסיפק תמונת מצב לאומית. `,
    bgImage: `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.webp`,
    popups: [
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
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/marsel.jpg`} 
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
    title: "מבצע שאגת הארי",
    date: "18.2.2026",
    shortDescription: "כאן נכנס תקציר קצר ...",
    videoUrl: "https://inri-pkrf.github.io/know-college/assets/media/war.mp4",
    videoThumbnail: `${process.env.PUBLIC_URL}/assets/AtWar/all/play-icon.png`,
    customImages: [
      {
        src: `${process.env.PUBLIC_URL}/assets/AtWar/LionRoar/lion.webp`,
        className: "LionRoar-lion", // תוכלי למקם ב-CSS באמצעות Class זה
        showOnPage: 1 // יוצג רק בעמוד הראשון
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/AtWar/ironSwords/custom2.png`,
        className: "AtWar-custom-pic-two", 
        showOnPage: 2 // יוצג רק בעמוד השני
      }
    ],
    longDescription: "כאן נכנסת הפסקה המורחבת של העמוד ...",
    bgImage: `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.webp`, 
    popups: [
      { id: 1, title: "כותרת פופאפ 1", content: "תוכן שונה למלחמה זו...", borderColor: "#8D242D" , x: "70%", y: "5%", width: "20%", height: "35%", topNum: "7vh", leftNum: "69vw" },
      { id: 2, title: "כותרת פופאפ 2", content: "תוכן שונה למלחמה זו...", borderColor: "#B74548", x: "48%", y: "20%", width: "18%", height: "20%", topNum: "14vh", leftNum: "35vw" },
      { id: 3, title: "כותרת פופאפ 3", content: "תוכן שונה למלחמה זו...", borderColor: "#924768", x: "25%", y: "2%", width: "18%", height: "38%", topNum: "2vh", leftNum: "16vw" },
      { id: 4, title: "כותרת פופאפ 4", content: "תוכן שונה למלחמה זו...", borderColor: "#585480", x: "1%", y: "5%", width: "19%", height: "35%", topNum: "7vh", leftNum: "-3vw" }
    ]
  }
};

function AtWar({ onGoHome, progress, onProgress }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activePopup, setActivePopup] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [nextRequiredId, setNextRequiredId] = useState(1);
  const pendingSoundRef = useRef(null);

  // הוספת סטייט לניהול המלחמה הנוכחית
  const [currentWarKey, setCurrentWarKey] = useState('ironSwords'); 
  const data = warsData[currentWarKey];

  // פונקציית עזר המפצלת את כותרת המלחמה/מבצע לשתי שורות (מילה ראשונה בנפרד, והשאר מתחת)
  const renderSplitWarTitle = (title) => {
    if (!title) return '';
    const firstSpaceIndex = title.indexOf(' ');
    if (firstSpaceIndex === -1) return title; // אם אין רווח, נחזיר את הכותרת בשלמותה

    const firstWord = title.substring(0, firstSpaceIndex); // "מלחמת" או "מבצע"
    const restOfTitle = title.substring(firstSpaceIndex + 1); // "חרבות ברזל" או "שאגת הארי"

    return (
      <>
        {firstWord}
        <br />
        {restOfTitle}
      </>
    );
  };

  const playAudioFile = (fileName, volume = 0.85) => {
    const baseUrl = process.env.PUBLIC_URL || '';
    const soundUrl = `${baseUrl}/assets/Audio/${fileName}`;
    const fallbackUrl = `${baseUrl}/assets/audio/${fileName}`;
    const audio = new Audio(soundUrl);
    audio.addEventListener('error', () => {
      if (audio.currentSrc !== fallbackUrl) {
        audio.src = fallbackUrl;
        audio.load();
        audio.play().catch(() => {});
      }
    }, { once: true });
    audio.volume = volume;
    audio.preload = 'auto';
    const playPromise = audio.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        pendingSoundRef.current = { fileName, volume };
      });
    }
  };

  const playPopSound = () => {
    playAudioFile('pop.mp3');
  };

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

  useEffect(() => {
    const unlockAudio = () => {
      if (pendingSoundRef.current) {
        playAudioFile(pendingSoundRef.current.fileName, pendingSoundRef.current.volume);
        pendingSoundRef.current = null;
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
  }, []);

  // עדכון פונקציית המעבר דפים והחלפת המלחמה
  useEffect(() => {
    const imagesToPreload = [
      `${process.env.PUBLIC_URL}/assets/AtWar/all/sky.webp`,
      `${process.env.PUBLIC_URL}/assets/AtWar/all/jeep.png`,
      `${process.env.PUBLIC_URL}/assets/AtWar/all/plane1.png`,
      `${process.env.PUBLIC_URL}/assets/AtWar/all/bg-building.webp`,
      `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.webp`
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [currentWarKey]);

  const handleNextClick = () => {
    onProgress?.(`atWar-${currentWarKey}-page-${currentPage}`);

    if (currentPage === 1) {
      // חרבות ברזל עמוד 1 -> חרבות ברזל עמוד 2
      setCurrentPage(2); 
      setIsVideoPlaying(false); 
    } else if (currentPage === 2 && currentWarKey === 'ironSwords') {
      // חרבות ברזל עמוד 2 -> יום הכיפורים עמוד 1
      setCurrentWarKey('yomKippur');
      setCurrentPage(1);
      setNextRequiredId(1); // איפוס סדר הלחיצות למלחמה הבאה
      setIsVideoPlaying(false);
    } else {
      // יום הכיפורים עמוד 2 -> חזרה הביתה
      onGoHome(); 
    }
  };

  return (
    <div className="page-container at-war-page" style={{ position: 'relative' }}>
      <HomeButton onClick={onGoHome} progress={progress} />
      <AboutMe/>
      {/* <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      /> */}
      
      {/* 🔹 כותרת הדף חזרה להיות שורה אחת רציפה כפי שהייתה במקור */}
      <h1 id="AtWar-title">המכללה בעת מלחמה</h1>

      {/* --- עמוד 1: פרטים כלליים ותמונת וידאו לחיצה --- */}
      {currentPage === 1 && (
        <div className="war-step-container step-one">
          {/* 🔹 כאן מופעל הפיצול - רק על כותרת המלחמה/מבצע הספציפית מהדאטה */}
          <h2 className="war-name">{renderSplitWarTitle(data.title)}</h2>
          <span className="war-date">{data.date}</span>
          <p className="war-short-text">{data.shortDescription}</p>
          
          <div className="video-wrapper">
            <div className="video-thumbnail-container" onClick={() => setIsVideoPlaying(true)}>
              <img 
                className="video-poster-img"
                src={data.videoThumbnail} 
                alt="לחץ להפעלת סרטון"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {data.customImages && data.customImages
            .filter(img => img.showOnPage === 1)
            .map((img, idx) => (
              <img 
                key={`custom-p1-${idx}`}
                src={img.src} 
                className={img.className} 
                alt="custom content" 
              />
            ))}

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
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-sky"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/sky.webp`}
              alt="sky"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-jeep"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/jeep.png`}
              alt="jeep"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-tank"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/tank.png`}
              alt="tank"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-dust"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/dust.png`}
              alt="dust"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-solider1"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/solider1.png`}
              alt="soldier1"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-solider2"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/solider2.png`}
              alt="soldier2"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-plane1"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/plane1.png`}
              alt="plane1"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-plane2"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/plane2.png`}
              alt="plane2"
              loading="lazy"
              decoding="async"
            />

            <img
              className="AtWar-bg-building"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/bg-building.webp`}
              alt="bg-building"
              loading="lazy"
              decoding="async"
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
                  position: 'absolute',
                  zIndex: 12,
                  cursor: 'pointer',
                  pointerEvents: 'auto'
                }}
                onClick={() => handleBuildingClick(popup.id, popup)}
              />
            ))}

            {/* עיגולי המספרים */}
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

      {/* פופ-אפ גנרי */}
      {activePopup && (
        <Popup 
          title={activePopup.title}
          content={activePopup.content}
          borderColor={activePopup.borderColor}
          isWarning={activePopup.isWarning}
          onClose={() => setActivePopup(null)}
        />
      )}

      {/* פופ-אפ סרטון */}
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