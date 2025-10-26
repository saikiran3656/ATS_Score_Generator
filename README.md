# AI Resume Analyzer

A full-stack web application for AI-powered resume analysis with ATS compatibility checking and skill matching.

## 🚀 Features

- **Intelligent Resume Analysis**: AI-powered analysis using transformers
- **ATS Compatibility**: Comprehensive ATS scoring and issue detection
- **Skill Matching**: Weighted skill scoring against job requirements
- **Contact Extraction**: Automatic extraction of contact information
- **Role Detection**: Smart job role detection from resume content
- **Modern UI**: Clean, responsive React frontend
- **REST API**: Flask-based backend API
- **File Support**: PDF and DOCX file processing

## 🏗️ Architecture

```
├── backend/          # Flask API server
│   ├── app.py       # Main application
│   ├── requirements.txt
│   └── README.md
├── frontend/         # React web application
│   ├── src/
│   ├── public/
│   └── package.json
├── Resume.py         # Core analysis logic
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **Transformers** - AI models (Hugging Face)
- **PyPDF2** - PDF processing
- **python-docx** - DOCX processing
- **NLTK** - Text processing

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **CSS3** - Styling

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Installation

1. **Clone and setup backend:**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

2. **Setup frontend:**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the backend:**
   ```bash
   cd backend
   python app.py
   ```
   Backend runs on `http://localhost:5000`

2. **Start the frontend:**
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## 📖 API Documentation

### POST /analyze_resume
Analyze a resume file.

**Parameters:**
- `resume` (file): Resume file (PDF/DOCX)
- `jd` (file, optional): Job description
- `target_role` (string, optional): Target role

**Response:**
```json
{
  "summary": "Professional summary...",
  "score": "85.0% (Strong Match)",
  "role": "Software Engineer",
  "skills": "Python, React, Node.js",
  "feedback": "Detailed feedback...",
  "contact": {...},
  "education": [...],
  "ats": {...}
}
```

## 🎯 Supported Roles

- Data Analyst
- Project Manager
- Software Engineer
- Digital Marketing Specialist
- Web Developer
- DevOps Engineer

## 📁 File Requirements

- **Formats**: PDF, DOCX
- **Max Size**: 10MB
- **Content**: Text-based resumes

## 🤖 AI Models

- **Summarization**: `sshleifer/distilbart-cnn-12-6`
- **Text Generation**: `google/flan-t5-base`

## 🔧 Development

### Backend Development
```bash
cd backend
python app.py  # With auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # Hot reload enabled
```

## 📊 Analysis Features

- **Skill Scoring**: Weighted scoring (core: 3pts, important: 2pts, nice-to-have: 1pt)
- **ATS Check**: Comprehensive compatibility analysis
- **Contact Detection**: Email, phone, LinkedIn extraction
- **Education Parsing**: Degree and qualification extraction
- **Role Confidence**: Confidence scoring for role detection

## 🚀 Deployment

### Backend Deployment
```bash
# Production server
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Serve build/ directory with nginx/apache
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Model Loading Errors**: Ensure sufficient RAM (4GB+ recommended)
2. **CORS Errors**: Backend must allow frontend origin
3. **File Upload Issues**: Check file size and format
4. **Port Conflicts**: Ensure ports 3000 and 5000 are available

### Performance Tips

- Use GPU for faster model inference
- Process files sequentially for memory efficiency
- Cache model instances for repeated use
