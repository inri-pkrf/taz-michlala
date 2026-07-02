import React, { useState, useEffect } from 'react';
import Popup from '../components/Popup'; // ייבוא הפופ-אפ הגנרי שלך
import StepNumber from '../components/StepNumber'; // ייבוא עיגול המספר הגנרי שלך
import '../style/DigitalAssets.css';

// פונקציית עזר שממירה Hex ל-RGBA, מחשיכה את הצבע ב-40% ומחילה שקיפות (כמו ב-Activity)
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

function DigitalAssetsStep1() {
  // סטייטים לאנימציות הכניסה של האלמנטים
  const [animatePic1, setAnimatePic1] = useState(false);
  const [animatePic2, setAnimatePic2] = useState(false);
  const [animatePic3, setAnimatePic3] = useState(false);
  const [animateText2, setAnimateText2] = useState(false);
  const [animateLamp, setAnimateLamp] = useState(false);

  // סטייט שמציג את המספרים הלחיצים רק בסיום כל האנימציות
  const [showInteractiveSteps, setShowInteractiveSteps] = useState(false);

  // מנגנון סדר הלחיצות: שומר מהו ה-ID הבא שחובה ללחוץ עליו
  const [nextRequiredId, setNextRequiredId] = useState(1);
  const [activePopup, setActivePopup] = useState(null);

  // נתוני הפופ-אפים והמיקומים של המספרים מעל הציורים
  const assetsPopupsData = {
1: {
      title: "ידע ומידע - הכל באתר המכללה",
      // שימוש ב-JSX כדי לשלב את הקישור בצורה אינטגרטיבית בתוך התוכן
      content: (
        <span>
          באתר המכללה ניתן להירשם ולקבל מידע על כל ההכשרות שלנו לבעלי תפקידים במשרדי הממשלה, הרשויות המקומיות ובמפקדות צבאיות.
          <br /><br />
          <a 
            href="https://inri.orc.org.il/" // תפתחי את הגרשיים ותחליפי בכתובת האמיתית של האתר שלכן
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#52AECA",          // צבע תואם לבורדר של הכרטיסייה
              textDecoration: "underline", 
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            לחצו כאן למעבר לאתר המכללה
          </a>
        </span>
      ),
      borderColor: "#52AECA", 
      topNum: "35vh",
      leftNum: "82vw"
    },
    2: {
      title: "מידע על הכשרות צבאיות, נתונים היסטוריים ותוכן מקצועי  ",
      content: "המידע הצבאי במרחב המכללה מכיל את ׳אתר שיתוף הידע׳ המסייע לשימור ידע של קורסים, מופעים ומצגות. האתר נגיש לכל מי שברשותו גישה למחשב צבאי, דרך צהלנ״ט כותבים בחיפוש: ׳אתר שיתוף הידע׳. ",
      borderColor: "#52AECA", 
      topNum: "42vh",
      leftNum: "15vw"
    },
    3: {
      title: "פורטל הידע המשותף",
      content: "מאגר מידע מנגיש ומהיר לשיתוף ידע קריטי בזמן אמת בין משרדי הממשלה והרשויות המקומיות.",
      borderColor: "#52AECA", 
      topNum: "53vh",
      leftNum: "68vw"
    }
  };

// פונקציה להשמעת סאונד הפצפוץ
  const playPopSound = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/assets/audio/pop.mp3`);
    // בניידים כדאי להגדיר שהסאונד ייטען מראש
    audio.load(); 
    audio.play().catch(err => console.log("סאונד נחסם בנייד:", err));
  };

  // לוגיקת ניהול הלחיצות לפי הסדר המדויק שלך
  const handleAssetClick = (id) => {
    // מונע לחיצה לפני שכל האנימציות הסתיימו והמספרים הופיעו
    if (!showInteractiveSteps) return;

    if (id === nextRequiredId) {
      setActivePopup({
        title: assetsPopupsData[id].title,
        content: assetsPopupsData[id].content,
        borderColor: assetsPopupsData[id].borderColor,
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
      // אם כבר ביקרו בו, מאפשר לפתוח שוב לצפייה חוזרת
      setActivePopup({
        title: assetsPopupsData[id].title,
        content: assetsPopupsData[id].content,
        borderColor: assetsPopupsData[id].borderColor,
        isWarning: false
      });
    }
  };

  useEffect(() => {
    // פונקציית פתיחת חסימה משופרת - מנגנת סאונד שקט כדי למנוע כפילות!
    const unlockAudio = () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        // יצירת סיגנל שקט לחלוטין רק כדי "להעיר" את הרמקול של הטלפון
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }

      // מסירים את המאזינים מיד לאחר הנגיעה הראשונה
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    // מאזינים לנגיעה או לחיצה ראשונה של המשתמש במסך
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    // --- הטיימרים הרגילים והנקיים שלך ---
    let timer1, timer2, timer3, timer4, timer5, timer6;

    timer1 = setTimeout(() => {
      setAnimatePic1(true);
      playPopSound();
    }, 300);

    timer2 = setTimeout(() => {
      setAnimatePic2(true);
      playPopSound();
    }, 900);

    timer3 = setTimeout(() => {
      setAnimatePic3(true);
      playPopSound();
    }, 1500);

    timer4 = setTimeout(() => {
      setAnimateText2(true);
      playPopSound();
    }, 2100);

    timer5 = setTimeout(() => {
      setAnimateLamp(true);
      playPopSound();
    }, 2700);

    timer6 = setTimeout(() => {
      setShowInteractiveSteps(true);
      playPopSound();
    }, 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      
      <h1 id="activity-title">נכסים דיגיטליים של המכללה</h1>
      <p id="DigitalAssetsStep1-text1">לחצו על הכרטיסיות כדי לגלות עוד</p>
      
      {/* אלמנטים קבועים ויציבים ברקע */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/DigitalAssets/computer.png`} 
        alt="מחשב" 
        id="DigitalAssets-computer"
      />
      
      <img 
        src={`${process.env.PUBLIC_URL}/assets/DigitalAssets/blob.png`} 
        alt="bg" 
        id="DigitalAssets-blob"
      />
      
      {/* שלוש התמונות האנימטיביות - הוספנו להן פונקציית לחיצה וסמן יד */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/DigitalAssets/pic1.png`} 
        alt="bg" 
        id="DigitalAssets-pic1"
        className={`pop-element ${animatePic1 ? 'is-visible' : ''}`}
        onClick={() => handleAssetClick(1)}
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />
      
      <img 
        src={`${process.env.PUBLIC_URL}/assets/DigitalAssets/pic2.png`} 
        alt="bg" 
        id="DigitalAssets-pic2"
        className={`pop-element ${animatePic2 ? 'is-visible' : ''}`}
        onClick={() => handleAssetClick(2)}
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />
      
      <img 
        src={`${process.env.PUBLIC_URL}/assets/DigitalAssets/pic3.png`} 
        alt="bg" 
        id="DigitalAssets-pic3"
        className={`pop-element ${animatePic3 ? 'is-visible' : ''}`}
        onClick={() => handleAssetClick(3)}
        style={{ cursor: showInteractiveSteps ? 'pointer' : 'default' }}
      />
      
      {/* המנורה (light-bomb) שיורדת מלמעלה */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/DigitalAssets/light-bomb.png`} 
        alt="bg" 
        id="DigitalAssets-light-bomb"
        className={`lamp-element ${animateLamp ? 'is-dropped' : ''}`}
      />

      {/* יצירה דינמית של עיגולי המספרים מעל הכרטיסיות רק לאחר סיום האנימציה */}
      {showInteractiveSteps && 
        Object.keys(assetsPopupsData).map((id) => {
          const asset = assetsPopupsData[id];
          const isVisited = nextRequiredId > id;
          
          // עיצוב דינמי: משתנה לצבע כהה-שקוף אם כבר לחצו עליו, או נשאר לבן אם טרם ביקרו בו
          const currentBg = isVisited ? getDarkTranslucentColor(asset.borderColor, 0.6) : '#ffffff';
          const currentBorder = asset.borderColor;
          const currentText = isVisited ? '#ffffff' : asset.borderColor;

          return (
            <div key={id} onClick={() => handleAssetClick(Number(id))} style={{ cursor: 'pointer' }}>
              <StepNumber 
                number={id} 
                top={asset.topNum} 
                left={asset.leftNum} 
                bgColor={currentBg}
                borderColor={currentBorder}
                textColor={currentText}
              />
            </div>
          );
        })
      }

      {/* הטקסט התחתון האנימטיבי */}
      <p 
        id="DigitalAssetsStep1-text2"
        className={`pop-element ${animateText2 ? 'is-visible' : ''}`}
      >
        המכללה עברה ב-5 שנים האחרונות טרנספורמציה דיגיטלית, עם הנגשה משמעותית של ידע בשעת חירום לצד שיפור תהליכים בשגרה, שהפכו קלים, קצרים ומהירים יותר.
      </p>

      {/* הפופ-אפ הגנרי שמקבל את כל הנתונים, כולל חיווי של אזהרה (isWarning) */}
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

export default DigitalAssetsStep1;