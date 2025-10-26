import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onAnalysisComplete, onError, setLoading }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [targetRole, setTargetRole] = useState('Auto-detect');
  const [dragActive, setDragActive] = useState(false);

  const roles = [
    'Auto-detect',
    'Data Analyst',
    'Project Manager',
    'Software Engineer',
    'Digital Marketing Specialist',
    'Web Developer',
    'DevOps Engineer'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'resume') {
      setResumeFile(file);
    } else if (type === 'jd') {
      setJdFile(file);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      onError('Please upload only PDF, DOCX, or TXT files.');
      return false;
    }

    if (file.size > maxSize) {
      onError('File size must be less than 10MB.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      onError('Please select a resume file.');
      return;
    }

    if (!validateFile(resumeFile)) return;
    if (jdFile && !validateFile(jdFile)) return;

    setLoading(true);
    onError(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    if (jdFile) {
      formData.append('jd', jdFile);
    }
    formData.append('target_role', targetRole);

    try {
      const response = await axios.post('http://localhost:5000/analyze_resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onAnalysisComplete(response.data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      if (error.response && error.response.data && error.response.data.error) {
        onError(error.response.data.error);
      } else {
        onError('Failed to analyze resume. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-section">
          <h3>UPLOAD FILES</h3>

          {/* Resume Upload */}
          <div className="file-input-group">
            <label htmlFor="resume">Resume (.pdf or .docx) *</label>
            <div
              className={`drop-zone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume"
                accept=".pdf,.docx,.txt"
                onChange={(e) => handleFileChange(e, 'resume')}
                style={{ display: 'none' }}
              />
              <label htmlFor="resume" className="drop-zone-label">
                {resumeFile ? (
                  <span>{resumeFile.name}</span>
                ) : (
                  <span>Click to select or drag and drop your resume</span>
                )}
              </label>
            </div>
          </div>

          {/* JD Upload (Optional) */}
          <div className="file-input-group">
            <label htmlFor="jd">Job Description (optional)</label>
            <div className="drop-zone">
              <input
                type="file"
                id="jd"
                accept=".pdf,.docx"
                onChange={(e) => handleFileChange(e, 'jd')}
                style={{ display: 'none' }}
              />
              <label htmlFor="jd" className="drop-zone-label">
                {jdFile ? (
                  <span>{jdFile.name}</span>
                ) : (
                  <span>Click to select job description (optional)</span>
                )}
              </label>
            </div>
          </div>

          {/* Target Role Selection */}
          <div className="role-selection">
            <label htmlFor="target-role">Target Role</label>
            <select
              id="target-role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="analyze-btn">
            Analyze Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
