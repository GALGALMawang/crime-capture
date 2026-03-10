import './IntroScreen.css';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="intro-screen">
      <div className="intro-background" />
      <button className="start-button" onClick={onStart}>
        🚨 심문 시작
      </button>
    </div>
  );
};

export default IntroScreen;
