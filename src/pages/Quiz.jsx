import React, { useState } from 'react';
import '../style/Quiz.css';

const QUESTIONS = [
  { q: 'מהי המטרה של המכללה?', choices: ['הכשרה בלבד','שימור ידע וחירום','פנאי','רכש'], a: 1 },
  { q: 'מה יש באתר המכללה?', choices: ['קטלוג ספרים','פורטל ידע','חנויות','מפות'], a: 1 },
  { q: 'כיצד יש ללחוץ על האלמנטים בפופ-אפים?', choices: ['לפי סדר','באקראי','לא ללחוץ','ללחוץ פעמיים'], a: 0 },
  { q: 'כמה שאלות יש במבחן זה?', choices: ['5','8','10','12'], a: 2 },
  { q: 'כל שאלה שווה כמה נקודות?', choices: ['5','10','15','20'], a: 1 },
  { q: 'מהו הציון שעובר במבחן לפי ההגדרה?', choices: ['60','70','מעל 70','90'], a: 2 },
  { q: 'היכן נמצא משלט ינאי?', choices: ['במכללה','בבניין A','בתמונה','לא קיים'], a: 2 },
  { q: 'האם ניתן להוריד קבצים מהספרייה?', choices: ['כן','לא','לפעמים','רק למנהלים'], a: 0 },
  { q: 'מהי הפעולה כשמסיימים תת-עמוד?', choices: ['לחזור','להתקדם','לשמור','לסגור'], a: 1 },
  { q: 'האם המבחן הוא חלק מהלומדה?', choices: ['כן','לא','אולי','לא ידוע'], a: 0 }
];

function Quiz({ onGoHome }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i, val) => {
    const copy = [...answers];
    copy[i] = val;
    setAnswers(copy);
  };

  const score = answers.reduce((s, ans, i) => s + (ans === QUESTIONS[i].a ? 10 : 0), 0);
  const passed = score > 70;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="page-container quiz-page">
      <h1 id="quiz-title">המבחן הסופי</h1>
      {!submitted ? (
        <div className="quiz-form">
          <div className="quiz-question active-question">
            <h3>{currentQuestion + 1}. {question.q}</h3>
            {question.choices.map((c, ci) => (
              <label key={ci} className="quiz-choice">
                <input
                  type="radio"
                  name={`q${currentQuestion}`}
                  checked={answers[currentQuestion] === ci}
                  onChange={() => handleSelect(currentQuestion, ci)}
                />
                {c}
              </label>
            ))}
          </div>
          <div className="quiz-actions">
            <button className="mobile-touch-button" type="button" onClick={handleBack} disabled={currentQuestion === 0}>
              חזור
            </button>
            {currentQuestion < QUESTIONS.length - 1 ? (
              <button className="mobile-touch-button" type="button" onClick={handleNext} disabled={answers[currentQuestion] === null}>
                הבא
              </button>
            ) : (
              <button className="mobile-touch-button" type="button" onClick={handleSubmit} disabled={answers[currentQuestion] === null}>
                הגש
              </button>
            )}
          </div>
          <div className="quiz-progress">שאלה {currentQuestion + 1} מתוך {QUESTIONS.length}</div>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>ציון שלך: {score} / 100</h2>
          <h3>{passed ? 'עבר' : 'לא עבר'}</h3>
          <div className="quiz-result-actions">
            <button className="mobile-touch-button" onClick={() => { setSubmitted(false); setAnswers(Array(QUESTIONS.length).fill(null)); setCurrentQuestion(0); }}>
              נסה שוב
            </button>
            <button className="mobile-touch-button" onClick={onGoHome}>
              חזרה לבית
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;

