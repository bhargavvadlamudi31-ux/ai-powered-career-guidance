# 🧭 CareerCompass AI — AI-Powered Student Career Guidance System

> **A modern, full-stack, responsive web application designed to empower college students and aspiring professionals with transparent career compatibility scoring, interactive skill gap radar analysis, curated learning roadmaps, and an AI-powered career counselor.**

---

## 🌟 Key Highlights & Engineering Features

- **Full-Stack Production Architecture**: Built with Node.js, Express.js, MongoDB (Mongoose), React 19, and Vite.
- **Dual-Mode Resilient Database Layer**:
  - Automatically connects to **real MongoDB** with Mongoose schemas and seeds initial collections.
  - If a local MongoDB daemon is not running, the backend seamlessly switches to a **high-reliability In-Memory Database store** that mirrors all Mongoose CRUD operations with pre-seeded data, guaranteeing zero setup friction and zero startup crashes.
- **Transparent Career Recommendation Engine**:
  - 100% transparent scoring breakdown: **35% Skills Overlap**, **30% Assessment Dimensions**, **20% Activity Interests**, and **15% Work Style & Academic Fit**.
  - No psychological black-boxes or unverifiable claims.
- **12 Comprehensive Tech & Public Sector Career Tracks**:
  1. Software Developer
  2. Full-Stack Developer
  3. Data Analyst
  4. Data Scientist
  5. AI/ML Engineer
  6. Cybersecurity Analyst
  7. Cloud Engineer
  8. UI/UX Designer
  9. Product Manager
  10. Business Analyst
  11. Digital Marketing Specialist
  12. Government and Competitive Exam Preparation
- **Personalized Learning Roadmaps**:
  - Step-by-step sequential phases with durations, curated official resources (Harvard CS50, MDN Web Docs, Scikit-Learn docs, AWS Skill Builder), beginner projects, practical tasks, and interactive completion checkboxes that persist progress.
  - Ability to switch career tracks dynamically and regenerate roadmaps.
- **Skill Gap Radar & Bar Analyzer**:
  - Compares the student's saved competencies against target hiring benchmarks.
  - Generates interactive Recharts (Bar & Radar maps), categorizes acquired vs. missing skills, and suggests tailored 4-hour practice sprints.
- **AI Career Counselor ("CompassBot")**:
  - Secure backend proxy supporting **Google Gemini 1.5** or **OpenAI**.
  - When external API keys are not supplied, the platform automatically activates an **intelligent rule-based career counseling engine** that injects the student's profile context (education, degree, skills) and provides structured, actionable guidance with explicit disclaimers and suggested follow-ups.
- **Design System & Responsive UI**:
  - Crafted with pure modern CSS custom properties (variables) — **no Tailwind CSS**.
  - Deep navy (`#0B132B`), violet (`#4F46E5`, `#7C3AED`), cyan, crisp surface elevation, and a dark/light mode toggle.
  - Responsive across desktop, tablet, and mobile devices.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on v22.14.0)
- **npm**: v9.0.0 or higher
- **MongoDB**: Optional (If running locally at `mongodb://localhost:27017/careercompass`, the app will automatically connect and seed data; otherwise it falls back to the in-memory database store).

---

### 2. Installation & Setup

#### Step A: Clone or Navigate to the Project
```bash
cd C:\Users\bharg\.gemini\antigravity\scratch\careercompass-ai
```

#### Step B: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step C: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

### 3. Environment Variables Configuration

The project comes with working default configurations.

#### Backend (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careercompass
JWT_SECRET=careercompass_super_secret_jwt_key_2026_student_guidance
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Optional AI API Key (Google Gemini 1.5 Flash):
# If left blank, CareerCompass AI seamlessly activates its intelligent, rule-based counselor.
GEMINI_API_KEY=
```

#### Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 4. Running the Application

You can start both servers simultaneously in separate terminals:

#### Terminal 1 — Start the Backend Server:
```bash
cd C:\Users\bharg\.gemini\antigravity\scratch\careercompass-ai\backend
npm start
# Or for live hot-reloading: npm run dev
```
> Expected Output:
> `🧭 CareerCompass AI Backend API running on port 5000`  
> `🔗 Local URL: http://localhost:5000`

#### Terminal 2 — Start the Frontend Dev Server:
```bash
cd C:\Users\bharg\.gemini\antigravity\scratch\careercompass-ai\frontend
npm run dev
```
> Expected Output:
> `VITE v8.3.5 ready in 360 ms`  
> `➜ Local: http://localhost:5173/`

Open your browser and visit: **`http://localhost:5173`**

---

## 🧑‍🎓 Instant Demo Account Credentials

To quickly evaluate all student features without manually typing registration forms:

| Field | Credentials |
|---|---|
| **Email** | `demo@careercompass.ai` |
| **Password** | `demo1234` |
| **Quick Action** | Click the **"Auto-fill Preloaded Demo Student Account"** button inside the Sign In modal! |

This account is pre-populated with:
- B.Tech Computer Science profile (90% profile strength)
- Active Full-Stack Developer learning roadmap with completed milestones
- Pre-configured skills and interests

---

## 📡 API Documentation & Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/system/status` | Public | Live database and AI provider diagnostic health check |
| `POST` | `/api/auth/register` | Public | Register new student with bcrypt hashing & JWT token |
| `POST` | `/api/auth/login` | Public | Authenticate student and issue JWT token |
| `GET` | `/api/auth/me` | Protected | Retrieve authenticated student summary |
| `GET` | `/api/profile` | Protected | Fetch comprehensive student profile and completion % |
| `PUT` | `/api/profile` | Protected | Update profile fields, skills, and career goals |
| `POST` | `/api/assessment` | Protected | Submit multidimensional assessment & compute matches |
| `GET` | `/api/assessment/latest` | Protected | Retrieve student's latest assessment result |
| `GET` | `/api/careers` | Public | Search and filter 12 career tracks |
| `GET` | `/api/careers/:slug` | Public | Detailed career profile, skills, projects, and roadmap |
| `GET` | `/api/careers/recommendations` | Protected | Personalized recommendations based on profile & assessment |
| `GET` | `/api/roadmap` | Protected | Fetch current active learning roadmap |
| `POST` | `/api/roadmap/select` | Protected | Select or switch career roadmap |
| `PUT` | `/api/roadmap/task` | Protected | Toggle completion status of a roadmap task |
| `GET` | `/api/skill-gap/:careerSlug?` | Protected | Competency radar and skill gap comparison |
| `POST` | `/api/chat` | Protected | Converse with CompassBot with student context & rate limits |
| `GET` | `/api/chat/history` | Protected | Retrieve persistent conversation history |

---

## 📂 Project Structure

```
careercompass-ai/
├── README.md                      # Comprehensive documentation & setup guide
├── .gitignore                     # Git exclusions
├── .env.example                   # Root environment template
│
├── backend/                       # Node.js + Express.js REST API
│   ├── package.json
│   ├── server.js                  # Express entry point & middleware pipelines
│   ├── .env                       # Local environment variables
│   ├── .env.example
│   ├── config/
│   │   └── db.js                  # Resilient MongoDB/Mongoose connection manager & fallback
│   ├── models/
│   │   ├── User.js                # Student authentication schema
│   │   ├── StudentProfile.js      # Comprehensive student profile schema & completion logic
│   │   ├── CareerAssessment.js    # Multidimensional assessment schema
│   │   ├── Career.js              # Career catalogue schema
│   │   ├── LearningRoadmap.js     # Milestone roadmap schema with task progress methods
│   │   └── ChatConversation.js    # Chat history schema
│   ├── controllers/               # API route controllers
│   ├── routes/                    # Express route routers
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication guard
│   │   ├── rateLimitMiddleware.js # Rate limiting for auth and AI endpoints
│   │   └── errorMiddleware.js     # Centralized error handler
│   └── services/
│       ├── seedData.js            # Comprehensive seed data for 12 career tracks
│       ├── seedRunner.js          # Standalone seed script
│       ├── recommendationEngine.js# Transparent 4-factor scoring engine
│       ├── aiService.js           # External LLM & rule-based counseling engine
│       └── inMemoryStore.js       # High-reliability in-memory fallback store
│
└── frontend/                      # React 19 + Vite Single Page Application
    ├── package.json
    ├── vite.config.js             # Vite configuration with API proxy
    ├── index.html                 # Mount point & Google typography
    └── src/
        ├── main.jsx               # React entry point
        ├── App.jsx                # Application container & tab router
        ├── context/
        │   ├── AuthContext.jsx    # Session management & user state
        │   └── ThemeContext.jsx   # Dark / Light mode provider & persistence
        ├── services/
        │   └── api.js             # Unified API fetch client
        ├── styles/
        │   └── index.css          # Modern pure CSS design system (No Tailwind)
        ├── components/common/
        │   ├── Navbar.jsx         # Landing page header navigation
        │   ├── DashboardHeader.jsx# Dashboard header with live system badges
        │   ├── Sidebar.jsx        # Responsive collapsible dashboard sidebar
        │   └── Footer.jsx         # Footer with statutory disclaimers
        └── pages/
            ├── LandingPage.jsx        # Landing page with hero, features, categories, FAQ
            ├── AuthModal.jsx          # Login/Register modal with demo quick-fill
            ├── DashboardOverview.jsx  # Student dashboard with Recharts charts & metrics
            ├── AssessmentPage.jsx     # Multi-step interactive questionnaire
            ├── RecommendationsPage.jsx# Scored career pathways & why-match explanations
            ├── ExploreCareersPage.jsx # Searchable & filterable catalogue with deep-dive modal
            ├── RoadmapPage.jsx        # Interactive roadmap with task completion checkboxes
            ├── SkillGapPage.jsx       # Recharts Bar/Radar competency comparison
            ├── ChatbotPage.jsx        # CompassBot conversational assistant
            └── ProfilePage.jsx        # Full profile management form with tags
```

---

## ⚖️ Ethical AI & Statutory Disclaimers

1. **Advisory & Educational Scope**: CareerCompass AI recommendations, compatibility scores, and roadmap suggestions are intended strictly for educational, informational, and career exploration purposes.
2. **Transparent Scoring**: Compatibility percentages are calculated transparently using weighted heuristic comparisons between student self-reported inputs and industry competency benchmarks. They are not clinical psychological diagnoses.
3. **Salary Estimates**: All compensation figures are approximate historical industry averages that vary substantially based on economic climate, geographic cost of living, candidate proficiency, and employer structure. They do not constitute an offer or guarantee of compensation.
4. **No Job Guarantees**: CareerCompass AI does not guarantee employment, internship placements, or examination clearance.
