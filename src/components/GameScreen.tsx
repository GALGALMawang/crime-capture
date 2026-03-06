import React, { useState } from 'react';
import type { KangHaesangEmotion, Question } from '../types/game';
import KangHaesang from './KangHaesang';
import QuestionSelector from './QuestionSelector';
import { speakText } from '../services/fishAudioService';
import { getQuestionsByRound } from '../data/questions';
import './GameScreen.css';

interface GameScreenProps {
  onEnd: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onEnd }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [emotion, setEmotion] = useState<KangHaesangEmotion>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<string>('');
  const [audioError, setAudioError] = useState<string | null>(null);

  const currentQuestions = getQuestionsByRound(currentRound);

  const handleQuestionSelect = async (question: Question) => {
    setIsProcessing(true);
    setEmotion(question.emotion);
    setLastAnswer(question.answer);
    setAudioError(null);
    setIsSpeaking(true);

    // Fish Audio로 답변 재생
    try {
      await speakText(question.answer);
    } catch (error) {
      console.error('Audio error:', error);
      setAudioError('음성 재생 중 오류가 발생했습니다. 다시 시도해주세요.');
    }

    setTimeout(() => {
      setIsSpeaking(false);
      setIsProcessing(false);

      // 다음 라운드로 이동
      if (currentRound < 4) {
        setCurrentRound(prev => prev + 1);
      } else {
        onEnd();
      }
    }, 5000); // 대답 후 5초 대기
  };

  return (
    <div className="game-screen">
      <div className="interrogation-room" />
      <div className="game-ui">
        <div className="round-indicator">
          <span className="round-text">{currentRound} / 4 라운드</span>
        </div>
        {lastAnswer && (
          <div className="answer-dialog">
            <div className="dialog-content">
              <div className="speaker-name">강해상:</div>
              <div className="dialog-text">{lastAnswer}</div>
            </div>
          </div>
        )}
        {audioError && (
          <div className="audio-error">
            <div className="error-content">
              {audioError}
            </div>
          </div>
        )}
      </div>
      <KangHaesang emotion={emotion} isSpeaking={isSpeaking} />
      {!isProcessing && !audioError && (
        <QuestionSelector
          questions={currentQuestions}
          onSelect={handleQuestionSelect}
        />
      )}
    </div>
  );
};

export default GameScreen;
