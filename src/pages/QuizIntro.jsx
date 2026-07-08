import React from 'react';
import '../style/Quiz.css';

function QuizIntro({ onStart, onCancel }) {
  return (
    <div className="page-container quiz-page">
      <h1 id="quiz-title">הסבר לפני המבחן</h1>
      <p className="quiz-explain">המבחן כולל 10 שאלות רב-ברירתיות, כל שאלה שווה 10 נקודות. על מנת לעבור יש לקבל מעל 70 נקודות (80 או 90 או 100).</p>
      <div className="quiz-intro-actions">
        <button className="mobile-touch-button" onClick={onStart}>התחל מבחן</button>
        <button className="mobile-touch-button" onClick={onCancel}>חזור לבית</button>
      </div>
    </div>
  );
}

export default QuizIntro;
