import React from 'react';
import '../style/FinalDitails.css';
import HomeButton from '../components/HomeButtons'; 


function FinalDitails({ onGoHome }) {
  return (
    <div>
      <h1>FinalDitails</h1>
      <p>זה העמוד FinalDitails. זהו שומר מקום שמראה איזה עמוד רץ.</p>
      <HomeButton onClick={onGoHome} />
    </div>
  );
}

export default FinalDitails;
