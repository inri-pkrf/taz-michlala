import React from 'react';
import './NextButton.css';

function NextButton({ onClick, top }) {
  return (
    <p
      className="next-button"
      onClick={onClick}
      style={top ? { top: `${top}` } : undefined}
    >
      המשך
    </p>
  );
}

export default NextButton;