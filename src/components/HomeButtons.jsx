import React from 'react';
import './HomeButton.css';

function HomeButton({ onClick }) {
  return (
    <button onClick={onClick} className="home-back-button">
      <span>🏠</span>
      חזרה לעמוד הבית
    </button>
  );
}

export default HomeButton;