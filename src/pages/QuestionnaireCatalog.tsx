import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { QuestionnaireList } from '../components/QuestionnaireList';
import { QuestionnaireFilters } from '../components/QuestionnaireFilters';
import type { QuestionnaireFilters as Filters } from '../types/questionnaire';
import { useQuestionnaires } from '../hooks/useQuestionnaires';

export function QuestionnaireCatalog() {
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState<Filters>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
  });

  const { questionnaires, isLoading, error } = useQuestionnaires(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error loading questionnaires. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Опросники</h1>
        <button
          onClick={() => navigate('/questionnaire/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Новый опросник
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <QuestionnaireFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
        <div className="border-t border-gray-200">
          {questionnaires && questionnaires.length > 0 ? (
            <QuestionnaireList filters={filters} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl font-medium">Нет доступных опросников</p>
              <p className="mt-2">Создайте новый опросник, нажав кнопку выше</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}