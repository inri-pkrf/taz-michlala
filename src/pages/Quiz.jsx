import React, { useState, useEffect, useRef } from 'react';
import HomeButton from '../components/HomeButtons';
import '../style/Quiz.css';

const QUESTIONS = [
  { q: `מה אפשר לעשות באתר המכללה?`, choices: [` להירשם להכשרות `, ` ללמוד על פעילויוית המכללה `, ` לחפש תוכן מקצועי `, ` כל התשובות נכונות `], a: 3 },
  { q: ` כמה פרטי מידע יש בספרייה הלאומית לחירום? `, choices: [` כ-1,000 פריטים `, ` כ-1,250 `, ` כ-1,500 `, `  כ-1,700 `], a: 1 },
  { q: ` מהו 'מעגל ההכשרה השלם'?`, choices: [` מעגל שאם מסתובבים בו, גשם מתחיל לרדת `, `  מעגל ההכשרות שעוברות על מנהלי המכלולים שמגיעים למכללה `,` המעגל שעובר דרך התורה, והיכולת ללמוד מהשטח ולהשתפר תו"כ תנועה `, `  כל מגמה בנפרד , כשכל אחד משפיע רק בתחומו `], a: 1 },
  { q: ` שאלהההההה `, choices: [`  `, `  `, ` נכון `, `  `], a: 2 },
  { q: ` מהן ראשי התיבות רח"ל?`, choices: [` רשת חירום לישראל `, ` רשת חברים לאומית `, ` רשות החירום הלאומית `, ` רשות החירום לישראל `], a: 2 },
  { q: `  לפי פרק הקש"ח, נציגים מכמה מדינות ביקרו אצלינו? `, choices: [` 7 `, ` 6 `, ` 23 `, ` 12 `], a: 1 },
  { q: ` כמה גנרלים ספרדים היו פה?`, choices: [` 2 `, ` 4 `, ` 6 `, ` הם לא היו ספרדיים, הם בכלל אמריקאיים `], a: 2 },
  { q: ` מה עשתה המכללה בזמן המלחמה? `, choices: [` ביצוע 'זמן יקר' במפקדות `, ` הפצת שיעור דיגיטלי של הצח"י `, ` אירחה את שר התיירות, שר המדע ואת כל נציגי וועדת חוץ וביטחון `, ` כל התשובות נכונות `], a: 3 },
  { q: ` כמה מלונות ניהל משל"ט ינאי בשיא במהלך מלחמת 'חרבות ברזל? `, choices: [` 465 `, ` 546 `, ` 564 `, ` 456 `], a: 0 },
  { q: ` מה הסלוגן של נווה איתנים?`, choices: [` הכי מוכנה בארץ `, ` איתנים ונהנים `, ` הכי מוכנים לחירום `, ` הכי מוכנים במדינה `], a: 2 }
];

function Quiz({ onGoHome, userName = "משתמש/ת", progress, isHomeEnabled = false, onQuizCompleted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [clockRotation, setClockRotation] = useState(0); 

  const hallelujahAudio = useRef(null);
  const loserAudio = useRef(null);
  const pendingSoundRef = useRef(null);

  const currentAnswer = answers[currentQuestion];
  const question = QUESTIONS[currentQuestion];

  const score = answers.reduce((s, ans, i) => s + (ans === QUESTIONS[i].a ? 10 : 0), 0);
  const passed = score >= 70;

  useEffect(() => {
    if (submitted) {
      onQuizCompleted?.(true);
    } else {
      onQuizCompleted?.(false);
    }
  }, [submitted, onQuizCompleted]);

  const playResultSound = (fileName) => {
    const audioRef = fileName === 'halleluja.mp3' ? hallelujahAudio : loserAudio;
    if (!audioRef.current) {
      const baseUrl = process.env.PUBLIC_URL || '';
      const soundUrl = `${baseUrl}/assets/Audio/${fileName}`;
      const fallbackUrl = `${baseUrl}/assets/audio/${fileName}`;
      audioRef.current = new Audio(soundUrl);
      audioRef.current.preload = 'auto';
      audioRef.current.addEventListener('error', () => {
        if (audioRef.current.currentSrc !== fallbackUrl) {
          audioRef.current.src = fallbackUrl;
          audioRef.current.load();
          audioRef.current.play().catch(() => {});
        }
      }, { once: true });
    }

    audioRef.current.currentTime = 0;
    const playPromise = audioRef.current.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        pendingSoundRef.current = fileName;
      });
    }
  };

  useEffect(() => {
    const unlockAudio = () => {
      if (pendingSoundRef.current) {
        playResultSound(pendingSoundRef.current);
        pendingSoundRef.current = null;
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
  }, []);

  const handleSelect = (choiceIndex) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = choiceIndex;
    setAnswers(nextAnswers);

    setClockRotation(prev => prev + 180);

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setSubmitted(true);
        playResultSound(passed ? 'halleluja.mp3' : 'loser.mp3');
      }
    }, 200);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setClockRotation(prev => prev - 180); 
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if (hallelujahAudio.current) hallelujahAudio.current.pause();
    if (loserAudio.current) loserAudio.current.pause();
    pendingSoundRef.current = null;
    onQuizCompleted?.(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
    setSubmitted(false);
    setClockRotation(0);
  };

  const renderStarRain = () => {
    return Array.from({ length: 55 }).map((_, i) => {
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 3;
      const randomDuration = 2 + Math.random() * 2;
      
      return (
        <div 
          key={i} 
          className="falling-star"
          style={{
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`
          }}
        >
          ★
        </div>
      );
    });
  };

  return (
    <div className="page-container quiz-page" style={{ position: 'relative' }}>
      <HomeButton onClick={onGoHome} progress={progress} disabled={!isHomeEnabled} />
      {!submitted ? (
        <div className="quiz-form" style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* 1. מספור השאלות */}
          <div style={{ 
            width: '100%',
            textAlign: 'center', 
            margin: '0 0 1rem 0', 
            color: '#000641', 
            fontWeight: 'normal', 
            fontSize: '0.7rem',
            direction: 'rtl'
          }}>
            שאלה {currentQuestion + 1} מתוך {QUESTIONS.length}
          </div>

          {/* 2. תמונת השעון המסתובב */}
          <img
            className="quiz-clock"
            src={`${process.env.PUBLIC_URL}/assets/Quiz/clock.png`}
            alt="clock"
            style={{ 
              display: 'block', 
              margin: '0 auto 1rem auto', 
              maxWidth: '12vw', 
              width: '12vw',
              transform: `rotate(${clockRotation}deg)`,
              transition: 'transform 0.4s ease-in-out'
            }} 
          />

          {/* 3. השאלה והתשובות */}
          <div className="quiz-question" style={{ width: '100%' }}>
            <h3>{question.q}</h3>
            {question.choices.map((choice, index) => {
              const isSelected = currentAnswer === index;
              return (
                <div
                  key={index}
                  role="button"
                  className={`quiz-choice-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(index)}
                >
                  {choice}
                </div>
              );
            })}
          </div>

          {/* 4. כפתור חזור */}
          <div className="quiz-actions" style={{ marginTop: '1rem', width: '30vw' }}>
            <div 
              role="button"
              className={`quiz-nav-item back ${currentQuestion === 0 ? 'disabled' : ''}`} 
              onClick={handleBack}
            >
              חזור
            </div>
          </div>

        </div>
      ) : (
        <>
          {passed && (
            <div className="victory-effects">
              <div className="rainbow-effect"></div>
              {renderStarRain()}
            </div>
          )}

          <div className="quiz-result" style={{ zIndex: 2 }}>
            <h2 className="quiz-question" style={{ textAlign: 'center' }}>
              <h3>התוצאה שלך</h3>
            </h2>
            
            <div className="quiz-score-display" style={{ fontSize: '2rem', margin: '2vh 0', fontWeight: 'bold', color: '#000641', textAlign: 'center' }}>
              {score} / 100
            </div>
            
            <p className="quiz-explain" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              {passed 
                ? `${userName}, וואלה מרשים!` 
                : `${userName}, זה מבאס את שנינו אבל, יאללה לעסק...`
              }
            </p>
            
            <div className="quiz-result-actions">
              <div role="button" className="quiz-nav-item retry" onClick={handleReset}>
                נסה שוב
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;