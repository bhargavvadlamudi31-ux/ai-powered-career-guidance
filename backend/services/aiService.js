// AI Career Counselor Service
// Handles external LLM calls (Gemini / OpenAI) with intelligent, rule-based fallback guidance engine

const https = require('https');

/**
 * Intelligent Rule-Based Counselor Fallback Engine
 * Provides rich, context-aware responses incorporating student profile data
 */
const generateRuleBasedCounselorResponse = (userMessage, studentProfile = {}, conversationHistory = []) => {
  const query = (userMessage || '').toLowerCase();
  const studentName = studentProfile.fullName ? studentProfile.fullName.split(' ')[0] : 'there';
  const education = studentProfile.educationLevel || 'your current academic stage';
  const skillsList = studentProfile.technicalSkills && studentProfile.technicalSkills.length > 0 
    ? studentProfile.technicalSkills.join(', ')
    : 'your current technical foundation';
  const goals = studentProfile.careerGoals || 'building a fulfilling tech career';

  let responseText = '';
  let suggestedFollowUps = [];

  // Match common student career questions
  if (query.includes('data scientist') || query.includes('data science')) {
    responseText = `Hello ${studentName}! Transitioning into Data Science from ${education} is an exciting and high-impact journey.\n\n` +
      `Here is a structured, step-by-step roadmap tailored for you:\n\n` +
      `1. **Solidify Math & Statistics**: Focus on descriptive/inferential stats, hypothesis testing (p-values, A/B testing), and linear algebra.\n` +
      `2. **Python Data Stack**: Master NumPy, Pandas for data wrangling, and Seaborn for exploratory data visualization.\n` +
      `3. **Core Machine Learning**: Build proficiency in Scikit-Learn algorithms (Random Forests, Gradient Boosting like XGBoost) and evaluation metrics (Precision, Recall, ROC-AUC).\n` +
      `4. **Hands-On Portfolio Projects**: Avoid generic datasets like Titanic. Build predictive models on real-world domains (e.g., healthcare diagnostics, loan default prediction, or e-commerce churn).\n` +
      `5. **SQL & Data Storytelling**: Over 70% of day-to-day data science work involves extracting data using SQL and presenting findings to stakeholders.\n\n` +
      `Considering your background in **${skillsList}**, you already have valuable problem-solving tools to accelerate this path!`;
    suggestedFollowUps = [
      'What beginner data science projects should I build?',
      'How does a Data Analyst role differ from Data Scientist?',
      'Which Python libraries should I learn first for ML?'
    ];
  } else if (query.includes('suitable') || query.includes('fit my skills') || query.includes('which career')) {
    responseText = `Great question, ${studentName}! Based on your profile:\n\n` +
      `• **Current Skills**: ${skillsList}\n` +
      `• **Education**: ${education}\n` +
      `• **Target Goals**: ${goals}\n\n` +
      `Here are the top career tracks that strongly align with your background:\n\n` +
      `1. **Full-Stack Developer**: If you enjoy seeing both client-facing interfaces and backend database architecture come together seamlessly.\n` +
      `2. **Software Developer / Backend Engineer**: Excellent fit if you love algorithmic problem-solving, clean code architecture, and high-performance services.\n` +
      `3. **Data Analyst / BI Specialist**: Ideal if you enjoy turning raw spreadsheets and database tables into strategic visual dashboards.\n\n` +
      `To get an exact percentage compatibility breakdown across all 12 disciplines, head over to the **AI Career Assessment** tab on your dashboard!`;
    suggestedFollowUps = [
      'What are the highest demand skills for Full-Stack developers?',
      'How do I prepare for technical interviews as a student?',
      'Can I switch between web development and data analytics?'
    ];
  } else if (query.includes('project') || query.includes('portfolio')) {
    responseText = `${studentName}, hiring managers evaluate projects for **proof of problem-solving**, not just tutorial following. Here are 3 stand-out project ideas:\n\n` +
      `1. **Full-Stack CRUD Application with Authentication & Role Control**: Build a campus resource sharing or peer-to-peer tutoring board with React, Node.js, and MongoDB.\n` +
      `2. **Interactive Data Dashboard with Real-Time API**: Fetch live public datasets (e.g., weather, stocks, or GitHub repos) and provide filtering, visual charts, and exportable reports.\n` +
      `3. **AI-Enhanced Microservice**: Implement a backend endpoint connecting to an LLM or OCR API to extract structured notes from student uploads.\n\n` +
      `**Key Portfolio Tip**: Always include a live demo link, clean GitHub README with architecture diagrams, and a 1-minute Loom video walkthrough!`;
    suggestedFollowUps = [
      'How should I structure my GitHub README?',
      'What makes a project stand out on a resume?',
      'How do I deploy my full-stack projects for free?'
    ];
  } else if (query.includes('internship') || query.includes('prepare for intern') || query.includes('interview')) {
    responseText = `Preparing for internships while managing coursework requires a disciplined 4-pillar strategy, ${studentName}:\n\n` +
      `1. **Resume Optimization**: Keep it to a clean single page. Quantify your bullet points with the XYZ formula (*Accomplished [X], as measured by [Y], by doing [Z]*).\n` +
      `2. **Coding Foundations (DSA)**: Practice 2-3 algorithmic problems 4 days a week on LeetCode focusing on Arrays, HashMaps, and Two Pointers.\n` +
      `3. **Flagship Projects**: Have 2 polished, deployed projects on GitHub with active links that you can comfortably talk through during technical rounds.\n` +
      `4. **Strategic Networking**: Don't just submit cold applications. Reach out to university alumni and engineering leads on LinkedIn with concise, polite messages asking about their team's tech stack.\n\n` +
      `Start applying 4 to 6 months before the target internship term!`;
    suggestedFollowUps = [
      'How do I reach out to recruiters on LinkedIn without sounding spammy?',
      'What behavioral questions are asked in student interviews?',
      'What should I do if my GPA is average?'
    ];
  } else if (query.includes('skill') || query.includes('learn next') || query.includes('what should i learn')) {
    responseText = `To build upon your current foundation in **${skillsList}**, here is what the industry is actively prioritizing right now:\n\n` +
      `1. **TypeScript**: Moving from plain JavaScript to TypeScript dramatically boosts your code quality and employability across modern engineering teams.\n` +
      `2. **Cloud & Container Basics**: Learn Docker fundamentals and deploy a containerized service to AWS, Render, or Railway.\n` +
      `3. **API Security & Testing**: Master JWT authentication, input sanitization, rate limiting, and write automated tests with Jest/Supertest.\n` +
      `4. **Git Collaboration**: Master feature branching, resolving merge conflicts, and conducting GitHub pull request reviews.\n\n` +
      `Check your **Skill Gap Analysis** tab to see a personalized side-by-side comparison for your chosen career!`;
    suggestedFollowUps = [
      'Why is TypeScript preferred over JavaScript?',
      'How do I learn Docker as a beginner?',
      'Which database should I learn first: SQL or NoSQL?'
    ];
  } else {
    responseText = `Hello ${studentName}! I am your **CareerCompass AI Assistant**.\n\n` +
      `I am here to help you navigate your academic-to-professional journey. You can ask me about:\n\n` +
      `• **Career Path Evaluation**: Clarifying day-to-day responsibilities in software engineering, data science, cybersecurity, cloud, and product management.\n` +
      `• **Skill Gap & Roadmap Advice**: Identifying the exact skills and milestones required for your target role.\n` +
      `• **Project Suggestions**: Brainstorming beginner-to-intermediate portfolio projects that impress tech recruiters.\n` +
      `• **Internship & Interview Guidance**: Resume formatting, behavioral preparation, and technical interview strategies.\n\n` +
      `What career track or technical question would you like to explore today?`;
    suggestedFollowUps = [
      'Which career is best suited for my profile?',
      'How do I prepare for software engineering internships?',
      'What beginner projects should I build for my portfolio?'
    ];
  }

  // Mandatory career guidance disclaimer
  const disclaimer = `\n\n*(Note: Running in Demo Intelligent Guidance Mode. CareerCompass recommendations are advisory and designed for career exploration; they do not guarantee employment or admission.)*`;

  return {
    content: responseText + disclaimer,
    isDemoFallback: true,
    provider: 'CareerCompass Rule-Based Counseling Engine',
    suggestedFollowUps
  };
};

/**
 * Call Gemini API if configured, otherwise fallback to Rule-Based Guidance
 */
const askCareerAssistant = async ({ message, profile, history }) => {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (geminiApiKey) {
    try {
      const studentContext = profile ? `
Student Profile Information:
- Full Name: ${profile.fullName || 'Student'}
- Education: ${profile.educationLevel || 'N/A'}, Degree: ${profile.degree || 'N/A'}, Year: ${profile.currentYear || 'N/A'}
- Technical Skills: ${(profile.technicalSkills || []).join(', ') || 'N/A'}
- Soft Skills: ${(profile.softSkills || []).join(', ') || 'N/A'}
- Interests: ${(profile.interests || []).join(', ') || 'N/A'}
- Career Goals: ${profile.careerGoals || 'N/A'}
- Preferred Work Environment: ${profile.preferredWorkEnvironment || 'N/A'}
` : 'No profile provided.';

      const systemPrompt = `You are CareerCompass AI, a friendly, encouraging, highly knowledgeable student career guidance advisor.
Your mission is to provide actionable, beginner-friendly, and realistic career counseling.
Guidelines:
1. Always give structured, practical advice tailored to the student's background.
2. Never guarantee a job, salary, or admission. Always be realistic.
3. Suggest 2-3 specific follow-up questions at the end under a "Suggested Questions:" section.
4. Keep tone professional, empathetic, and motivating.

${studentContext}`;

      const postData = JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nStudent Query: ${message}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      });

      const response = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'generativelanguage.googleapis.com',
          path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          },
          timeout: 8000
        };

        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error(`Gemini API error status: ${res.statusCode} - ${data}`));
            }
          });
        });

        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Gemini API request timed out'));
        });

        req.write(postData);
        req.end();
      });

      const replyText = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (replyText) {
        return {
          content: replyText,
          isDemoFallback: false,
          provider: 'Google Gemini 1.5 Flash',
          suggestedFollowUps: [
            'How can I tailor my resume for this?',
            'What projects would best showcase these skills?',
            'What is the typical learning timeline?'
          ]
        };
      }
    } catch (err) {
      console.warn('[AI Service] Gemini call failed or timed out:', err.message);
      console.warn('[AI Service] Falling back to intelligent rule-based guidance engine.');
    }
  }

  // Fallback to intelligent rule-based counselor
  return generateRuleBasedCounselorResponse(message, profile, history);
};

module.exports = {
  askCareerAssistant,
  generateRuleBasedCounselorResponse
};
