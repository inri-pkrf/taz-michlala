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
import QuizIntro from './pages/QuizIntro';
import Quiz from './pages/Quiz';

function App() {
  // המצב (State) שקובע איזה עמוד מוצג כרגע
  const [currentPage, setCurrentPage] = useState('welcome');
  const TOTAL_PROGRESS_STEPS = 13;
  const [completedProgressActions, setCompletedProgressActions] = useState([]);

  const progress = Math.round((completedProgressActions.length / TOTAL_PROGRESS_STEPS) * 100);
  const incrementProgress = (actionKey) => {
    if (!actionKey) {
      return;
    }

    setCompletedProgressActions((prev) => {
      if (prev.includes(actionKey)) {
        return prev;
      }
      return [...prev, actionKey];
    });
  };

  // פונקציה שמחליטה איזו קומפוננטה לרנדר על המסך
  const renderPage = () => {
    const requiredTopics = ['activity','digitalAssets','nationalLibrary','foreignRelations','atWar'];
    const showQuizAvailable = requiredTopics.every(t => completedProgressActions.some(k => k.startsWith(t)));

    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={() => setCurrentPage('home')} />;
        
      case 'home':
        return <HomePage onNavigate={setCurrentPage} showQuizAvailable={showQuizAvailable} />;
        
      // נושא 1: פעילות
      case 'activity':
        return <Activity onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      // נושא 2: נכסים דיגיטליים ורשתות חברתיות
      case 'digitalAssets':
        return <DigitalAssets onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      // נושא 3: הספרייה הלאומית
      case 'nationalLibrary':
        return <NationalLibrary onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      // נושא 4: קשרי חוץ
      case 'foreignRelations':
        return <ForeignRelations onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      // נושא 5: בעת מלחמה
      case 'atWar':
        return <AtWar onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      case 'quizIntro':
        return <QuizIntro onStart={() => setCurrentPage('quiz')} onCancel={() => setCurrentPage('home')} />;

      case 'quiz':
        return <Quiz onGoHome={() => setCurrentPage('home')} />;
        
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