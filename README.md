
# Resume–Job Description Matching API

## Overview
This project implements a backend API that parses a candidate's resume (PDF) and compares it with a Job Description (JD) to determine how well the candidate's skills match the role.

The system:
- Extracts structured information from a **Resume PDF**
- Extracts structured information from a **Job Description text**
- Matches **skills from resume vs skills required in the JD**
- Calculates a **matching score**
- Returns a structured JSON response

This project simulates a **basic Applicant Tracking System (ATS)** workflow.

---

# Tech Stack

Backend:
- Node.js
- Express.js

Libraries:
- pdf-parse (for extracting text from PDF)
- multer (for handling file uploads)
- cors

---

# Project Structure

```
src
│
├── controller
│   └── resumeMatch.js
│
├── resume-parser
│   ├── parseResume.js
│   ├── extractResume.js
│   ├── extractName.js
│   ├── extractResumeExperience.js
│   └── extractResumeSkills.js
│
├── jd-parser
│   ├── extractJd.js
│   ├── extractAbout.js
│   ├── extractExperience.js
│   ├── extractRole.js
│   ├── extractSalary.js
│   └──  extractSKills.js
│
├── skillMatch
│   └── calculateScore.js
│
├── routes
│   └── matchRoutes.js
│
└── index.js
```

---

# Setup Instructions

## 1. Clone Repository

```
git clone https://github.com/arshadjamil13/Resume_JD_Matcher.git
```

## 2. Install Dependencies

```
npm install
```

Required packages:

```
npm install express multer pdf-parse cors
```

## 3. Start Server

```
node src/index.js
```

Server will run on:

```
http://localhost:5000
```

---

# API Endpoint

### POST `/api/match`

This endpoint accepts:

- Resume file (PDF)
- Job Description text

### Request Type

```
multipart/form-data
```

### Body Parameters

| Field | Type | Description |
|------|------|-------------|
| resume | File | Resume in PDF format |
| jd | Text | Job Description |

---

# Example API Request (Postman)

POST

```
http://localhost:5000/api/match
```

Body → form-data

| Key | Type |
|----|----|
| resume | File |
| jd | Text |

Upload resume and paste job description text.

---

# Resume Information Extracted

The system extracts:

- Candidate Name
- Years of Experience
- Skills from Resume

---

# Job Description Information Extracted

From the JD the system extracts:

- Role
- About Role / Job Summary
- Required Skills
- Salary (if mentioned)

---

# Matching Algorithm

The algorithm:

1. Extracts skills from resume.
2. Extracts required skills from job description.
3. Compares skills case-insensitively.
4. Generates:

```
skillsAnalysis
matchingScore
```

### Matching Score Formula

```
Matching Score = (Matched Skills / Total Required Skills) * 100
```

---

# Example 1

## Job Role
Full Stack Web Developer (Founding Member)

### Matching Result

```
Matching Score: 21%
```

Example Output:

```json
{
"name": "arshad jamil",
"salary": "Not Disclosed",
"yearofExperience": "0.3 years",
"resumeSkills": ["javascript","python","react.js","node.js","postgresql"],
"matchingJobs": [
{
"role": "Full Stack Web Developer (Founding Member)",
"matchingScore": 21
}
]
}
```

---

# Example 2

## Job Role
AI Engineer (Founding Member)

### Matching Result

```
Matching Score: 7%
```

Example Output:

```json
{
"name": "arshad jamil",
"salary": "Not Disclosed",
"yearofExperience": "0.3 years",
"resumeSkills": ["javascript","python","react.js","node.js","postgresql"],
"matchingJobs": [
{
"role": "AI Engineer (Founding Member)",
"matchingScore": 7
}
]
}
```

---

# Sample Skills Analysis Output

Example:

```json
{
"skill": "Python",
"presentInResume": true
}
```

```json
{
"skill": "FastAPI",
"presentInResume": false
}
```

---

# Features Implemented

Resume Parsing
- Extract name
- Extract experience
- Extract skills

Job Description Parsing
- Extract role
- Extract summary/about role
- Extract required skills
- Extract salary

Skill Matching
- Skill comparison
- Skill presence analysis
- Matching score calculation

REST API
- Upload resume PDF
- Send job description text
- Return structured JSON response

---

# Limitations

- Skill extraction depends on JD formatting
- Some skills may be split into tokens
- Advanced NLP techniques are not used

---

# Future Improvements

Possible enhancements:

- Skill normalization (Node vs Node.js)
- NLP based skill extraction
- Fuzzy matching
- Semantic matching using embeddings
- Frontend interface for resume upload
- Database for storing candidate profiles

---

# Author

Arshad Jamil

Software Developer | MERN Stack 
