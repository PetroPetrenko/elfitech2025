import React from 'react';
import { useParams } from 'react-router-dom';
import { Timer, ChevronLeft, ChevronRight } from 'lucide-react';

export function QuestionnaireRunner() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [timeRemaining, setTimeRemaining] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Load questionnaire data
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Sample Questionnaire</h1>
            <div className="flex items-center text-gray-600">
              <Timer size={20} className="mr-2" />
              <span>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all"
                style={{ width: `${(currentQuestion + 1) * 10}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Question content will go here */}
            <div className="py-12 text-center text-gray-500">
              Loading question...
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              disabled={currentQuestion === 0}
              className="px-4 py-2 flex items-center text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </button>
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="px-4 py-2 flex items-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Next
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}