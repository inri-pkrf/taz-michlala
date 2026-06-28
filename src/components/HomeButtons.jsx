import React from 'react';
import './HomeButton.css';

function HomeButton({ onClick }) {
  return (
    <button onClick={onClick} className="home-back-button">
      <img
        src={`${process.env.PUBLIC_URL}/assets/HomePage/Vector.png`}
        alt="logo"
      />
    </button>
  );
}

export default HomeButton;