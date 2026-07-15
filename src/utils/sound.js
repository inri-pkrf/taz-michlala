const SOUND_CACHE = {};

const getSoundUrl = (fileName) => {
  // שימוש ב-PUBLIC_URL המובנה כדי להבטיח נתיב אבסולוטי תקין מתיקיית ה-public
  return `${process.env.PUBLIC_URL}/assets/audio/${fileName}`;
};

export const preloadSound = (fileName) => {
  if (typeof Audio === 'undefined') return null;

  if (!SOUND_CACHE[fileName]) {
    const audio = new Audio(getSoundUrl(fileName));
    audio.preload = 'auto';
    // מבצעים load ראשוני כדי שהדפדפן יכיר את הקובץ
    audio.load();
    SOUND_CACHE[fileName] = audio;
  }

  return SOUND_CACHE[fileName];
};

export const playSound = (fileName, options = {}) => {
  if (typeof Audio === 'undefined') return null;

  try {
    // 1. ננסה קודם כל לקחת את האובייקט שכבר נטען במטמון
    let audio = SOUND_CACHE[fileName];

    if (!audio) {
      // אם הוא לא קיים במטמון, ניצור אותו ונשמור אותו שם
      audio = new Audio(getSoundUrl(fileName));
      SOUND_CACHE[fileName] = audio;
    }

    // 2. הגדרת ווליום במידה והועבר
    if (options.volume !== undefined) {
      audio.volume = options.volume;
    } else {
      audio.volume = 1.0; // ברירת מחדל מלאה
    }

    // 3. איפוס הזמן להתחלה (מאפשר ללחוץ ברצף מהיר ועדיין לשמוע)
    audio.currentTime = 0;

    // 4. השמעה עם טיפול בשגיאות חסימה של הדפדפן
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn(`הדפדפן חסם את השמעת הקובץ ${fileName} זמנית עד לאינטראקציה של המשתמש.`, error);
      });
    }

    return audio;
  } catch (e) {
    console.error(`שגיאה בהשמעת הסאונד ${fileName}:`, e);
    return null;
  }
};