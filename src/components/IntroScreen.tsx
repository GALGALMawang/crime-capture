import { useState, useEffect } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [step, setStep] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(false); // 버튼 표시 상태

  // 2초 후 버튼 나타나게 함
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    setShowOnboarding(true);
    setStep(1);
  };

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setShowOnboarding(false);
      onStart();
    }
  };

  return (
    <div className="intro-screen">
      <div className="intro-background" />
      
      {!showOnboarding && isButtonVisible && (
        <button className="start-button" onClick={handleStartClick}>
          심문 시작
        </button>
      )}

      {showOnboarding && (
        <div className="guide-overlay">
          <div className="guide-popup onboarding">
            <div className="step-indicator">{step} / 2</div>
            
            {step === 1 ? (
              <div className="onboarding-page">
                <h2 className="guide-title">👮 마석도 형사님, 준비됐지?</h2>
                <div className="guide-content">
                  <p>강해상을 심문해서 확실한 <strong>자백</strong>을 받아내야 해.</p>
                  <p>상황에 맞는 질문을 던져서 녀석의 멘탈을 흔들어봐.</p>
                  <div className="guide-item">
                    <span className="icon">💬</span>
                    <span>질문을 선택해서 답변을 들어보자.</span>
                  </div>
                  <div className="guide-item">
                    <span className="icon">🚨</span>
                    <span><strong>열받게</strong> 하면 수사가 실패할 수 있으니 조심해!</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="onboarding-page">
                <h2 className="guide-title">📊 게이지 설명</h2>
                <div className="guide-content">
                  <div className="gauge-desc-item">
                    <div className="gauge-sample anger">😤 열받음</div>
                    <p>녀석을 너무 도발하면 올라가. <strong>100%</strong>가 되면 폭주해서 수사가 <strong>실패</strong>로 끝나니 주의해!</p>
                  </div>
                  <div className="gauge-desc-item">
                    <div className="gauge-sample remorse">😢 반성</div>
                    <p>반성 수치가 높을수록 녀석이 무너져. <strong>100%</strong>가 되면 눈물을 흘리며 자백하게 돼. (자백 승리!)</p>
                  </div>
                  <p className="guide-hint">※ 열받음이 오르면 반성 수치는 조금씩 깎이니 조절 잘해!</p>
                </div>
              </div>
            )}

            <div className="guide-close-button-container">
              <button className="guide-close-button" onClick={nextStep}>
                {step === 1 ? '다음 (게이지 설명) ▶' : '알았어, 시작하자고!'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroScreen;
