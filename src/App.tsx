import { useState, useEffect } from 'react';
import type { GameState } from './types/game';
import IntroScreen from './components/IntroScreen';
import GameScreen from './components/GameScreen';
import EndingScreen from './components/EndingScreen';
import { setFishAudioCredentials } from './services/fishAudioService';
import './App.css';

// Fish Audio API Key와 Model ID를 환경 변수에서 가져옵니다
const FISH_AUDIO_API_KEY = import.meta.env.VITE_FISH_AUDIO_API_KEY || '';
const FISH_AUDIO_MODEL_ID = import.meta.env.VITE_FISH_AUDIO_MODEL_ID || '';

function App() {
  const [gameState, setGameState] = useState<GameState>('intro');

  // Fish Audio API 설정 초기화
  useEffect(() => {
    if (FISH_AUDIO_API_KEY && FISH_AUDIO_MODEL_ID) {
      setFishAudioCredentials(FISH_AUDIO_API_KEY, FISH_AUDIO_MODEL_ID);
    }
  }, []);

  const handleStart = () => {
    setGameState('playing');
  };

  const handleEnd = () => {
    setGameState('ended');
  };

  const handleRestart = () => {
    setGameState('intro');
  };

  return (
    <div className="app">
      {gameState === 'intro' && <IntroScreen onStart={handleStart} />}
      {gameState === 'playing' && <GameScreen onEnd={handleEnd} />}
      {gameState === 'ended' && <EndingScreen onRestart={handleRestart} />}
    </div>
  );
}

export default App;
