import React from 'react';
import '../styles/LightButton.css';

const LightButton = ({ label = 'Click me', icon, onClick, className = '' }) => {
  return (
    <div
      className={`light-button ${className}`}
      tabIndex={0}
      role="button"
      aria-label={label}
      onClick={onClick}
    >
      <div className="light-button-inner">
        {icon && <span className="icon">{icon}</span>}
        <p>{label}</p>
      </div>
    </div>
  );
};

export default LightButton;
