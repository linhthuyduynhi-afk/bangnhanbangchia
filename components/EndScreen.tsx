
import React, { useEffect, useState } from 'react';
import { Level } from '../types';
import { QUESTIONS_PER_LEVEL, POINTS_PER_QUESTION } from '../constants';
import { TrophyIcon } from './Icons';

interface EndScreenProps {
  score: number;
  level: Level;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onBackToLevels: () => void;
  isLastLevel: boolean;
  isNextLevelUnlocked: boolean;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, level, onPlayAgain, onNextLevel, onBackToLevels, isLastLevel, isNextLevelUnlocked }) => {
  const [highScore, setHighScore] = useState(0);
  const totalScore = QUESTIONS_PER_LEVEL * POINTS_PER_QUESTION;

  useEffect(() => {
    const savedHighScore = localStorage.getItem(`highScore_level_${level.id}`);
    const currentHighScore = savedHighScore ? parseInt(savedHighScore, 10) : 0;
    if (score > currentHighScore) {
      localStorage.setItem(`highScore_level_${level.id}`, score.toString());
      setHighScore(score);
    } else {
      setHighScore(currentHighScore);
    }
  }, [score, level.id]);

  const message = score >= 80 ? "Xuất sắc!" : score >= 50 ? "Làm tốt lắm!" : "Cố gắng hơn nhé!";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="text-yellow-400 w-24 h-24 mx-auto mb-4">
        <TrophyIcon />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
        {message}
      </h1>
      <p className="text-2xl text-gray-700 font-semibold mb-4">
        Bạn đã hoàn thành {level.name}!
      </p>
      <div className="bg-blue-100 rounded-xl p-6 mb-6">
        <p className="text-xl text-gray-600">Điểm của bạn</p>
        <p className="text-6xl font-bold text-blue-800 my-2">{score}/{totalScore}</p>
        <p className="text-lg text-gray-600">Điểm cao nhất: {highScore}</p>
      </div>
      <p className="text-xl text-gray-700 mb-6">Bạn đã đạt được danh hiệu: <span className="font-bold text-green-600">{level.rank}</span></p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button onClick={onPlayAgain} className="w-full sm:w-auto text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
          Chơi lại
        </button>
        {!isLastLevel && isNextLevelUnlocked && (
          <button onClick={onNextLevel} className="w-full sm:w-auto text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
            Cấp độ tiếp
          </button>
        )}
        <button onClick={onBackToLevels} className="w-full sm:w-auto text-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
          Chọn cấp độ
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
