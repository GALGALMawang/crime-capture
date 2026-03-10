import './IntroScreen.css';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="intro-screen">
      <div className="intro-background" />
      <div className="intro-content">
        <h1 className="intro-title">범죄도시 심문게임</h1>
        <p className="intro-subtitle">👮 마석도가 되어 강해상을 심문하라!</p>
        <button className="start-button" onClick={onStart}>
          🚨 게임 시작
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
