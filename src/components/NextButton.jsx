import React from 'react';
import './NextButton.css';

function NextButton({ onClick }) {
  return (
    <button className="next-button" onClick={onClick}>
      המשך
    </button>
  );
}

export default NextButton;