import React, { useState } from 'react';

function ActivityStep3() {


  return (
    <div className="page-container">


      <h1 id="activity-title">פעילות המכללה</h1>
      <p id="activityStep3-text1"> אנחנו מייצרים פה שפה אחודה ומקדמים שיתופי פעולה עם מובילים מקצועיים ממשרדי הממשלה השונים, מרכז השלטון המקומי והאזורי, ארגוני חירום והצלה, מוסדות אקדמאים וארגונים מהחברה האזרחית. </p>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/Activity/gif.gif`} 
              alt="פעילות המכללה" 
              id="activity-gif"
              style={{ maxWidth: '80vw', maxHeight: '50vh', borderRadius: '1.5vh', boxShadow: '0 8px 24px rgba(0,0,0,0.5) left: 5vw;  ' }} 
            />



      
    </div>
  );
}

export default ActivityStep3;