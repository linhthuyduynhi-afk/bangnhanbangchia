
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Level } from './types';
import { LEVELS } from './constants';
import StartScreen from './components/StartScreen';
import LevelSelect from './components/LevelSelect';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<number>(1);
  const [score, setScore] = useState(0);

  const backgroundAudioRef = useRef<HTMLAudioElement>(null);
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const savedUnlockedLevels = localStorage.getItem('unlockedLevels');
    if (savedUnlockedLevels) {
      setUnlockedLevels(parseInt(savedUnlockedLevels, 10));
    }
  }, []);

  const playBackgroundMusic = useCallback(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.volume = 0.1;
      backgroundAudioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, []);

  const playCorrectSound = useCallback(() => {
    correctAudioRef.current?.play().catch(e => console.error("Audio play failed:", e));
  }, []);

  const playWrongSound = useCallback(() => {
    wrongAudioRef.current?.play().catch(e => console.error("Audio play failed:", e));
  }, []);
  
  const handleStart = () => {
    setGameState(GameState.LevelSelect);
    playBackgroundMusic();
  };

  const handleLevelSelect = (level: Level) => {
    setCurrentLevel(level);
    setGameState(GameState.Game);
  };

  const handleGameEnd = (finalScore: number) => {
    setScore(finalScore);
    setGameState(GameState.End);
    if (finalScore >= 50 && currentLevel && currentLevel.id < LEVELS.length) {
      const nextLevel = currentLevel.id + 1;
      if (nextLevel > unlockedLevels) {
        setUnlockedLevels(nextLevel);
        localStorage.setItem('unlockedLevels', nextLevel.toString());
      }
    }
  };

  const handlePlayAgain = () => {
    if (currentLevel) {
      handleLevelSelect(currentLevel);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel && currentLevel.id < LEVELS.length) {
      const nextLevel = LEVELS.find(l => l.id === currentLevel.id + 1);
      if (nextLevel && nextLevel.id <= unlockedLevels) {
        setCurrentLevel(nextLevel);
        setGameState(GameState.Game);
      }
    }
  };

  const handleBackToLevels = () => {
    setGameState(GameState.LevelSelect);
  };

  const renderScreen = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={handleStart} />;
      case GameState.LevelSelect:
        return <LevelSelect levels={LEVELS} unlockedLevels={unlockedLevels} onSelectLevel={handleLevelSelect} />;
      case GameState.Game:
        if (!currentLevel) return null;
        return <GameScreen level={currentLevel} onGameEnd={handleGameEnd} playCorrectSound={playCorrectSound} playWrongSound={playWrongSound} />;
      case GameState.End:
        if (!currentLevel) return null;
        return (
          <EndScreen
            score={score}
            level={currentLevel}
            onPlayAgain={handlePlayAgain}
            onNextLevel={handleNextLevel}
            onBackToLevels={handleBackToLevels}
            isLastLevel={currentLevel.id === LEVELS.length}
            isNextLevelUnlocked={currentLevel.id < unlockedLevels}
          />
        );
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-sky-100 min-h-screen flex items-center justify-center p-4">
      {/* Audio elements */}
      <audio ref={backgroundAudioRef} src="https://cdn.pixabay.com/audio/2022/11/17/audio_87a826c75c.mp3" preload="auto"></audio>
      <audio ref={correctAudioRef} src="https://cdn.pixabay.com/audio/2022/03/15/audio_221d640474.mp3" preload="auto"></audio>
      <audio ref={wrongAudioRef} src="https://cdn.pixabay.com/audio/2021/08/04/audio_c6f2e90a6e.mp3" preload="auto"></audio>
      
      <div className="container mx-auto max-w-2xl text-center">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
