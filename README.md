# Questionnaire App - Survey Management System

## Project Description

Questionnaire App is a web application for creating, managing, and conducting surveys. The system allows users to create various types of questionnaires, configure different question formats, publish questionnaires, and collect respondents' answers.

## Main Features

- **Creating and editing questionnaires**: interactive builder with the ability to add various question types
- **Managing questionnaires**: publishing, archiving, and deleting questionnaires
- **Completing questionnaires**: interactive interface for filling out questionnaires with support for various question types
- **Analytics**: collecting and analyzing statistics on completed questionnaires

## Application Architecture

The application is built as a Single Page Application (SPA) using a modern technology stack:

### Client Side (Frontend)

- **React**: library for building user interfaces
- **React Router**: application routing
- **Zustand**: application state management
- **React Query**: managing asynchronous requests and data caching
- **React Hook Form**: form management
- **Zod**: data validation
- **React Beautiful DnD**: implementing drag-and-drop functionality
- **Tailwind CSS**: component styling

### Server Side (Backend)

- **Express**: web server and API
- **Knex.js**: SQL query builder and database migrations
- **SQLite**: database
- **Winston**: logging

## Project Structure

```
/
├── dist/                  # Compiled files for production
├── scripts/               # Scripts for migrations and database seeding
├── src/                   # Application source code
│   ├── components/        # React components
│   │   ├── QuestionnaireBuilder/  # Components for creating questionnaires
│   │   └── ...            # Other components
│   ├── controllers/       # API controllers
│   ├── db/                # Database settings
│   │   ├── migrations/    # Database migrations
│   │   └── seeds/         # Initial data
│   ├── hooks/             # React hooks
│   ├── lib/               # Helper libraries
│   ├── middleware/        # Middleware for Express
│   ├── pages/             # Application pages
│   ├── repositories/      # Repositories for working with data
│   ├── routes/            # API routes
│   ├── services/          # Business logic services
│   ├── store/             # State store (Zustand)
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
├── .env                   # Environment variables
├── database.sqlite        # SQLite database
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Build configuration
```

## Data Models

### Questionnaire

```typescript
interface Questionnaire {
  id: string;              // Unique identifier
  title: string;           // Questionnaire title
  description: string;     // Questionnaire description
  questions: Question[];   // Array of questions
  createdAt: string;       // Creation date
  updatedAt: string;       // Update date
  status: 'draft' | 'published' | 'archived';  // Questionnaire status
  timeLimit?: number;      // Time limit (in minutes)
  completionCount: number; // Number of completions
  averageTimeToComplete?: number; // Average completion time
}
```

### Question

```typescript
interface Question {
  id: string;              // Unique identifier
  type: 'text' | 'single' | 'multiple' | 'image';  // Question type
  title: string;           // Question text
  description?: string;    // Question description
  required: boolean;       // Required answer
  options?: string[];      // Answer options (for single and multiple)
  imageUrl?: string;       // Image URL (for image)
  maxLength?: number;      // Maximum answer length (for text)
  order: number;           // Question order number
}
```

### QuestionnaireResponse

```typescript
interface QuestionnaireResponse {
  id: string;              // Unique identifier
  questionnaireId: string; // Questionnaire ID
  userId: string;          // User ID
  startedAt: string;       // Start time
  completedAt?: string;    // Completion time
  answers: Record<string, any>; // Answers to questions
  timeSpent: number;       // Time spent (in seconds)
}
```

## Main Components

### QuestionnaireBuilder

Component for creating and editing questionnaires. Allows:
- Setting questionnaire title and description
- Adding different types of questions
- Configuring question parameters
- Changing question order via drag-and-drop
- Saving the questionnaire

### QuestionnaireRunner

Component for completing questionnaires. Functions:
- Displaying questionnaire questions
- Validating answers
- Navigation between questions
- Submitting results

### QuestionnaireCatalog

Component for displaying a list of available questionnaires with capabilities:
- Filtering by status and searching by title
- Sorting by various parameters
- Navigating to edit or complete a questionnaire

## Database

The application uses SQLite as a database. Main tables:

### questionnaires

- `id` (UUID): primary key
- `title` (string): questionnaire title
- `description` (text): questionnaire description
- `time_limit` (integer): time limit in minutes
- `status` (enum): questionnaire status (draft, published, archived)
- `questions_data` (jsonb): JSON with question data
- `created_at` (timestamp): creation date
- `updated_at` (timestamp): update date
- `completion_count` (integer): number of completions

## Installation and Running

### Requirements

- Node.js (version 18 or higher)
- npm or yarn

### Installing Dependencies

```bash
npm install
# or
yarn install
```

### Database Setup

```bash
# Running migrations
npm run migrate
# or
yarn migrate

# Filling with test data
npm run seed
# or
yarn seed
```

### Running in Development Mode

```bash
npm run dev
# or
yarn dev
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## Technology Stack

- **Programming Languages**: TypeScript, JavaScript
- **Frontend**: React, React Router, Zustand, React Query, Tailwind CSS
- **Backend**: Express, Knex.js
- **Database**: SQLite
- **Build**: Vite
- **Testing**: Vitest
- **Validation**: Zod
- **Logging**: Winston

## Additional Features

- **Drag-and-drop**: dragging questions to change their order
- **Time limit**: setting time limits for completing the questionnaire
- **Analytics**: collecting statistics on completed questionnaires
- **Validation**: checking the correctness of required fields
- **Responsive design**: proper display on various devices