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
      case 'crying':
        return 'crying';
      case 'broken':
        return 'broken';
      default:
        return 'normal';
    }
  };

  // 이미지 소스 결정
  const getImageSource = () => {
    switch (emotion) {
      case 'crying':
        return '/images/kang-haesang-crying.png';
      case 'broken':
        return '/images/kang-haesang-crying.png';
      case 'angry':
        return '/images/kang-haesang-angry.png';
      case 'surprised':
        return '/images/kang-haesang-surprised.png';
      default:
        return '/images/kang-haesang-normal.png';
    }
  };

  return (
    <div className={`kang-haesang ${getEmotionClass()} ${isSpeaking ? 'speaking' : ''}`}>
      <img
        src={getImageSource()}
        alt="강해상"
        className="character-image"
      />
    </div>
  );
};

export default KangHaesang;
