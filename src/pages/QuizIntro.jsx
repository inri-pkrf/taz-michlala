import React, { useState, useEffect, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import HomeButton from '../components/HomeButtons';
import '../style/Quiz.css';

// זיהוי עמדת טוטם (מסך מגע רחב שאינו מכשיר מובייל)
const checkIfTotem = () => {
  const isMobileOS = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isLargeScreen = window.innerWidth >= 768;

  return hasTouch && isLargeScreen && !isMobileOS;
};

// פריסת מקלדת בעברית
const hebrewLayout = {
  default: [
    '; 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    'ק ר א ט ו ן ם פ',
    'ש ד ג כ ע י ח ל ך ף',
    'ז ס ב ה נ מ צ ת',
    '{space}'
  ]
};

const displayLabels = {
  '{bksp}': 'מחק ⌫',
  '{space}': 'רווח'
};

function QuizIntro({ onStart, onCancel, onGoHome, progress, isHomeEnabled = false }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ניהול מצב מקלדת לטוטם
  const [isTotem, setIsTotem] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // 'firstName' | 'lastName' | null
  const keyboardRef = useRef(null);

  useEffect(() => {
    setIsTotem(checkIfTotem());
  }, []);

  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';

  const handleStart = () => {
    if (isFormValid) onStart(firstName.trim());
  };

  // עדכון הערכים כשהמשתמש מקליד במקלדת הווירטואלית
  const handleKeyboardChange = (inputVal) => {
    if (activeInput === 'firstName') {
      setFirstName(inputVal);
    } else if (activeInput === 'lastName') {
      setLastName(inputVal);
    }
  };

  // בעת מעבר בין שדות קלט
  const handleInputFocus = (inputName, currentVal) => {
    if (!isTotem) return;
    setActiveInput(inputName);
    if (keyboardRef.current) {
      keyboardRef.current.setInput(currentVal);
    }
  };

  return (
    <main className="quiz-page">
      <HomeButton onClick={onGoHome} progress={progress} disabled={!isHomeEnabled} />

      <h1 id="quiz-title">איזה כיף, הגעת לסוף!</h1>
      <p className="quiz-explain">נשארו רק כמה שאלות, מבטיחים שזה קטן עליכם</p>

      <p className="quiz-inputs-title">הכניסו שם פרטי ושם משפחה:</p>

      {/* שדה שם פרטי */}
      <div className="input-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
        <input
          type="text"
          placeholder="שם פרטי"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (activeInput === 'firstName' && keyboardRef.current) {
              keyboardRef.current.setInput(e.target.value);
            }
          }}
          onFocus={() => handleInputFocus('firstName', firstName)}
          className="quiz-cute-input"
        />
        {isTotem && (
          <button
            type="button"
            className="totem-keyboard-toggle"
            onClick={() => handleInputFocus('firstName', firstName)}
            title="פתח מקלדת"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ⌨️
          </button>
        )}
      </div>

      {/* שדה שם משפחה */}
      <div className="input-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
        <input
          type="text"
          placeholder="שם משפחה"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (activeInput === 'lastName' && keyboardRef.current) {
              keyboardRef.current.setInput(e.target.value);
            }
          }}
          onFocus={() => handleInputFocus('lastName', lastName)}
          className="quiz-cute-input"
        />
        {isTotem && (
          <button
            type="button"
            className="totem-keyboard-toggle"
            onClick={() => handleInputFocus('lastName', lastName)}
            title="פתח מקלדת"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ⌨️
          </button>
        )}
      </div>

      <div
        role="button"
        className={`quiz-nav-item next ${!isFormValid ? 'disabled' : ''}`}
        onClick={handleStart}
      >
        התחל מבחן
      </div>

      {/* מקלדת וירטואלית - מוצגת רק במסכי טוטם כששדה נמצא במיקוד */}
      {isTotem && activeInput && (
        <div className="totem-keyboard-container" style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>מקליד לתוך: {activeInput === 'firstName' ? 'שם פרטי' : 'שם משפחה'}</span>
            <button 
              type="button" 
              onClick={() => setActiveInput(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              סגור מקלדת ✖
            </button>
          </div>
          <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            onChange={handleKeyboardChange}
            layout={hebrewLayout}
            display={displayLabels}
            inputName={activeInput}
          />
        </div>
      )}

      <img
        className="welcomePage-logo"
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.svg`}
        alt="logo"
      />
    </main>
  );
}

export default QuizIntro;