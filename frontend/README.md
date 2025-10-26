# Resume Analyzer Frontend

A modern React frontend for the AI Resume Analyzer application.

## Features

- **File Upload**: Drag and drop or click to upload resume and job description files
- **Role Selection**: Choose target role or auto-detect from content
- **Real-time Analysis**: Get comprehensive resume analysis with ATS compatibility
- **Tabbed Results**: Organized display of analysis results in tabs
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will run on `http://localhost:3000`

### Backend Setup

Make sure the backend server is running on `http://localhost:5000` for the API calls to work.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── FileUpload.js
│   │   ├── FileUpload.css
│   │   ├── ResultsDisplay.js
│   │   └── ResultsDisplay.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- React 18
- Axios for API calls
- CSS3 for styling
- Create React App for build setup
