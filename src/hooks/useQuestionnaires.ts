import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Questionnaire, QuestionnaireFilters } from '../types/questionnaire';
import { questionnairesDb } from '../lib/database';

const QUESTIONNAIRES_QUERY_KEY = 'questionnaires';

export function useQuestionnaires(filters: QuestionnaireFilters) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: [QUESTIONNAIRES_QUERY_KEY, filters],
    queryFn: async () => {
      try {
        const result = await questionnairesDb.findAll(filters);
        console.log('Fetched questionnaires:', result); // Debug log
        if (!Array.isArray(result)) {
          console.error('Invalid response format:', result);
          throw new Error('Invalid response format from database');
        }
        return result;
      } catch (err) {
        console.error('Error fetching questionnaires:', err);
        throw err;
      }
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newQuestionnaire: Omit<Questionnaire, 'id' | 'createdAt' | 'updatedAt' | 'completionCount'>) => {
      try {
        const result = await questionnairesDb.create(newQuestionnaire);
        if (!result) {
          throw new Error('Failed to create questionnaire');
        }
        return result;
      } catch (err) {
        console.error('Error creating questionnaire:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUESTIONNAIRES_QUERY_KEY] });
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Questionnaire> }) => {
      try {
        const result = await questionnairesDb.update(id, updates);
        if (!result) {
          throw new Error('Failed to update questionnaire');
        }
        return result;
      } catch (err) {
        console.error('Error updating questionnaire:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUESTIONNAIRES_QUERY_KEY] });
    },
    onError: (error: Error) => {
      console.error('Update mutation error:', error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const result = await questionnairesDb.delete(id);
        if (!result) {
          throw new Error('Failed to delete questionnaire');
        }
        return result;
      } catch (err) {
        console.error('Error deleting questionnaire:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUESTIONNAIRES_QUERY_KEY] });
    },
    onError: (error: Error) => {
      console.error('Delete mutation error:', error);
    }
  });

  return {
    questionnaires: data,
    isLoading,
    isError: !!error,
    error: error as Error,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    isCreating: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading
  };
}