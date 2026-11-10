export type SubjectId = 'algebra' | 'geoestadistica' | 'ingles';

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
  date: string;
  title: string;
  status: 'active' | 'upcoming' | 'planned';
  focus: 'ingles' | 'algebra' | 'geoestadistica' | 'mixto';
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
