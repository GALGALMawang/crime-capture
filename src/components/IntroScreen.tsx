import React from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="intro-screen">
      <div className="intro-background" />
      <button className="start-button" onClick={onStart} aria-label="게임 시작" />
    </div>
  );
};

export default IntroScreen;
