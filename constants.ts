
import { Level } from './types';

export const QUESTIONS_PER_LEVEL = 10;
export const TIME_PER_QUESTION = 30; // in seconds
export const POINTS_PER_QUESTION = 10;

export const LEVELS: Level[] = [
  { id: 1, name: 'Cấp độ 1', tables: [2], rank: 'Tân học sinh', color: 'from-green-400 to-blue-500' },
  { id: 2, name: 'Cấp độ 2', tables: [3], rank: 'Nhà khám phá nhỏ', color: 'from-blue-400 to-purple-500' },
  { id: 3, name: 'Cấp độ 3', tables: [4], rank: 'Ngôi sao thông minh', color: 'from-purple-400 to-pink-500' },
  { id: 4, name: 'Cấp độ 4', tables: [5], rank: 'Chiến binh trí tuệ', color: 'from-pink-400 to-red-500' },
  { id: 5, name: 'Cấp độ 5', tables: [6], rank: 'Thủ lĩnh học tập', color: 'from-red-400 to-orange-500' },
  { id: 6, name: 'Cấp độ 6', tables: [7], rank: 'Hiệp sĩ chinh phục', color: 'from-orange-400 to-yellow-500' },
  { id: 7, name: 'Cấp độ 7', tables: [8], rank: 'Bậc thầy tri thức', color: 'from-yellow-400 to-lime-500' },
  { id: 8, name: 'Cấp độ 8', tables: [9], rank: 'Nhà vô địch Roboki', color: 'from-lime-400 to-emerald-500' },
];
