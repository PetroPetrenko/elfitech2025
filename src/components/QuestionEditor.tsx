import React from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import { Question, QuestionType } from '../types';

interface QuestionEditorProps {
  question: Question;
  onUpdate: (updatedQuestion: Question) => void;
  onDelete: () => void;
}

export function QuestionEditor({ question, onUpdate, onDelete }: QuestionEditorProps) {
  const [options, setOptions] = React.useState<string[]>(question.options || []);

  const handleTypeChange = (type: QuestionType) => {
    const defaultOptions = type === 'radio' ? [
      'First answer option',
      'Second answer option',
      'Third answer option',
      'Fourth answer option'
    ] : [];

    const newOptions = type === 'text' ? [] : defaultOptions;
    setOptions(newOptions);
    onUpdate({
      ...question,
      type,
      options: newOptions
    });
  };

  const handleAddOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
    onUpdate({ ...question, options: newOptions });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    onUpdate({ ...question, options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    onUpdate({ ...question, options: newOptions });
  };

  const getOptionLabel = (index: number): string => {
    return String.fromCharCode(65 + index); // A, B, C, D...
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 mr-4">
          <input
            type="text"
            value={question.content}
            onChange={(e) => onUpdate({ ...question, content: e.target.value })}
            placeholder="Enter your question"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={question.type}
            onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="text">Text input</option>
            <option value="radio">Single choice</option>
            <option value="checkbox">Multiple choice</option>
          </select>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Delete question"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {(question.type === 'radio' || question.type === 'checkbox') && (
        <div className="mt-4 space-y-3">
          <div className="text-sm font-medium text-gray-700">Options</div>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-8 text-gray-600 font-medium">
                {getOptionLabel(index)})
              </div>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {options.length > 2 && (
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
          {options.length < 4 && (
            <button
              onClick={handleAddOption}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Plus size={20} className="mr-1" />
              Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}