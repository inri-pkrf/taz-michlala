import React, { useState, useEffect } from 'react';
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
  
  // אתחול מהמאגר המקומי (localStorage)
  const [completedProgressActions, setCompletedProgressActions] = useState(() => {
    const saved = localStorage.getItem('completedProgressActions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  // חלקיק חדש: סטייט לשמירת השם הפרטי של המשתמש מהמבחן
  const [userFirstName, setUserFirstName] = useState('');

  // סטייט חדש: שומר כמה נושאים פתוחים כרגע למשתמש (מתחיל ב-1)
  // אתחול גם מהמאגר המקומי
  const [unlockedTopicCount, setUnlockedTopicCount] = useState(() => {
    const saved = localStorage.getItem('unlockedTopicCount');
    return saved ? parseInt(saved, 10) : 1;
  });

  // סטייט חדש: מעקב אחרי הנושאים שסיימו בסשן הנוכחי (לא מhashStorage)
  const [currentSessionCompletedTopics, setCurrentSessionCompletedTopics] = useState(new Set());

  // עקוב אחרי העמוד הקודם כדי לדעת אם משתמשת עזבה נושא
  const [previousPage, setPreviousPage] = useState('welcome');

  // בדוק אם משתמשת חוזרת לעמוד הבית מנושא - אם כן, סמן את הנושא כמסיים
  useEffect(() => {
    const topicPages = ['activity', 'digitalAssets', 'nationalLibrary', 'foreignRelations', 'atWar'];
    
    // אם משתמשת הייתה בנושא וכרגע היא בעמוד הבית, סמן את הנושא כמסיים
    if (topicPages.includes(previousPage) && currentPage === 'home') {
      setCurrentSessionCompletedTopics((prev) => new Set([...prev, previousPage]));
    }
    
    setPreviousPage(currentPage);
  }, [currentPage, previousPage]);

  // שמירה של completedProgressActions ל-localStorage כשהוא משתנה
  useEffect(() => {
    localStorage.setItem('completedProgressActions', JSON.stringify(completedProgressActions));
  }, [completedProgressActions]);

  // שמירה של unlockedTopicCount ל-localStorage כשהוא משתנה
  useEffect(() => {
    localStorage.setItem('unlockedTopicCount', unlockedTopicCount.toString());
  }, [unlockedTopicCount]);

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
    // אם הנתיב הוא לבוחן, פשוט עבור לשם
    if (route === 'quizIntro') {
      setCurrentPage('quizIntro');
      return;
    }

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
    // בדיקה אם כל הנושאים הושלמו בסשן הנוכחי (לא רק מ-localStorage)
    const showQuizAvailable = requiredTopics.every(t => currentSessionCompletedTopics.has(t));

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