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
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  // חלקיק חדש: סטייט לשמירת השם הפרטי של המשתמש מהמבחן
  const [userFirstName, setUserFirstName] = useState('');

  // סטייט חדש: שומר כמה נושאים פתוחים כרגע למשתמש (מתחיל ב-1)
  const [unlockedTopicCount, setUnlockedTopicCount] = useState(1);

  const progress = quizStarted ? 100 : Math.round((completedProgressActions.length / TOTAL_PROGRESS_STEPS) * 100);
  
  const incrementProgress = (actionKey) => {
    if (!actionKey) return;
    setCompletedProgressActions((prev) => {
      if (prev.includes(actionKey)) return prev;
      return [...prev, actionKey];
    });
  };

  // פונקציית ניווט חכמה שמנהלת את פתיחת הנושאים לפי סדר הכניסה
  const handleNavigate = (route) => {
    // מיפוי של ה-Route למספר הנושא
    const routeToNumber = {
      'activity': 1,
      'digitalAssets': 2,
      'nationalLibrary': 3,
      'foreignRelations': 4,
      'atWar': 5
    };

    const clickedTopicNum = routeToNumber[route];

    // אם המשתמש נכנס לנושא שהוא הכי מתקדם שלו כרגע, נפתח לו את הנושא הבא בתור
    if (clickedTopicNum && clickedTopicNum === unlockedTopicCount) {
      setUnlockedTopicCount((prev) => Math.min(prev + 1, 5)); // מעלה את מספר הנושאים הפתוחים (מקסימום 5)
    }

    // מעבר לעמוד המבוקש
    setCurrentPage(route);
  };

  // פונקציה שמחליטה איזו קומפוננטה לרנדר על המסך
  const renderPage = () => {
    const requiredTopics = ['activity','digitalAssets','nationalLibrary','foreignRelations','atWar'];
    const showQuizAvailable = requiredTopics.every(t => completedProgressActions.some(k => k.startsWith(t)));

    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={() => setCurrentPage('home')} />;
        
      case 'home':
        return (
          <HomePage 
            onNavigate={handleNavigate} // שימוש בפונקציית הניווט החכמה שלנו
            showQuizAvailable={showQuizAvailable} 
            progress={unlockedTopicCount} // העברת הנושאים הפתוחים כ-Prop
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
              setCompletedProgressActions((prev) => prev.includes('quiz') ? prev : [...prev, 'quiz']);
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
            progress={progress}
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
            progress={progress}
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