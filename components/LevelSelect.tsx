
import React from 'react';
import { Level } from '../types';
import { LockIcon, StarIcon } from './Icons';

interface LevelSelectProps {
  levels: Level[];
  unlockedLevels: number;
  onSelectLevel: (level: Level) => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ levels, unlockedLevels, onSelectLevel }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
        Chọn cấp độ
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {levels.map(level => {
          const isUnlocked = level.id <= unlockedLevels;
          return (
            <div key={level.id}>
              <button
                onClick={() => isUnlocked && onSelectLevel(level)}
                disabled={!isUnlocked}
                className={`relative w-full aspect-square flex flex-col justify-center items-center p-2 rounded-2xl text-white font-bold shadow-lg transform transition-all duration-300 ${
                  isUnlocked
                    ? `bg-gradient-to-br ${level.color} hover:scale-105 hover:shadow-2xl`
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex justify-center items-center">
                    <LockIcon />
                  </div>
                )}
                <span className="text-xl md:text-2xl">{level.name}</span>
                <div className="text-yellow-300 my-1">
                    <StarIcon />
                </div>
                <span className="text-xs md:text-sm text-center">{level.rank}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelect;
