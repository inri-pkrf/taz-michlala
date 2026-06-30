import React, { useState } from 'react';
import Popup from '../components/Popup'; // ייבוא הפופ-אפ הגנרי
import StepNumber from '../components/StepNumber'; // ייבוא עיגול המספר הגנרי

// פונקציית עזר שממירה Hex ל-RGBA, מחשיכה את הצבע ב-40% ומחילה שקיפות
const getDarkTranslucentColor = (hex, alpha = 0.6) => {
  // הסרת ה-# במידה וקיים
  const cleanHex = hex.replace('#', '');
  
  // חילוץ ערכי ה-RGB מה-Hex
  let r = parseInt(cleanHex.slice(0, 2), 16);
  let g = parseInt(cleanHex.slice(2, 4), 16);
  let b = parseInt(cleanHex.slice(4, 6), 16);
  
  // החשכת הצבע (מכפילים ב-0.6 כדי להוריד 40% מהבהירות שלו)
  r = Math.floor(r * 0.6);
  g = Math.floor(g * 0.6);
  b = Math.floor(b * 0.6);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function ActivityStep2() {
  // מעקב אחרי השלב הבא שהמשתמש צריך ללחוץ עליו (מתחיל מ-1)
  const [nextRequiredId, setNextRequiredId] = useState(1);
  
  // ניהול הפופ-אפ שמוצג כרגע על המסך (null פירושו שאין פופ-אפ פתוח)
  const [activePopup, setActivePopup] = useState(null);

  // ריכוז כל הנתונים הדינמיים של הבניינים (טקסטים, צבעים ומיקומי מספרים)
  const buildingsData = {
    1: { 
      title: "מגמת אימוני רשויות", 
      content: "כאן מנהלים ומאמנים את הרשויות המקומיות להתמודדות מיטבית עם מצבי חירום שונים בשטחן.", 
      bgColor: "#ffffff", 
      borderColor: "#536863", // קו מתאר ירוק-כהה (תואם לבניין)
      topNum: "29vh", 
      leftNum: "21%" 
    },
    2: { 
      title: "מגמת משרדי הממשלה", 
      content: "הכשרת מנהלים בכירים במשרדי הממשלה השונים ותיאום פעולותיהם בשעת חירום לאומית.", 
      bgColor: "#ffffff", 
      borderColor: "#8F908C", // קו מתאר אפור (תואם לבניין)
      topNum: "34vh", 
      leftNum: "80%" 
    },
    3: { 
      title: "מגמת אימוני מפקדות", 
      content: "אימון ותרגול מפקדות צבאיות וגופי ביטחון רלוונטיים לשיתוף פעולה הדוק עם המערך האזרחי.", 
      bgColor: "#ffffff", 
      borderColor: "#E4CD67", // קו מתאר צהוב (תואם לבניין)
      topNum: "42vh", 
      leftNum: "8%" 
    },
    4: { 
      title: "מגמת הכשרות", 
      content: "פיתוח ובניית תוכניות הכשרה מתקדמות לכלל בעלי התפקידים במערך האיתנות הישראלי.", 
      bgColor: "#ffffff", 
      borderColor: "#FDC860", // קו מתאר כתום (תואם לבניין)
      topNum: "47vh", 
      leftNum: "63%" 
    }
  };

  // פונקציית הבדיקה בעת לחיצה על בניין
  const handleBuildingClick = (id) => {
    if (id === nextRequiredId) {
      setActivePopup({
        title: buildingsData[id].title,
        content: buildingsData[id].content,
        bgColor: buildingsData[id].bgColor,
        borderColor: buildingsData[id].borderColor,
        isWarning: false // פופ-אפ רגיל -> יציג איקס לסגירה
      });
      setNextRequiredId(prev => prev + 1);
    } else if (id > nextRequiredId) {
      setActivePopup({
        title: "אופס, הלכת רחוק מדי",
        content: "יש ללחוץ לפי הסדר",
        bgColor: "#e7ccd0",
        borderColor: "#410003",
        isWarning: true // פופ-אפ שגיאה -> יציג כפתור "הבנתי"
      });
    } else {
      setActivePopup({
        title: buildingsData[id].title,
        content: buildingsData[id].content,
        bgColor: buildingsData[id].bgColor,
        borderColor: buildingsData[id].borderColor,
        isWarning: false // פופ-אפ צפייה חוזרת -> יציג איקס לסגירה
      });
    }
  };

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      <h1 id="activity-title">פעילות המכללה</h1>
      <p id="activity-text1">למכללה 4 מגמות:</p>

      {/* יצירה אוטומטית של עיגולי המספרים מעל הבניינים */}
      {Object.keys(buildingsData).map((id) => {
        const b = buildingsData[id];
        const isVisited = nextRequiredId > id;

        // התיקון המבוקש עבור מצב של לאחר ביקור (isVisited):
        // הרקע הופך לצבע הבורדר המקורי, מקבל החשכה, ורמת אטימות של 60% (0.6)
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

      {/* הבניינים הלחיצים */}
      <img
        className="activityPage1-office1"
        src={`${process.env.PUBLIC_URL}/assets/Activity/building-red.png`}
        alt="office"
        onClick={() => handleBuildingClick(1)}
        style={{ cursor: 'pointer' }}
      />
      <img
        className="activityPage1-office2"
        src={`${process.env.PUBLIC_URL}/assets/Activity/building-grey.png`}
        alt="office"
        onClick={() => handleBuildingClick(2)}
        style={{ cursor: 'pointer' }}
      />
      <img
        className="activityPage1-office3"
        src={`${process.env.PUBLIC_URL}/assets/Activity/building-yellow.png`}
        alt="office"
        onClick={() => handleBuildingClick(3)}
        style={{ cursor: 'pointer' }}
      />
      <img
        className="activityPage1-office4"
        src={`${process.env.PUBLIC_URL}/assets/Activity/building-orange.png`}
        alt="office"
        onClick={() => handleBuildingClick(4)}
        style={{ cursor: 'pointer' }}
      />

      <p id="activityStep2-text2">
        כך נוצר מעגל ההכשרה השלם, המאפשר לנו לפגוש בבית אחד כמה שיותר בעלי תפקידים המנהלים מצבי חירום בתחומם
      </p>

      {/* העברת הפרופ החדש isWarning אל תוך הרינדור של הפופ-אפ */}
      {activePopup && (
        <Popup 
          title={activePopup.title}
          content={activePopup.content}
          bgColor={activePopup.bgColor}
          borderColor={activePopup.borderColor}
          isWarning={activePopup.isWarning} // מוזרק דינמית מהסטייט
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
}

export default ActivityStep2;