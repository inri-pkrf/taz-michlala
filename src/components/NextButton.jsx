import React, { useState } from 'react';
import './NextButton.css';

// מאגר 5 המילים המקורי
const WORD_POOL = [
  'אפשרי שנמשיך?',
  'יאללה, זזנו?',
  'סבבי הבנתי',
  'ממשיכיםם',
  'קדימה נו'
];

// פונקציית עזר לערבוב אקראי של מערך (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function NextButton({ onClick, top }) {
  // 1. אתחול ראשוני: מערבבים את המאגר ומחלצים ממנו את המילה הראשונה
  const [deck, setDeck] = useState(() => {
    const initialShuffled = shuffleArray(WORD_POOL);
    const firstWord = initialShuffled.pop();
    return {
      currentWord: firstWord,
      remaining: initialShuffled
    };
  });

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    setDeck((prevDeck) => {
      let currentRemaining = [...prevDeck.remaining];

      // אם המאגר הנותר התרוקן, ממלאים ומערבבים אותו מחדש
      if (currentRemaining.length === 0) {
        currentRemaining = shuffleArray(WORD_POOL);

        // מונע מצב שהמילה הראשונה במאגר החדש זהה למילה האחרונה שהוצגה
        if (currentRemaining[currentRemaining.length - 1] === prevDeck.currentWord) {
          // מזיזים את המילה הכפולה לתחילת המערך כדי שלא תישלף מיד
          const duplicate = currentRemaining.pop();
          currentRemaining.unshift(duplicate);
        }
      }

      // שולפים את המילה הבאה מהמאגר
      const nextWord = currentRemaining.pop();

      return {
        currentWord: nextWord,
        remaining: currentRemaining
      };
    });
  };

  return (
    <p
      className="next-button"
      onClick={handleClick}
      style={top ? { top: top } : undefined}
    >
      {deck.currentWord}
    </p>
  );
}

export default NextButton;


