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

  // פונקציה לחישוב גודל הכדור באופן פרופורציונלי למסך (מובייל + טוטם)
  const getCalculatedGlobeSize = () => {
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    const size = Math.min(minDimension * 0.65, window.innerHeight * 0.45);
    return {
      width: size,
      height: size
    };
  };

  const [globeDimensions, setGlobeDimensions] = useState(getCalculatedGlobeSize);

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
      content: " נציגי הקהילה היהודית מאוסטרליה",
      lat: -33.8688,   
      lng: 151.2093,   
      baseColor: "#00BCD4", 
    }
  ];

  const totalCountries = countriesData.length;
  const visitedCount = visitedIds.length;
  const hasVisitedAll = visitedCount === totalCountries;

  const handlePinClick = (pin) => {
    setSelectedCountry(pin);
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: pin.lat, lng: pin.lng, altitude: 1.8 }, 800);
    }

    if (!visitedIds.includes(pin.id)) {
      setVisitedIds(prev => [...prev, pin.id]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setGlobeDimensions(getCalculatedGlobeSize());
    };

    window.addEventListener('resize', handleResize);

    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 30, altitude: 2.0 });
      
      const controls = globeEl.current.controls?.();
      if (controls) {
        controls.autoRotate = false;
        controls.enableZoom = false; // מונע קריסות מגע בנייד
      }
    }

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
      <p id="ForeignRelations-text2">סובבו את הגלובוס וגלו על כמה מהמדינות שהגיעו אלינו</p>

      <div 
        className="globe-wrapper"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          position: 'relative',
          margin: '0 auto'
        }}
      >
        <div className="countries-counter-badge">
          {visitedCount} / {totalCountries}
        </div>

        <Globe
          ref={globeEl}
          width={globeDimensions.width}
          height={globeDimensions.height}
          backgroundColor="rgba(0,0,0,0)" 
          showAtmosphere={false}
          
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
          <p 
            className="meeting-content"
            style={{ color: selectedCountry.baseColor }}
          >
            {selectedCountry.content}
          </p>
        )}
      </div>
      
      {/* הטקסט מופיע באנימציה עדינה כשמייצרים את התנאי */}
      <p id="ForeignRelations-text3" className={hasVisitedAll ? 'visible' : ''}>
        מעת לעת אנחנו מארחים משלחות ובעלי תפקידים בממשלות וצבאות מרחבי העולם, הבאים ארצה ללמוד על חוסנה של מדינת ישראל וניהול העורף בשעת חירום
      </p>

      <NextButton 
        onClick={() => { onProgress?.('foreignRelations'); onGoHome(); }} 
        disabled={!hasVisitedAll} 
      />
    </div>
  );
}

export default ForeignRelations;