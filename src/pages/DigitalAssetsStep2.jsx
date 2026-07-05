import React, { useState, useEffect } from 'react';
import '../style/DigitalAssets.css';

function DigitalAssetsStep2() {
  const [isChestOpen, setIsChestOpen] = useState(false);

const playChestSound = () => {
  // יצירת נתיב דינמי מוחלט לתיבה
  const soundPath = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/assets/Audio/chest-open.mp3`;
  
  const audio = new Audio(soundPath);
  audio.play().catch(err => console.log("סאונד חסום זמנית:", err));
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChestOpen(true);
      playChestSound();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

      {/* טוויטר */}
      <a 
        href="https://il.linkedin.com/company/ilresilience?trk=similar-pages" 
        target="_blank" 
        rel="noopener noreferrer"
        id="DigitalAssets-icon2"
        className={isChestOpen ? 'icons-fade-in' : 'icons-hidden'}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/OnSocial/twitter.png`} alt="Twitter" />
      </a>

      {/* X (טוויטר החדש) */}
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