import { useRef, useState } from 'react';
import './VideoIntro.css';

interface VideoIntroProps {
  onEnded: () => void;
}

const VideoIntro = ({ onEnded }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onEnded();
  };

  // 화면 클릭 시 소리 켜고 재생 시작
  const handlePlayVideo = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
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
        <button className="skip-button" onClick={handleStart}>
          건너뛰기 ▶
        </button>
      </div>
    );
  }

  return (
    <div className="video-intro" onClick={handlePlayVideo}>
      {isLoading && (
        <div className="video-loading">
          <p>🎬 로딩 중...</p>
        </div>
      )}
      {!isLoading && !isPlaying && (
        <div className="video-loading">
          <p>클릭해서 시작</p>
        </div>
      )}
      <video
        ref={videoRef}
        className="intro-video"
        onLoadedData={handleLoadedData}
        onEnded={handleVideoEnded}
        onError={handleError}
        playsInline
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
        <source src="/videos/intro.mov" type="video/quicktime" />
      </video>
      <button className="skip-button" onClick={handleStart}>
        건너뛰기 ▶
      </button>
    </div>
  );
};

export default VideoIntro;
