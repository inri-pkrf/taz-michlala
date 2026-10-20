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

  const [isFullScreen, setIsFullScreen] = useState(
    !!(document.fullscreenElement || document.webkitFullscreenElement)
  );

  // מעקב אחרי מצב מסך מלא (גם כשיוצאים ממנו עם Esc או מכפתור אחר)
  useEffect(() => {
    const syncFullScreenState = () => {
      setIsFullScreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', syncFullScreenState);
    document.addEventListener('webkitfullscreenchange', syncFullScreenState);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullScreenState);
      document.removeEventListener('webkitfullscreenchange', syncFullScreenState);
    };
  }, []);

  // מעבר בין מסך מלא לחלון רגיל
  const toggleFullScreen = () => {
    const docEl = document.documentElement;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) { /* Safari / iOS */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    } else if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {});
    } else if (docEl.webkitRequestFullscreen) { /* Safari / iOS */
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) { /* IE11 */
      docEl.msRequestFullscreen();
    }
  };

  // בעמודים עם כפתור הבית והאחוזים (פינה ימנית עליונה) הכפתור נשאר משמאלם ולא מעליהם
  const pagesWithHomeButtons = ['activity', 'digitalAssets', 'nationalLibrary', 'foreignRelations', 'atWar', 'quizIntro', 'quiz'];
  const fullScreenButtonRight = pagesWithHomeButtons.includes(currentPage) ? '14vh' : '2vh';

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

      {/* כפתור מעבר בין מסך מלא לחלון רגיל */}
      <button
        type="button"
        onClick={toggleFullScreen}
        aria-label={isFullScreen ? 'יציאה ממסך מלא' : 'מעבר למסך מלא'}
        style={{
          position: 'fixed',
          top: '2vh',
          right: fullScreenButtonRight,
          width: '5vh',
          height: '5vh',
          padding: 0,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          border: '0.4vh solid #000641',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          outline: 'none',
          zIndex: 1000,
        }}
      >
        <svg
          width="55%"
          height="55%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000641"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isFullScreen ? (
            // אייקון הקטנה
            <>
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </>
          ) : (
            // אייקון הגדלה
            <>
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}

export default App;
