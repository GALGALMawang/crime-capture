import React, { useState, useEffect } from 'react';
import type { KangHaesangEmotion, Question, GameResult } from '../types/game';
import KangHaesang from './KangHaesang';
import QuestionSelector from './QuestionSelector';
import { playAudioFile } from '../services/audioService';
import { getQuestionsByRound, ANGER_ENDING_DIALOGUES, REMORSE_ENDING_DIALOGUES, CCTV_CLEAN_DIALOGUES } from '../data/questions';
import './GameScreen.css';

interface GameScreenProps {
  onEnd: (result: GameResult) => void;
}

const MAX_GAUGE = 100;

const GameScreen: React.FC<GameScreenProps> = ({ onEnd }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [emotion, setEmotion] = useState<KangHaesangEmotion>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');

  // 두 개의 게이지 - 반성은 50%에서 시작
  const [anger, setAnger] = useState(0);      // 열받음
  const [remorse, setRemorse] = useState(50); // 반성 (시작부터 50%)

  const [isEnding, setIsEnding] = useState(false);
  const [showCCTVClean, setShowCCTVClean] = useState(false);
  const [cctvDialogue, setCctvDialogue] = useState('');
  const [showFinalChoice, setShowFinalChoice] = useState(false); // 마지막 선택지
  const [clickEffect, setClickEffect] = useState<{x: number, y: number} | null>(null);
  const [idleEmotion, setIdleEmotion] = useState<KangHaesangEmotion>('normal');

  const currentQuestions = getQuestionsByRound(currentRound);

  // 랜덤 표정 변화 (대화 없을 때)
  useEffect(() => {
    if (isProcessing || isEnding || showCCTVClean) return;

    const emotions: KangHaesangEmotion[] = ['normal', 'normal', 'normal', 'angry', 'surprised'];
    const interval = setInterval(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setIdleEmotion(randomEmotion);
    }, 3000);

    return () => clearInterval(interval);
  }, [isProcessing, isEnding, showCCTVClean]);

  // 실제 표시할 감정
  const displayEmotion = isProcessing || isEnding ? emotion : idleEmotion;

  // 클릭 이펙트
  const handleClick = (e: React.MouseEvent, callback: () => void) => {
    setClickEffect({ x: e.clientX, y: e.clientY });
    setTimeout(() => {
      setClickEffect(null);
      callback();
    }, 200);
  };

  // CCTV 가리기 처리
  const handleCCTVClean = () => {
    setShowCCTVClean(true);
    const randomDialogue = CCTV_CLEAN_DIALOGUES[Math.floor(Math.random() * CCTV_CLEAN_DIALOGUES.length)];
    setCctvDialogue(randomDialogue);

    // 3초 후 화면 복구 + 반성 게이지 100% 달성 + 마지막 선택지 표시
    setTimeout(() => {
      setShowCCTVClean(false);
      setCctvDialogue('');
      setRemorse(MAX_GAUGE);
      setShowFinalChoice(true);
    }, 3000);
  };

  // 마지막 선택지 처리 (반성 엔딩)
  const handleFinalChoice = async () => {
    setIsEnding(true);
    const randomDialogue = REMORSE_ENDING_DIALOGUES[Math.floor(Math.random() * REMORSE_ENDING_DIALOGUES.length)];
    setEmotion('crying');
    setLastAnswer(randomDialogue.text);
    setSubtitle(randomDialogue.subtitle);

    setTimeout(() => {
      onEnd({ endingType: 'remorse', finalAnger: anger, finalRemorse: MAX_GAUGE });
    }, 4000);
  };

  // 열받음 엔딩 체크
  useEffect(() => {
    if (isEnding) return;

    if (anger >= MAX_GAUGE) {
      // 열받음 엔딩 - 이것도 승리!
      setIsEnding(true);
      const randomDialogue = ANGER_ENDING_DIALOGUES[Math.floor(Math.random() * ANGER_ENDING_DIALOGUES.length)];
      setEmotion('angry');
      setLastAnswer(randomDialogue.text);
      setSubtitle(randomDialogue.subtitle);

      setTimeout(() => {
        onEnd({ endingType: 'anger', finalAnger: MAX_GAUGE, finalRemorse: remorse });
      }, 4000);
    }
  }, [anger, isEnding, onEnd, remorse]);

  const handleQuestionSelect = async (question: Question) => {
    if (isEnding) return;

    // CCTV 가리기 특수 처리
    if (question.isCCTVClean) {
      handleCCTVClean();
      return;
    }

    setIsProcessing(true);
    setEmotion(question.emotion);
    setLastAnswer(question.answer);
    setSubtitle('');
    setIsSpeaking(true);

    // 게이지 업데이트 - 열받음 오르면 반성은 줄어듦
    if (question.anger) {
      setAnger(prev => Math.min(prev + question.anger!, MAX_GAUGE));
      // 열받음이 오르면 반성은 조금씩 감소
      setRemorse(prev => Math.max(prev - Math.floor(question.anger! / 3), 0));
    }
    if (question.remorse) {
      setRemorse(prev => Math.min(prev + question.remorse!, MAX_GAUGE));
    }

    // MP3 파일로 답변 재생
    if (question.audioFile) {
      try {
        await playAudioFile(question.audioFile);
      } catch (error) {
        console.error('Audio error:', error);
      }
    }

    setIsSpeaking(false);
    setIsProcessing(false);

    // 엔딩이 아니면 다음 라운드로
    if (!isEnding && currentRound < 4) {
      setCurrentRound(prev => prev + 1);
    } else if (!isEnding && currentRound >= 4 && !showFinalChoice) {
      // 마지막 라운드인데 아직 엔딩 안됨
      onEnd({ endingType: 'none', finalAnger: anger, finalRemorse: remorse });
    }
  };

  // 게이지 색상
  const getAngerColor = () => {
    if (anger < 30) return '#FF9800';
    if (anger < 60) return '#FF5722';
    return '#f44336';
  };

  const getRemorseColor = () => {
    if (remorse < 30) return '#8BC34A';
    if (remorse < 60) return '#4CAF50';
    return '#2E7D32';
  };

  // CCTV 힌트 메시지
  const getCCTVHint = () => {
    if (remorse < 70) return "🤔 CCTV가 좀 더럽네? 닦아줄까?";
    if (remorse < 90) return "👀 이거 한 번 더 하면 될 것 같은데?";
    return "🎬 이거다! CCTV 가리기!";
  };

  return (
    <div className="game-screen">
      <div className="interrogation-room" />

      {/* 클릭 이펙트 */}
      {clickEffect && (
        <div
          className="click-effect"
          style={{ left: clickEffect.x, top: clickEffect.y }}
        >
          CLICK!
        </div>
      )}

      {/* CCTV 가리기 효과 */}
      {showCCTVClean && (
        <div className="cctv-clean-overlay">
          <div className="cctv-beaten-effect">
            <div className="cctv-text">🚨 CCTV 가리는 중...</div>
            <div className="cctv-dialogue">강해상: "{cctvDialogue}"</div>
            <div className="punch-effects">
              <span className="punch">💥</span>
              <span className="punch">👊</span>
              <span className="punch">💥</span>
            </div>
            <div className="cctv-hint">반성 게이지 MAX! 💢</div>
          </div>
        </div>
      )}

      <div className="game-ui">
        {/* 상단 UI */}
        <div className="top-bar">
          <div className="role-info">
            <span className="role-badge">👮 마석도 형사</span>
            <span className="role-hint">강해상을 심문하라!</span>
          </div>

          <div className="round-indicator">
            <span className="round-text">라운드 {currentRound} / 4</span>
          </div>
        </div>

        {/* 두 개의 게이지 */}
        <div className="gauges-container">
          {/* 열받음 게이지 */}
          <div className="gauge-wrapper anger">
            <div className="gauge-header">
              <span className="gauge-icon">😤</span>
              <span className="gauge-label">열받음</span>
              <span className="gauge-percent">{anger}%</span>
            </div>
            <div className="gauge-bar">
              <div
                className="gauge-fill"
                style={{
                  width: `${anger}%`,
                  backgroundColor: getAngerColor()
                }}
              />
            </div>
            {anger >= 80 && <div className="gauge-warning anger">⚠️ 폭발 직전!</div>}
          </div>

          {/* 반성 게이지 */}
          <div className="gauge-wrapper remorse">
            <div className="gauge-header">
              <span className="gauge-icon">😢</span>
              <span className="gauge-label">반성</span>
              <span className="gauge-percent">{remorse}%</span>
            </div>
            <div className="gauge-bar">
              <div
                className="gauge-fill"
                style={{
                  width: `${remorse}%`,
                  backgroundColor: getRemorseColor()
                }}
              />
            </div>
            {remorse >= 80 && <div className="gauge-warning remorse">💦 뉘우치는 중!</div>}
          </div>
        </div>

        {/* 대화창 */}
        {lastAnswer && !showCCTVClean && (
          <div className="answer-dialog">
            <div className="dialog-content">
              <div className="speaker-name">
                {emotion === 'crying' ? '😭 강해상:' : emotion === 'angry' && isEnding ? '😤 강해상:' : '강해상:'}
              </div>
              <div className="dialog-text">{lastAnswer}</div>
              {subtitle && <div className="dialog-subtitle">{subtitle}</div>}
            </div>
          </div>
        )}
      </div>

      <KangHaesang emotion={displayEmotion} isSpeaking={isSpeaking} />

      {/* 마지막 선택지 - 반성 게이지 100% 달성 시 */}
      {showFinalChoice && !isEnding && (
        <div className="final-choice">
          <button
            className="final-choice-button"
            onClick={(e) => handleClick(e, handleFinalChoice)}
          >
            💬 "뭐 더 할 말 있어?"
          </button>
        </div>
      )}

      {/* 일반 질문 선택 */}
      {!isProcessing && !isEnding && !showCCTVClean && !showFinalChoice && (
        <QuestionSelector
          questions={currentQuestions}
          onSelect={handleQuestionSelect}
        />
      )}
    </div>
  );
};

export default GameScreen;
