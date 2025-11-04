
import React from 'react';

interface HowToPlayModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative text-gray-700">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Cách chơi</h2>
        <ul className="space-y-3 text-left list-disc list-inside">
          <li>Đọc câu hỏi phép nhân hoặc phép chia.</li>
          <li>Chọn 1 trong 4 đáp án (A, B, C, D) mà bạn cho là đúng.</li>
          <li>Bạn có 30 giây cho mỗi câu hỏi.</li>
          <li>Mỗi câu trả lời đúng sẽ được 10 điểm.</li>
          <li>Hoàn thành các cấp độ để mở khóa cấp độ mới và nhận danh hiệu!</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full text-xl font-bold text-white bg-green-500 hover:bg-green-600 py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Đã hiểu!
        </button>
      </div>
    </div>
  );
};

export default HowToPlayModal;
