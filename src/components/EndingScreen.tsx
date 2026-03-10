import type { GameResult } from '../types/game';
import './EndingScreen.css';

interface EndingScreenProps {
  onRestart: () => void;
  result: GameResult;
}

const EndingScreen = ({ onRestart, result }: EndingScreenProps) => {
  const isAngerEnding = result.endingType === 'anger';
  const isRemorseEnding = result.endingType === 'remorse';

  const handleShare = async () => {
    const shareData = {
      title: '범죄도시5: 강해상 심문하기',
      text: `강해상을 ${isRemorseEnding ? '자백시켰습니다!' : isAngerEnding ? '열받게 했습니다!' : '심문했습니다!'} 여러분도 도전해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (err) {
      console.log('공유 실패:', err);
    }
  };

  return (
    <div className="ending-overlay">
      <div className="ending-popup">
        {/* 엔딩 이미지 */}
        <div className={`ending-image-container ${isRemorseEnding ? 'remorse' : 'anger'}`}>
          <img
            src={isRemorseEnding ? "/images/ending-confession.jpeg" : "/images/ending-anger.jpeg"}
            alt="엔딩 결과"
            className="ending-result-image"
          />
          <div className="ending-label">
            {isAngerEnding ? "😤 분노 엔딩" : isRemorseEnding ? "😭 자백 엔딩" : "😐 무승부"}
          </div>
        </div>

        <div className="ending-body">
          <h2 className="ending-title">
            {isRemorseEnding ? "성공! 자백을 받아냈습니다!" : isAngerEnding ? "폭발! 강해상이 미쳐버렸습니다!" : "심문 종료"}
          </h2>
          <p className="ending-desc">
            {isRemorseEnding ? "강해상이 모든 범죄를 인정하고 눈물을 흘립니다." : isAngerEnding ? "강해상의 분노가 극에 달해 수사가 중단되었습니다." : "아쉽게도 결정적인 자백을 받아내지 못했습니다."}
          </p>

          <div className="ending-stats-mini">
            <div className="mini-stat">😤 분노: {result.finalAnger}%</div>
            <div className="mini-stat">😢 반성: {result.finalRemorse}%</div>
          </div>

          <div className="ending-actions">
            <button className="action-button share" onClick={handleShare}>
              📤 결과 공유하기
            </button>
            <button className="action-button restart" onClick={onRestart}>
              🔄 다시 도전하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndingScreen;
