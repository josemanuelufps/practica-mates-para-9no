export type SubjectId = 'matematicas' | 'geoestadistica' | 'ingles' | 'algebra';

export interface SubTopic {
  title: string;
  notes?: string;
  formula?: string;
}

export interface TopicGroup {
  id: SubjectId;
  title: string;
  badge: string;
  description: string;
  topics: {
    category: string;
    items: string[];
  }[];
}

export interface SessionInfo {
  id: string;
  number: number;
  date?: string;
  title: string;
  status: 'active' | 'upcoming' | 'planned';
  focus: 'matematicas' | 'geoestadistica' | 'ingles' | 'algebra' | 'mixto';
  duration: string;
  summary: string;
  keyTopics: string[];
}

export interface FillBlankItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  verbHint: string;
  acceptedAnswers: string[];
  explanation: string;
}

export interface MultipleChoiceItem {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DragSlotExercise {
  id: string;
  title: string;
  instruction: string;
  pool: string[]; // Bank of words to drag or click
  template: {
    beforeSlot: string;
    slotId: string;
    afterSlot: string;
  }[];
  correctAnswers: Record<string, string>;
  explanation: string;
}

// Timed / Speed Quiz Types (Prepared for Quices Contrarreloj feature)
export interface TimedQuestion {
  id: string;
  subject: SubjectId;
  topicCategory: string;
  question: string;
  options: string[];
  correctIndex: number;
  timeLimitSeconds: number; // e.g. 15, 20 or 30 seconds
  explanation: string;
  points: number;
}

export interface TimedQuizSessionState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  timeRemainingSeconds: number;
  isCompleted: boolean;
  userAnswers: Record<string, number>;
}

