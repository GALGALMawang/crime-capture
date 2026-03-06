import React from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="intro-screen">
      <div className="intro-background" />
      <div className="intro-content">
        <h1 className="game-title">범죄도시2 - 심문 시뮬레이션</h1>
        <button className="start-button" onClick={onStart}>
          게임 시작
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
