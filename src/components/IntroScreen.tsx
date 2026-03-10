import './IntroScreen.css';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="intro-screen">
      <div className="intro-background" />
      <div className="intro-content">
        <div className="intro-badge">범죄도시 2 이후...</div>
        <h1 className="intro-title">강해상 심문 게임</h1>
        <p className="intro-subtitle">👮 니가 마석도 형사다.</p>
        <p className="intro-desc">강해상을 심문해서 자백을 받아내라!</p>

        <div className="intro-rules">
          <h3 className="rules-title">📋 게임 방법</h3>

          <div className="rule-item anger">
            <span className="rule-icon">😤</span>
            <div className="rule-text">
              <strong>열받음 게이지</strong>
              <span className="rule-detail">질문으로 압박하면 증가</span>
              <span className="rule-detail">오르면 반성은 조금씩 감소!</span>
            </div>
          </div>

          <div className="rule-item remorse">
            <span className="rule-icon">😢</span>
            <div className="rule-text">
              <strong>반성 게이지</strong>
              <span className="rule-detail">시작부터 50%!</span>
              <span className="rule-detail cctv-highlight">CCTV 가리기로 +50%!</span>
            </div>
          </div>

          <div className="rule-divider"></div>

          <div className="rule-endings">
            <div className="ending-hint anger-end">
              <span className="ending-icon">😤</span>
              <span>열받음 100% = </span>
              <span className="ending-result violence">폭력 엔딩 (승리!)</span>
            </div>
            <div className="ending-hint remorse-end">
              <span className="ending-icon">😭</span>
              <span>반성 100% = </span>
              <span className="ending-result confession">자백 엔딩 (승리!)</span>
            </div>
          </div>

          <div className="cctv-tip">
            <span className="tip-icon">💡</span>
            <span className="tip-text">CCTV가 좀 더럽네? 클릭해서 닦아보자!</span>
          </div>
        </div>

        <button className="start-button" onClick={onStart}>
          🚨 심문 시작
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
