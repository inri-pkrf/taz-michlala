import React, { useState, useEffect } from 'react';
import './App.css';
import { calculateProgress } from './utils/progress';

// ייבוא העמודים
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import Activity from './pages/Activity';
import DigitalAssets from './pages/DigitalAssets';
import NationalLibrary from './pages/NationalLibrary';
import ForeignRelations from './pages/ForeignRelations';
import AtWar from './pages/AtWar';
import QuizIntro from './pages/QuizIntro';
import Quiz from './pages/Quiz';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  
  // 1. קבעי כאן את הסכום הכולל של כל בלוקים/כפתורי ה"המשך" בכל הלומדה
  // למשל: אם יש 5 נושאים ובכל נושא יש 4 שקפים = 20 שלבים בסך הכל
  const TOTAL_PROGRESS_STEPS = 12; 

  const [completedProgressActions, setCompletedProgressActions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [unlockedTopicCount, setUnlockedTopicCount] = useState(1);
  const [currentSessionCompletedTopics, setCurrentSessionCompletedTopics] = useState(new Set());
  const [previousPage, setPreviousPage] = useState('welcome');

  useEffect(() => {
    const topicPages = ['activity', 'digitalAssets', 'nationalLibrary', 'foreignRelations', 'atWar'];
    if (topicPages.includes(previousPage) && currentPage === 'home') {
      setCurrentSessionCompletedTopics((prev) => new Set([...prev, previousPage]));
    }
    setPreviousPage(currentPage);
  }, [currentPage, previousPage]);

  // חישוב אחוז ההתקדמות
  const isQuizPage = currentPage === 'quizIntro' || currentPage === 'quiz';
  const progress = isQuizPage 
    ? 100 
    : calculateProgress(completedProgressActions, TOTAL_PROGRESS_STEPS);

  // פונקציית הוספת התקדמות לפי מזהה שלב (actionKey)
  const incrementProgress = (actionKey) => {
    if (!actionKey) return;
    setCompletedProgressActions((prev) => {
      // אם השלב הזה כבר בוצע בעבר, אל תעלה אחוזים שוב
      if (prev.includes(actionKey)) return prev;
      return [...prev, actionKey];
    });
  };

  const handleNavigate = (route) => {
    if (route === 'quizIntro') {
      setCurrentPage('quizIntro');
      return;
    }

    const routeToNumber = {
      'activity': 1,
      'digitalAssets': 2,
      'nationalLibrary': 3,
      'foreignRelations': 4,
      'atWar': 5
    };

    const clickedTopicNum = routeToNumber[route];
    if (clickedTopicNum && clickedTopicNum > unlockedTopicCount) return;

    if (clickedTopicNum && clickedTopicNum === unlockedTopicCount) {
      setUnlockedTopicCount((prev) => Math.min(prev + 1, 5));
    }

    setCurrentPage(route);
  };

  const renderPage = () => {
    const requiredTopics = ['activity','digitalAssets','nationalLibrary','foreignRelations','atWar'];
    const showQuizAvailable = requiredTopics.every(t => currentSessionCompletedTopics.has(t));

    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={() => setCurrentPage('home')} />;
        
      case 'home':
        return (
          <HomePage 
            onNavigate={handleNavigate} 
            showQuizAvailable={showQuizAvailable} 
            progress={unlockedTopicCount} 
          />
        );
        
      case 'activity':
        return <Activity onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      case 'digitalAssets':
        return <DigitalAssets onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      case 'nationalLibrary':
        return <NationalLibrary onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      case 'foreignRelations':
        return <ForeignRelations onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      case 'atWar':
        return <AtWar onGoHome={() => setCurrentPage('home')} progress={progress} onProgress={incrementProgress} />;
        
      case 'quizIntro':
        return (
          <QuizIntro 
            onStart={(name) => {
              setUserFirstName(name); 
              setQuizCompleted(false);
              setQuizStarted(true);
              setCurrentPage('quiz'); 
            }} 
            onCancel={() => {
              setQuizCompleted(false);
              setQuizStarted(false);
              setCurrentPage('home');
            }}
            onGoHome={() => {
              setQuizCompleted(false);
              setQuizStarted(false);
              setCurrentPage('home');
            }}
            progress={100}
            isHomeEnabled={quizCompleted}
          />
        );

      case 'quiz':
        return (
          <Quiz 
            userName={userFirstName} 
            onGoHome={() => {
              setQuizCompleted(false);
              setCurrentPage('home');
            }}
            progress={100}
            isHomeEnabled={quizCompleted}
            onQuizCompleted={setQuizCompleted}
          />
        );
        
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