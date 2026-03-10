import { useRef, useEffect } from 'react';
import './VideoIntro.css';

interface VideoIntroProps {
  onEnded: () => void;
}

const VideoIntro = ({ onEnded }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 자동 재생 (소리 포함)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // 자동 재생 실패 시 무음으로 재생
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  }, []);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onEnded();
  };

  const handleVideoEnded = () => {
    onEnded();
  };

  return (
    <div className="video-intro">
      <video
        ref={videoRef}
        className="intro-video"
        onEnded={handleVideoEnded}
        autoPlay
        playsInline
      >
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
