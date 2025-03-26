import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionnaireCatalog } from './pages/QuestionnaireCatalog';
import QuestionnaireBuilder from './components/QuestionnaireBuilder';
import { QuestionnaireRunner } from './pages/QuestionnaireRunner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<QuestionnaireCatalog />} />
            <Route path="/questionnaire/new" element={<QuestionnaireBuilder />} />
            <Route path="/questionnaire/:id/edit" element={<QuestionnaireBuilder />} />
            <Route path="/questionnaire/:id/run" element={<QuestionnaireRunner />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;