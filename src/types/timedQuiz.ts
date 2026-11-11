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
  | 'correct-incorrect'    // True / False grammar check
  | 'match-pairs'          // 3-to-3 clause pairing
  | 'sentence-builder'     // assemble tokens in syntax order
  | 'bug-hunter'           // find the grammatical error in highlighted words
  | 'timeline-sorter';     // determine 1st event (Past Perfect) vs 2nd event (Past Simple)

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

export interface MatchPairItem {
  id: string;
  left: string;
  right: string;
}

export interface MatchPairsTimedQuestion extends BaseTimedQuestion {
  type: 'match-pairs';
  pairs: MatchPairItem[]; // 3 pairs per question
}

export interface SentenceBuilderToken {
  id: string;
  text: string;
}

export interface SentenceBuilderTimedQuestion extends BaseTimedQuestion {
  type: 'sentence-builder';
  tokens: SentenceBuilderToken[];
  correctSequence: string[]; // token ids in correct grammatical order
  fullSentence: string;
}

export interface BugHunterSegment {
  id: string;
  text: string;
  isError: boolean;
  correction?: string;
}

export interface BugHunterTimedQuestion extends BaseTimedQuestion {
  type: 'bug-hunter';
  fullSentence: string;
  segments: BugHunterSegment[];
  hasNoError: boolean; // if true, answer is "Sin error"
}

export interface TimelineSorterTimedQuestion extends BaseTimedQuestion {
  type: 'timeline-sorter';
  sentenceContext: string;
  eventA: string;
  eventB: string;
  firstEvent: 'A' | 'B'; // Event that happened first (Past Perfect: had + V3)
}

export type TimedQuestion =
  | MultipleChoiceTimedQuestion
  | BinaryClassifyTimedQuestion
  | QuickSlotTimedQuestion
  | CorrectIncorrectTimedQuestion
  | MatchPairsTimedQuestion
  | SentenceBuilderTimedQuestion
  | BugHunterTimedQuestion
  | TimelineSorterTimedQuestion;

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
