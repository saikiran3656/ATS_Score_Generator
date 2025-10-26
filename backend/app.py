from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import sys
import logging

# Add parent directory to path to import Resume.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Resume import analyze_resume, extract_text_from_pdf, extract_text_from_docx

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/analyze_resume', methods=['POST'])
def analyze_resume_endpoint():
    try:
        # Check if file is in request
        if 'resume' not in request.files:
            return jsonify({"error": "No resume file provided"}), 400

        resume_file = request.files['resume']
        jd_file = request.files.get('jd')  # Optional JD file
        target_role = request.form.get('target_role', 'Auto-detect')

        if not resume_file.filename:
            return jsonify({"error": "No resume file selected"}), 400

        # Validate file extension
        allowed_extensions = {'.pdf', '.docx', '.txt'}
        resume_ext = os.path.splitext(resume_file.filename)[1].lower()
        if resume_ext not in allowed_extensions:
            return jsonify({"error": "Unsupported file type. Please upload PDF, DOCX, or TXT files."}), 400

        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=resume_ext) as temp_resume:
            resume_file.save(temp_resume.name)
            temp_resume_path = temp_resume.name

        try:
            # Extract text from resume
            if resume_ext == '.pdf':
                resume_text = extract_text_from_pdf(temp_resume_path)
            elif resume_ext == '.docx':
                resume_text = extract_text_from_docx(temp_resume_path)
            elif resume_ext == '.txt':
                with open(temp_resume_path, 'r', encoding='utf-8') as f:
                    resume_text = f.read()

            if not resume_text or resume_text.startswith("Error"):
                return jsonify({"error": "Failed to extract text from resume"}), 400

            # Extract JD text if provided
            jd_text = ""
            if jd_file and jd_file.filename:
                jd_ext = os.path.splitext(jd_file.filename)[1].lower()
                if jd_ext not in allowed_extensions:
                    return jsonify({"error": "Unsupported JD file type"}), 400

                with tempfile.NamedTemporaryFile(delete=False, suffix=jd_ext) as temp_jd:
                    jd_file.save(temp_jd.name)
                    if jd_ext == '.pdf':
                        jd_text = extract_text_from_pdf(temp_jd.name)
                    elif jd_ext == '.docx':
                        jd_text = extract_text_from_docx(temp_jd.name)
                    os.unlink(temp_jd.name)

            # Analyze resume
            result = analyze_resume(resume_text, jd_text, target_role)

            if "error" in result:
                return jsonify(result), 400

            return jsonify(result)

        finally:
            # Clean up temporary file
            if os.path.exists(temp_resume_path):
                os.unlink(temp_resume_path)

    except Exception as e:
        logger.error(f"Error in analyze_resume_endpoint: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Resume Analyzer API is running"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
