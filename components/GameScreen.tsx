
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Level, Question } from '../types';
import { QUESTIONS_PER_LEVEL, TIME_PER_QUESTION, POINTS_PER_QUESTION } from '../constants';

interface GameScreenProps {
  level: Level;
  onGameEnd: (score: number) => void;
  playCorrectSound: () => void;
  playWrongSound: () => void;
}

const generateQuestions = (levelTables: number[]): Question[] => {
    const questions: Question[] = [];
    const usedQuestions = new Set<string>();

    while (questions.length < QUESTIONS_PER_LEVEL) {
        const table = levelTables[Math.floor(Math.random() * levelTables.length)];
        const isMultiplication = Math.random() > 0.5;
        const num = Math.floor(Math.random() * 9) + 2;

        let questionText: string;
        let answer: number;

        if (isMultiplication) {
            questionText = `${table} × ${num} = ?`;
            answer = table * num;
        } else {
            questionText = `${table * num} ÷ ${table} = ?`;
            answer = num;
        }
        
        if (usedQuestions.has(questionText)) continue;
        usedQuestions.add(questionText);

        const options = new Set<number>();
        options.add(answer);
        while (options.size < 4) {
            const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
            if (wrongAnswer !== answer && wrongAnswer > 0) {
                options.add(wrongAnswer);
            }
        }

        questions.push({
            text: questionText,
            options: Array.from(options).sort(() => Math.random() - 0.5),
            answer: answer,
        });
    }
    return questions;
};


const GameScreen: React.FC<GameScreenProps> = ({ level, onGameEnd, playCorrectSound, playWrongSound }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    setQuestions(generateQuestions(level.tables));
  }, [level]);

  useEffect(() => {
    if (isAnswered) return;
    if (timeLeft === 0) {
      setIsAnswered(true);
      playWrongSound();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, playWrongSound]);

  const handleAnswer = (option: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].answer) {
      setScore(prev => prev + POINTS_PER_QUESTION);
      playCorrectSound();
    } else {
      setIsWrong(true);
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS_PER_LEVEL - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setTimeLeft(TIME_PER_QUESTION);
      setIsWrong(false);
    } else {
      onGameEnd(score);
    }
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <div className="text-white text-2xl">Đang tải câu hỏi...</div>;
  
  const progressPercentage = ((currentQuestionIndex + 1) / QUESTIONS_PER_LEVEL) * 100;
  const timerPercentage = (timeLeft / TIME_PER_QUESTION) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 text-gray-700">
            <div className="text-lg font-bold">Câu {currentQuestionIndex + 1}/{QUESTIONS_PER_LEVEL}</div>
            <div className="text-2xl font-bold text-yellow-500">Điểm: {score}</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        {/* Timer */}
        <div className="relative w-24 h-24 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-gray-200" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className={`${timeLeft <= 5 ? 'text-red-500' : 'text-blue-500'}`} strokeWidth="3" fill="none" strokeDasharray={`${timerPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-700">{timeLeft}</div>
        </div>

        {/* Question */}
        <div className="bg-blue-100 rounded-2xl p-6 mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-800">{currentQuestion.text}</h2>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((option, index) => {
                const isCorrect = option === currentQuestion.answer;
                let buttonClass = 'bg-white hover:bg-gray-100 text-gray-800';
                if (isAnswered) {
                    if (isCorrect) {
                        buttonClass = 'bg-green-500 text-white pop';
                    } else if (selectedAnswer === option) {
                        buttonClass = 'bg-red-500 text-white shake';
                    } else {
                        buttonClass = 'bg-gray-300 text-gray-500';
                    }
                }
                return (
                    <button key={index} onClick={() => handleAnswer(option)} disabled={isAnswered}
                        className={`p-4 rounded-xl text-3xl font-bold shadow-md transition-all duration-300 transform ${!isAnswered ? 'hover:scale-105' : ''} ${buttonClass}`}>
                        {option}
                    </button>
                );
            })}
        </div>
        
        {/* Feedback & Next Button */}
        {isAnswered && (
            <div className="flex flex-col items-center">
                 <p className={`text-2xl font-bold mb-4 ${isWrong ? 'text-red-600' : 'text-green-600'}`}>
                    {timeLeft === 0 ? "Hết giờ rồi!" : isWrong ? "Thử lại nhé!" : "Chính xác!"}
                </p>
                <button onClick={handleNext} className="w-full max-w-xs text-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                    {currentQuestionIndex < QUESTIONS_PER_LEVEL - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                </button>
            </div>
        )}
    </div>
  );
};

export default GameScreen;
