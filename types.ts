
export interface Topic {
  id: string;
  title: string;
  myanmarTitle: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  target: string;
  topics: string[];
  aiFeatures: {
    type: string;
    description: string;
  }[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Bookmark {
  levelId: number;
  levelTitle: string;
  topic: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type ViewType = 'roadmap' | 'lesson' | 'quiz';

export enum AIMode {
  EXPLAIN = 'EXPLAIN',
  DEEP_EXPLAIN = 'DEEP_EXPLAIN',
  QUIZ = 'QUIZ',
  STEP_BY_STEP = 'STEP_BY_STEP',
  TEMPLATE = 'TEMPLATE',
  PRACTICE_DATA = 'PRACTICE_DATA',
  TROUBLESHOOT = 'TROUBLESHOOT'
}
