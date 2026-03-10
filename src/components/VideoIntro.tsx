import { useRef, useEffect, useState } from 'react';
import './VideoIntro.css';

interface VideoIntroProps {
  onEnded: () => void;
}

const VideoIntro = ({ onEnded }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 5초 후 자동으로 넘어감 (비디오가 너무 길거나 오류 시)
    const timeout = setTimeout(() => {
      onEnded();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onEnded]);

  const handleCanPlay = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // 자동 재생 실패 시 무음으로
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    // 비디오 오류 시 바로 넘어감
    setTimeout(() => {
      onEnded();
    }, 1000);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onEnded();
  };

  const handleVideoEnded = () => {
    onEnded();
  };

  // 비디오 오류 시 바로 인트로로
  if (hasError) {
    return (
      <div className="video-intro">
        <div className="video-loading">
          <p>🎬 게임 로딩 중...</p>
        </div>
        <button className="skip-button" onClick={handleSkip}>
          건너뛰기 ▶
        </button>
      </div>
    );
  }

  return (
    <div className="video-intro">
      {isLoading && (
        <div className="video-loading">
          <p>🎬 로딩 중...</p>
        </div>
      )}
      <video
        ref={videoRef}
        className="intro-video"
        onCanPlay={handleCanPlay}
        onEnded={handleVideoEnded}
        onError={handleError}
        autoPlay
        playsInline
        muted={false}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
        <source src="/videos/intro.mov" type="video/quicktime" />
      </video>
      <button className="skip-button" onClick={handleSkip}>
        건너뛰기 ▶
      </button>
    </div>
  );
};

export default VideoIntro;
