# Resume Analyzer Backend

A Flask-based REST API for AI-powered resume analysis.

## Features

- **Resume Analysis**: Extract and analyze resume content
- **Skill Matching**: Match skills against job requirements
- **ATS Compatibility**: Check resume compatibility with ATS systems
- **Contact Extraction**: Automatically extract contact information
- **Role Detection**: Detect job roles from resume content
- **File Processing**: Support for PDF and DOCX files

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### POST /analyze_resume
Analyze a resume file.

**Request:**
- `resume` (file): Resume file (PDF or DOCX)
- `jd` (file, optional): Job description file
- `target_role` (string, optional): Target job role

**Response:**
```json
{
  "summary": "Resume summary text",
  "score": "85.0% (Strong Match)",
  "role": "Software Engineer (Confidence: 92.1%)",
  "skills": "Python, JavaScript, React...",
  "feedback": "Detailed feedback text",
  "contact": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "linkedin": "linkedin.com/in/johndoe"
  },
  "education": ["🎓 Bachelor of Science in Computer Science"],
  "ats": {
    "score": 85,
    "issues": ["Missing phone number", "Resume too short"]
  }
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "Resume Analyzer API is running"
}
```

## Dependencies

- Flask: Web framework
- Flask-CORS: Cross-origin resource sharing
- PyPDF2: PDF text extraction
- python-docx: DOCX text extraction
- transformers: AI models for summarization
- nltk: Natural language processing
- torch: Machine learning framework

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── README.md          # This file
└── ...               # Additional modules
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid file or missing required fields
- `500 Internal Server Error`: Server-side processing errors

## File Limits

- Maximum file size: 10MB
- Supported formats: PDF, DOCX
