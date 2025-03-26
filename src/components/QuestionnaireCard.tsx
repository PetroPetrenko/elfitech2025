import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Play, Trash2, HelpCircle } from 'lucide-react';
import { Questionnaire } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  questionnaire: Questionnaire;
  onDelete: (id: number) => void;
}

export function QuestionnaireCard({ questionnaire, onDelete }: Props) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{questionnaire.title}</h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{questionnaire.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/questionnaire/${questionnaire.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
            title="Edit questionnaire"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => navigate(`/questionnaire/${questionnaire.id}/run`)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full"
            title="Start questionnaire"
          >
            <Play size={20} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            title="Delete questionnaire"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span className="flex items-center">
          <HelpCircle size={16} className="mr-1" />
          {questionnaire.questionCount} questions
        </span>
        <span>•</span>
        <span>{questionnaire.completionCount} completions</span>
        <span>•</span>
        <span>Created {formatDistanceToNow(new Date(questionnaire.createdAt))} ago</span>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h4 className="text-lg font-semibold mb-4">Delete Questionnaire?</h4>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{questionnaire.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(questionnaire.id);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}