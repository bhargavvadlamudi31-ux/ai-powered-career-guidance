// Seed data for 12 primary career paths in CareerCompass AI
// Includes comprehensive descriptions, real-world beginner projects, curated official resources, and structured roadmaps

const SEED_CAREERS = [
  {
    slug: 'software-developer',
    title: 'Software Developer',
    category: 'Software Engineering',
    categoryKey: 'engineering',
    description: 'Designs, develops, tests, and maintains computer software, desktop applications, and backend systems to solve real-world problems with scalable code.',
    typicalRoles: ['Junior Software Engineer', 'Application Developer', 'Software Development Engineer I (SDE 1)', 'Backend Associate'],
    approxSalary: {
      entryLevel: '$70,000 - $95,000 / ₹6 - ₹12 LPA',
      experienced: '$120,000 - $160,000+ / ₹18 - ₹35+ LPA',
      disclaimer: 'Salary estimates are approximate industry averages and depend heavily on geography, company tier, interview performance, and individual skillset.'
    },
    requiredTechnicalSkills: ['Data Structures & Algorithms', 'Java or C++ or Python', 'Object-Oriented Programming (OOP)', 'Git & Version Control', 'SQL & Databases', 'Software Testing & Debugging'],
    requiredSoftSkills: ['Analytical Thinking', 'Problem Solving', 'Attention to Detail', 'Team Collaboration', 'Code Review & Communication'],
    educationSuitability: ['Undergraduate / Bachelor', 'Postgraduate / Master', 'Diploma'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Enterprise', 'Startup'],
    affinityTags: ['algorithms', 'backend', 'logic', 'problem-solving', 'systems', 'java', 'cpp', 'python'],
    beginnerProjects: [
      {
        title: 'Task & Habit Management CLI / App',
        description: 'Build a modular task management system with persistent SQLite/JSON storage, priority tags, search, and automated deadline reminders.',
        difficulty: 'Beginner',
        technologies: ['Python or Java', 'SQLite', 'OOP Principles', 'Git']
      },
      {
        title: 'Banking & Transaction Engine Simulation',
        description: 'Implement a multi-account banking simulator handling deposits, withdrawals, fund transfers, and ledger auditing with concurrency safety.',
        difficulty: 'Intermediate',
        technologies: ['C++ or Java', 'Unit Testing', 'File I/O', 'Data Structures']
      },
      {
        title: 'RESTful Inventory Management Service',
        description: 'Develop a backend service with CRUD endpoints, role-based authentication, pagination, and SQL relational schema.',
        difficulty: 'Intermediate',
        technologies: ['Node.js or Python FastAPI', 'PostgreSQL', 'Postman', 'Docker']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Programming Core & Computer Science Fundamentals',
        description: 'Master a typed or versatile language (Python, Java, or C++) alongside memory management, complexity, and basic algorithms.',
        duration: '4-6 Weeks',
        requiredSkills: ['Variables', 'Control Flow', 'Functions', 'OOP', 'Basic Complexity'],
        tasks: [
          'Choose your core language (Python, Java, or C++) and write 20 basic algorithmic solutions',
          'Learn Object-Oriented concepts: Encapsulation, Inheritance, Polymorphism, and Abstraction',
          'Practice Git command line: commit, branch, merge, pull requests on GitHub'
        ],
        resources: [
          { name: 'CS50: Introduction to Computer Science', url: 'https://cs50.harvard.edu/x/', type: 'Free Course' },
          { name: 'Python for Everybody - University of Michigan', url: 'https://www.py4e.com/', type: 'Interactive Course' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Data Structures and Algorithms (DSA)',
        description: 'Deep dive into fundamental data structures and algorithmic patterns essential for writing efficient software and passing technical interviews.',
        duration: '6-8 Weeks',
        requiredSkills: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Hash Maps', 'Trees & Graphs'],
        tasks: [
          'Implement Arrays, Linked Lists, Stacks, and Queues from scratch without libraries',
          'Learn Recursion, Sorting algorithms (Merge Sort, Quick Sort), and Binary Search',
          'Solve 50+ medium LeetCode/HackerRank problems across HashMaps, Two Pointers, and Trees'
        ],
        resources: [
          { name: 'NeetCode Roadmap & DSA Guide', url: 'https://neetcode.io/', type: 'Interactive Learning' },
          { name: 'GeeksforGeeks DSA Handbook', url: 'https://www.geeksforgeeks.org/data-structures/', type: 'Documentation' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Databases & Relational Schema Design',
        description: 'Understand how software persists, queries, and protects critical data using SQL and modern database engines.',
        duration: '3-4 Weeks',
        requiredSkills: ['SQL', 'Database Normalization', 'Indexing', 'Transactions'],
        tasks: [
          'Design an Entity-Relationship (ER) diagram for an e-commerce or school database',
          'Write complex SQL queries with JOINs, GROUP BY, subqueries, and window functions',
          'Connect your core language to SQLite or PostgreSQL using a clean database driver'
        ],
        resources: [
          { name: 'SQLBolt - Interactive SQL Lessons', url: 'https://sqlbolt.com/', type: 'Interactive Tutorial' },
          { name: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/', type: 'Official Docs' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Backend Systems & API Development',
        description: 'Build robust REST APIs, handle HTTP protocols, validation, authentication, and error handling.',
        duration: '4-5 Weeks',
        requiredSkills: ['RESTful Architecture', 'HTTP Methods & Status Codes', 'JWT Authentication', 'Middleware'],
        tasks: [
          'Build a complete REST API with at least 5 CRUD endpoints and input validation',
          'Implement secure user authentication with password hashing (bcrypt) and JWT',
          'Write automated unit and integration tests for critical endpoints'
        ],
        resources: [
          { name: 'MDN Web Docs - Express & Backend Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side', type: 'Documentation' },
          { name: 'RESTful API Design Best Practices', url: 'https://restfulapi.net/', type: 'Guide' }
        ]
      },
      {
        stepNumber: 5,
        title: 'Software Engineering Best Practices & Version Control',
        description: 'Adopt professional development workflows, continuous integration, Docker containerization, and clean code principles.',
        duration: '3-4 Weeks',
        requiredSkills: ['Git Flow', 'CI/CD Basics', 'Docker', 'Design Patterns'],
        tasks: [
          'Containerize your backend service using a Dockerfile and docker-compose',
          'Set up a GitHub Actions workflow to run automated tests on every pull request',
          'Refactor code adhering to SOLID principles and Clean Architecture'
        ],
        resources: [
          { name: 'Docker Getting Started Tutorial', url: 'https://docs.docker.com/get-started/', type: 'Official Docs' },
          { name: 'GitHub Skills - Automated Workflows', url: 'https://skills.github.com/', type: 'Interactive Workshop' }
        ]
      },
      {
        stepNumber: 6,
        title: 'Portfolio Projects & Technical Interview Preparation',
        description: 'Synthesize your skills into 2-3 production-grade portfolio projects and master system design basics and behavioral interviews.',
        duration: '4 Weeks',
        requiredSkills: ['Portfolio Building', 'System Design Basics', 'Resume Crafting', 'Mock Interviews'],
        tasks: [
          'Polish 2 flagship projects on GitHub with comprehensive READMEs and live demos',
          'Create a tailored software engineering resume highlighting impact, metrics, and tech stack',
          'Practice 10 mock coding and behavioral interview sessions (STAR method)'
        ],
        resources: [
          { name: 'Tech Interview Handbook by Yangshun Tay', url: 'https://www.techinterviewhandbook.org/', type: 'Comprehensive Guide' },
          { name: 'System Design Primer by Donne Martin', url: 'https://github.com/donnemartin/system-design-primer', type: 'GitHub Reference' }
        ]
      }
    ]
  },

  {
    slug: 'full-stack-developer',
    title: 'Full-Stack Developer',
    category: 'Software Engineering',
    categoryKey: 'engineering',
    description: 'Masters both client-side user interfaces and server-side logic, architecting end-to-end web applications from responsive frontends to database storage.',
    typicalRoles: ['Junior Full-Stack Developer', 'MERN / PERN Stack Engineer', 'Web Applications Developer', 'Frontend / Backend Associate'],
    approxSalary: {
      entryLevel: '$72,000 - $98,000 / ₹6.5 - ₹13 LPA',
      experienced: '$125,000 - $170,000+ / ₹20 - ₹38+ LPA',
      disclaimer: 'Salary estimates are approximate industry averages and depend on company size, technical proficiency across stacks, and location.'
    },
    requiredTechnicalSkills: ['HTML5 & Modern CSS', 'JavaScript (ES6+) & TypeScript', 'React.js', 'Node.js & Express', 'MongoDB & SQL', 'REST APIs & WebSockets'],
    requiredSoftSkills: ['End-to-End Ownership', 'Product Empathy', 'Rapid Prototyping', 'Cross-Functional Collaboration'],
    educationSuitability: ['High School', 'Undergraduate / Bachelor', 'Postgraduate / Master', 'Diploma'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Startup', 'Enterprise'],
    affinityTags: ['frontend', 'backend', 'react', 'javascript', 'web', 'mern', 'fullstack', 'css'],
    beginnerProjects: [
      {
        title: 'Collaborative Kanban Project Board',
        description: 'Trello clone with drag-and-drop lists, task tagging, user authentication, and real-time activity updates.',
        difficulty: 'Intermediate',
        technologies: ['React', 'Node.js', 'MongoDB', 'CSS Grid', 'JWT']
      },
      {
        title: 'Campus Marketplace & Peer Trading App',
        description: 'Full-stack platform where students can buy/sell textbooks and dorm essentials with image uploads, search filters, and chat.',
        difficulty: 'Intermediate',
        technologies: ['React', 'Express', 'Mongoose', 'Cloudinary', 'REST']
      },
      {
        title: 'Developer Blog & Portfolio CMS',
        description: 'Markdown-powered blogging platform with comments, likes, rich text editing, dark mode, and SEO metadata.',
        difficulty: 'Beginner-Intermediate',
        technologies: ['React', 'Vite', 'Express', 'MongoDB']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'HTML5, Modern CSS & Responsive Web Design',
        description: 'Build semantic, accessible, and responsive user interfaces with CSS Flexbox, Grid, and modern design tokens.',
        duration: '3-4 Weeks',
        requiredSkills: ['Semantic HTML', 'CSS Flexbox & Grid', 'Responsive Media Queries', 'CSS Variables'],
        tasks: [
          'Build a multi-page responsive landing page from scratch without CSS frameworks',
          'Implement mobile-first responsive navigation menus with clean hamburger toggles',
          'Learn accessibility (a11y) standards, aria labels, and color contrast principles'
        ],
        resources: [
          { name: 'freeCodeCamp Responsive Web Design Certification', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', type: 'Free Certification' },
          { name: 'MDN Learn Web Development', url: 'https://developer.mozilla.org/en-US/docs/Learn', type: 'Documentation' }
        ]
      },
      {
        stepNumber: 2,
        title: 'JavaScript Fundamentals & Asynchronous Programming',
        description: 'Master JavaScript ES6+, DOM manipulation, event loop, promises, and fetch API.',
        duration: '4-5 Weeks',
        requiredSkills: ['Variables & Scopes', 'Closures & Hoisting', 'ES6 Modules & Destructuring', 'Async/Await & Fetch'],
        tasks: [
          'Build an interactive weather dashboard fetching real-time data from a public REST API',
          'Understand JavaScript Event Loop, Callbacks, Microtasks, and Promise chaining',
          'Create an in-browser local storage interactive shopping cart with price calculations'
        ],
        resources: [
          { name: 'javascript.info - Modern JavaScript Tutorial', url: 'https://javascript.info/', type: 'Comprehensive Guide' },
          { name: 'Eloquent JavaScript Book', url: 'https://eloquentjavascript.net/', type: 'Free Book' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Modern Frontend Framework: React.js',
        description: 'Build dynamic single-page applications using React hooks, component lifecycles, and state management.',
        duration: '5-6 Weeks',
        requiredSkills: ['JSX', 'React Hooks (useState, useEffect, useContext)', 'Component Composition', 'React Router'],
        tasks: [
          'Create a single-page application with nested routing, dynamic URL params, and 404 handling',
          'Manage global state cleanly using React Context API or Zustand',
          'Implement debounced search filtering and loading/error states for async data'
        ],
        resources: [
          { name: 'Official React Documentation (react.dev)', url: 'https://react.dev/', type: 'Official Docs' },
          { name: 'Full Stack Open - University of Helsinki', url: 'https://fullstackopen.com/en/', type: 'Free University Course' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Node.js & Express.js Backend Architecture',
        description: 'Develop fast REST APIs, middleware pipelines, authentication, and secure request handling.',
        duration: '4-5 Weeks',
        requiredSkills: ['Node.js Runtime', 'Express Routing & Controllers', 'CORS & Security Headers', 'JWT Auth'],
        tasks: [
          'Build an Express.js server with clean MVC architecture (models, controllers, routes)',
          'Implement secure user registration, bcrypt password hashing, and JWT authorization',
          'Handle file uploads, data sanitization, and structured HTTP error responses'
        ],
        resources: [
          { name: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs/', type: 'Official Docs' },
          { name: 'Express.js Guide', url: 'https://expressjs.com/en/starter/installing.html', type: 'Official Docs' }
        ]
      },
      {
        stepNumber: 5,
        title: 'MongoDB & Database Architecture',
        description: 'Design flexible NoSQL schemas with Mongoose, indexing, validations, and aggregation pipelines.',
        duration: '3-4 Weeks',
        requiredSkills: ['MongoDB CRUD', 'Mongoose Schemas & Models', 'Population / Relationships', 'Data Indexing'],
        tasks: [
          'Design Mongoose models with strict type validations and custom schema methods',
          'Implement data relationships with ObjectId references and population',
          'Write aggregation pipelines for calculating dashboard stats and metric counters'
        ],
        resources: [
          { name: 'MongoDB University - Free Courses', url: 'https://learn.mongodb.com/', type: 'Free Course' },
          { name: 'Mongoose Documentation', url: 'https://mongoosejs.com/docs/', type: 'Official Docs' }
        ]
      },
      {
        stepNumber: 6,
        title: 'Full-Stack Integration, Deployment & Production Readiness',
        description: 'Connect frontend to backend, deploy to modern cloud platforms, set up CI/CD, and showcase your portfolio.',
        duration: '4 Weeks',
        requiredSkills: ['Production Deployment', 'Environment Variables Security', 'Vercel / Render / AWS', 'Portfolio Showcase'],
        tasks: [
          'Deploy frontend on Vercel/Netlify and backend on Render/Railway with MongoDB Atlas',
          'Configure environment variables securely without leaking secrets in git',
          'Build and present 3 distinct full-stack applications with recorded demo walkthroughs'
        ],
        resources: [
          { name: 'Roadmap.sh - Full Stack Developer Guide', url: 'https://roadmap.sh/full-stack', type: 'Roadmap' },
          { name: 'Vercel Deployment Documentation', url: 'https://vercel.com/docs', type: 'Guide' }
        ]
      }
    ]
  },

  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & AI',
    categoryKey: 'data',
    description: 'Inspects, cleans, transforms, and models raw business data to discover actionable insights, create visual dashboards, and guide executive decision-making.',
    typicalRoles: ['Junior Data Analyst', 'Business Intelligence Analyst', 'Reporting Specialist', 'Operations Analyst'],
    approxSalary: {
      entryLevel: '$62,000 - $82,000 / ₹5 - ₹10 LPA',
      experienced: '$105,000 - $140,000+ / ₹15 - ₹28+ LPA',
      disclaimer: 'Salary estimates are approximate and vary according to industry domain (FinTech, Healthcare, E-Commerce) and analytical tool mastery.'
    },
    requiredTechnicalSkills: ['Advanced Excel & Spreadsheets', 'SQL (PostgreSQL / MySQL)', 'Power BI or Tableau', 'Python (Pandas, NumPy)', 'Data Cleaning & ETL', 'Exploratory Data Analysis (EDA)'],
    requiredSoftSkills: ['Storytelling with Data', 'Critical Inquiry', 'Business Acumen', 'Executive Presentation', 'Curiosity'],
    educationSuitability: ['Undergraduate / Bachelor', 'Postgraduate / Master', 'Diploma'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Enterprise'],
    affinityTags: ['analytics', 'sql', 'excel', 'powerbi', 'tableau', 'pandas', 'business-intelligence', 'charts'],
    beginnerProjects: [
      {
        title: 'E-Commerce Sales Performance & Churn Dashboard',
        description: 'Analyze 50,000+ orders to visualize customer lifetime value, cohort retention, and regional revenue drivers in Power BI.',
        difficulty: 'Beginner',
        technologies: ['Power BI', 'SQL', 'Excel Data Modeling', 'DAX']
      },
      {
        title: 'Exploratory Analysis of Global Tech Layoffs / Hiring Trends',
        description: 'Clean raw messy data from Kaggle, identify trends across industries, and generate an insightful Jupyter notebook report.',
        difficulty: 'Intermediate',
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn']
      },
      {
        title: 'Hospital Patient Wait Time & Resource Optimization',
        description: 'SQL database queries and Tableau visual story showing emergency room bottlenecks and staffing recommendations.',
        difficulty: 'Intermediate',
        technologies: ['PostgreSQL', 'Tableau Public', 'Data Visualization']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Spreadsheets Mastery (Excel & Google Sheets)',
        description: 'Master advanced formulas, pivot tables, lookup functions, conditional formatting, and dashboard creation.',
        duration: '3 Weeks',
        requiredSkills: ['XLOOKUP / VLOOKUP', 'Pivot Tables & Charts', 'INDEX/MATCH', 'Data Validation'],
        tasks: [
          'Clean a dataset with missing values, duplicate entries, and inconsistent dates',
          'Create an automated financial or sales dashboard with dynamic slicers and charts',
          'Learn basic VBA / Google Apps Script automation for recurring tasks'
        ],
        resources: [
          { name: 'Excel Exposure - Free Online Training', url: 'https://excelexposure.com/', type: 'Tutorial' },
          { name: 'Chandoo.org - Excel & Power BI Tutorials', url: 'https://chandoo.org/', type: 'Guide' }
        ]
      },
      {
        stepNumber: 2,
        title: 'SQL for Data Analysis',
        description: 'Write complex SQL queries to extract, filter, aggregate, and transform large relational datasets.',
        duration: '4-5 Weeks',
        requiredSkills: ['SELECT, WHERE, GROUP BY', 'JOINs (INNER, LEFT, FULL)', 'Window Functions', 'Common Table Expressions (CTEs)'],
        tasks: [
          'Write multi-table JOINs to merge customer, transaction, and product tables',
          'Calculate running totals, month-over-month growth, and customer ranks using Window Functions',
          'Practice 40+ intermediate SQL challenges on Mode Analytics or LeetCode Database'
        ],
        resources: [
          { name: 'Mode Analytics SQL Tutorial for Data Analysis', url: 'https://mode.com/sql-tutorial/', type: 'Interactive Tutorial' },
          { name: 'Select Star SQL - Hands-on Interactive Book', url: 'https://selectstarsql.com/', type: 'Free Guide' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Business Intelligence & Data Visualization (Power BI / Tableau)',
        description: 'Transform queries into interactive, executive-ready dashboards with intuitive visual hierarchy.',
        duration: '4 Weeks',
        requiredSkills: ['Data Modeling (Star Schema)', 'DAX Basics', 'Dashboard Layout', 'Storytelling'],
        tasks: [
          'Build a Power BI or Tableau dashboard following UI/UX and data storytelling best practices',
          'Model relationships between fact and dimension tables adhering to Star Schema',
          'Publish your interactive dashboard to Tableau Public or Power BI Service to share on LinkedIn'
        ],
        resources: [
          { name: 'Microsoft Learn: Power BI Data Analyst Course', url: 'https://learn.microsoft.com/en-us/training/paths/data-analytics-microsoft/', type: 'Official Training' },
          { name: 'Tableau Free Training Videos', url: 'https://www.tableau.com/learn/training', type: 'Video Lessons' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Python for Data Analysis (Pandas & Seaborn)',
        description: 'Automate data wrangling, handle millions of rows, and perform statistical exploratory data analysis.',
        duration: '5 Weeks',
        requiredSkills: ['Python Syntax', 'NumPy Arrays', 'Pandas DataFrames', 'Matplotlib & Seaborn'],
        tasks: [
          'Load, clean, handle missing data, and reshape datasets using Pandas',
          'Generate distribution plots, correlation heatmaps, and box plots to detect outliers',
          'Publish a comprehensive Exploratory Data Analysis (EDA) notebook on Kaggle'
        ],
        resources: [
          { name: 'Kaggle Learn - Pandas & Data Visualization', url: 'https://www.kaggle.com/learn', type: 'Interactive Courses' },
          { name: 'Python for Data Analysis by Wes McKinney', url: 'https://wesmckinney.com/book/', type: 'Free Book' }
        ]
      },
      {
        stepNumber: 5,
        title: 'Portfolio Development & Business Case Studies',
        description: 'Package your projects with clear problem statements, methodologies, business ROI, and recommendations.',
        duration: '3 Weeks',
        requiredSkills: ['Case Study Writing', 'GitHub for Data Analysts', 'Presentation Skills'],
        tasks: [
          'Create 3 complete portfolio projects solving realistic business scenarios',
          'Write a Medium or LinkedIn article explaining your analysis and actionable conclusions',
          'Prepare for SQL live coding screens and business case study interviews'
        ],
        resources: [
          { name: 'Alex The Analyst - Data Analyst Portfolio Guide', url: 'https://www.youtube.com/@AlexTheAnalyst', type: 'Video Guide' },
          { name: 'Kaggle Datasets Repository', url: 'https://www.kaggle.com/datasets', type: 'Datasets' }
        ]
      }
    ]
  },

  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & AI',
    categoryKey: 'data',
    description: 'Applies statistical modeling, machine learning algorithms, and deep domain expertise to extract predictive patterns and automate complex organizational decisions.',
    typicalRoles: ['Junior Data Scientist', 'Applied Scientist Associate', 'Statistical Modeler', 'Machine Learning Analyst'],
    approxSalary: {
      entryLevel: '$88,000 - $118,000 / ₹8 - ₹16 LPA',
      experienced: '$140,000 - $195,000+ / ₹24 - ₹45+ LPA',
      disclaimer: 'Salary estimates are approximate and vary based on mathematical background, published research, algorithmic mastery, and industry.'
    },
    requiredTechnicalSkills: ['Probability & Statistics', 'Python / R', 'Scikit-Learn', 'Linear Algebra & Calculus', 'SQL & Feature Engineering', 'Model Evaluation & Tuning'],
    requiredSoftSkills: ['Hypothesis Testing', 'Rigorous Scientific Thinking', 'Effective Communication of Complexity', 'Curiosity'],
    educationSuitability: ['Undergraduate / Bachelor', 'Postgraduate / Master'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Enterprise'],
    affinityTags: ['statistics', 'machine-learning', 'math', 'python', 'scikit-learn', 'modeling', 'predictive'],
    beginnerProjects: [
      {
        title: 'Customer Loan Default Prediction Classifier',
        description: 'Build a supervised binary classification pipeline with ROC-AUC evaluation, feature engineering, and class imbalance handling using SMOTE.',
        difficulty: 'Intermediate',
        technologies: ['Python', 'Scikit-Learn', 'Pandas', 'XGBoost']
      },
      {
        title: 'Real Estate Price Valuation Regressor',
        description: 'Develop a multivariate regression model predicting house prices with cross-validation, regularization (Ridge/Lasso), and residual analysis.',
        difficulty: 'Beginner-Intermediate',
        technologies: ['Python', 'Scikit-Learn', 'NumPy', 'Statsmodels']
      },
      {
        title: 'Unsupervised Customer Segmentation for Retail Banking',
        description: 'Apply K-Means clustering and PCA dimensionality reduction to group cardholders by spending behaviors for targeted marketing.',
        difficulty: 'Intermediate',
        technologies: ['Python', 'K-Means', 'PCA', 'Seaborn']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Mathematical & Statistical Foundations',
        description: 'Master probability distributions, hypothesis testing (p-values, z-test, t-test), linear algebra, and multivariable calculus.',
        duration: '5 Weeks',
        requiredSkills: ['Descriptive & Inferential Stats', 'Probability Rules', 'Matrix Multiplication', 'Derivatives & Gradients'],
        tasks: [
          'Conduct A/B test hypothesis testing using Python scipy.stats',
          'Understand normal, binomial, and Poisson distributions and Central Limit Theorem',
          'Solve matrix transformations and eigenvalues/eigenvectors problems'
        ],
        resources: [
          { name: 'Khan Academy: Statistics and Probability', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'Course' },
          { name: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'Visual Guide' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Advanced Data Wrangling & Feature Engineering',
        description: 'Prepare raw datasets for machine learning with imputation, one-hot encoding, scaling, and feature selection.',
        duration: '4 Weeks',
        requiredSkills: ['Data Leakage Prevention', 'Standardization / Normalization', 'Feature Selection', 'Imbalanced Data Techniques'],
        tasks: [
          'Build reusable scikit-learn Pipelines with ColumnTransformer',
          'Handle extreme outliers and missing data with statistical and KNN imputation',
          'Engineer novel temporal and domain-specific interaction features'
        ],
        resources: [
          { name: 'Feature Engineering for Machine Learning (Book / Course)', url: 'https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/', type: 'Book' },
          { name: 'Scikit-Learn Preprocessing Guide', url: 'https://scikit-learn.org/stable/modules/preprocessing.html', type: 'Official Docs' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Classical Machine Learning Algorithms',
        description: 'Master supervised and unsupervised learning algorithms: Linear/Logistic Regression, Decision Trees, Random Forests, XGBoost, and K-Means.',
        duration: '6 Weeks',
        requiredSkills: ['Bias-Variance Tradeoff', 'Ensemble Methods', 'Cross-Validation', 'Hyperparameter Tuning (Optuna / GridSearchCV)'],
        tasks: [
          'Train, evaluate, and tune Random Forest and XGBoost classifiers on Kaggle datasets',
          'Evaluate models using Precision, Recall, F1-Score, ROC-AUC, and Confusion Matrices',
          'Interpret model predictions using SHAP (Shapley Additive Explanations) and feature importances'
        ],
        resources: [
          { name: 'StatQuest with Josh Starmer - Machine Learning Playlist', url: 'https://statquest.org/', type: 'Video Lessons' },
          { name: 'Machine Learning Specialization by Andrew Ng (Coursera/DeepLearning.AI)', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'Certification' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Model Deployment & MLOps Fundamentals',
        description: 'Serve machine learning models as REST endpoints with FastAPI, Docker, and basic tracking.',
        duration: '4 Weeks',
        requiredSkills: ['FastAPI / Flask', 'Model Serialization (Joblib / ONNX)', 'Docker', 'MLflow Basics'],
        tasks: [
          'Serialize a trained model and build a FastAPI inference prediction endpoint',
          'Containerize your ML API inside a lightweight Docker container',
          'Track experiments and model parameters using MLflow or Weights & Biases'
        ],
        resources: [
          { name: 'Made With ML by Goku Mohandas', url: 'https://madewithml.com/', type: 'Comprehensive Course' },
          { name: 'FastAPI Official Documentation', url: 'https://fastapi.tiangolo.com/', type: 'Official Docs' }
        ]
      }
    ]
  },

  {
    slug: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    category: 'Data & AI',
    categoryKey: 'data',
    description: 'Designs, fine-tunes, optimizes, and productionizes deep neural networks, computer vision, natural language processing, and Generative AI LLM applications.',
    typicalRoles: ['Junior Machine Learning Engineer', 'AI Research Associate', 'LLM Application Developer', 'Computer Vision Engineer'],
    approxSalary: {
      entryLevel: '$95,000 - $130,000 / ₹10 - ₹20 LPA',
      experienced: '$150,000 - $220,000+ / ₹30 - ₹60+ LPA',
      disclaimer: 'Salary estimates are approximate and vary based on deep learning framework expertise, GPU infrastructure mastery, and GenAI experience.'
    },
    requiredTechnicalSkills: ['PyTorch or TensorFlow', 'Deep Learning & Neural Networks', 'Transformers & LLMs', 'Hugging Face Ecosystem', 'Vector Databases & RAG', 'Python & CUDA Basics'],
    requiredSoftSkills: ['Experimental Mindset', 'Algorithmic Intuition', 'Rapid Technological Adaptation', 'Ethical AI Responsibility'],
    educationSuitability: ['Undergraduate / Bachelor', 'Postgraduate / Master'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Startup', 'Enterprise'],
    affinityTags: ['deep-learning', 'pytorch', 'ai', 'transformers', 'llm', 'nlp', 'computer-vision', 'rag'],
    beginnerProjects: [
      {
        title: 'Document Q&A with Retrieval-Augmented Generation (RAG)',
        description: 'Build a private PDF knowledge assistant with vector embeddings, ChromaDB / Pinecone, and an open LLM.',
        difficulty: 'Intermediate',
        technologies: ['LangChain / LlamaIndex', 'ChromaDB', 'Python', 'FastAPI']
      },
      {
        title: 'Deep Learning Image Classifier with Transfer Learning',
        description: 'Fine-tune a pretrained ResNet or EfficientNet model on medical scans or agricultural plant disease datasets in PyTorch.',
        difficulty: 'Intermediate',
        technologies: ['PyTorch', 'Torchvision', 'Transfer Learning', 'CUDA']
      },
      {
        title: 'Sentiment & Aspect-Based Opinion Mining with BERT',
        description: 'Fine-tune Hugging Face transformer models to classify multi-class customer reviews with confidence calibrations.',
        difficulty: 'Intermediate',
        technologies: ['Hugging Face Transformers', 'PyTorch', 'Datasets']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Neural Networks & Deep Learning Foundations',
        description: 'Understand perceptrons, backpropagation, activation functions, loss surfaces, and gradient descent optimization.',
        duration: '5 Weeks',
        requiredSkills: ['Forward & Backward Propagation', 'SGD & Adam Optimizers', 'Overfitting & Dropout', 'Batch Normalization'],
        tasks: [
          'Code a multi-layer perceptron from scratch in pure NumPy to solidify backpropagation math',
          'Implement training loops, loss calculation, and metric tracking in PyTorch',
          'Train a CNN on CIFAR-10 achieving over 85% validation accuracy'
        ],
        resources: [
          { name: 'DeepLearning.AI Deep Learning Specialization', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', type: 'Certification' },
          { name: 'Fast.ai: Practical Deep Learning for Coders', url: 'https://course.fast.ai/', type: 'Free Practical Course' }
        ]
      },
      {
        stepNumber: 2,
        title: 'PyTorch Ecosystem & Computer Vision / NLP',
        description: 'Deep dive into PyTorch tensors, datasets, dataloaders, Convolutional Neural Networks, and Recurrent architectures.',
        duration: '5 Weeks',
        requiredSkills: ['PyTorch Module API', 'Custom Datasets & Transforms', 'CNN Architectures (ResNet, ConvNeXt)', 'Embeddings'],
        tasks: [
          'Leverage transfer learning with pretrained weights to train a custom computer vision classifier',
          'Build an image segmentation or object detection pipeline with YOLO or Torchvision',
          'Profile GPU memory usage and optimize batch sizes using torch.cuda'
        ],
        resources: [
          { name: 'Official PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', type: 'Official Docs' },
          { name: 'Stanford CS231n: Deep Learning for Computer Vision', url: 'http://cs231n.stanford.edu/', type: 'Lecture Notes' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Transformers, Large Language Models (LLMs) & GenAI',
        description: 'Understand the Transformer architecture (Self-Attention, Multi-Head Attention), Hugging Face, and prompt engineering.',
        duration: '6 Weeks',
        requiredSkills: ['Attention Mechanism', 'Hugging Face Transformers', 'LoRA / PEFT Fine-Tuning', 'Vector Databases & RAG'],
        tasks: [
          'Fine-tune an open-source LLM (such as Llama or Mistral) using LoRA / QLoRA on a domain dataset',
          'Build an end-to-end RAG application with document chunking, embeddings, and vector similarity search',
          'Evaluate LLM hallucination and quality using RAGAS or LangSmith benchmarks'
        ],
        resources: [
          { name: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', type: 'Free Course' },
          { name: 'Jay Alammar - The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'Illustrated Guide' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Production AI Inference & Optimization',
        description: 'Deploy deep learning models with low latency, quantization (GGML/GGUF/AWQ), TensorRT, and scalable API gateways.',
        duration: '4 Weeks',
        requiredSkills: ['Model Quantization', 'vLLM / Ollama / Triton', 'FastAPI Deployment', 'Docker'],
        tasks: [
          'Benchmark model throughput and latency using vLLM or ONNX Runtime',
          'Quantize a 7B parameter model to 4-bit precision for local GPU execution',
          'Package the inference service in Docker with Prometheus monitoring'
        ],
        resources: [
          { name: 'vLLM Documentation', url: 'https://docs.vllm.ai/', type: 'Official Docs' },
          { name: 'Full Stack LLM Bootcamp', url: 'https://fullstackdeeplearning.com/', type: 'Free Course' }
        ]
      }
    ]
  },

  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Cloud & Security',
    categoryKey: 'security',
    description: 'Protects computer systems, digital assets, and networks from malicious intrusions, vulnerabilities, cyberattacks, and data breaches.',
    typicalRoles: ['Junior SOC Analyst', 'Vulnerability Assessment Associate', 'Information Security Specialist', 'Junior Penetration Tester'],
    approxSalary: {
      entryLevel: '$68,000 - $92,000 / ₹6 - ₹12 LPA',
      experienced: '$115,000 - $165,000+ / ₹18 - ₹35+ LPA',
      disclaimer: 'Salary estimates are approximate and depend heavily on security clearances, industry certifications (CompTIA Security+, CEH, OSCP), and domain.'
    },
    requiredTechnicalSkills: ['Computer Networking (TCP/IP, DNS, OSI)', 'Linux System Administration', 'Wireshark & Packet Analysis', 'Security Information & Event Management (SIEM)', 'Vulnerability Scanning (Nmap, Nessus)', 'Web Security (OWASP Top 10)'],
    requiredSoftSkills: ['Calmness Under Pressure', 'Investigative Curiosity', 'Discretion & Integrity', 'Attention to Anomaly'],
    educationSuitability: ['High School', 'Undergraduate / Bachelor', 'Diploma', 'Postgraduate / Master'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Enterprise'],
    affinityTags: ['security', 'networking', 'linux', 'ethical-hacking', 'siem', 'soc', 'defense', 'cyber'],
    beginnerProjects: [
      {
        title: 'Home SOC & SIEM Lab with Splunk / Elastic',
        description: 'Set up an isolated virtual network, simulate brute-force attacks, and configure alert rules in an Elastic or Splunk SIEM dashboard.',
        difficulty: 'Intermediate',
        technologies: ['VirtualBox', 'Ubuntu / Kali Linux', 'Splunk or Elastic', 'Sysmon']
      },
      {
        title: 'OWASP Top 10 Vulnerability Lab & Remediation Report',
        description: 'Audit a intentionally vulnerable web app (Juice Shop / DVWA), exploit SQL Injection & XSS, and write professional remediation patches.',
        difficulty: 'Beginner-Intermediate',
        technologies: ['OWASP Juice Shop', 'Burp Suite', 'HTML/JS', 'SQL']
      },
      {
        title: 'Automated Network Port & Vulnerability Scanner in Python',
        description: 'Create a custom multi-threaded Python scanner with banner grabbing and basic CVE lookup automation.',
        difficulty: 'Beginner',
        technologies: ['Python', 'Sockets', 'Nmap Scripting', 'CVE API']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Networking & Operating Systems Foundations',
        description: 'Master the OSI model, TCP/IP stack, routing, DNS, Linux shell navigation, and Windows Active Directory basics.',
        duration: '4-5 Weeks',
        requiredSkills: ['TCP/IP Handshake', 'Subnetting & CIDR', 'Linux Command Line', 'Bash Scripting'],
        tasks: [
          'Install Linux (Ubuntu or Kali) in a virtual machine and master terminal administration',
          'Capture and inspect HTTP, DNS, and TCP packets using Wireshark',
          'Calculate IPv4 subnets and configure local firewall (UFW / iptables) rules'
        ],
        resources: [
          { name: 'Professor Messer: CompTIA Security+ & Network+ Free Course', url: 'https://www.professormesser.com/', type: 'Free Video Course' },
          { name: 'OverTheWire: Bandit Wargame (Linux shell learning)', url: 'https://overthewire.org/wargames/bandit/', type: 'Interactive CTF' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Security Core & Threat Intelligence',
        description: 'Learn authentication mechanisms, cryptography (symmetric/asymmetric, hashing), defense-in-depth, and attack vectors.',
        duration: '4 Weeks',
        requiredSkills: ['Public Key Infrastructure (PKI)', 'TLS/SSL', 'Malware Types', 'MITRE ATT&CK Framework'],
        tasks: [
          'Map real-world cyber incidents to the MITRE ATT&CK enterprise matrix',
          'Generate and verify cryptographic checksums and configure an SSH keypair',
          'Complete introductory rooms on TryHackMe (Pre-Security and Complete Beginner paths)'
        ],
        resources: [
          { name: 'TryHackMe - Hands-on Cybersecurity Learning', url: 'https://tryhackme.com/', type: 'Interactive Platform' },
          { name: 'MITRE ATT&CK Matrix for Enterprise', url: 'https://attack.mitre.org/', type: 'Official Reference' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Security Operations (SOC) & SIEM Monitoring',
        description: 'Monitor live network traffic, analyze security logs, configure alerts, and conduct incident triage.',
        duration: '5 Weeks',
        requiredSkills: ['SIEM (Splunk / Microsoft Sentinel)', 'Log Analysis (Windows Event Viewer, Syslog)', 'Incident Response Lifecycle'],
        tasks: [
          'Deploy Splunk or Wazuh and ingest Windows and Linux authentication logs',
          'Write SIEM detection queries to identify multiple failed logins followed by success',
          'Formulate an incident response playbook for ransomware containment'
        ],
        resources: [
          { name: 'Splunk Free Training & Fundamentals', url: 'https://www.splunk.com/en_us/training.html', type: 'Free Certification' },
          { name: 'LetsDefend - Blue Team Training Platform', url: 'https://letsdefend.io/', type: 'SOC Simulator' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Web Application Security & Ethical Hacking Basics',
        description: 'Understand OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF, Broken Auth) and remediation.',
        duration: '4-5 Weeks',
        requiredSkills: ['Burp Suite Community', 'OWASP Top 10', 'HTTP Request Tampering', 'Patch Verification'],
        tasks: [
          'Intercept and modify web requests using Burp Suite proxy',
          'Complete PortSwigger Web Security Academy free modules for SQLi and XSS',
          'Document findings in a standardized security audit report format'
        ],
        resources: [
          { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'Hands-on Labs' },
          { name: 'OWASP Foundation Top 10 Web Security Risks', url: 'https://owasp.org/www-project-top-ten/', type: 'Official Docs' }
        ]
      }
    ]
  },

  {
    slug: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud & Security',
    categoryKey: 'infrastructure',
    description: 'Architects, provisions, automates, and optimizes scalable, fault-tolerant infrastructure and cloud services on AWS, Azure, or Google Cloud.',
    typicalRoles: ['Junior Cloud Engineer', 'DevOps Associate', 'Cloud Operations Specialist', 'Site Reliability Engineer I (SRE)'],
    approxSalary: {
      entryLevel: '$75,000 - $102,000 / ₹7 - ₹14 LPA',
      experienced: '$130,000 - $180,000+ / ₹22 - ₹42+ LPA',
      disclaimer: 'Salary estimates are approximate and depend heavily on certified cloud competencies (AWS Certified Solutions Architect, Azure Administrator) and IaC skills.'
    },
    requiredTechnicalSkills: ['AWS or Azure or GCP', 'Linux Administration', 'Infrastructure as Code (Terraform)', 'Docker & Containers', 'CI/CD Pipelines (GitHub Actions)', 'Networking (VPC, Subnets, DNS, Load Balancers)'],
    requiredSoftSkills: ['System Reliability Focus', 'Automation Mindset', 'Proactive Monitoring', 'Root Cause Analysis'],
    educationSuitability: ['Undergraduate / Bachelor', 'Diploma', 'Postgraduate / Master'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Enterprise'],
    affinityTags: ['cloud', 'aws', 'azure', 'terraform', 'devops', 'docker', 'infrastructure', 'linux'],
    beginnerProjects: [
      {
        title: 'Multi-Tier Cloud Application on AWS with Terraform',
        description: 'Provision a custom VPC, public/private subnets, EC2 instances behind an Application Load Balancer, and RDS database via Terraform code.',
        difficulty: 'Intermediate',
        technologies: ['Terraform', 'AWS (VPC, EC2, ALB, RDS)', 'Git']
      },
      {
        title: 'Automated CI/CD Deployment Pipeline for Containerized App',
        description: 'Set up GitHub Actions to build a Docker container, push to container registry, and deploy automatically to cloud runner on git push.',
        difficulty: 'Intermediate',
        technologies: ['GitHub Actions', 'Docker', 'AWS ECS or App Runner', 'YAML']
      },
      {
        title: 'Serverless Event-Driven Image Thumbnail Generator',
        description: 'Trigger an AWS Lambda function on S3 image upload to resize images and store metadata in DynamoDB.',
        difficulty: 'Beginner-Intermediate',
        technologies: ['AWS Lambda', 'Amazon S3', 'DynamoDB', 'Python']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Linux Systems & Shell Automation',
        description: 'Master core Linux system administration, permissions, systemd service management, SSH keys, and shell scripting.',
        duration: '3-4 Weeks',
        requiredSkills: ['Linux CLI', 'Bash Scripting', 'Cron Jobs', 'Process & Memory Monitoring'],
        tasks: [
          'Set up and harden a remote Linux server via SSH with key-only authentication',
          'Write a Bash script to automate system backups and monitor disk usage',
          'Configure a custom systemd service that auto-restarts on failure'
        ],
        resources: [
          { name: 'Linux Journey - Free Beginner to Advanced Tutorials', url: 'https://linuxjourney.com/', type: 'Tutorial' },
          { name: 'ExplainShell - Interactive command explanations', url: 'https://explainshell.com/', type: 'Tool' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Cloud Provider Fundamentals (AWS / Azure)',
        description: 'Learn core cloud computing primitives: Compute (EC2/VMs), Storage (S3/Blob), Identity & Access Management (IAM), and Networking (VPC).',
        duration: '5 Weeks',
        requiredSkills: ['IAM Roles & Policies', 'Virtual Private Cloud (VPC)', 'EC2 & Auto Scaling', 'Cloud Storage & CDN'],
        tasks: [
          'Design and configure a secure VPC with public/private subnets and NAT Gateway',
          'Configure IAM users, groups, and least-privilege role policies',
          'Deploy a web application on an EC2 instance behind an Application Load Balancer'
        ],
        resources: [
          { name: 'AWS Skill Builder - Free Official Courses', url: 'https://explore.skillbuilder.aws/', type: 'Official Training' },
          { name: 'FreeCodeCamp AWS Cloud Practitioner Exam Prep', url: 'https://www.freecodecamp.org/news/aws-certified-cloud-practitioner-study-course/', type: 'Video Course' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Containers & Docker',
        description: 'Package applications with all dependencies into lightweight, portable, consistent Docker containers.',
        duration: '3-4 Weeks',
        requiredSkills: ['Dockerfile Multi-Stage Builds', 'Docker Compose', 'Container Networking', 'Image Registries'],
        tasks: [
          'Write an optimized multi-stage Dockerfile for a full-stack web application',
          'Orchestrate a multi-container local stack (app + database + cache) with Docker Compose',
          'Push versioned container images to Docker Hub or AWS ECR'
        ],
        resources: [
          { name: 'Docker Getting Started Guide', url: 'https://docs.docker.com/get-started/', type: 'Official Docs' },
          { name: 'Play with Docker - In-Browser Sandbox', url: 'https://labs.play-with-docker.com/', type: 'Interactive Sandbox' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Infrastructure as Code (IaC) with Terraform',
        description: 'Codify, version, and automate cloud infrastructure using declarative HashiCorp Configuration Language (HCL).',
        duration: '4-5 Weeks',
        requiredSkills: ['Terraform State', 'Variables & Outputs', 'Modules', 'Terraform Plan / Apply Lifecycle'],
        tasks: [
          'Manage cloud infrastructure purely through Terraform code without manual console clicks',
          'Store Terraform remote state securely in S3 with DynamoDB state locking',
          'Create reusable Terraform modules for networking and compute'
        ],
        resources: [
          { name: 'HashiCorp Learn: Terraform Tutorials', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'Official Tutorials' },
          { name: 'Terraform Best Practices Guide', url: 'https://www.terraform-best-practices.com/', type: 'Guide' }
        ]
      }
    ]
  },

  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design & Product',
    categoryKey: 'design',
    description: 'Researches user needs, crafts wireframes, designs polished visual interfaces, and prototypes seamless digital experiences in Figma.',
    typicalRoles: ['Junior Product Designer', 'UI/UX Designer', 'Interaction Designer', 'User Researcher Associate'],
    approxSalary: {
      entryLevel: '$64,000 - $88,000 / ₹5.5 - ₹11 LPA',
      experienced: '$110,000 - $155,000+ / ₹18 - ₹32+ LPA',
      disclaimer: 'Salary estimates are approximate and depend heavily on portfolio design craft, design system experience, and user research acumen.'
    },
    requiredTechnicalSkills: ['Figma & Prototyping', 'Design Systems & Tokens', 'Wireframing & Information Architecture', 'User Research & Usability Testing', 'Typography, Color & Layout', 'HTML/CSS Basics (Mental Model)'],
    requiredSoftSkills: ['Deep Empathy', 'Visual Communication', 'Active Listening', 'Receptiveness to Feedback'],
    educationSuitability: ['High School', 'Undergraduate / Bachelor', 'Diploma', 'Postgraduate / Master'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Startup', 'Enterprise'],
    affinityTags: ['design', 'ui', 'ux', 'figma', 'prototyping', 'wireframing', 'user-experience', 'visual'],
    beginnerProjects: [
      {
        title: 'Mobile Banking App Redesign for Gen Z Students',
        description: 'Conduct user interviews with 5 students, create journey maps, redesign information architecture, and build a clickable interactive Figma prototype.',
        difficulty: 'Beginner-Intermediate',
        technologies: ['Figma', 'User Research', 'Wireframing', 'Interactive Components']
      },
      {
        title: 'Comprehensive SaaS Design System & Component Library',
        description: 'Design a reusable component library in Figma with auto-layout, variants, typography scales, color tokens, and accessible WCAG contrast.',
        difficulty: 'Intermediate',
        technologies: ['Figma Auto Layout', 'Design Tokens', 'Accessibility Standards']
      },
      {
        title: 'Telemedicine Consultation Web & Mobile Experience',
        description: 'End-to-end design case study for booking doctor appointments, uploading medical records, and attending virtual calls.',
        difficulty: 'Intermediate',
        technologies: ['UX Journey Mapping', 'Figma', 'Usability Testing']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'UX Fundamentals & User-Centered Design Process',
        description: 'Learn the 5 stages of design thinking: Empathize, Define, Ideate, Prototype, and Test.',
        duration: '3-4 Weeks',
        requiredSkills: ['User Personas', 'Journey Mapping', 'Information Architecture', 'Affinity Diagrams'],
        tasks: [
          'Conduct 3 semi-structured user interviews to uncover friction points in an everyday app',
          'Build user personas, empathy maps, and problem statements (How Might We)',
          'Create card sorting exercises to structure intuitive application navigation'
        ],
        resources: [
          { name: 'Nielsen Norman Group - UX Articles & Videos', url: 'https://www.nngroup.com/articles/', type: 'Industry Benchmark' },
          { name: 'Interaction Design Foundation (IxDF) Free Literature', url: 'https://www.interaction-design.org/literature', type: 'Design Library' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Figma Mastery & UI Visual Design Principles',
        description: 'Master Figma tools, Auto Layout, constraints, components, styles, typography, and visual grids.',
        duration: '5 Weeks',
        requiredSkills: ['Figma Auto Layout 5.0', 'Typography Hierarchy', 'Color Theory & Contrast', 'Component Variants'],
        tasks: [
          'Replicate 3 top-tier mobile application screens to build pixel-perfect muscle memory',
          'Create a 10-component Figma library using Auto-layout, boolean props, and variants',
          'Validate color contrast against WCAG AA/AAA accessibility guidelines'
        ],
        resources: [
          { name: 'Figma YouTube Official Tutorials', url: 'https://www.youtube.com/c/Figmadesign', type: 'Official Video Lessons' },
          { name: 'Refactoring UI by Adam Wathan & Steve Schoger', url: 'https://www.refactoringui.com/', type: 'Design Book' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Interactive Prototyping & Micro-Interactions',
        description: 'Connect screens with smart animations, overlays, interactive states, and realistic micro-interactions.',
        duration: '3-4 Weeks',
        requiredSkills: ['Smart Animate', 'Component States (Hover, Active, Error)', 'Variables & Conditionals in Figma'],
        tasks: [
          'Build an interactive prototype with realistic tabs, dropdowns, and form validation states',
          'Use Figma variables to create a prototype with working quantity counters and toggle states',
          'Record interactive prototype flows with video demonstrations'
        ],
        resources: [
          { name: 'Figma Community Files & Plugins', url: 'https://www.figma.com/community', type: 'Resources' },
          { name: 'Laws of UX by Jon Yablonski', url: 'https://lawsofux.com/', type: 'Visual Guide' }
        ]
      },
      {
        stepNumber: 4,
        title: 'UX Case Studies & Portfolio Craft',
        description: 'Package your designs into comprehensive storytelling case studies that impress design recruiters and product leads.',
        duration: '4 Weeks',
        requiredSkills: ['Case Study Storytelling', 'Portfolio Platform (Framer / Notion / Webflow)', 'Design Presentation'],
        tasks: [
          'Write 2 deep case studies detailing the problem, research, wireframes, iterations, and final UI',
          'Publish your portfolio online using Framer, Webflow, or a custom site',
          'Conduct usability testing on your prototypes and document changes made based on user feedback'
        ],
        resources: [
          { name: 'Cofolios - Design Intern Portfolios', url: 'https://cofolios.com/', type: 'Inspiration' },
          { name: 'Bestfolios - Curated UI/UX Portfolios', url: 'https://www.bestfolios.com/', type: 'Inspiration' }
        ]
      }
    ]
  },

  {
    slug: 'product-manager',
    title: 'Product Manager',
    category: 'Design & Product',
    categoryKey: 'product',
    description: 'Leads cross-functional engineering, design, and business teams to define product vision, prioritize roadmap features, and ship high-impact digital products.',
    typicalRoles: ['Associate Product Manager (APM)', 'Junior Product Owner', 'Product Analyst', 'Technical PM Intern'],
    approxSalary: {
      entryLevel: '$80,000 - $110,000 / ₹8 - ₹16 LPA',
      experienced: '$140,000 - $210,000+ / ₹25 - ₹50+ LPA',
      disclaimer: 'Salary estimates are approximate and vary based on product scope, company growth stage, and technical background.'
    },
    requiredTechnicalSkills: ['Product Requirements Documents (PRDs)', 'Feature Prioritization Frameworks (RICE, MoSCoW)', 'Product Analytics (Mixpanel, Amplitude)', 'Agile / Scrum Methodologies', 'User Interviewing', 'A/B Testing & Metrics'],
    requiredSoftSkills: ['Strategic Vision', 'Cross-Team Influencing Without Authority', 'Decisiveness', 'Exceptional Clarity in Writing'],
    educationSuitability: ['Undergraduate / Bachelor', 'Postgraduate / Master'],
    workStyleSuitability: ['Hybrid', 'Remote', 'Office', 'Startup', 'Enterprise'],
    affinityTags: ['product', 'management', 'strategy', 'roadmap', 'agile', 'scrum', 'business', 'leadership'],
    beginnerProjects: [
      {
        title: 'Comprehensive Product Requirements Document (PRD) for New Feature',
        description: 'Draft a complete PRD proposing an "AI Study Group Matcher" for a campus app, with user stories, success metrics (North Star), and release milestones.',
        difficulty: 'Beginner-Intermediate',
        technologies: ['Notion', 'PRD Templates', 'Metrics Definition', 'User Stories']
      },
      {
        title: 'Product Teardown & Competitive Growth Audit',
        description: 'Conduct a thorough teardown of a popular app (e.g., Duolingo or Spotify), evaluating onboarding friction, retention mechanics, and viral loops.',
        difficulty: 'Beginner',
        technologies: ['Product Teardown Methodology', 'Funnel Analysis', 'Figma']
      },
      {
        title: 'A/B Test Experimentation Plan & Feature Prioritization Matrix',
        description: 'Create an experimentation hypothesis, sample size calculations, and RICE prioritization scoring for 10 competing backlog initiatives.',
        difficulty: 'Intermediate',
        technologies: ['RICE Scoring', 'A/B Testing Frameworks', 'Google Sheets']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Product Fundamentals & The Role of a PM',
        description: 'Understand the intersection of technology, UX, and business, and how PMs lead without direct managerial authority.',
        duration: '3 Weeks',
        requiredSkills: ['Problem Discovery vs Solution', 'North Star Metric', 'Product Lifecycle', 'Competitive Analysis'],
        tasks: [
          'Read Inspired by Marty Cagan and summarize key product discovery principles',
          'Perform a structured competitive audit comparing 3 competing software products',
          'Define the North Star Metric and supporting input metrics for an e-commerce platform'
        ],
        resources: [
          { name: 'Product School Free Resources & Webinars', url: 'https://productschool.com/resources', type: 'Guides' },
          { name: 'Lenny Rachitsky Newsletter & Podcast', url: 'https://www.lennysnewsletter.com/', type: 'Industry Articles' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Writing Stellar PRDs & User Stories',
        description: 'Master writing crystal-clear Product Requirements Documents, acceptance criteria, and edge-case definitions.',
        duration: '4 Weeks',
        requiredSkills: ['PRD Structure', 'User Story Writing', 'Acceptance Criteria', 'Wireframe Sketches'],
        tasks: [
          'Write a complete PRD for a new feature in a popular consumer app',
          'Break down PRD requirements into 10 detailed Jira-ready user stories with acceptance criteria',
          'Run a mock backlog grooming session with engineering constraints'
        ],
        resources: [
          { name: 'Atlassian Agile Coach: Writing Great User Stories', url: 'https://www.atlassian.com/agile/project-management/user-stories', type: 'Tutorial' },
          { name: 'Figma for Product Managers', url: 'https://help.figma.com/hc/en-us/articles/360041003114', type: 'Guide' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Product Analytics, Metrics & Experimentation',
        description: 'Learn event-tracking taxonomies, retention cohort curves, funnel drop-off analysis, and A/B test statistical significance.',
        duration: '4 Weeks',
        requiredSkills: ['Funnel Analysis', 'Cohort Retention', 'A/B Testing Hypothesis', 'Analytics Taxonomies'],
        tasks: [
          'Design an event tracking schema (event names, properties) for a user onboarding funnel',
          'Analyze sample retention data to calculate Day-1, Day-7, and Day-30 retention benchmarks',
          'Formulate an A/B test proposal with null hypothesis, variant description, and guardrail metrics'
        ],
        resources: [
          { name: 'Amplitude Analytics Academy', url: 'https://academy.amplitude.com/', type: 'Free Certification' },
          { name: 'Reforge Product Insights', url: 'https://www.reforge.com/blog', type: 'Articles' }
        ]
      },
      {
        stepNumber: 4,
        title: 'APM Interview Prep & Product Sense',
        description: 'Master product design questions, estimation questions, metric diagnostics, and behavioral leadership scenarios.',
        duration: '4 Weeks',
        requiredSkills: ['Product Sense Frameworks (CIRCLES)', 'Root Cause Diagnosis', 'Execution Questions'],
        tasks: [
          'Practice answering 10 "How would you design X for Y?" product sense prompts',
          'Diagnose metric drops: "Uber ride bookings dropped 10% yesterday. What do you do?"',
          'Conduct 5 mock peer APM interviews'
        ],
        resources: [
          { name: 'Exponent APM Interview Course & Mock Interviews', url: 'https://www.tryexponent.com/', type: 'Interview Prep' },
          { name: 'Decode and Conquer by Lewis C. Lin', url: 'https://www.lewis-lin.com/decode-and-conquer', type: 'Interview Book' }
        ]
      }
    ]
  },

  {
    slug: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business & Strategy',
    categoryKey: 'business',
    description: 'Bridges the gap between business stakeholders and IT systems by analyzing operational workflows, gathering requirements, and optimizing organizational processes.',
    typicalRoles: ['Junior Business Analyst', 'IT Business Consultant', 'Process Improvement Analyst', 'Operations Systems Associate'],
    approxSalary: {
      entryLevel: '$65,000 - $85,000 / ₹5.5 - ₹10.5 LPA',
      experienced: '$105,000 - $145,000+ / ₹16 - ₹30+ LPA',
      disclaimer: 'Salary estimates are approximate industry benchmarks that vary according to consulting domain, enterprise tool certifications, and experience.'
    },
    requiredTechnicalSkills: ['Business Process Modeling (BPMN / Visio)', 'Requirements Gathering & Stakeholder Management', 'SQL & Data Analysis', 'Excel & Financial Modeling', 'Jira & Confluence', 'Gap Analysis & Feasibility Studies'],
    requiredSoftSkills: ['Active Stakeholder Communication', 'Negotiation & Consensus Building', 'Analytical Deconstruction', 'Technical-to-Business Translation'],
    educationSuitability: ['Undergraduate / Bachelor', 'Postgraduate / Master', 'Diploma'],
    workStyleSuitability: ['Hybrid', 'Office', 'Enterprise', 'Remote'],
    affinityTags: ['business', 'analysis', 'consulting', 'requirements', 'bpmn', 'jira', 'processes', 'operations'],
    beginnerProjects: [
      {
        title: 'Enterprise ERP System Migration Gap Analysis',
        description: 'Map "As-Is" vs "To-Be" procurement workflows using BPMN diagrams, documenting technical gaps and cost-benefit analysis.',
        difficulty: 'Intermediate',
        technologies: ['Lucidchart / Visio', 'BPMN 2.0', 'Gap Analysis Matrix']
      },
      {
        title: 'Banking KYC Digital Onboarding Optimization',
        description: 'Analyze drop-offs in customer onboarding, interview compliance officers, and produce a Business Requirements Document (BRD).',
        difficulty: 'Beginner-Intermediate',
        technologies: ['BRD Templates', 'Confluence', 'Process Flowcharts']
      },
      {
        title: 'Inventory & Supply Chain KPI Dashboard in Excel & SQL',
        description: 'Write SQL queries to audit supplier turnaround times, stockout risks, and margin variations for executive reporting.',
        difficulty: 'Beginner',
        technologies: ['SQL', 'Advanced Excel', 'Pivot Tables']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Business Analysis Foundations & The BABOK Guide',
        description: 'Understand the core BA knowledge areas defined by the International Institute of Business Analysis (IIBA).',
        duration: '4 Weeks',
        requiredSkills: ['Stakeholder Identification', 'Requirements Elicitation', 'Traceability Matrix', 'Feasibility Study'],
        tasks: [
          'Study BABOK Guide core concepts and understand the role of a BA across the project lifecycle',
          'Create a Stakeholder Power/Interest Grid for an IT transformation project',
          'Draft a formal Business Requirements Document (BRD) and Software Requirements Specification (SRS)'
        ],
        resources: [
          { name: 'IIBA - International Institute of Business Analysis', url: 'https://www.iiba.org/', type: 'Professional Body' },
          { name: 'Bridging the Gap - Business Analyst Tutorials', url: 'https://www.bridging-the-gap.com/', type: 'Tutorials' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Process Modeling & Notation (BPMN 2.0)',
        description: 'Master flowcharting, swimlanes, decision gateways, and state diagrams to visualize operational business processes.',
        duration: '3 Weeks',
        requiredSkills: ['BPMN 2.0 Symbols', 'Swimlane Diagrams', 'As-Is vs To-Be Workflows', 'UML Use Case Diagrams'],
        tasks: [
          'Model an end-to-end customer return and refund process using BPMN swimlanes in Lucidchart',
          'Document edge cases, exception flows, and system timeouts in process documentation',
          'Create a UML Use Case diagram with actors, include, and extend relationships'
        ],
        resources: [
          { name: 'Camunda BPMN 2.0 Interactive Tutorial', url: 'https://camunda.com/bpmn/', type: 'Interactive Guide' },
          { name: 'Lucidchart Process Diagramming Guides', url: 'https://www.lucidchart.com/pages/what-is-bpmn', type: 'Guide' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Data Querying & Practical Quantitative Analysis',
        description: 'Use SQL and spreadsheets to validate requirements with cold hard transaction data.',
        duration: '4 Weeks',
        requiredSkills: ['Intermediate SQL', 'Data Validation', 'Cost-Benefit Calculation', 'Jira Backlog Organization'],
        tasks: [
          'Write SQL queries to calculate business KPIs and validate stakeholder assumptions',
          'Construct a cost-benefit model in Excel comparing manual processing vs automation software',
          'Organize an agile backlog with epics, user stories, and acceptance criteria in Jira'
        ],
        resources: [
          { name: 'Coursera: Business Analytics Specialization (Wharton)', url: 'https://www.coursera.org/specializations/wharton-business-analytics', type: 'Course' },
          { name: 'Atlassian Jira Agile Project Management Guide', url: 'https://www.atlassian.com/software/jira/guides', type: 'Guide' }
        ]
      }
    ]
  },

  {
    slug: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    category: 'Business & Strategy',
    categoryKey: 'marketing',
    description: 'Plans, executes, and optimizes digital growth strategies across SEO, paid ads (Google/Meta), email marketing, content creation, and web conversion analytics.',
    typicalRoles: ['Junior SEO Specialist', 'Performance Marketing Associate', 'Content & Social Media Strategist', 'Growth Marketing Analyst'],
    approxSalary: {
      entryLevel: '$52,000 - $72,000 / ₹4.5 - ₹8.5 LPA',
      experienced: '$90,000 - $135,000+ / ₹14 - ₹26+ LPA',
      disclaimer: 'Salary estimates are approximate industry benchmarks that vary according to ad budget management track record, agency vs in-house, and analytics proficiency.'
    },
    requiredTechnicalSkills: ['Search Engine Optimization (SEO)', 'Google Ads & Search Marketing (SEM)', 'Meta Ads Manager (Facebook/Instagram)', 'Google Analytics 4 (GA4)', 'Email Automation (Mailchimp / HubSpot)', 'Conversion Rate Optimization (CRO)'],
    requiredSoftSkills: ['Creative Copywriting', 'Audience Psychology', 'Rapid Experimentation', 'Trend Forecasting'],
    educationSuitability: ['High School', 'Undergraduate / Bachelor', 'Diploma', 'Postgraduate / Master'],
    workStyleSuitability: ['Remote', 'Hybrid', 'Office', 'Startup'],
    affinityTags: ['marketing', 'seo', 'ads', 'google-analytics', 'social-media', 'content', 'growth', 'copywriting'],
    beginnerProjects: [
      {
        title: 'Full-Funnel Organic SEO Strategy & Content Audit',
        description: 'Perform keyword research for a local service or niche blog, optimize on-page title tags/meta descriptions, and generate a 6-month content calendar.',
        difficulty: 'Beginner',
        technologies: ['Google Search Console', 'Ahrefs/Semrush Free Tools', 'Keyword Research']
      },
      {
        title: 'Paid Acquisition Campaign Plan & Ad Creative Matrix',
        description: 'Design a $1,000/month Google & Meta ad budget allocation plan with targeting demographics, ad copy variations, and CAC/ROAS projections.',
        difficulty: 'Beginner-Intermediate',
        technologies: ['Meta Ads Manager', 'Google Ads Planner', 'Canva']
      },
      {
        title: 'Web Traffic Analytics & Conversion Funnel Setup in GA4',
        description: 'Configure custom event tracking in GA4 using Google Tag Manager to measure button clicks, form submissions, and cart abandons.',
        difficulty: 'Intermediate',
        technologies: ['Google Analytics 4 (GA4)', 'Google Tag Manager', 'Looker Studio']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Marketing Foundations & Audience Psychology',
        description: 'Understand marketing funnels (AIDA: Awareness, Interest, Desire, Action), customer personas, and unique selling propositions (USPs).',
        duration: '3 Weeks',
        requiredSkills: ['Customer Personas', 'Value Propositions', 'Copywriting Formulas (PAS, AIDA)', 'Competitive Positioning'],
        tasks: [
          'Create 2 detailed customer buyer personas for a direct-to-consumer brand',
          'Write compelling headline variations and persuasive landing page sales copy',
          'Analyze the marketing funnels of 3 successful brands in different industries'
        ],
        resources: [
          { name: 'HubSpot Academy - Inbound Marketing Certification', url: 'https://academy.hubspot.com/courses/inbound', type: 'Free Certification' },
          { name: 'Copywriting 101 by Copyblogger', url: 'https://copyblogger.com/copywriting-101/', type: 'Free Guide' }
        ]
      },
      {
        stepNumber: 2,
        title: 'Search Engine Optimization (SEO)',
        description: 'Master on-page optimization, keyword intent research, technical SEO, and ethical backlink outreach strategies.',
        duration: '4-5 Weeks',
        requiredSkills: ['Keyword Research & Search Intent', 'On-Page SEO & Meta Tags', 'Technical SEO Basics', 'Link Building'],
        tasks: [
          'Identify 20 high-intent low-competition keywords using free keyword research tools',
          'Audit and fix on-page SEO issues (headings, schema, internal links, alt tags) on a live site',
          'Write a 1,500-word comprehensive SEO-optimized guide targeting a target keyword'
        ],
        resources: [
          { name: 'Google Search Central Documentation & SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', type: 'Official Docs' },
          { name: 'Moz Beginner’s Guide to SEO', url: 'https://moz.com/beginners-guide-to-seo', type: 'Free Guide' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Performance Marketing (Google Ads & Meta Ads)',
        description: 'Plan, configure, and optimize paid advertising campaigns across search and social channels.',
        duration: '4 Weeks',
        requiredSkills: ['Google Search Ads', 'Meta Ad Creative & Audiences', 'ROAS & CPA Calculation', 'A/B Testing Creatives'],
        tasks: [
          'Set up a mock Google Search campaign with negative keywords, ad extensions, and bidding strategy',
          'Design 3 creative ad angles for Instagram using Canva and write targeted copy for each',
          'Calculate Return on Ad Spend (ROAS) and Customer Acquisition Cost (CAC) for different scenarios'
        ],
        resources: [
          { name: 'Google Skillshop - Google Ads Certifications', url: 'https://skillshop.withgoogle.com/', type: 'Free Official Certifications' },
          { name: 'Meta Blueprint - Digital Marketing Associate Training', url: 'https://www.facebook.com/business/learn', type: 'Official Training' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Web Analytics (GA4) & Reporting with Looker Studio',
        description: 'Track visitor traffic, setup conversions, and build automated interactive reporting dashboards.',
        duration: '3 Weeks',
        requiredSkills: ['Google Analytics 4 (GA4)', 'UTM Parameters', 'Looker Studio Dashboards', 'Conversion Tracking'],
        tasks: [
          'Tag promotional campaign URLs with proper UTM parameters to track campaign sources',
          'Create an automated marketing performance dashboard in Google Looker Studio',
          'Present insights and recommendations based on real or simulated website analytics data'
        ],
        resources: [
          { name: 'Google Analytics Academy / Skillshop for GA4', url: 'https://skillshop.exceedlms.com/student/path/508845-google-analytics-certification', type: 'Official Certification' },
          { name: 'Google Looker Studio Tutorials', url: 'https://lookerstudio.google.com/overview', type: 'Official Tool' }
        ]
      }
    ]
  },

  {
    slug: 'government-exam-preparation',
    title: 'Government and Competitive Exam Preparation',
    category: 'Public Sector & Competitive',
    categoryKey: 'public_sector',
    description: 'Prepares systematically for national civil services, public sector undertakings (PSUs), banking (IBPS/SBI), defense, and state administrative examinations through structured syllabus mastery and analytical reasoning.',
    typicalRoles: ['Civil Services Officer (IAS/IPS/IFS)', 'Bank Probationary Officer (PO)', 'Public Sector Engineer / Executive', 'State Administrative Officer', 'Staff Selection Officer (SSC CGL)'],
    approxSalary: {
      entryLevel: 'Structured Government Pay Scale (Level 7 - Level 10 Pay Matrix + Allowances)',
      experienced: 'Senior Administrative Pay Scales + Pension / Housing / Official Benefits',
      disclaimer: 'Compensation in the public sector is governed by official statutory pay commissions, job security, allowances (DA, HRA), and gazetted rank, rather than private corporate market negotiations.'
    },
    requiredTechnicalSkills: ['Quantitative Aptitude & Arithmetic', 'Logical & Analytical Reasoning', 'General Studies & National Polity', 'Current Affairs & Economic Analysis', 'Descriptive Essay Writing & Comprehension', 'Data Interpretation & Statistics'],
    requiredSoftSkills: ['Unwavering Discipline & Consistency', 'Public Service Ethics', 'Stress Tolerance & Mental Endurance', 'Objective Decision Making'],
    educationSuitability: ['Undergraduate / Bachelor', 'Postgraduate / Master', 'Diploma'],
    workStyleSuitability: ['Office', 'Enterprise'],
    affinityTags: ['government', 'civil-services', 'upsc', 'banking', 'aptitude', 'reasoning', 'public-sector', 'gk'],
    beginnerProjects: [
      {
        title: 'Comprehensive Current Affairs Monthly Analysis Digest',
        description: 'Synthesize monthly national policies, economic surveys, and international relations developments into structured notes with critical arguments.',
        difficulty: 'Beginner',
        technologies: ['Notion / OneNote', 'The Hindu / Indian Express Editorial Analysis', 'Mind Mapping']
      },
      {
        title: 'Aptitude & Speed Calculation Daily Mastery Tracker',
        description: 'Complete 30 days of timed quantitative aptitude practice sets covering percentage, ratios, time-speed-distance, and data interpretation.',
        difficulty: 'Intermediate',
        technologies: ['Vedic Math & Speed Tricks', 'Excel Performance Tracker', 'Sectional Mock Tests']
      },
      {
        title: 'Policy Analysis & Administrative Essay Portfolio',
        description: 'Write 5 structured essays addressing social issues, digital governance, climate policy, and constitutional ethics following civil services criteria.',
        difficulty: 'Intermediate',
        technologies: ['Constitutional Articles Reference', 'Structured Essay Frameworks', 'Peer Review']
      }
    ],
    roadmapSteps: [
      {
        stepNumber: 1,
        title: 'Exam Selection, Syllabus Mapping & Strategy Blueprint',
        description: 'Deconstruct the exact syllabus, exam tiers (Prelims, Mains, Interview), negative marking rules, and previous 5 years of cutoffs.',
        duration: '2 Weeks',
        requiredSkills: ['Syllabus Breakdown', 'Past Year Paper Analysis (PYQs)', 'Resource Consolidation', 'Daily Study Timetable'],
        tasks: [
          'Choose your target examinations (e.g. UPSC CSE, State PSC, Bank PO, SSC CGL, GATE/PSU)',
          'Collect and analyze the last 5 years of previous year question papers (PYQs) to identify high-weightage topics',
          'Establish a non-negotiable 6-8 hour daily study routine with dedicated revision blocks'
        ],
        resources: [
          { name: 'UPSC Official Examination Portal & Syllabus', url: 'https://upsc.gov.in/', type: 'Official Portal' },
          { name: 'IBPS Official Banking Exam Notifications', url: 'https://www.ibps.in/', type: 'Official Portal' },
          { name: 'NCERT Free Digital Textbooks (Classes 6-12)', url: 'https://ncert.nic.in/textbook.php', type: 'Official Textbooks' }
        ]
      },
      {
        stepNumber: 2,
        title: 'General Studies Core Foundations (NCERTs & Standard Texts)',
        description: 'Build an unshakeable foundation in Indian Polity & Constitution, Modern History, Geography, Environment, and Basic Macroeconomics.',
        duration: '10-14 Weeks',
        requiredSkills: ['Indian Polity (Laxmikanth)', 'Constitutional Articles & Amendments', 'Modern Indian History', 'Physical & Human Geography', 'Basic Economic Concepts'],
        tasks: [
          'Read and make concise personal revision notes from NCERT textbooks (Social Sciences 6th-12th)',
          'Master Indian Polity fundamental rights, directive principles, and parliamentary procedures',
          'Solve 500+ topic-wise multiple-choice questions (MCQs) to test retention'
        ],
        resources: [
          { name: 'Press Information Bureau (PIB) Official Releases', url: 'https://pib.gov.in/', type: 'Official Government Information' },
          { name: 'PRS Legislative Research - Policy & Bill Analyses', url: 'https://prsindia.org/', type: 'Policy Reference' }
        ]
      },
      {
        stepNumber: 3,
        title: 'Quantitative Aptitude, Logical Reasoning & Data Interpretation (CSAT / Tiers)',
        description: 'Achieve lightning speed and accuracy in mental math, syllogisms, seating arrangements, coding-decoding, and charts.',
        duration: '6-8 Weeks',
        requiredSkills: ['Arithmetic (Percentages, Profit/Loss, Time & Work)', 'Data Interpretation (Bar/Pie/Line)', 'Logical Puzzles & Syllogisms', 'Reading Comprehension'],
        tasks: [
          'Memorize tables up to 30, squares up to 50, cubes up to 25, and common fraction-to-percentage conversions',
          'Practice 25 timed sectional aptitude tests with strict countdown timers',
          'Master speed-solving strategies for Data Interpretation tables and multi-statement syllogisms'
        ],
        resources: [
          { name: 'IndiaBIX - Aptitude and Reasoning Practice Sets', url: 'https://www.indiabix.com/', type: 'Practice Platform' },
          { name: 'Khan Academy Math Foundations', url: 'https://www.khanacademy.org/math', type: 'Video Lessons' }
        ]
      },
      {
        stepNumber: 4,
        title: 'Current Affairs, Answer Writing & Mock Test Series',
        description: 'Transition from passive reading to active synthesis, timed full-length mock examinations, and structured interview preparation.',
        duration: '8-12 Weeks',
        requiredSkills: ['Daily Editorial Analysis', 'Descriptive Answer Writing (Introduction-Body-Conclusion)', 'Time Management', 'Personality Test Ethics'],
        tasks: [
          'Write 2 structured descriptive answers daily with diagrams, constitutional articles, and government schemes',
          'Take at least 20 full-length simulated mock tests under real exam conditions',
          'Analyze mistakes in each test to create an error log and revise weak sub-topics rigorously'
        ],
        resources: [
          { name: 'Rajya Sabha TV / Sansad TV - Perspectives Discussions', url: 'https://www.youtube.com/@SansadTV', type: 'Analysis Videos' },
          { name: 'Yojana & Kurukshetra Monthly Government Journals', url: 'http://yojana.gov.in/', type: 'Government Publications' }
        ]
      }
    ]
  }
];

module.exports = {
  SEED_CAREERS
};
