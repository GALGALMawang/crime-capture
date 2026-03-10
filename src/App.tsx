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

  return (
    <div className="app">
      {gameState === 'video' && <VideoIntro onEnded={handleVideoEnd} />}
      {gameState === 'intro' && <IntroScreen onStart={handleStart} />}
      {gameState === 'playing' && <GameScreen onEnd={handleEnd} />}
      {gameState === 'ended' && (
        <EndingScreen
          onRestart={handleRestart}
          result={gameResult}
        />
      )}
    </div>
  );
}

export default App;
