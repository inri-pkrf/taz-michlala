import React from 'react';
import '../style/ForeignRelations.css';
import HomeButton from '../components/HomeButtons'; 


function ForeignRelations({ onGoHome }) {
  return (
    <div >
      <h1>ForeignRelations</h1>
      <p>זה העמוד ForeignRelations. זהו שומר מקום שמראה איזה עמוד רץ.</p>
      <HomeButton onClick={onGoHome} />
    </div>
  );
}

export default ForeignRelations;
