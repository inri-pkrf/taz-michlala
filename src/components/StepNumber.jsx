import React from 'react';
import './StepNumber.css';

function StepNumber({ number, top, left, bgColor = '#ffffff', borderColor = '#707070', textColor = '#707070' }) {
  return (
    <div 
      className="step-number"
      style={{
        top: top,          // נקבע דינמית על ידך בכל מסך
        left: left,        // נקבע דינמית על ידך בכל מסך
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor
      }}
    >
      {number}
    </div>
  );
}

export default StepNumber;