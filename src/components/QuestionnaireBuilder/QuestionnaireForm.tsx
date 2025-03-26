import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Plus, Save, Trash2 } from 'lucide-react';
import type { CreateQuestionnaireDTO } from '../../types/database';
import { logger } from '../../utils/logger';

// Validation schema
const questionSchema = z.object({
  question_text: z.string().min(1, 'Question text is required'),
  question_type: z.enum(['text', 'single', 'multiple', 'image']),
  options: z.array(z.string()).nullable(),
  required: z.boolean(),
  order: z.number().int().min(0)
});

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1, 'At least one question is required')
});

type FormData = z.infer<typeof formSchema>;

export function QuestionnaireForm() {
  const queryClient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      questions: [
        {
          question_text: '',
          question_type: 'text',
          options: null,
          required: true,
          order: 0
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  // Debug: Log form field changes
  const onFieldChange = (fieldName: string, value: any) => {
    console.log('Form field updated:', fieldName, value);
  };

  const createQuestionnaire = useMutation({
    mutationFn: async (data: CreateQuestionnaireDTO) => {
      try {
        // Debug: Log pre-submission data
        console.log('Form submission triggered with data:', data);
        logger.info('Attempting to create questionnaire', { data });

        const response = await fetch('/api/questionnaires', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        // Debug: Log response status
        console.log('Server response status:', response.status);
        
        if (!response.ok) {
          const error = await response.json();
          logger.error('Failed to create questionnaire', { error, status: response.status });
          throw new Error(error.message || 'Failed to create questionnaire');
        }
        
        const result = await response.json();
        // Debug: Log successful creation
        console.log('Database operation result:', result);
        logger.info('Questionnaire created successfully', { id: result.id });
        
        return result;
      } catch (error) {
        // Debug: Log detailed error
        console.error('Questionnaire creation error:', error);
        logger.error('Error in createQuestionnaire mutation', { error });
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questionnaires'] });
      toast.success('Questionnaire created successfully');
      logger.info('Questionnaire mutation completed', { id: data.id });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create questionnaire');
      logger.error('Questionnaire mutation failed', { error: error.message });
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Debug: Log complete form state
      console.log('Form state pre-submit:', data);
      logger.info('Form submission started', { formData: data });

      await createQuestionnaire.mutateAsync(data);
    } catch (error) {
      console.error('Form submission error:', error);
      logger.error('Form submission failed', { error });
    }
  };

  // Watch for field changes
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        onFieldChange(name, value[name as keyof FormData]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const watchQuestionTypes = watch('questions');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Questions</h3>
          <button
            type="button"
            onClick={() => append({
              question_text: '',
              question_type: 'text',
              options: null,
              required: true,
              order: fields.length
            })}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between">
              <h4 className="text-md font-medium">Question {index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div>
              <input
                {...register(`questions.${index}.question_text`)}
                placeholder="Enter your question"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.questions?.[index]?.question_text && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.questions[index]?.question_text?.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  {...register(`questions.${index}.question_type`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="text">Text Input</option>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="image">Image Upload</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`questions.${index}.required`)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Required
                </label>
              </div>
            </div>

            {(watchQuestionTypes[index]?.question_type === 'single' ||
              watchQuestionTypes[index]?.question_type === 'multiple') && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {[0, 1, 2, 3].map((optionIndex) => (
                  <input
                    key={optionIndex}
                    {...register(`questions.${index}.options.${optionIndex}`)}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Questionnaire'}
        </button>
      </div>
    </form>
  );
}