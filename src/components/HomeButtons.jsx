import React from 'react';
import './HomeButton.css';

function HomeButton({ onClick, progress, disabled = false }) {
  return (
    <div className="home-buttons-container">
      {typeof progress === 'number' && (
        <button className="home-progress-button" disabled>
          {Math.round(progress)}%
        </button>
      )}
      <button
        onClick={disabled ? undefined : onClick}
        className="home-back-button"
        aria-label="חזרה לבית"
        disabled={disabled}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/HomePage/Vector.png`}
          alt="בית"
          className="home-icon-img"
        />
      </button>
    </div>
  );
}

export default HomeButton;