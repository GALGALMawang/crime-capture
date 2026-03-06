import React from 'react';
import './EndingScreen.css';

interface EndingScreenProps {
  onRestart: () => void;
}

const EndingScreen: React.FC<EndingScreenProps> = ({ onRestart }) => {
  return (
    <div className="ending-screen">
      <div className="ending-background" />
      <div className="ending-content">
        <h1 className="ending-title">심문 종료</h1>
        <p className="ending-subtitle">
          강해상의 진실을 파헤쳤나요?
        </p>
        <button className="restart-button" onClick={onRestart}>
          다시 시작
        </button>
      </div>
    </div>
  );
};

export default EndingScreen;
