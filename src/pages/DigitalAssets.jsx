import React from 'react';
import '../style/DigitalAssets.css';
import HomeButton from '../components/HomeButtons'; 


function DigitalAssets({ onGoHome }) {
  return (
    <div>
      <h1>DigitalAssets</h1>
      <p>זה העמוד DigitalAssets. זהו שומר מקום שמראה איזה עמוד רץ.</p>
      <HomeButton onClick={onGoHome} />
    </div>
  );
}


export default DigitalAssets;
