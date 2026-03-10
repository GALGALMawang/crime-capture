import { useState, useEffect } from 'react';
import type { GameState, GameResult } from './types/game';
import VideoIntro from './components/VideoIntro';
import IntroScreen from './components/IntroScreen';
import GameScreen from './components/GameScreen';
import EndingScreen from './components/EndingScreen';
import { setFishAudioCredentials } from './services/fishAudioService';
import './App.css';

// Fish Audio API Key와 Model ID를 환경 변수에서 가져옵니다
const FISH_AUDIO_API_KEY = import.meta.env.VITE_FISH_AUDIO_API_KEY || '';
const FISH_AUDIO_MODEL_ID = import.meta.env.VITE_FISH_AUDIO_MODEL_ID || '';

const DEFAULT_RESULT: GameResult = {
  endingType: 'none',
  finalAnger: 0,
  finalRemorse: 0
};

function App() {
  const [gameState, setGameState] = useState<GameState>('video');
  const [gameResult, setGameResult] = useState<GameResult>(DEFAULT_RESULT);

  // Fish Audio API 설정 초기화
  useEffect(() => {
    if (FISH_AUDIO_API_KEY && FISH_AUDIO_MODEL_ID) {
      setFishAudioCredentials(FISH_AUDIO_API_KEY, FISH_AUDIO_MODEL_ID);
    }
  }, []);

  const handleStart = () => {
    // 전체 화면 전환 시도
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else if ((element as any).webkitRequestFullscreen) { /* Safari */
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { /* IE11 */
      (element as any).msRequestFullscreen();
    }

    setGameResult(DEFAULT_RESULT);
    setGameState('playing');
  };

  const handleVideoEnd = () => {
    setGameState('intro');
  };

  const handleEnd = (result: GameResult) => {
    setGameResult(result);
    setGameState('ended');
  };

  const handleRestart = () => {
    setGameState('intro');
  };

  const isLandscapeState = gameState === 'video' || gameState === 'intro';
  const isPortraitState = gameState === 'playing' || gameState === 'ended';

  return (
    <div className={`app ${isLandscapeState ? 'require-landscape' : 'require-portrait'}`}>
      {/* 가로 모드 권장 (비디오, 인트로용) */}
      <div className="rotate-overlay landscape-guide">
        <div className="rotate-icon">📱 🔄</div>
        <h2>화면을 가로로 돌려주세요</h2>
        <p>인트로를 위해 가로 모드가 필요합니다.</p>
      </div>

      {/* 세로 모드 권장 (심문, 엔딩용) */}
      <div className="rotate-overlay portrait-guide">
        <div className="rotate-icon">📱 ⬆️</div>
        <h2>화면을 세로로 세워주세요</h2>
        <p>심문을 위해 세로 모드가 필요합니다.</p>
      </div>

      {gameState === 'video' && <VideoIntro onEnded={handleVideoEnd} />}
      {gameState === 'intro' && <IntroScreen onStart={handleStart} />}
      {(gameState === 'playing' || gameState === 'ended') && (
        <>
          <GameScreen onEnd={handleEnd} />
          {gameState === 'ended' && (
            <EndingScreen
              onRestart={handleRestart}
              result={gameResult}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
