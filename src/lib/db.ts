// Error reporting interface
interface ErrorReport {
  timestamp: string;
  statusCode?: number;
  message: string;
  endpoint?: string;
  parameters?: Record<string, any>;
  userContext?: Record<string, any>;
  networkStatus?: string;
  stackTrace?: string;
  lastSuccessTimestamp?: string;
  retryCount?: number;
}

interface ErrorStore {
  errors: ErrorReport[];
  addError: (error: Partial<ErrorReport>) => void;
  getLastError: () => ErrorReport | undefined;
  clearErrors: () => void;
}

// Error reporting store
const errorStore: ErrorStore = {
  errors: [],
  addError: (error) => {
    const fullError: ErrorReport = {
      timestamp: new Date().toISOString(),
      message: error.message || 'Unknown error',
      ...error
    };
    errorStore.errors.unshift(fullError);
    console.error('Error Report:', fullError);
  },
  getLastError: () => errorStore.errors[0],
  clearErrors: () => { errorStore.errors = []; }
};

// Temporary in-memory storage
const store = {
  questionnaires: new Map(),
  questions: new Map(),
  answers: new Map(),
  responses: new Map()
};

// Sample questionnaire data
const sampleQuestionnaires = [
  {
    id: 1,
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our services by providing your feedback',
    timeLimit: 15,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    questionCount: 5,
    completionCount: 127
  },
  {
    id: 2,
    title: 'Employee Engagement Survey',
    description: 'Annual survey to measure employee satisfaction and engagement',
    timeLimit: 20,
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
    questionCount: 8,
    completionCount: 45
  },
  {
    id: 3,
    title: 'Product Feedback Form',
    description: 'Share your thoughts about our latest product release',
    timeLimit: 10,
    createdAt: '2024-03-13T09:15:00Z',
    updatedAt: '2024-03-13T09:15:00Z',
    questionCount: 6,
    completionCount: 89
  },
  {
    id: 4,
    title: 'Website Usability Survey',
    description: 'Help us improve your browsing experience',
    timeLimit: 12,
    createdAt: '2024-03-12T14:20:00Z',
    updatedAt: '2024-03-12T14:20:00Z',
    questionCount: 4,
    completionCount: 156
  },
  {
    id: 5,
    title: 'Training Feedback Survey',
    description: 'Rate the effectiveness of our training programs',
    timeLimit: 15,
    createdAt: '2024-03-11T11:45:00Z',
    updatedAt: '2024-03-11T11:45:00Z',
    questionCount: 7,
    completionCount: 67
  }
];

// Initialize store with sample data
sampleQuestionnaires.forEach(questionnaire => {
  store.questionnaires.set(questionnaire.id, questionnaire);
});

export const db = {
  questionnaires: {
    findAll: (page = 1, search = '', sortBy = 'created_at') => {
      try {
        const items = Array.from(store.questionnaires.values());
        const filtered = search
          ? items.filter(q => q.title.toLowerCase().includes(search.toLowerCase()))
          : items;
        
        const sorted = filtered.sort((a, b) => {
          if (sortBy === 'title') return a.title.localeCompare(b.title);
          if (sortBy === 'completion_count') return b.completionCount - a.completionCount;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        const perPage = 10;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        
        return {
          items: sorted.slice(start, end),
          total: filtered.length,
          page,
          totalPages: Math.ceil(filtered.length / perPage)
        };
      } catch (error) {
        errorStore.addError({
          message: 'Failed to fetch questionnaires',
          parameters: { page, search, sortBy },
          stackTrace: error.stack
        });
        throw error;
      }
    },
    findById: (id: number) => {
      try {
        return store.questionnaires.get(id);
      } catch (error) {
        errorStore.addError({
          message: `Failed to fetch questionnaire with id ${id}`,
          parameters: { id },
          stackTrace: error.stack
        });
        throw error;
      }
    },
    create: (data: any) => {
      try {
        const id = Date.now();
        const questionnaire = {
          ...data,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        store.questionnaires.set(id, questionnaire);
        return questionnaire;
      } catch (error) {
        errorStore.addError({
          message: 'Failed to create questionnaire',
          parameters: { data },
          stackTrace: error.stack
        });
        throw error;
      }
    },
    update: (id: number, data: any) => {
      try {
        const existing = store.questionnaires.get(id);
        if (!existing) throw new Error(`Questionnaire with id ${id} not found`);
        
        const updated = {
          ...existing,
          ...data,
          updatedAt: new Date().toISOString()
        };
        store.questionnaires.set(id, updated);
        return updated;
      } catch (error) {
        errorStore.addError({
          message: `Failed to update questionnaire with id ${id}`,
          parameters: { id, data },
          stackTrace: error.stack
        });
        throw error;
      }
    },
    delete: (id: number) => {
      try {
        return store.questionnaires.delete(id);
      } catch (error) {
        errorStore.addError({
          message: `Failed to delete questionnaire with id ${id}`,
          parameters: { id },
          stackTrace: error.stack
        });
        throw error;
      }
    }
  },
  questions: {
    findByQuestionnaireId: (questionnaireId: number) => {
      try {
        return Array.from(store.questions.values())
          .filter(q => q.questionnaireId === questionnaireId)
          .sort((a, b) => a.orderIndex - b.orderIndex);
      } catch (error) {
        errorStore.addError({
          message: `Failed to fetch questions for questionnaire ${questionnaireId}`,
          parameters: { questionnaireId },
          stackTrace: error.stack
        });
        throw error;
      }
    }
  },
  responses: {
    create: (data: any) => {
      try {
        const id = Date.now();
        const response = {
          ...data,
          id,
          createdAt: new Date().toISOString()
        };
        store.responses.set(id, response);
        return response;
      } catch (error) {
        errorStore.addError({
          message: 'Failed to create response',
          parameters: { data },
          stackTrace: error.stack
        });
        throw error;
      }
    }
  },
  errors: errorStore
};