
import React, { useState } from 'react';
import HowToPlayModal from './HowToPlayModal';
import { StarIcon } from './Icons';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-500">
      <div className="flex justify-center items-center mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`text-yellow-400 ${i === 2 ? 'mx-2 scale-125' : ''}`}>
            <StarIcon />
          </div>
        ))}
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
        Thử Thách Toán Học
      </h1>
      <div className="space-y-4 flex flex-col items-center">
        <button
          onClick={onStart}
          className="w-full max-w-xs text-2xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Bắt đầu
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="w-full max-w-xs text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Cách chơi
        </button>
        <a
          href="https://roboki.vn/g/67ddbd59923d0072befa1365"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs block text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Gia sư tiểu học
        </a>
      </div>
      <HowToPlayModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default StartScreen;
