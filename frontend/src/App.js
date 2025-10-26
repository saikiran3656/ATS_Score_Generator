import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysisComplete = (analysisResults) => {
    setResults(analysisResults);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setResults(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>RESUME ANALYZER</h1>
        <p>Upload your resume and get comprehensive analysis with ATS compatibility</p>
      </header>

      <main className="App-main">
        <FileUpload
          onAnalysisComplete={handleAnalysisComplete}
          onError={handleError}
          setLoading={setLoading}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing your resume...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {results && !loading && (
          <ResultsDisplay results={results} />
        )}
      </main>
    </div>
  );
}

export default App;
