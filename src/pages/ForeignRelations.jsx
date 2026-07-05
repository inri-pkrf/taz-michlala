import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import '../style/ForeignRelations.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 

function ForeignRelations({ onGoHome }) {
  const globeEl = useRef();
  
  // ניהול המדינה שנבחרה כרגע להצגה בכרטיס התחתון
  const [selectedCountry, setSelectedCountry] = useState(null);

  // מערך ששומר את ה-IDs של המדינות שהמשתמש כבר לחץ עליהן
  const [visitedIds, setVisitedIds] = useState([]);

  // סטייט לשמירת ה-ID של הנקודה שעליה עומד העכבר כרגע
  const [hoveredPinId, setHoveredPinId] = useState(null);

  // נתוני המדינות עם קואורדינטות מתוקנות ומדויקות
  const countriesData = [
    {
      id: 1,
      name: "ארצות הברית",
      flag: "🇺🇸",
      content: `ראשת FEMA (רח"ל האמריקאית)`,
      lat: 37.0902,   
      lng: -95.7129,  
      baseColor: "#E91E63", 
    },
    {
      id: 2,
      name: "שבדיה",
      flag: "🇸🇪",
      content: "נציגים בכירים ממשטרת שבדיה",
      lat: 60.1282,   
      lng: 18.6435,   
      baseColor: "#9C27B0", 
    },
    {
      id: 3,
      name: "ספרד",
      flag: "🇪🇸",
      content: "6 גנרלים מספרד",
      lat: 40.4637,   
      lng: -3.7492,   
      baseColor: "#FF9800", 
    }
  ];

  // חישוב המונים בזמן אמת
  const totalCountries = countriesData.length;
  const visitedCount = visitedIds.length;
  const remainingCount = totalCountries - visitedCount;

  // לוגיקת הלחיצה החופשית על נקודה בגלובוס
  const handlePinClick = (pin) => {
    setSelectedCountry(pin);
    globeEl.current.pointOfView({ lat: pin.lat, lng: pin.lng, altitude: 2 }, 1000);

    if (!visitedIds.includes(pin.id)) {
      setVisitedIds(prev => [...prev, pin.id]);
    }
  };

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 35, lng: 15, altitude: 2.3 });
      globeEl.current.controls().autoRotate = false;
    }
  }, []);

  return (
    <div className="page-container">
      <HomeButton onClick={onGoHome} />
      
      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />

      <h1 id="activity-title">קשרי חוץ</h1>
      <p id="ForeignRelations-text1">אנחנו לגמרי בינלאומיים!</p>
      <p id="ForeignRelations-text2">סובבו את הגלובוס ולחצו על המדינות</p>

      {/* מד התקדמות עליון המציג כמה עברנו וכמה נשאר */}
      {/* <div className="progress-counter-badge">
        
        {remainingCount > 0 ? (
          <span className="remaining-text"> נשארו עוד <strong>{remainingCount}</strong> מדינות </span>
        ) : (
          <span className="completed-text"> כל הכבוד! עברת בכל המדינות </span>
        )}
      </div> */}

      {/* מיכל הגלובוס התלת ממדי */}
      <div className="globe-wrapper">
        <Globe
          ref={globeEl}
          width={window.innerWidth * 0.75}
          height={window.innerHeight * 0.45}
          backgroundColor="rgba(0,0,0,0)" 
          showAtmosphere={false}
          
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          
          labelsData={countriesData} 
          labelLat={d => d.lat}
          labelLng={d => d.lng}
          labelText={d => d.flag} 
          
          // --- הגדלת המיקומים ואפקט גדילה דינמי ---
          // גודל בסיס גדול יותר (2.5 במקום 1.6), ואם יש הובר הוא גדל ל-3.8
          labelSize={d => d.id === hoveredPinId ? 3.8 : 2.5}
          // גם נקודת הבסיס (הדוט) תגדל מעט בהובר
          labelDotRadius={d => d.id === hoveredPinId ? 1.4 : 1.0}
          
          labelColor={d => visitedIds.includes(d.id) ? '#7f8c8d' : d.baseColor}
          labelResolution={2}
          onLabelClick={handlePinClick}
          
          // זיהוי מעבר עכבר/טאץ' לצורך אפקט הגדילה
          onLabelHover={pin => setHoveredPinId(pin ? pin.id : null)}
        />
      </div>

      {/* כרטיס המידע התחתון המעוצב */}
      <div className={`info-card-container ${selectedCountry ? 'card-show' : ''}`}>
        {selectedCountry && (
          <>
            <p className="meeting-content">{selectedCountry.content}</p>
          </>
        )}
      </div>
      <p id="ForeignRelations-text3">
        מעת לעת אנחנו מארחים משלחות ובעלי תפקידים בממשלות וצבאות מרחבי העולם, הבאים ארצה ללמוד על חוסנה של מדינת ישראל וניהול העורף בשעת חירום
      </p>

      <NextButton onClick={onGoHome} disabled={visitedCount < totalCountries} />
    </div>
  );
}

export default ForeignRelations;