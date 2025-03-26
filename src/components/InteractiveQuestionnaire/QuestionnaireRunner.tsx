import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Timer, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Question, Response } from '../../types/database';

interface Props {
  questionnaireId: number;
}

export function QuestionnaireRunner({ questionnaireId }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [startTime] = React.useState(new Date());
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  // Fetch questionnaire data
  const { data: questionnaire, isLoading } = useQuery({
    queryKey: ['questionnaire', questionnaireId],
    queryFn: async () => {
      const response = await fetch(`/api/questionnaires/${questionnaireId}`);
      if (!response.ok) throw new Error('Failed to fetch questionnaire');
      return response.json();
    }
  });

  // Timer effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(z.record(z.any()))
  });

  const submitResponse = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionnaire_id: questionnaireId,
          respondent_id: 'anonymous', // In a real app, this would be the user's ID
          answers: data,
          time_taken: timeElapsed
        })
      });
      
      if (!response.ok) throw new Error('Failed to submit response');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Questionnaire submitted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit questionnaire');
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!questionnaire) {
    return (
      <div className="text-center text-red-600">
        Failed to load questionnaire
      </div>
    );
  }

  const currentQuestion: Question = questionnaire.questions[currentQuestionIndex];
  const totalQuestions = questionnaire.questions.length;

  const renderQuestion = (question: Question) => {
    switch (question.question_type) {
      case 'text':
        return (
          <input
            type="text"
            {...register(`answers.${question.id}`)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        );
      case 'single':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  {...register(`answers.${question.id}`)}
                  value={option}
                  id={`${question.id}-${index}`}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor={`${question.id}-${index}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case 'multiple':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`answers.${question.id}`)}
                  value={option}
                  id={`${question.id}-${index}`}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`${question.id}-${index}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data: any) => {
    await submitResponse.mutateAsync(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {questionnaire.title}
        </h1>
        <div className="flex items-center text-gray-600">
          <Timer className="w-5 h-5 mr-2" />
          <span>
            {Math.floor(timeElapsed / 60)}:
            {(timeElapsed % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`
            }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {currentQuestion.question_text}
          </h2>
          {renderQuestion(currentQuestion)}
          {errors.answers?.[currentQuestion.id] && (
            <p className="mt-2 text-sm text-red-600">
              This field is required
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentQuestionIndex(i => i - 1)}
            disabled={currentQuestionIndex === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <button
              type="submit"
              disabled={submitResponse.isPending}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {submitResponse.isPending ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentQuestionIndex(i => i + 1)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}