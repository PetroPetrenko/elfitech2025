export interface Questionnaire {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Question {
  id: number;
  questionnaire_id: number;
  question_text: string;
  question_type: 'text' | 'single' | 'multiple' | 'image';
  options: string[] | null;
  required: boolean;
  order: number;
}

export interface Response {
  id: number;
  questionnaire_id: number;
  respondent_id: string;
  started_at: string;
  completed_at: string | null;
  answers: Record<string, any>;
}

export interface CreateQuestionnaireDTO {
  title: string;
  description?: string;
  questions: Array<Omit<Question, 'id' | 'questionnaire_id'>>;
}

export interface CreateResponseDTO {
  questionnaire_id: number;
  respondent_id: string;
  answers: Record<string, any>;
}