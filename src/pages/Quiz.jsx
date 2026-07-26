import React, { useState, useEffect, useRef } from 'react';
import HomeButton from '../components/HomeButtons';
import '../style/Quiz.css';

const QUESTIONS = [
  { 
    q: `מה ניתן לעשות באתר המכללה?`, 
    choices: [`להירשם להכשרות`, `ללמוד על פעילויות המכללה`, `לחפש תוכן ומאגרי ידע מקצועיים`, `כל התשובות נכונות`], 
    a: 3 
  },
  { 
    q: `כמה פרטי מידע קיימים בספרייה הלאומית לחירום?`, 
    choices: [`כ-1,000 פריטים`, `כ-1,250 פריטים`, `כ-1,500 פריטים`, `כ-1,700 פריטים`], 
    a: 1 
  },
  { 
    q: `מהו 'מעגל ההכשרה השלם'?`, 
    choices: [
      `תהליך המציב יעד ללמידה מבצעית רציפה בלבד`, 
      `מעגל ההכשרות שעוברים מנהלי המכלולים המגיעים למכללה`, 
      `המעגל העובר דרך התורה, היכולת ללמוד מהשטח ולהשתפר תוך כדי תנועה`, 
      `עבודה של כל מגמה בנפרד, כאשר כל אחת משפיעה בתחומה בלבד`
    ], 
    a: 1 
  },
  { 
    q: `כמה לקחים הופקו מהשטח על ידי מרכז הלמידה המבצעית במהלך הלחימה?`, 
    choices: [`180 לקחים`, `250 לקחים`, `423 לקחים`, `620 לקחים`], 
    a: 2 
  },
  { 
    q: `מהן ראשי התיבות רח"ל?`, 
    choices: [`רשת חירום לישראל`, `רשת חברים לאומית`, `רשות החירום הלאומית`, `רשות החירום לישראל`], 
    a: 2 
  },
  { 
    q: `לפי פרק הקש"ח, נציגים מכמה מדינות ביקרו במכללה?`, 
    choices: [`7 מדינות`, `6 מדינות`, `23 מדינות`, `12 מדינות`], 
    a: 1 
  },
  { 
    q: `כמה גנרלים ספרדים ביקרו במכללה?`, 
    choices: [`2`, `4`, `6`, `הם לא היו ספרדים, אלא אמריקאים`], 
    a: 2 
  },
  { 
    q: `מה ביצעה המכללה כחלק מהמאמץ המלחמתי?`, 
    choices: [
      `ביצוע סדנאות 'זמן יקר' במפקדות`, 
      `הפצת שיעורים דיגיטליים לצוותי צח"י`, 
      `אירוח שרים ונציגי וועדת חוץ וביטחון`, 
      `כל התשובות נכונות`
    ], 
    a: 3 
  },
  { 
    q: `כמה מלונות ניהל משל"ט ינאי בשיא במהלך הלחימה?`, 
    choices: [`456 מלונות`, `465 מלונות`, `546 מלונות`, `564 מלונות`], 
    a: 0 
  },
  { 
    q: `מהו הסלוגן של נווה איתנים?`, 
    choices: [`הכי מוכנה בארץ`, `איתנים ונהנים`, `הכי מוכנים לחירום`, `הכי מוכנים במדינה`], 
    a: 2 
  }
];

function Quiz({ onGoHome, userName = "משתמש/ת", progress, isHomeEnabled = false, onQuizCompleted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [clockRotation, setClockRotation] = useState(0); 

  const hallelujahAudio = useRef(null);
  const loserAudio = useRef(null);
  const pendingSoundRef = useRef(null);

  const currentAnswer = answers[currentQuestion];
  const question = QUESTIONS[currentQuestion];

  const score = answers.reduce((s, ans, i) => s + (ans === QUESTIONS[i].a ? 10 : 0), 0);
  const passed = score >= 70;

  useEffect(() => {
    if (submitted) {
      onQuizCompleted?.(true);
    } else {
      onQuizCompleted?.(false);
    }
  }, [submitted, onQuizCompleted]);

  const playResultSound = (fileName) => {
    const audioRef = fileName === 'halleluja.mp3' ? hallelujahAudio : loserAudio;
    if (!audioRef.current) {
      const baseUrl = process.env.PUBLIC_URL || '';
      const soundUrl = `${baseUrl}/assets/Audio/${fileName}`;
      const fallbackUrl = `${baseUrl}/assets/audio/${fileName}`;
      audioRef.current = new Audio(soundUrl);
      audioRef.current.preload = 'auto';
      audioRef.current.addEventListener('error', () => {
        if (audioRef.current && audioRef.current.currentSrc !== fallbackUrl) {
          audioRef.current.src = fallbackUrl;
          audioRef.current.load();
          audioRef.current.play().catch(() => {});
        }
      }, { once: true });
    }

    audioRef.current.currentTime = 0;
    const playPromise = audioRef.current.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        pendingSoundRef.current = fileName;
      });
    }
  };

  useEffect(() => {
    const unlockAudio = () => {
      if (pendingSoundRef.current) {
        playResultSound(pendingSoundRef.current);
        pendingSoundRef.current = null;
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);

      // ניקוי אודיו בעת יציאה מרכיב החידון
      if (hallelujahAudio.current) {
        hallelujahAudio.current.pause();
        hallelujahAudio.current = null;
      }
      if (loserAudio.current) {
        loserAudio.current.pause();
        loserAudio.current = null;
      }
    };
  }, []);

  const handleSelect = (choiceIndex) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = choiceIndex;
    setAnswers(nextAnswers);

    setClockRotation(prev => prev + 180);

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setSubmitted(true);
        playResultSound(passed ? 'halleluja.mp3' : 'loser.mp3');
      }
    }, 200);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setClockRotation(prev => prev - 180); 
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if (hallelujahAudio.current) hallelujahAudio.current.pause();
    if (loserAudio.current) loserAudio.current.pause();
    pendingSoundRef.current = null;
    onQuizCompleted?.(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
    setSubmitted(false);
    setClockRotation(0);
  };

  // מופחת ל-18 כוכבים במקום 55 למניעת עומס זיכרון בניידים
  const renderStarRain = () => {
    return Array.from({ length: 18 }).map((_, i) => {
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 3;
      const randomDuration = 2 + Math.random() * 2;
      
      return (
        <div 
          key={i} 
          className="falling-star"
          style={{
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`
          }}
        >
          ★
        </div>
      );
    });
  };

  return (
    <div className="page-container quiz-page" style={{ position: 'relative' }}>
      <HomeButton onClick={onGoHome} progress={progress} disabled={!isHomeEnabled} />
      {!submitted ? (
        <div className="quiz-form" style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ 
            width: '100%',
            textAlign: 'center', 
            margin: '0 0 1rem 0', 
            color: '#000641', 
            fontWeight: 'normal', 
            fontSize: '0.7rem',
            direction: 'rtl'
          }}>
            שאלה {currentQuestion + 1} מתוך {QUESTIONS.length}
          </div>

          <img
            className="quiz-clock"
            src={`${process.env.PUBLIC_URL}/assets/Quiz/clock.png`}
            alt="clock"
            style={{ 
              display: 'block', 
              margin: '0 auto 1rem auto', 
              maxWidth: '12vw', 
              width: '12vw',
              transform: `rotate(${clockRotation}deg)`,
              transition: 'transform 0.4s ease-in-out'
            }} 
          />

          <div className="quiz-question" style={{ width: '100%' }}>
            <h3>{question.q}</h3>
            {question.choices.map((choice, index) => {
              const isSelected = currentAnswer === index;
              return (
                <div
                  key={index}
                  role="button"
                  className={`quiz-choice-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(index)}
                >
                  {choice}
                </div>
              );
            })}
          </div>

          <div className="quiz-actions" style={{ marginTop: '1rem', width: '30vw' }}>
            <div 
              role="button"
              className={`quiz-nav-item back ${currentQuestion === 0 ? 'disabled' : ''}`} 
              onClick={handleBack}
            >
              חזור
            </div>
          </div>

        </div>
      ) : (
        <>
          {passed && (
            <div className="victory-effects">
              <div className="rainbow-effect"></div>
              {renderStarRain()}
            </div>
          )}

          <div className="quiz-result" style={{ zIndex: 2 }}>
            <h2 className="quiz-question" style={{ textAlign: 'center' }}>
              <h3>התוצאה שלך</h3>
            </h2>
            
            <div className="quiz-score-display" style={{ fontSize: '2rem', margin: '2vh 0', fontWeight: 'bold', color: '#000641', textAlign: 'center' }}>
              {score} / 100
            </div>
            
            <p className="quiz-explain" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              {passed 
                ? `${userName}, וואלה מרשים!` 
                : `${userName}, זה מבאס את שנינו אבל, יאללה לעסק...`
              }
            </p>
            
            <div className="quiz-result-actions">
              <div role="button" className="quiz-nav-item retry" onClick={handleReset}>
                נסה שוב
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;