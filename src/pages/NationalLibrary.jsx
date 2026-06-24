import React from 'react';
import '../style/NationalLibrary.css';
import HomeButton from '../components/HomeButtons'; 


 function NationalLibrary({ onGoHome }) {
  return (
    <div>
      <h1>NationalLibrary</h1>
      <p>זה העמוד NationalLibrary. זהו שומר מקום שמראה איזה עמוד רץ.</p>
      <HomeButton onClick={onGoHome} />
    </div>
  );
}

export default NationalLibrary;
