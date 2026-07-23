import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import Popup from '../components/Popup'; 
import StepNumber from '../components/StepNumber'; 
import AboutMe from '../components/AboutMe';

// פונקציית עזר לחישוב צבע כהה חצי-שקוף
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

// פיצול כותרת המלחמה/מבצע לשתי שורות
const renderSplitWarTitle = (title) => {
  if (!title) return '';
  const firstSpaceIndex = title.indexOf(' ');
  if (firstSpaceIndex === -1) return title;

  const firstWord = title.substring(0, firstSpaceIndex);
  const restOfTitle = title.substring(firstSpaceIndex + 1);

  return (
    <>
      {firstWord}
      <br />
      {restOfTitle}
    </>
  );
};

// נתוני המלחמות (מוגדרים מחוץ לרכיב למניעת יצירה מחדש בכל רנדור)
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
        className: "IronSwords-sords",
        showOnPage: 1
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/AtWar/ironSwords/custom2.png`,
        className: "AtWar-custom-pic-two", 
        showOnPage: 2
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
            <img 
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/marsel.webp`} 
              alt="ביקור נשיא המדינה"
              loading="lazy"
              decoding="async"
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
    shortDescription: " עם פרוץ המבצע, המכללה המשיכה בפעילויותיה בתנאים מיוחדים. ",
    videoUrl: "https://inri-pkrf.github.io/know-college/assets/media/war.mp4",
    videoThumbnail: `${process.env.PUBLIC_URL}/assets/AtWar/all/play-icon.png`,
    customImages: [
      {
        src: `${process.env.PUBLIC_URL}/assets/AtWar/LionRoar/lion.webp`,
        className: "LionRoar-lion",
        showOnPage: 1
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/AtWar/ironSwords/custom2.png`,
        className: "AtWar-custom-pic-two", 
        showOnPage: 2
      }
    ],
    longDescription: "המכללה המשיכה בפעילויותיה ובתוכנית ההכשרות גם בתקופה זו, תוך התאמה לתנאים המשתנים ומצב הביטחון הנוכחי.",
    bgImage: `${process.env.PUBLIC_URL}/assets/AtWar/all/buildings.webp`, 
    popups: [
      { 
        id: 1, 
        title: "כותרת פופאפ 1", 
        content: "תוכן שונה למלחמה זו...", 
        borderColor: "#8D242D" , 
        x: "70%", y: "5%", width: "20%", height: "35%", 
        topNum: "7vh", leftNum: "69vw" 
      },
      { 
        id: 2, 
        title: "כותרת פופאפ 2", 
        content: "תוכן שונה למלחמה זו...", 
        borderColor: "#B74548", 
        x: "48%", y: "20%", width: "18%", height: "20%", 
        topNum: "14vh", leftNum: "35vw" 
      },
      { 
        id: 3, 
        title: "כותרת פופאפ 3", 
        content: "תוכן שונה למלחמה זו...", 
        borderColor: "#924768", 
        x: "25%", y: "2%", width: "18%", height: "38%", 
        topNum: "2vh", leftNum: "16vw" 
      },
      { 
        id: 4, 
        title: "כותרת פופאפ 4", 
        content: "תוכן שונה למלחמה זו...", 
        borderColor: "#585480", 
        x: "1%", y: "5%", width: "19%", height: "35%", 
        topNum: "7vh", leftNum: "-3vw" 
      }
    ]
  }
};

function AtWar({ onGoHome, progress, onProgress }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activePopup, setActivePopup] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [nextRequiredId, setNextRequiredId] = useState(1);
  const [currentWarKey, setCurrentWarKey] = useState('ironSwords'); 

  const pendingSoundRef = useRef(null);
  const isNavigatingRef = useRef(false); // הגנה בלחיצה כפולה במובייל

  const data = warsData[currentWarKey];

  // פונקציה להשמעת סאונד מיועלת
  const playAudioFile = useCallback((fileName, volume = 0.85) => {
    const baseUrl = process.env.PUBLIC_URL || '';
    const soundUrl = `${baseUrl}/assets/Audio/${fileName}`;
    const fallbackUrl = `${baseUrl}/assets/audio/${fileName}`;
    
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.preload = 'none';

    audio.addEventListener('error', () => {
      if (audio.src !== fallbackUrl) {
        audio.src = fallbackUrl;
        audio.play().catch(() => {});
      }
    }, { once: true });

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        pendingSoundRef.current = { fileName, volume };
      });
    }
  }, []);

  const playPopSound = useCallback(() => {
    playAudioFile('pop.mp3');
  }, [playAudioFile]);

  // לוגיקת ניהול הלחיצות על הבניינים
  const handleBuildingClick = (id, popupInfo) => {
    playPopSound();
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

  // שחרור הגבלת אודיו בלחיצה ראשונה - מותאם למובייל ולמחשב
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

    window.addEventListener('pointerdown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
  }, [playAudioFile]);

  // ניווט בין עמודים ומלחמות עם הגנה מפני Double Tap בטלפונים
  const handleNextClick = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    // מאפשר לחיצה חדשה רק כבור 400 מילי-שניות
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 400);

    if (currentWarKey === 'ironSwords' && currentPage === 1) {
      setCurrentPage(2);
      setIsVideoPlaying(false);
    } else if (currentWarKey === 'ironSwords' && currentPage === 2) {
      setCurrentWarKey('yomKippur');
      setCurrentPage(1);
      setNextRequiredId(1);
      setIsVideoPlaying(false);
    } else if (currentWarKey === 'yomKippur' && currentPage === 1) {
      setCurrentPage(2);
      setIsVideoPlaying(false);
    } else if (currentWarKey === 'yomKippur' && currentPage === 2) {
      onProgress?.('atWar-completed');
      onGoHome();
    }
  };

  return (
    <div className="page-container at-war-page" style={{ position: 'relative' }}>
      <HomeButton onClick={onGoHome} progress={progress} />
      <AboutMe />

      <h1 id="AtWar-title">המכללה בעת מלחמה</h1>

      {/* --- עמוד 1: פרטים כלליים ותמונת וידאו --- */}
      {currentPage === 1 && (
        <div className="war-step-container step-one">
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
                alt="אלמנט מעוצב"
                loading="lazy"
                decoding="async"
              />
            ))}
        </div>
      )}

      {/* --- עמוד 2: פסקה מורחבת ותמונה אינטראקטיבית --- */}
      {currentPage === 2 && (
        <div className="war-step-container step-two">
          <h2 className="war-title2"> לחצו על הבניינים כדי לגלות עוד </h2>
          <p className="war-long-text">{data.longDescription}</p>
          
          <div className="interactive-image-container" style={{ position: 'relative' }}>
            <img 
              src={data.bgImage} 
              alt="בניינים" 
              className="war-interactive-img"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-sky"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/sky.webp`}
              alt="שמיים"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-jeep"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/jeep.webp`}
              alt="ג'יפ"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-tank"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/tank.webp`}
              alt="טנק"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-dust"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/dust.webp`}
              alt="אבק"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-solider1"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/solider1.webp`}
              alt="חייל 1"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-solider2"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/solider2.webp`}
              alt="חייל 2"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-plane1"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/plane1.webp`}
              alt="מטוס 1"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-plane2"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/plane2.png`}
              alt="מטוס 2"
              loading="lazy"
              decoding="async"
            />
            <img
              className="AtWar-bg-building"
              src={`${process.env.PUBLIC_URL}/assets/AtWar/all/bg-building.webp`}
              alt="בניין ברקע"
              loading="lazy"
              decoding="async"
            />

            {/* שטחי הלחיצה השקופים מעל הבניינים */}
            {data.popups.map((popup) => (
              <button
                key={`btn-${popup.id}`}
                className="building-click-area"
                aria-label={popup.title}
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
                <div key={`step-${popup.id}`} onClick={() => handleBuildingClick(popup.id, popup)} style={{ cursor: 'pointer' }}>
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

      {/* פופ-אפ סרטון - מרונדר רק כשהנגן פעיל */}
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