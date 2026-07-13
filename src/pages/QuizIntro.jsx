import React, { useState } from 'react';
import HomeButton from '../components/HomeButtons';
import '../style/Quiz.css';

function QuizIntro({ onStart, onCancel, onGoHome, progress, isHomeEnabled = false }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';

  const handleStart = () => {
    // עדכון: מעביר רק את השם הפרטי כאשר הטופס תקין
    if (isFormValid) onStart(firstName.trim());
  };

  return (
    <main className="quiz-page">
      <HomeButton onClick={onGoHome} progress={progress} disabled={!isHomeEnabled} />
      
      <h1 id="quiz-title">איזה כיף, הגעת לסוף!</h1>
      <p className="quiz-explain">נשארו רק כמה שאלות, מבטיחים שזה קטן עליכם</p>
      
      <p className="quiz-inputs-title">הכניסו שם פרטי ושם משפחה:</p>
      
      <input 
        type="text" 
        placeholder="שם פרטי" 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="quiz-cute-input"
      />
      <input 
        type="text" 
        placeholder="שם משפחה" 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="quiz-cute-input"
      />

      <div 
        role="button" 
        className={`quiz-nav-item next ${!isFormValid ? 'disabled' : ''}`} 
        onClick={handleStart}
      >
        התחל מבחן
      </div>
      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />

    </main>
  );
}

export default QuizIntro;