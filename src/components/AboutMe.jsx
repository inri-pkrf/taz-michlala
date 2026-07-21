import React, { useState, useEffect, useRef } from 'react';
import './AboutMe.css';

function AboutMe({ disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleOpen = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleGlobalClick);
    }
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleOpen}
      className={`AboutMe-button ${isOpen ? 'open' : ''}`}
      aria-label="אודות"
      disabled={disabled}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/HomePage/info.png`}
        alt="אודות"
        className="AboutMe-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
        }}
      />
      
      <span className="AboutMe-text">
        מפתחת לומדה: שלי יצחק
      </span>
    </button>
  );
}

export default AboutMe;