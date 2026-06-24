import React from 'react';
import '../style/HomePage.css';


function HomePage({ onNavigate }) {
  return (
    <div className="page-container">
      <h1>עמוד הבית - בחרי נושא</h1>
      <div className="topics-menu">
        <button onClick={() => onNavigate('activity')}>נושא 1: פעילות</button>
        <button onClick={() => onNavigate('digitalAssets')}>נושא 2: נכסים דיגיטליים ורשתות חברתיות</button>
        <button onClick={() => onNavigate('nationalLibrary')}>נושא 3: הספרייה הלאומית</button>
        <button onClick={() => onNavigate('foreignRelations')}>נושא 4: קשרי חוץ</button>
        <button onClick={() => onNavigate('atWar')}>נושא 5: בעת מלחמה</button>
      </div>
    </div>
  );
}

export default HomePage;
