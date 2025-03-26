import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useQuestionnaires } from '../hooks/useQuestionnaires';
import { QuestionnaireCard } from './QuestionnaireCard';
import { Loader2 } from 'lucide-react';
import type { QuestionnaireFilters } from '../types/questionnaire';

interface QuestionnaireListProps {
  filters: QuestionnaireFilters;
}

export function QuestionnaireList({ filters }: QuestionnaireListProps) {
  const { questionnaires, isLoading, isError, error, delete: deleteQuestionnaire, isDeleting } = useQuestionnaires(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        {error?.message || 'Ошибка загрузки опросников. Пожалуйста, попробуйте снова.'}
      </div>
    );
  }

  if (!questionnaires?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-xl font-medium">Нет доступных опросников</p>
        <p className="mt-2">Создайте новый опросник, нажав кнопку выше</p>
      </div>
    );
  }

  return (
    <Virtuoso
      style={{ height: 'calc(100vh - 200px)' }}
      totalCount={questionnaires.length}
      itemContent={(index) => (
        <div className="p-2">
          <QuestionnaireCard
            questionnaire={questionnaires[index]}
            onDelete={(id) => deleteQuestionnaire(id.toString())}
          />
        </div>
      )}
      components={{
        Footer: () => <div className="h-4" />,
      }}
    />
  );
}