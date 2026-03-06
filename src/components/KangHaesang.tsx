import React from 'react';
import type { KangHaesangEmotion } from '../types/game';
import './KangHaesang.css';

interface KangHaesangProps {
  emotion: KangHaesangEmotion;
  isSpeaking?: boolean;
}

const KangHaesang: React.FC<KangHaesangProps> = ({ emotion, isSpeaking = false }) => {
  const getEmotionClass = () => {
    switch (emotion) {
      case 'angry':
        return 'angry';
      case 'surprised':
        return 'surprised';
      default:
        return 'normal';
    }
  };

  return (
    <div className={`kang-haesang ${getEmotionClass()} ${isSpeaking ? 'speaking' : ''}`}>
      <img
        src={`/images/kang-haesang-${emotion}.png`}
        alt="강해상"
        className="character-image"
      />
    </div>
  );
};

export default KangHaesang;
