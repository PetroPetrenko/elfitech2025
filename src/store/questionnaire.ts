import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Questionnaire, QuestionnaireFilters } from '../types/questionnaire';

interface QuestionnaireState {
  questionnaires: Questionnaire[];
  filters: QuestionnaireFilters;
  loading: boolean;
  error: string | null;
  selectedQuestionnaire: Questionnaire | null;
  
  setQuestionnaires: (questionnaires: Questionnaire[]) => void;
  addQuestionnaire: (questionnaire: Questionnaire) => void;
  updateQuestionnaire: (id: string, updates: Partial<Questionnaire>) => void;
  deleteQuestionnaire: (id: string) => void;
  setFilters: (filters: QuestionnaireFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedQuestionnaire: (questionnaire: Questionnaire | null) => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set) => ({
      questionnaires: [],
      filters: {},
      loading: false,
      error: null,
      selectedQuestionnaire: null,

      setQuestionnaires: (questionnaires) => set({ questionnaires }),
      addQuestionnaire: (questionnaire) =>
        set((state) => ({
          questionnaires: [...state.questionnaires, questionnaire],
        })),
      updateQuestionnaire: (id, updates) =>
        set((state) => ({
          questionnaires: state.questionnaires.map((q) =>
            q.id === id ? { ...q, ...updates } : q
          ),
        })),
      deleteQuestionnaire: (id) =>
        set((state) => ({
          questionnaires: state.questionnaires.filter((q) => q.id !== id),
        })),
      setFilters: (filters) => set({ filters }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSelectedQuestionnaire: (questionnaire) =>
        set({ selectedQuestionnaire: questionnaire }),
    }),
    {
      name: 'questionnaire-store',
    }
  )
);