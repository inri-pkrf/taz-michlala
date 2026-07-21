import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import '../style/ForeignRelations.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton'; 
import AboutMe from '../components/AboutMe';

function ForeignRelations({ onGoHome, progress, onProgress }) {
  const globeEl = useRef();
  
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [visitedIds, setVisitedIds] = useState([]);

  const [globeDimensions, setGlobeDimensions] = useState({
    width: Math.min(window.innerWidth * 0.8, 350),
    height: Math.min(window.innerHeight * 0.4, 320)
  });

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
    },
    {
      id: 4,
      name: "אוסטרליה",
      flag: "🇦🇺",
      content: " נציגי הקהילה היהודית ",
      lat: -33.8688,   
      lng: 151.2093,   
      baseColor: "#00BCD4", 
    }
  ];

  const totalCountries = countriesData.length;
  const visitedCount = visitedIds.length;

  const handlePinClick = (pin) => {
    setSelectedCountry(pin);
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: pin.lat, lng: pin.lng, altitude: 2 }, 800);
    }

    if (!visitedIds.includes(pin.id)) {
      setVisitedIds(prev => [...prev, pin.id]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setGlobeDimensions({
        width: Math.min(window.innerWidth * 0.8, 350),
        height: Math.min(window.innerHeight * 0.4, 320)
      });
    };

    window.addEventListener('resize', handleResize);

    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 30, altitude: 2.5 });
      
      const controls = globeEl.current.controls?.();
      if (controls) {
        controls.autoRotate = false;
        controls.enableZoom = false; // מונע קריסות מגע בנייד
      }
    }

    // ניקוי מוחלט של זיכרון ה-WebGL בעת יציאה מהמסך
    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeEl.current && typeof globeEl.current._destructor === 'function') {
        globeEl.current._destructor();
      }
    };
  }, []);

  return (
    <div className="page-container">
      <HomeButton onClick={onGoHome} progress={progress} />
      <AboutMe />

      <h1 id="activity-title">קשרי חוץ</h1>
      <p id="ForeignRelations-text1">אנחנו לגמרי בינלאומיים!</p>
      <p id="ForeignRelations-text2">סובבו את הגלובוס ולחצו על המדינות</p>

      <div className="globe-wrapper">
        <div className="countries-counter-badge">
          {visitedCount} / {totalCountries}
        </div>

        <Globe
          ref={globeEl}
          width={globeDimensions.width}
          height={globeDimensions.height}
          backgroundColor="rgba(0,0,0,0)" 
          showAtmosphere={false}
          
          // תמונה מותאמת ביצועים במקום הקבצים הכבדים של unpkg
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
          
          labelsData={countriesData} 
          labelLat={d => d.lat}
          labelLng={d => d.lng}
          labelText={d => d.flag} 
          
          labelSize={3.5}
          labelDotRadius={4}
          labelTransitionDuration={0}
          labelIncludeDot={true}
          pointerEventsFilter={() => true}
          
          labelColor={d => visitedIds.includes(d.id) ? '#7f8c8d' : d.baseColor}
          labelResolution={1}
          onLabelClick={handlePinClick}
        />
      </div>

      <div className={`info-card-container ${selectedCountry ? 'card-show' : ''}`}>
        {selectedCountry && (
          <p className="meeting-content">{selectedCountry.content}</p>
        )}
      </div>
      
      <p id="ForeignRelations-text3">
        מעת לעת אנחנו מארחים משלחות ובעלי תפקידים בממשלות וצבאות מרחבי העולם, הבאים ארצה ללמוד על חוסנה של מדינת ישראל וניהול העורף בשעת חירום
      </p>

      <NextButton 
        onClick={() => { onProgress?.('foreignRelations'); onGoHome(); }} 
        disabled={visitedCount < totalCountries} 
      />
    </div>
  );
}

export default ForeignRelations;