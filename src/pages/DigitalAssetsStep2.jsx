import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../style/DigitalAssets.css';

function DigitalAssetsStep2() {
  const [isChestOpen, setIsChestOpen] = useState(false);
  const pendingSoundRef = useRef(null);

  const playAudioFile = useCallback((fileName, volume = 0.85) => {
    const soundUrl = `${process.env.PUBLIC_URL}/assets/audio/${fileName}`;
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.preload = 'auto';
    const playPromise = audio.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        pendingSoundRef.current = { fileName, volume };
      });
    }
  }, []);

  

  const playChestSound = useCallback(() => {
    playAudioFile('chest-open.mp3');
  }, [playAudioFile]);

  useEffect(() => {
    const unlockAudio = () => {
      if (pendingSoundRef.current) {
        playAudioFile(pendingSoundRef.current.fileName, pendingSoundRef.current.volume);
        pendingSoundRef.current = null;
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);

    const timer = setTimeout(() => {
      setIsChestOpen(true);
      playChestSound();
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
  }, [playAudioFile, playChestSound]);

  return (
    <div className="page-container">
      <h1 id="activity-title">המכללה ברשתות</h1>
      <p id="DigitalAssetsStep2-text1">כןכן, קראתם נכון</p>

      {/* התיבה הסגורה */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/OnSocial/closed-chest.png`} 
        alt="תיבה סגורה" 
        id="DigitalAssets-closed-chest"
        className={isChestOpen ? 'chest-fade-out' : 'chest-rumble'}
      />

      {/* התיבה הפתוחה */}
      <img 
        src={`${process.env.PUBLIC_URL}/assets/OnSocial/open-chest.png`} 
        alt="תיבה פתוחה" 
        id="DigitalAssets-open-chest"
        className={isChestOpen ? 'chest-fade-in-pop' : 'chest-hidden'}
      />

      {/* אינסטגרם */}
      <a 
        href="https://www.instagram.com/ilresilience/" 
        target="_blank" 
        rel="noopener noreferrer"
        id="DigitalAssets-icon1"
        className={isChestOpen ? 'icons-fade-in' : 'icons-hidden'}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/OnSocial/instagram.png`} alt="Instagram" />
      </a>

      {/* לינקדאין (תוקן הטקסט החלופי מטוויטר ל-LinkedIn) */}
      <a 
        href="https://il.linkedin.com/company/ilresilience?trk=similar-pages" 
        target="_blank" 
        rel="noopener noreferrer"
        id="DigitalAssets-icon2"
        className={isChestOpen ? 'icons-fade-in' : 'icons-hidden'}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/OnSocial/linkedIn.png`} alt="LinkedIn" />
      </a>

      {/* X (טוויטר לשעבר) */}
      <a 
        href="https://x.com/ILresilience" 
        target="_blank" 
        rel="noopener noreferrer"
        id="DigitalAssets-icon3"
        className={isChestOpen ? 'icons-fade-in' : 'icons-hidden'}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/OnSocial/xCom.png`} alt="X" />
      </a>

      {/* פייסבוק */}
      <a 
        href="https://www.facebook.com/ilResilience" 
        target="_blank" 
        rel="noopener noreferrer"
        id="DigitalAssets-icon4"
        className={isChestOpen ? 'icons-fade-in' : 'icons-hidden'}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/OnSocial/facebook.png`} alt="Facebook" />
      </a>
      
      <p id="DigitalAssetsStep2-text4">
        לייק ואפשר להמשיך :) 
      </p>
      <p id="DigitalAssetsStep2-text5">
        קדימה, אנחנו מחכים...
      </p>

    </div>
  );
}

export default DigitalAssetsStep2;