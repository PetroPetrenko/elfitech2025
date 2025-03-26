import React, { useState } from 'react';
import { useQuestionnaireStore } from '../store/questionnaire';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, GripVertical } from 'lucide-react';
import { QuestionEditor } from './QuestionEditor';
import type { Question, QuestionType } from '../types/questionnaire';

const QuestionnaireBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const addQuestionnaire = useQuestionnaireStore((state) => state.addQuestionnaire);
  const updateQuestionnaire = useQuestionnaireStore((state) => state.updateQuestionnaire);
  const questionnaires = useQuestionnaireStore((state) => state.questionnaires);

  React.useEffect(() => {
    if (id) {
      const questionnaire = questionnaires.find(q => q.id === id);
      if (questionnaire) {
        setTitle(questionnaire.title);
        setDescription(questionnaire.description);
        setQuestions(questionnaire.questions);
      }
    }
  }, [id, questionnaires]);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      type: 'text',
      title: '',
      required: false,
      order: questions.length,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedQuestions = items.map((question, index) => ({
      ...question,
      order: index,
    }));

    setQuestions(reorderedQuestions);
  };

  const handleSave = () => {
    const questionnaire = {
      id: id || uuidv4(),
      title,
      description,
      questions: questions.sort((a, b) => a.order - b.order),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      completionCount: 0,
    };

    if (id) {
      updateQuestionnaire(questionnaire);
    } else {
      addQuestionnaire(questionnaire);
    }
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{id ? 'Edit' : 'Create'} Questionnaire</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter questionnaire title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter questionnaire description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Questions</h3>
              <button
                onClick={handleAddQuestion}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Question
              </button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {questions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-start space-x-4"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="mt-6 text-gray-400 hover:text-gray-600 cursor-move"
                            >
                              <GripVertical size={20} />
                            </div>
                            <div className="flex-1">
                              <QuestionEditor
                                question={question}
                                onUpdate={handleUpdateQuestion}
                                onDelete={() => handleDeleteQuestion(question.id)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || questions.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Questionnaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireBuilder;