import React, { useState, useEffect } from 'react';
import '../style/NationalLibrary.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import Popup from '../components/Popup'; 
import StepNumber from '../components/StepNumber'; 

// פונקציית עזר להחשכת צבע והחלת שקיפות
const getDarkTranslucentColor = (hex, alpha = 0.9, darkenFactor = 0.8) => {
  const cleanHex = hex.replace('#', '');
  let r = parseInt(cleanHex.slice(0, 2), 16);
  let g = parseInt(cleanHex.slice(2, 4), 16);
  let b = parseInt(cleanHex.slice(4, 6), 16);
  r = Math.floor(r * darkenFactor);
  g = Math.floor(g * darkenFactor);
  b = Math.floor(b * darkenFactor);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function NationalLibrary({ onGoHome, progress, onProgress }) {
  const [activePopup, setActivePopup] = useState(null);
  
  // מנגנון סדר הלחיצות הקשיח (מתחיל מ-1)
  const [nextRequiredId, setNextRequiredId] = useState(1);

  // סטייטים לאנימציית כניסה מדורגת של הספרים
  const [animateBook1, setAnimateBook1] = useState(false);
  const [animateBook2, setAnimateBook2] = useState(false);
  const [animateBook3, setAnimateBook3] = useState(false);
  const [animateBook4, setAnimateBook4] = useState(false);
  const [animateBook5, setAnimateBook5] = useState(false);

  // סטייט שמציג את המספרים הלחיצים רק בסיום האנימציות של כל הספרים
  const [showInteractiveSteps, setShowInteractiveSteps] = useState(false);

  // נתוני הפופ-אפים והמיקומים
  const booksData = {
    1: {
      colorId: 'pink',
      title: "",
      content: " אתר המכללה מרכז בתוכו גם את הספרייה הלאומית לחירום - מאגר ידע להיערכות, התערבות ושיקום. ",
      borderColor: "#FFA1CD",
      topNum: "45vh",  
      leftNum: "70vw"
    },
    2: {
      colorId: 'purple',
      title: "",
      content: " הספרייה היא מאגר ידע דיגיטלי מעודכן וכולל כ-1,500 פרטי מידע, חוקים ותקנות, נהלים ותדריכים, תוכניות מענה, מאמרים ומחקרים, סרטים, קישורים ופודקאסטים. ",
      borderColor: "#8B82BD",
      topNum: "50vh",  
      leftNum: "56vw"
    },
    3: {
      colorId: 'orange', 
      title: " מובילי הידע ",
      content: " הנגשת הידע ללא מגבלות מתגשם בזכות שיתוף פעולה פורה עם למעלה מ-75 ארגונים מהמגזר הציבורי כמו משרדי הממשלה, רשויות ייעודיות, הרשויות המקומיות, ארגוני חירום והצלה, אקדמיה ומכוני מחקר ופעילות המגזר השלישי. ",
      borderColor: "#DD5C00",
      topNum: "34vh",  
      leftNum: "45vw"
    },
    4: {
      colorId: 'green',
      title: "צפו בסרטון",
      content: (
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <span style={{ marginBottom: '2vh', textAlign: 'center' }}>
            בהתאם לצורך, ניתן לחפש קבצים בספרייה, לצפות, להוריד או לשתף.
          </span>
          <video 
            src="https://inri-pkrf.github.io/know-college/assets/media/library.mp4"
            controls
            controlsList="nodownload"
            playsInline
            style={{ 
              width: "100%", 
              maxWidth: "400px", 
              borderRadius: "1vh", 
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              outline: "none"
            }}
          />
        </span>
      ),
      borderColor: "#358047",
      topNum: "43vh",  
      leftNum: "40vw"
    },
    5: {
      colorId: 'yellow',
      title: " כדאי לשמור את הקישור ",
      content: (
        <span>
          תמצאו בספרייה הרבה חומרים מקצועיים שבטוח תצטרכו בשגרה ובחירום.
          <br /><br />
          <a 
            href="https://inri.orc.org.il/%D7%94%D7%A1%D7%A4%D7%A8%D7%99%D7%99%D7%94-%D7%94%D7%9C%D7%90%D7%95%D7%9E%D7%99%D7%AA-%D7%9C%D7%97%D7%99%D7%A8%D7%95%D7%9D/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#ffffff", 
              backgroundColor: "#FDAC00", 
              fontWeight: "bold",
              padding: "1vh 2vh",
              borderRadius: "1vh",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "2vh",
              display: "inline-block"
            }}
          >
           קישור לספרייה
          </a>
        </span>
      ),
      borderColor: "#FDAC00",
      topNum: "39vh",  
      leftNum: "20vw"
    }
  };

  // פונקציה להפעלת סאונד הפצפוץ
  const playPopSound = () => {
    const soundPath = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/assets/Audio/pop.mp3`;
    const audio = new Audio(soundPath);
    audio.load();
    audio.play().catch(err => console.log("סאונד נחסם:", err));
  };

  // לוגיקת הלחיצות שמוודאת שהולכים בדיוק לפי הסדר
  const handleBookClick = (id) => {
    if (!showInteractiveSteps) return; // לא מאפשר לחיצות בזמן שהאנימציה רצה

    if (id === nextRequiredId) {
      const titleColor = getDarkTranslucentColor(booksData[id].borderColor, 1, 0.7); 
      const formattedTitle = booksData[id].title ? (
        <span style={{ color: titleColor }}>{booksData[id].title}</span>
      ) : "";

      playPopSound();
      setActivePopup({
        title: formattedTitle,
        content: booksData[id].content,
        borderColor: booksData[id].borderColor,
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
      const titleColor = getDarkTranslucentColor(booksData[id].borderColor, 1, 0.7);
      const formattedTitle = booksData[id].title ? (
        <span style={{ color: titleColor }}>{booksData[id].title}</span>
      ) : "";

      playPopSound();
      setActivePopup({
        title: formattedTitle,
        content: booksData[id].content,
        borderColor: booksData[id].borderColor,
        isWarning: false
      });
    }
  };

  // useEffect לניהול תזמוני האנימציה והפעלת הסאונדים
  useEffect(() => {
    // פתיחת חסימת האודיו בדפדפנים ניידים
    const unlockAudio = () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    let t1, t2, t3, t4, t5, t6;

    // ספר 1 - ורוד
    t1 = setTimeout(() => {
      setAnimateBook1(true);
      playPopSound();
    }, 300);

    // ספר 2 - סגול
    t2 = setTimeout(() => {
      setAnimateBook2(true);
      playPopSound();
    }, 800);

    // ספר 3 - כתום
    t3 = setTimeout(() => {
      setAnimateBook3(true);
      playPopSound();
    }, 1300);

    // ספר 4 - ירוק
    t4 = setTimeout(() => {
      setAnimateBook4(true);
      playPopSound();
    }, 1800);

    // ספר 5 - צהוב
    t5 = setTimeout(() => {
      setAnimateBook5(true);
      playPopSound();
    }, 2300);

    // חשיפת מספרי השלבים והפעלת אינטראקטיביות
    t6 = setTimeout(() => {
      setShowInteractiveSteps(true);
      playPopSound();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      <HomeButton onClick={onGoHome} progress={progress} />
      
      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />
      
      <h1 id="activity-title">הספרייה הלאומית</h1>
      <p id="NationalLibrary-text1">מאגר ידע לאומי לחירום לחיזוק האיתנות של מדינת ישראל</p>
      
      <img 
        src={`${process.env.PUBLIC_URL}/assets/NationalLibrary/shelf.png`} 
        alt="Shelf" 
        id="NationalLibrary-shelf"
      />

      {/* הספרים הלחיצים הכוללים כעת את ה-class של האנימציה */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/NationalLibrary/book-pink.png`} 
        alt="book" 
        id="NationalLibrary-book-pink"
        className={`pop-element ${animateBook1 ? 'is-visible' : ''}`}
        onClick={() => handleBookClick(1)} 
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />
      <img 
        src={`${process.env.PUBLIC_URL}/assets/NationalLibrary/book-purple.png`} 
        alt="book" 
        id="NationalLibrary-book-purple"
        className={`pop-element ${animateBook2 ? 'is-visible' : ''}`}
        onClick={() => handleBookClick(2)} 
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />
      <img 
        src={`${process.env.PUBLIC_URL}/assets/NationalLibrary/book-orange.png`} 
        alt="book" 
        id="NationalLibrary-book-orange"
        className={`pop-element ${animateBook3 ? 'is-visible' : ''}`}
        onClick={() => handleBookClick(3)} 
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />
      <img 
        src={`${process.env.PUBLIC_URL}/assets/NationalLibrary/book-green.png`} 
        alt="book" 
        id="NationalLibrary-book-green"
        className={`pop-element ${animateBook4 ? 'is-visible' : ''}`}
        onClick={() => handleBookClick(4)} 
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />
      <img 
        src={`${process.env.PUBLIC_URL}/assets/NationalLibrary/book-yellow.png`} 
        alt="book" 
        id="NationalLibrary-book-yellow"
        className={`pop-element ${animateBook5 ? 'is-visible' : ''}`}
        onClick={() => handleBookClick(5)} 
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />

      {/* יצירה דינמית של עיגולי המספרים מעל הספרים - מופיעים רק בסיום האנימציות */}
      {showInteractiveSteps && 
        Object.keys(booksData).map((id) => {
          const book = booksData[id];
          const isVisited = nextRequiredId > id;
          
          const currentBg = isVisited ? getDarkTranslucentColor(book.borderColor, 0.9) : '#ffffff';
          const currentBorder = book.borderColor;
          const currentText = isVisited ? '#ffffff' : book.borderColor;

          return (
            <div key={id} onClick={() => handleBookClick(Number(id))} style={{ cursor: 'pointer' }}>
              <StepNumber 
                number={id} 
                top={book.topNum} 
                left={book.leftNum} 
                bgColor={currentBg}
                borderColor={currentBorder}
                textColor={currentText}
              />
            </div>
          );
        })
      }

      <NextButton onClick={() => { onProgress?.('nationalLibrary'); onGoHome(); }} />

      {activePopup && (
        <Popup 
          title={activePopup.title}
          content={activePopup.content}
          borderColor={activePopup.borderColor}
          isWarning={activePopup.isWarning}
          onClose={() => setActivePopup(null)}
        />
      )}

    </div>
  );
}

export default NationalLibrary;