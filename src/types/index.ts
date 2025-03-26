export type QuestionType = 'text' | 'radio' | 'checkbox';

export interface Question {
  id: number;
  questionnaireId: number;
  type: QuestionType;
  content: string;
  helpText?: string;
  required: boolean;
  orderIndex: number;
  options?: string[];
  validationRules?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  timeLimit: number;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
  completionCount: number;
}

export interface Response {
  id: number;
  questionnaireId: number;
  userId: string;
  startedAt: string;
  completedAt?: string;
  timeTaken?: number;
}