import React, { useState } from 'react';
import './App.css';

// ייבוא כל העמודים והקומפוננטות
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import Activity from './pages/Activity'; // נושא 1
import DigitalAssets from './pages/DigitalAssets'; // נושא 2 (משולב עם OnSocial)
import NationalLibrary from './pages/NationalLibrary'; // נושא 3
import ForeignRelations from './pages/ForeignRelations'; // נושא 4
import AtWar from './pages/AtWar'; // נושא 5

function App() {
  // המצב (State) שקובע איזה עמוד מוצג כרגע
  const [currentPage, setCurrentPage] = useState('welcome');

  // פונקציה שמחליטה איזו קומפוננטה לרנדר על המסך
  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={() => setCurrentPage('home')} />;
        
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
        
      // נושא 1: פעילות
      case 'activity':
        return <Activity onGoHome={() => setCurrentPage('home')} />;
        
      // נושא 2: נכסים דיגיטליים ורשתות חברתיות
      case 'digitalAssets':
        return <DigitalAssets onGoHome={() => setCurrentPage('home')} />;
        
      // נושא 3: הספרייה הלאומית
      case 'nationalLibrary':
        return <NationalLibrary onGoHome={() => setCurrentPage('home')} />;
        
      // נושא 4: קשרי חוץ
      case 'foreignRelations':
        return <ForeignRelations onGoHome={() => setCurrentPage('home')} />;
        
      // נושא 5: בעת מלחמה
      case 'atWar':
        return <AtWar onGoHome={() => setCurrentPage('home')} />;
        
      default:
        return <WelcomePage onNavigate={() => setCurrentPage('home')} />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App;