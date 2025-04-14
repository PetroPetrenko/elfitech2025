
```markdown
# Survey Forge Studio

A modern web application for creating, managing, and analyzing questionnaires and surveys with an intuitive user interface.

## Overview

Survey Forge Studio is a comprehensive tool designed for professionals who need to create sophisticated questionnaires and collect data efficiently. Built with React and modern web technologies, it offers a seamless experience for survey creation, distribution, and analysis.

## Features

- **Intuitive Questionnaire Builder**: Drag-and-drop interface for easy survey creation
- **Multiple Question Types**: Support for various question formats including:
  - Single choice (radio buttons)
  - Multiple choice (checkboxes)
  - Text input (short and long form)
  - Numeric input with validation
  - Date and time selection
  - Rating scales
  - Matrix questions
  - Dropdown selections
- **Conditional Logic**: Create dynamic surveys with branching logic
- **Real-time Preview**: Test your questionnaire as you build it
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Data Export**: Export results in multiple formats (CSV, JSON, PDF)
- **Analytics Dashboard**: Visualize survey responses with interactive charts
- **Collaboration Tools**: Team-based survey creation and editing
- **Customizable Themes**: Brand your surveys with custom colors and logos

## Technology Stack

### Frontend
- **React**: Component-based UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable component library
- **React Router**: Navigation and routing
- **React Query**: Data fetching and state management
- **Chart.js**: Data visualization

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **GitHub Actions**: CI/CD pipeline

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd QuestionnaireBuilde\ AppV2
 ```
```

2. Install dependencies:
```sh
npm install
# or
yarn install
 ```

3. Start the development server:
```sh
npm run dev
# or
yarn dev
 ```

4. Open your browser and navigate to http://localhost:5173
## Usage Guide
### Creating a New Questionnaire
1. Click the "New Questionnaire" button on the dashboard
2. Enter a title and description for your survey
3. Add questions using the toolbox on the left sidebar
4. Configure question properties in the right panel
5. Preview your questionnaire using the "Preview" button
6. Save your work using the "Save" button
### Adding Logic to Questions
1. Select a question in the editor
2. Click "Add Logic" in the properties panel
3. Define conditions based on previous answers
4. Set actions (show/hide questions, skip to section, etc.)
5. Test your logic in the preview mode
### Distributing Your Survey
1. Finalize your questionnaire design
2. Click "Publish" in the top navigation bar
3. Choose your distribution method (link, email, embed)
4. Copy the generated link or code
5. Share with your respondents
### Analyzing Results
1. Navigate to the "Results" section
2. View response summary and individual submissions
3. Explore data visualizations in the "Analytics" tab
4. Export data using the "Export" button
## Deployment
The application can be deployed using various methods:

- Lovable Platform : Click on Share -> Publish in your Lovable project
- Custom Domain : Connect your own domain through Project > Settings > Domains
- Manual Deployment : Build the application and deploy to your preferred hosting service
## Building for Production
```sh
npm run build
# or
yarn build
 ```

The build artifacts will be stored in the dist/ directory.

## Contributing
We welcome contributions to Survey Forge Studio! Please see our Contributing Guide for more details.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, please open an issue in the GitHub repository or contact our support team at support@surveyforgestudio.com .


