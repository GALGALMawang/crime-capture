import type { GameResult } from '../types/game';
import './EndingScreen.css';

interface EndingScreenProps {
  onRestart: () => void;
  result: GameResult;
}

const EndingScreen = ({ onRestart, result }: EndingScreenProps) => {
  const isAngerEnding = result.endingType === 'anger';
  const isRemorseEnding = result.endingType === 'remorse';

  return (
    <div className="ending-screen">
      <div className="ending-background" />

      {/* 엔딩 이미지 */}
      <div className={`ending-image ${isRemorseEnding ? 'confession' : 'anger'}`}>
        <img
          src={isRemorseEnding ? "/images/ending-confession.jpeg" : "/images/ending-anger.jpeg"}
          alt="엔딩"
        />
      </div>

      <div className="ending-content">
        {isAngerEnding && (
          <>
            <div className="ending-badge anger">😤 분노 엔딩</div>
            <p className="ending-quote">"야!! 니들이 날 어떻게 해! 증거 없잖아!"</p>
          </>
        )}

        {isRemorseEnding && (
          <>
            <div className="ending-badge remorse">😭 자백 엔딩</div>
            <p className="ending-quote">"흑흑... 내가 잘못했어요... 자수할게요..."</p>
          </>
        )}

        {!isAngerEnding && !isRemorseEnding && (
          <>
            <div className="ending-badge neutral">😐 무승부</div>
            <p className="ending-quote">"끝까지 버텼지~ 껄껄껄"</p>
          </>
        )}

        <div className="ending-stats">
          <span className="stat anger">😤 {result.finalAnger}%</span>
          <span className="stat remorse">😢 {result.finalRemorse}%</span>
        </div>

        <button className="restart-button" onClick={onRestart}>
          🔄 다시하기
        </button>
      </div>
    </div>
  );
};

export default EndingScreen;
