import React, { useState, useEffect, useRef } from 'react';
import '../style/Quiz.css';

const QUESTIONS = [
  { q: 'מהי המטרה של המכללה?', choices: ['הכשרה בלבד', 'שימור ידע וחירום', 'פנאי', 'רכש'], a: 1 },
  { q: 'מה יש באתר המכללה?', choices: ['קטלוג ספרים', 'פורטל ידע', 'חנויות', 'מפות'], a: 1 },
  { q: 'כיצד יש ללחוץ על האלמנטים בפופ-אפים?', choices: ['לפי סדר', 'באקראי', 'לא ללחוץ', 'ללחוץ פעמיים'], a: 0 },
  { q: 'כמה שאלות יש במבחן זה?', choices: ['5', '8', '10', '12'], a: 2 },
  { q: 'כל שאלה שווה כמה נקודות?', choices: ['5', '10', '15', '20'], a: 1 },
  { q: 'מהו הציון שעובר במבחן לפי ההגדרה?', choices: ['60', '70', 'מעל 70', '90'], a: 2 },
  { q: 'היכן נמצא משלט ינאי?', choices: ['במכללה', 'בבניין A', 'בתמונה', 'לא קיים'], a: 2 },
  { q: 'האם ניתן להוריד קבצים מהספרייה?', choices: ['כן', 'לא', 'לפעמים', 'רק למנהלים'], a: 0 },
  { q: 'מהי הפעולה כשמסיימים תת-עמוד?', choices: ['לחזור', 'להתקדם', 'לשמור', 'לסגור'], a: 1 },
  { q: 'האם המבחן הוא חלק מהלומדה?', choices: ['כן', 'לא', 'אולי', 'לא ידוע'], a: 0 }
];

function Quiz({ onGoHome }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  // רפרנס לאודיו של הללויה - תוודאי שהנתיב לקובץ שלך מדויק
  const hallelujahAudio = useRef(new Audio(`${process.env.PUBLIC_URL}/assets/audio/halleluja.mp3`));

  const currentAnswer = answers[currentQuestion];
  const question = QUESTIONS[currentQuestion];

  const score = answers.reduce((s, ans, i) => s + (ans === QUESTIONS[i].a ? 10 : 0), 0);
  const passed = score > 70;

  // הפעלת הסאונד ברגע שמגישים ועוברים
  useEffect(() => {
    if (submitted && passed) {
      hallelujahAudio.current.currentTime = 0; // מנגן מהתחלה
      hallelujahAudio.current.play().catch(err => console.log("Audio play blocked", err));
    }
    // עצירת הסאונד אם יוצאים או עושים ריסט
    return () => {
      hallelujahAudio.current.pause();
    };
  }, [submitted, passed]);

  const handleSelect = (choiceIndex) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = choiceIndex;
    setAnswers(nextAnswers);
  };

  const handleReset = () => {
    hallelujahAudio.current.pause(); // עוצר את הסאונד בריסט
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
    setSubmitted(false);
  };

  // יצירת 25 כוכבים במיקומים אקראיים ובזמני דיליי שונים בשביל אפקט גשם טבעי
  const renderStarRain = () => {
    return Array.from({ length: 55 }).map((_, i) => {
      const randomLeft = Math.random() * 100; // מיקום אופקי אקראי
      const randomDelay = Math.random() * 3;  // דיליי אקראי לתחילת הנפילה
      const randomDuration = 2 + Math.random() * 2; // מהירות נפילה משתנה
      
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
      <h1 id="quiz-title">מבחן מסכם</h1>

      {!submitted ? (
        <div className="quiz-form" style={{ zIndex: 2 }}>
          <div className="quiz-question">
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

          <div className="quiz-actions">
            <div 
              role="button"
              className={`quiz-nav-item back ${currentQuestion === 0 ? 'disabled' : ''}`} 
              onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
            >
              חזור
            </div>

            {currentQuestion < QUESTIONS.length - 1 ? (
              <div 
                role="button"
                className={`quiz-nav-item next ${currentAnswer === null ? 'disabled' : ''}`} 
                onClick={() => currentAnswer !== null && setCurrentQuestion(prev => prev + 1)}
              >
                הבא
              </div>
            ) : (
              <div 
                role="button"
                className={`quiz-nav-item submit ${currentAnswer === null ? 'disabled' : ''}`} 
                onClick={() => currentAnswer !== null && setSubmitted(true)}
              >
                הגש מבחן
              </div>
            )}
          </div>

          <div className="quiz-progress">
            שאלה {currentQuestion + 1} מתוך {QUESTIONS.length}
          </div>
        </div>
      ) : (
        <>
          {/* מציג את הגשם והקשת רק אם המשתמש עבר את המבחן */}
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
            <div className="quiz-progress" style={{ fontSize: '2rem', margin: '2vh 0', fontWeight: 'bold', color: '#000641' }}>
              {score} / 100
            </div>
            <p className="quiz-explain">
              {passed ? 'כל הכבוד! עברת בהצלחה' : 'לא עברת את ציון הסף, שווה לנסות שוב 📑'}
            </p>
            
            <div className="quiz-result-actions">
              <div role="button" className="quiz-nav-item retry" onClick={handleReset}>
                נסה שוב
              </div>
              <div role="button" className="quiz-nav-item home" onClick={onGoHome}>
                חזרה לראשי
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;