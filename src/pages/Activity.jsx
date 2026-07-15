import React, { useState } from 'react';
import '../style/Activity.css';
import HomeButton from '../components/HomeButtons'; 
import NextButton from '../components/NextButton';

// 1. מייבאים את תתי-העמודים הספציפיים של הנושא הזה
import ActivityStep1 from './ActivityStep1';
import ActivityStep2 from './ActivityStep2';
import ActivityStep3 from './ActivityStep3';
import ActivityStep4 from './ActivityStep4';

function Activity({ onGoHome, progress, onProgress }) {
  // ניהול הצעד הנוכחי בתוך הנושא (מתחיל מ-0)
  const [currentStep, setCurrentStep] = useState(0);

  // מערך שמכיל את תתי-העמודים של הפעילות לפי הסדר
  const steps = [
    ActivityStep1,
    ActivityStep2,
    ActivityStep3,
    ActivityStep4
  ];

  const handleNext = () => {
    onProgress?.(`activity-step-${currentStep + 1}`);
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
      <NextButton onClick={handleNext} bottom="5svh"/>
    </div>
  );
}

export default Activity;