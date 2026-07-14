import React, { useState } from 'react';
import Popup from '../components/Popup'; // ייבוא הפופ-אפ הגנרי
import StepNumber from '../components/StepNumber'; // ייבוא עיגול המספר הגנרי

// פונקציית עזר שממירה Hex ל-RGBA, מחשיכה את הצבע ב-40% ומחילה שקיפות
const getDarkTranslucentColor = (hex, alpha = 0.6) => {
  const cleanHex = hex.replace('#', '');
  let r = parseInt(cleanHex.slice(0, 2), 16);
  let g = parseInt(cleanHex.slice(2, 4), 16);
  let b = parseInt(cleanHex.slice(4, 6), 16);
  r = Math.floor(r * 0.6);
  g = Math.floor(g * 0.6);
  b = Math.floor(b * 0.6);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function ActivityStep2() {
  const [nextRequiredId, setNextRequiredId] = useState(1);
  const [activePopup, setActivePopup] = useState(null);

  const playPopSound = () => {
    try {
      const soundPath = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/assets/Audio/pop.mp3`;
      const audio = new Audio(soundPath);
      audio.preload = 'auto';
      audio.currentTime = 0;
      audio.play().catch(err => console.log("סאונד נחסם בנייד:", err));
    } catch (e) {
      console.log('playPopSound error', e);
    }
  };

  const handleInteractionStart = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    playPopSound();
  };

  const buildingsData = {
    1: { title: "מגמת אימוני רשויות", content: " אחראית לממש את מה שנלמד בהכשרה - באימון לפי תרחיש ועל-פי תוכנית מותאמת. ", bgColor: "#ffffff", borderColor: "#536863", topNum: "29vh", leftNum: "21%" },
    2: { title: "מגמת משרדי הממשלה", content: `מגמה בהובלת רח"ל, האחראית על הכשרת מנהלים ומנהלות במשרדים לחירום.`, bgColor: "#ffffff", borderColor: "#8F908C", topNum: "34vh", leftNum: "80%" },
    3: { title: "מגמת אימוני מפקדות", content: " הרגל הצבאית שלנו, מכשירה, מאמנת וחונכת את כל בעלי התפקידים במפקדה צבאית של פיקוד העורף. ", bgColor: "#ffffff", borderColor: "#E4CD67", topNum: "42vh", leftNum: "8%" },
    4: { title: "מגמת הכשרות", content: " אחראית לממש את מה שנלמד בהכשרה - באימון לפי תרחיש ועל-פי תוכנית מותאמת. ", bgColor: "#ffffff", borderColor: "#FDC860", topNum: "47vh", leftNum: "63%" }
  };

  const handleBuildingClick = (id) => {
    if (id === nextRequiredId) {
      setActivePopup({
        title: buildingsData[id].title,
        content: buildingsData[id].content,
        bgColor: buildingsData[id].bgColor,
        borderColor: buildingsData[id].borderColor,
        isWarning: false
      });
      setNextRequiredId(prev => prev + 1);
    } else if (id > nextRequiredId) {
      setActivePopup({
        title: "אופס, הלכת רחוק מדי",
        content: "יש ללחוץ לפי הסדר",
        bgColor: "#FAF8F3",
        borderColor: "#000641",
        isWarning: true
      });
    } else {
      setActivePopup({
        title: buildingsData[id].title,
        content: buildingsData[id].content,
        bgColor: buildingsData[id].bgColor,
        borderColor: buildingsData[id].borderColor,
        isWarning: false
      });
    }
  };

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      <h1 id="activity-title">פעילות המכללה</h1>
      <p id="activity-text1">למכללה 4 מגמות:</p>

      {/* יצירה אוטומטית של עיגולי המספרים */}
      {Object.keys(buildingsData).map((id) => {
        const b = buildingsData[id];
        const isVisited = nextRequiredId > id;
        const currentBg = isVisited ? getDarkTranslucentColor(b.borderColor, 0.6) : '#ffffff';
        const currentBorder = b.borderColor;
        const currentText = isVisited ? '#ffffff' : b.borderColor;

        return (
          <StepNumber 
            key={id} 
            number={id} 
            top={b.topNum} 
            left={b.leftNum} 
            bgColor={currentBg}
            borderColor={currentBorder}
            textColor={currentText}
          />
        );
      })}

      {/* הבניינים اللחיצים */}
      <img className="activityPage1-office1" src={`${process.env.PUBLIC_URL}/assets/Activity/building-red.png`} alt="office" onPointerDown={handleInteractionStart} onClick={() => handleBuildingClick(1)} style={{ cursor: 'pointer' }} />
      <img className="activityPage1-office2" src={`${process.env.PUBLIC_URL}/assets/Activity/building-grey.png`} alt="office" onPointerDown={handleInteractionStart} onClick={() => handleBuildingClick(2)} style={{ cursor: 'pointer' }} />
      <img className="activityPage1-office3" src={`${process.env.PUBLIC_URL}/assets/Activity/building-yellow.png`} alt="office" onPointerDown={handleInteractionStart} onClick={() => handleBuildingClick(3)} style={{ cursor: 'pointer' }} />
      <img className="activityPage1-office4" src={`${process.env.PUBLIC_URL}/assets/Activity/building-orange.png`} alt="office" onPointerDown={handleInteractionStart} onClick={() => handleBuildingClick(4)} style={{ cursor: 'pointer' }} />

      {/* הוספת התנאי: יוצג ויצטייר רק אחרי שביקרו בכל 4 הבניינים */}
      {/* {nextRequiredId > 4 && (
        <div className="circle-anim-container">
          <svg className="circle-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="50" cy="50" rx="48" ry="48" />
          </svg>
          
        </div>
      )} */}
          <p id="activityStep2-text2">
            כך נוצר מעגל ההכשרה השלם, המאפשר לנו לפגוש בבית אחד כמה שיותר בעלי תפקידים המנהלים מצבי חירום בתחומם
          </p>
        
      {activePopup && (
        <Popup 
          title={activePopup.title}
          content={activePopup.content}
          bgColor={activePopup.bgColor}
          borderColor={activePopup.borderColor}
          isWarning={activePopup.isWarning}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
}

export default ActivityStep2;