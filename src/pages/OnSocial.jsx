import React from 'react';
import '../style/OnSocial.css';
import HomeButton from '../components/HomeButtons'; 


function OnSocial({ onGoHome }) {
  return (
    <div >
      <h1>OnSocial</h1>
      <p>זה העמוד OnSocial. זהו שומר מקום שמראה איזה עמוד רץ.</p>
      <HomeButton onClick={onGoHome} />
    </div>
  );
}

export default OnSocial;
