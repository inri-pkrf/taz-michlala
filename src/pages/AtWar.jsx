
import React from 'react';
import '../style/AtWar.css';
import HomeButton from '../components/HomeButtons'; 


function AtWar({ onGoHome }) {
  return (
    <div >
      <h1>AtWar</h1>
      <p>זה העמוד AtWar. זהו שומר מקום שמראה איזה עמוד רץ.</p>
      <HomeButton onClick={onGoHome} />
    </div>
  );
}

export default AtWar;
