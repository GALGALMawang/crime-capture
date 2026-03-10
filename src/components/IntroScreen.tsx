import { useState } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="intro-screen">
      <div className="intro-background" />
      
      {!showGuide && (
        <button className="start-button" onClick={onStart}>
          심문 시작
        </button>
      )}

      {showGuide && (
        <div className="guide-overlay">
          <div className="guide-popup">
            <h2 className="guide-title">👮 마석도 형사님, 준비됐지?</h2>
            <div className="guide-content">
              <p>강해상을 심문해서 확실한 <strong>자백</strong>을 받아내야 해.</p>
              <ul>
                <li>질문을 던져서 강해상의 반응을 살펴.</li>
                <li><strong>열받게</strong> 하면 폭발해서 수사가 망할 수도 있어.</li>
                <li>적절히 구슬리거나... <strong>CCTV</strong>를 잠시 가리고 교육(?)을 시켜서 뉘우치게 만들어봐.</li>
              </ul>
              <p className="guide-hint">※ 진실의 방으로 보낼 준비 됐나?</p>
            </div>
            <button className="guide-close-button" onClick={() => setShowGuide(false)}>
              알았어, 시작하자고
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroScreen;
