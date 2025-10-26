import React, { useState } from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results }) => {
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = [
    { id: 'summary', label: 'SUMMARY', icon: '' },
    { id: 'skills', label: 'SKILLS', icon: '' },
    { id: 'contact', label: 'CONTACT & EDUCATION', icon: '' },
    { id: 'ats', label: 'ATS COMPATIBILITY', icon: '' }
  ];

  const renderSummary = () => (
    <div className="summary-content">
      <div className="summary-item">
        <h4>Resume Summary</h4>
        <p>{results.summary}</p>
      </div>
      <div className="summary-item">
        <h4>Overall Match Score</h4>
        <p className="score">{results.score}</p>
      </div>
      <div className="summary-item">
        <h4>Detected Role</h4>
        <p>{results.role}</p>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="skills-content">
      <div className="skills-item">
        <h4>Matched Skills</h4>
        <p>{results.skills}</p>
      </div>
      <div className="skills-item">
        <h4>Detailed Feedback</h4>
        <div className="feedback-text">
          {results.feedback.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="contact-content">
      <div className="contact-section">
        <h4>Contact Information</h4>
        <div className="contact-details">
          <p><strong>Name:</strong> {results.contact.name}</p>
          <p><strong>Email:</strong> {results.contact.email}</p>
          <p><strong>Phone:</strong> {results.contact.phone}</p>
          <p><strong>LinkedIn:</strong> {results.contact.linkedin}</p>
        </div>
      </div>
      <div className="education-section">
        <h4>Education</h4>
        <div className="education-list">
          {results.education.map((edu, index) => (
            <p key={index}>{edu}</p>
          ))}
        </div>
      </div>
    </div>
  );

  const renderATS = () => (
    <div className="ats-content">
      <div className="ats-score">
        <h4>ATS Compatibility Score</h4>
        <div className="score-display">
          <span className="score-number">{results.ats.score}%</span>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{ width: `${results.ats.score}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="ats-issues">
        <h4>Analysis Details</h4>
        {results.ats.issues.length > 0 ? (
          <div className="issues-list">
            {results.ats.issues.map((issue, index) => (
              <div key={index} className="issue-item">
                <span className="issue-icon">⚠️</span>
                <span>{issue}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-issues">✅ No major ATS issues detected!</p>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return renderSummary();
      case 'skills':
        return renderSkills();
      case 'contact':
        return renderContact();
      case 'ats':
        return renderATS();
      default:
        return renderSummary();
    }
  };

  return (
    <div className="results-display">
      <h2>ANALYSIS RESULTS</h2>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ResultsDisplay;
