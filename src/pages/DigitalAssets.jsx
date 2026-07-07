import React, { useState } from 'react';
import '../style/DigitalAssets.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton';

// 1. מייבאים את תתי-העמודים הספציפיים של הנושא הזה
import DigitalAssetsStep1 from './DigitalAssetsStep1';
import DigitalAssetsStep2 from './DigitalAssetsStep2';


function DigitalAssets({ onGoHome, progress, onProgress }) {
  // ניהול הצעד הנוכחי בתוך הנושא (מתחיל מ-0)
  const [currentStep, setCurrentStep] = useState(0);

  // מערך שמכיל את תתי-העמודים של הפעילות לפי הסדר
  const steps = [
    DigitalAssetsStep1,
    DigitalAssetsStep2
  ];

  const handleNext = () => {
    onProgress?.(`digitalAssets-step-${currentStep + 1}`);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1); // עובר לתת-העמוד הבא
    } else {
      onGoHome(); // אם הגענו לסוף הנושא, מחזירים אותו אוטומטית לתפריט הראשי
    }
  };

  // שליפת תת-העמוד הנוכחי
  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="page-container">
      {/* כפתור הבית תמיד מופיע ומחזיר לתפריט הראשי ב-App */}
      <HomeButton onClick={onGoHome} progress={progress} />
      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />

      {/* רנדור תת-העמוד הנוכחי */}
      <CurrentStepComponent />

      {/* כפתור ההמשך שמקדם את הצעד הפנימי */}
      <NextButton onClick={handleNext} />
    </div>
  );
}

export default DigitalAssets;