import React from 'react';
import './HomeButton.css';

function HomeButton({ onClick, progress }) {
  return (
    <div className="home-buttons-container">
      {typeof progress === 'number' && (
        <button className="home-progress-button" disabled>
          {Math.round(progress)}%
        </button>
      )}
      <button onClick={onClick} className="home-back-button" aria-label="חזרה לבית">
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