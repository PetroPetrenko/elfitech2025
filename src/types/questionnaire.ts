export type QuestionType = 'text' | 'single' | 'multiple' | 'image';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  imageUrl?: string;
  maxLength?: number;
  order: number;
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  timeLimit?: number;
  completionCount: number;
  averageTimeToComplete?: number;
}

export interface QuestionnaireResponse {
  id: string;
  questionnaireId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, any>;
  timeSpent: number;
}

export interface QuestionnaireFilters {
  search?: string;
  status?: 'draft' | 'published' | 'archived';
  sortBy?: 'title' | 'createdAt' |  'updatedAt' | 'completionCount';
  sortOrder?: 'asc' | 'desc';
}

export interface QuestionnaireStats {
  totalResponses: number;
  averageTimeToComplete: number;
  completionRate: number;
  questionStats: Record<string, {
    answersDistribution: Record<string, number>;
    averageTimeSpent: number;
  }>;
}