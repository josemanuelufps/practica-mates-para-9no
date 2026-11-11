export type TimedTopicCategory =
  | 'past-perfect'
  | 'zero-conditional'
  | 'first-conditional'
  | 'second-conditional'
  | 'third-conditional'
  | 'zero-vs-first'
  | 'second-vs-third';

export type TimedQuestionType =
  | 'multiple-choice'      // 4 choices
  | 'binary-classify'      // categorize into box A or B
  | 'quick-slot'           // select 1 or 2 words to complete blank
  | 'correct-incorrect';   // True / False grammar check

export interface BaseTimedQuestion {
  id: string;
  topic: TimedTopicCategory;
  type: TimedQuestionType;
  prompt: string;
  explanation: string;
}

export interface MultipleChoiceTimedQuestion extends BaseTimedQuestion {
  type: 'multiple-choice';
  sentence: string;
  options: string[];
  correctIndex: number;
}

export interface BinaryClassifyTimedQuestion extends BaseTimedQuestion {
  type: 'binary-classify';
  phrase: string;
  categoryA: string;
  categoryB: string;
  correctCategory: 'A' | 'B';
}

export interface QuickSlotTimedQuestion extends BaseTimedQuestion {
  type: 'quick-slot';
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correctAnswer: string;
}

export interface CorrectIncorrectTimedQuestion extends BaseTimedQuestion {
  type: 'correct-incorrect';
  sentence: string;
  isCorrect: boolean;
  correctionIfWrong?: string;
}

export type TimedQuestion =
  | MultipleChoiceTimedQuestion
  | BinaryClassifyTimedQuestion
  | QuickSlotTimedQuestion
  | CorrectIncorrectTimedQuestion;

export interface TimedQuizAttemptResult {
  questionId: string;
  topic: TimedTopicCategory;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  explanation: string;
}
