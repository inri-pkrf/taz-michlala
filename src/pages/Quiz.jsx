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

  return (
    <div className="page-container quiz-page">
      <h1 id="quiz-title">המבחן הסופי</h1>
      {!submitted ? (
        <form className="quiz-form" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
          {QUESTIONS.map((item, idx) => (
            <div key={idx} className="quiz-question">
              <h3>{idx+1}. {item.q}</h3>
              {item.choices.map((c, ci) => (
                <label key={ci} className="quiz-choice">
                  <input type="radio" name={`q${idx}`} checked={answers[idx]===ci} onChange={()=>handleSelect(idx,ci)} /> {c}
                </label>
              ))}
            </div>
          ))}
          <div className="quiz-actions">
            <button className="mobile-touch-button" type="submit">סיים והצג תוצאה</button>
          </div>
        </form>
      ) : (
        <div className="quiz-result">
          <h2>ציון שלך: {score} / 100</h2>
          <h3>{passed ? 'עבר' : 'לא עבר'}</h3>
          <div className="quiz-result-actions">
            <button className="mobile-touch-button" onClick={() => { setSubmitted(false); setAnswers(Array(QUESTIONS.length).fill(null)); }}>נסה שוב</button>
            <button className="mobile-touch-button" onClick={onGoHome}>חזרה לבית</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;

