import React from 'react';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import type { QuestionnaireFilters } from '../types/questionnaire';

interface QuestionnaireFiltersProps {
  filters: QuestionnaireFilters;
  onFiltersChange: (filters: QuestionnaireFilters) => void;
}

export function QuestionnaireFilters({ filters, onFiltersChange }: QuestionnaireFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, sortBy: e.target.value as QuestionnaireFilters['sortBy'] });
  };

  const toggleSortOrder = () => {
    onFiltersChange({
      ...filters,
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="flex gap-4 p-4 bg-white border-b">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search questionnaires..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={filters.sortBy || 'createdAt'}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="createdAt">Date Created</option>
          <option value="title">Title</option>
          <option value="completionCount">Completion Count</option>
        </select>

        <button
          onClick={toggleSortOrder}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Toggle sort order"
        >
          {filters.sortOrder === 'desc' ? (
            <SortDesc className="w-5 h-5" />
          ) : (
            <SortAsc className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}