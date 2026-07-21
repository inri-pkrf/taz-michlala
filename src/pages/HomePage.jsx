import React from 'react';
import '../style/HomePage.css';

// קיבלנו את progress כ-prop (מספר בין 1 ל-5 המייצג את השלב הנוכחי הפתוח)
function HomePage({ onNavigate, showQuizAvailable, progress = 1 }) {
  
  // פונקציה שעוזרת לנו לבדוק אם תג מסוים צריך להיות חסום
  const isTagDisabled = (tagNumber) => {
    return tagNumber > progress;
  };

  // פונקציה שמטפלת בלחיצה - מנווטת רק אם התג פתוח
  const handleTagClick = (tagNumber, route) => {
    if (!isTagDisabled(tagNumber)) {
      onNavigate(route);
    }
  };

  return (
    <div className="page-container">
      <h1 id="homePage-title">עמוד הבית</h1>
      <p id="homePage-description">כל תג שם מהווה נושא, יש ללחוץ על התגים לפי הסדר, תהנו :)</p>
  

      <img
        className={`welcomePage-logo`}
        src={`${process.env.PUBLIC_URL}/assets/WelcomePage/logo.png`}
        alt="logo"
      />


      
      <div className="topics-menu">
        
        {/* תג 1 - פעילות (צהוב) - תמיד פתוח כי הוא מספר 1 */}
        <div 
          className={`tag-wrapper yellow-tag ${isTagDisabled(1) ? 'disabled' : ''}`} 
          onClick={() => handleTagClick(1, 'activity')}
        > 
            <div className="tag-number num-yellow">1</div>
            <img src={`${process.env.PUBLIC_URL}/assets/HomePage/name-tag-yellow.png`} alt="Activity" className="tag-image"/>
            <p className="tag-text text-yellow">פעילות</p>
        </div>

        {/* תג 2 - נכסים דיגיטליים (ירוק) */}
        <div 
          className={`tag-wrapper green-tag ${isTagDisabled(2) ? 'disabled' : ''}`} 
          onClick={() => handleTagClick(2, 'digitalAssets')}
        > 
            <div className="tag-number num-green">2</div>
            <img src={`${process.env.PUBLIC_URL}/assets/HomePage/name-tag-green.png`} alt="Digital Assets" className="tag-image" />
            <p className="tag-text text-green">נכסים דיגיטליים</p>
        </div>

        {/* תג 3 - הספרייה הלאומית (כחול) */}
        <div 
          className={`tag-wrapper blue-tag ${isTagDisabled(3) ? 'disabled' : ''}`} 
          onClick={() => handleTagClick(3, 'nationalLibrary')}
        > 
            <div className="tag-number num-blue">3</div>
            <img src={`${process.env.PUBLIC_URL}/assets/HomePage/name-tag-blue.png`} alt="National Library" className="tag-image" />
            <p className="tag-text text-blue">הספרייה הלאומית</p>
        </div>



        {/* תג 4 - קשרי חוץ (ורוד) */}
        <div 
          className={`tag-wrapper pink-tag ${isTagDisabled(4) ? 'disabled' : ''}`} 
          onClick={() => handleTagClick(4, 'foreignRelations')}
        > 
            <div className="tag-number num-pink">4</div>
            <img src={`${process.env.PUBLIC_URL}/assets/HomePage/name-tag-pink.png`} alt="Foreign Relations" className="tag-image" />
            <p className="tag-text text-pink">קשרי חוץ</p>
        </div>

        {/* תג 5 - בעת מלחמה (כתום) */}
        <div 
          className={`tag-wrapper orange-tag ${isTagDisabled(5) ? 'disabled' : ''}`} 
          onClick={() => handleTagClick(5, 'atWar')}
        > 
            <div className="tag-number num-orange">5</div>
            <img src={`${process.env.PUBLIC_URL}/assets/HomePage/name-tag-orange.png`} alt="At War" className="tag-image" />
            <p className="tag-text text-orange">בעת מלחמה</p>
        </div>

      </div>
      


      {showQuizAvailable && (
        <div style={{ marginTop: '3vh', textAlign: 'center' }}>
          <img
            className={`ToQuiz`}
            src={`${process.env.PUBLIC_URL}/assets/Quiz/hat.png`}
            alt="hat"
          />
          <button className="ToQuiz-button" onClick={() => onNavigate('quizIntro')}>לעבור למבחן</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;