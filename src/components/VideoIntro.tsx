import { useRef, useEffect, useState } from 'react';
import './VideoIntro.css';

interface VideoIntroProps {
  onEnded: () => void;
}

const VideoIntro = ({ onEnded }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      // 비디오 로드 실패 시 바로 넘어감
      const timer = setTimeout(onEnded, 1000);
      return () => clearTimeout(timer);
    }

    // 자동 재생 시도
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // 자동 재생 실패 시 무음으로 재생
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {
            // 그래도 실패하면 넘어감
            setError(true);
          });
        }
      });
    }
  }, [error, onEnded]);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onEnded();
  };

  const handleVideoEnded = () => {
    onEnded();
  };

  const handleError = () => {
    console.error('비디오 로드 실패');
    setError(true);
  };

  if (error) {
    return (
      <div className="video-intro">
        <div className="video-error">
          <p>🎬 영상을 불러올 수 없습니다...</p>
          <button className="skip-button" onClick={onEnded}>
            게임 시작 ▶
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-intro">
      <video
        ref={videoRef}
        className="intro-video"
        onEnded={handleVideoEnded}
        onError={handleError}
        autoPlay
        playsInline
        muted={false}
      >
        <source src="/videos/intro.mov" type="video/quicktime" />
        <source src="/videos/intro.mp4" type="video/mp4" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
      <button className="skip-button" onClick={handleSkip}>
        건너뛰기 ▶
      </button>
    </div>
  );
};

export default VideoIntro;
