import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestionnaireDTO, Questionnaire } from '../types/database';

export function useQuestionnaire(id?: number) {
  const queryClient = useQueryClient();

  const fetchQuestionnaire = async (id: number) => {
    const response = await fetch(`/api/questionnaires/${id}`);
    if (!response.ok) throw new Error('Failed to fetch questionnaire');
    return response.json();
  };

  const createQuestionnaire = async (data: CreateQuestionnaireDTO) => {
    const response = await fetch('/api/questionnaires', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create questionnaire');
    return response.json();
  };

  const questionnaire = useQuery({
    queryKey: ['questionnaire', id],
    queryFn: () => fetchQuestionnaire(id!),
    enabled: !!id
  });

  const createMutation = useMutation({
    mutationFn: createQuestionnaire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionnaires'] });
    }
  });

  return {
    questionnaire: questionnaire.data as Questionnaire | undefined,
    isLoading: questionnaire.isLoading,
    error: questionnaire.error,
    create: createMutation.mutate,
    isCreating: createMutation.isPending
  };
}