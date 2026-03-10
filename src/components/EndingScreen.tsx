import React from 'react';
import type { GameResult } from '../types/game';
import './EndingScreen.css';

interface EndingScreenProps {
  onRestart: () => void;
  result: GameResult;
}

const EndingScreen: React.FC<EndingScreenProps> = ({ onRestart, result }) => {
  const isAngerEnding = result.endingType === 'anger';
  const isRemorseEnding = result.endingType === 'remorse';

  const renderEnding = () => {
    if (isAngerEnding) {
      // 열받음 엔딩 - 분노 엔딩
      return (
        <>
          {/* 엔딩 이미지 팝업 */}
          <div className="ending-image-popup anger">
            <img src="/images/ending-anger.jpeg" alt="분노 엔딩" />
          </div>
          <div className="ending-badge victory">🏆 승리!</div>
          <h1 className="ending-title anger">😤 분노 엔딩</h1>
          <p className="ending-subtitle">
            강해상이 분노했습니다!
          </p>
          <div className="ending-emoji">😤💥👊</div>
          <p className="ending-quote anger">
            "야!! 니들이 날 어떻게 해! 증거 없잖아! 난 안 잡혀! 껄껄껄"
          </p>
          <div className="ending-stats">
            <div className="stat anger">😤 열받음: {result.finalAnger}%</div>
            <div className="stat remorse">😢 반성: {result.finalRemorse}%</div>
          </div>
          <p className="ending-hint victory">
            🎉 강해상을 굴복시켰습니다! (폭력 수사 성공!)
          </p>
        </>
      );
    }

    if (isRemorseEnding) {
      // 반성 엔딩 - 자백 엔딩
      return (
        <>
          {/* 엔딩 이미지 팝업 */}
          <div className="ending-image-popup confession">
            <img src="/images/ending-confession.jpeg" alt="자백 엔딩" />
          </div>
          <div className="ending-badge victory">🏆 승리!</div>
          <h1 className="ending-title remorse">😭 자백 엔딩</h1>
          <p className="ending-subtitle">
            강해상이 울며 자백했습니다!
          </p>
          <div className="ending-emoji">😭🙏✨</div>
          <p className="ending-quote remorse">
            "흑흑... 내가 잘못했어요... 다 말할게요... 자수할게요... 흑흑..."
          </p>
          <div className="ending-stats">
            <div className="stat anger">😤 열받음: {result.finalAnger}%</div>
            <div className="stat remorse">😢 반성: {result.finalRemorse}%</div>
          </div>
          <p className="ending-hint victory">
            🎉 강해상이 뉘우치며 진술을 털뜨립니다!
          </p>
        </>
      );
    }

    // 무승부
    return (
      <>
        <div className="ending-badge neutral">무승부</div>
        <h1 className="ending-title neutral">😐 심문 종료</h1>
        <p className="ending-subtitle">
          강해상이 끝까지 버텼습니다...
        </p>
        <div className="ending-emoji">😐🤷</div>
        <div className="ending-stats">
          <div className="stat anger">😤 열받음: {result.finalAnger}%</div>
          <div className="stat remorse">😢 반성: {result.finalRemorse}%</div>
        </div>
        <p className="ending-hint">
          💡 팁: CCTV 가리기를 활용해보세요!
        </p>
      </>
    );
  };

  return (
    <div className="ending-screen">
      <div className="ending-background" />
      <div className="ending-content">
        {renderEnding()}
        <button className="restart-button" onClick={onRestart}>
          🔄 다시 심문하기
        </button>
      </div>
    </div>
  );
};

export default EndingScreen;
