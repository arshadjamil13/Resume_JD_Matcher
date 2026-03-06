
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
Job Description

Role: Full Stack Web Developer (Founding Member)

A Full Stack Developer is responsible for building and maintaining the entire web application — from what users see on the screen to how everything works behind the scenes.

Key Responsibilities

Build and maintain end-to-end web applications (frontend + backend)

Implement AI-driven workflows with Code & Content Agents

Develop user dashboards for projects, history, credits, and execution logs

Integrate authentication, billing, and user management

Connect frontend with AI agent APIs & execution engines

Implement preview, update, and follow-up prompt flows

Optimise performance, reliability, and security

Collaborate with AI engineers on the execution of UX

Required Skills

Strong experience in Full-Stack Development

Frontend: Next.js

Backend: Python (FastAPI)

REST / GraphQL API design

PostgreSQL

Authentication (OAuth, JWT)

CI/CD & deployment


Example Output:

```json
{
    "name": "arshad jamil",
    "salary": "Not Disclosed",
    "yearofExperience": "0.3 years",
    "resumeSkills": [
        " programming languages: typescript",
        "javascript",
        "python",
        "c",
        "data structures & algorithms",
        " frontend:  react.js",
        "tailwind css",
        "context api",
        "redux",
        "shadcn",
        " backend: node.js",
        "express.js",
        "rest apis",
        "jwt",
        "google oauth",
        "zod",
        "bcrypt",
        " databases:  mongodb",
        "mongoose",
        "mysql",
        "postgresql",
        " tools/others: git",
        "github",
        "postman",
        " soft skills: problem solving & analytical thinking",
        "effective communication & teamwork"
    ],
    "matchingJobs": [
        {
            "role": "Full Stack Web Developer (Founding Member)",
            "aboutRole": ":\nBuild and maintain end-to-end web applications (frontend + backend)\nImplement AI-driven workflows with Code & Content Agents\nDevelop user dashboards for projects, history, credits, and execution logs\nIntegrate authentication, billing, and user management\nConnect frontend with AI agent APIs & execution engines\nImplement preview, update, and follow-up prompt flows\nOptimise performance, reliability, and security\nCollaborate with AI engineers on the execution of UX\n\nRequired",
            "skillsAnalysis": [
                {
                    "skill": "Full",
                    "presentInResume": false
                },
                {
                    "skill": "Next.js",
                    "presentInResume": false
                },
                {
                    "skill": "UI",
                    "presentInResume": false
                },
                {
                    "skill": "Python",
                    "presentInResume": true
                },
                {
                    "skill": "FastAPI",
                    "presentInResume": false
                },
                {
                    "skill": "GraphQL",
                    "presentInResume": false
                },
                {
                    "skill": "API",
                    "presentInResume": false
                },
                {
                    "skill": "Database",
                    "presentInResume": false
                },
                {
                    "skill": "PostgreSQL",
                    "presentInResume": true
                },
                {
                    "skill": "Authentication",
                    "presentInResume": false
                },
                {
                    "skill": "OAuth",
                    "presentInResume": false
                },
                {
                    "skill": "JWT",
                    "presentInResume": true
                },
                {
                    "skill": "CI/CD",
                    "presentInResume": false
                },
                {
                    "skill": "deployment",
                    "presentInResume": false
                }
            ],
            "matchingScore": 21
        }
    ]
}

```

---

# Example 2

## Job Role
Role: AI Engineer (Founding Member)

We are looking for a highly skilled AI Engineer to build next-generation AI execution systems at the core of our platform. You will work on advanced LLM-driven systems that transform user intent into real-world outcomes at scale.

Key Responsibilities

Design and build agentic AI workflows

Implement intent detection & task routing

Orchestrate multi-agent systems

Build persistent memory for projects

Enable self-testing and retry loops

Automate execution pipelines

Integrate LLM tool-calling and APIs

Maintain transparent execution logs

Required Skills

LLM systems

Agentic AI systems

Python (FastAPI) or Node.js

Vector Databases (Pinecone, Weaviate, Qdrant)

PostgreSQL

Async execution

Background jobs and queues



Example Output:

```json
 {
    "name": "arshad jamil",
    "salary": "Not Disclosed",
    "yearofExperience": "0.3 years",
    "resumeSkills": [
        " programming languages: typescript",
        "javascript",
        "python",
        "c",
        "data structures & algorithms",
        " frontend:  react.js",
        "tailwind css",
        "context api",
        "redux",
        "shadcn",
        " backend: node.js",
        "express.js",
        "rest apis",
        "jwt",
        "google oauth",
        "zod",
        "bcrypt",
        " databases:  mongodb",
        "mongoose",
        "mysql",
        "postgresql",
        " tools/others: git",
        "github",
        "postman",
        " soft skills: problem solving & analytical thinking",
        "effective communication & teamwork"
    ],
    "matchingJobs": [
        {
            "role": "AI Engineer (Founding Member)",
            "aboutRole": ":\nDesign and build agentic AI workflows (planner → executor → verifier)\nImplement intent detection & task routing across code and content agents\nOrchestrate multi-agent systems to deliver end-to-end outcomes\nBuild persistent memory for projects, context, and user intent\nEnable self-testing, self-correction, and retry loops\nAutomate execution pipelines (code → deploy → publish)\nIntegrate LLM tool-calling, plugins, and external APIs\nEnsure transparent execution logs and reliable completion\n\n\nRequi",
            "skillsAnalysis": [
                {
                    "skill": "LLMs",
                    "presentInResume": false
                },
                {
                    "skill": "Agentic",
                    "presentInResume": false
                },
                {
                    "skill": "AI",
                    "presentInResume": false
                },
                {
                    "skill": "systems",
                    "presentInResume": false
                },
                {
                    "skill": "Multi",
                    "presentInResume": false
                },
                {
                    "skill": "agent",
                    "presentInResume": false
                },
                {
                    "skill": "orchestration",
                    "presentInResume": false
                },
                {
                    "skill": "workflow",
                    "presentInResume": false
                },
                {
                    "skill": "Python",
                    "presentInResume": true
                },
                {
                    "skill": "FastAPI",
                    "presentInResume": false
                },
                {
                    "skill": "Node.js",
                    "presentInResume": false
                },
                {
                    "skill": "Vector",
                    "presentInResume": false
                },
                {
                    "skill": "databases",
                    "presentInResume": false
                },
                {
                    "skill": "Pinecone",
                    "presentInResume": false
                },
                {
                    "skill": "Weaviate",
                    "presentInResume": false
                },
                {
                    "skill": "Qdrant",
                    "presentInResume": false
                },
                {
                    "skill": "PostgreSQL",
                    "presentInResume": true
                },
                {
                    "skill": "Tool",
                    "presentInResume": false
                },
                {
                    "skill": "function",
                    "presentInResume": false
                },
                {
                    "skill": "LLM",
                    "presentInResume": false
                },
                {
                    "skill": "integrations",
                    "presentInResume": false
                },
                {
                    "skill": "Async",
                    "presentInResume": false
                },
                {
                    "skill": "execution",
                    "presentInResume": false
                },
                {
                    "skill": "background",
                    "presentInResume": false
                },
                {
                    "skill": "jobs",
                    "presentInResume": false
                },
                {
                    "skill": "queues",
                    "presentInResume": false
                },
                {
                    "skill": "System",
                    "presentInResume": false
                },
                {
                    "skill": "outputs",
                    "presentInResume": false
                }
            ],
            "matchingScore": 7
        }
    ]
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
