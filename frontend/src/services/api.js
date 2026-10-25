// API Service Client for CareerCompass AI
// Handles authorization token injection, JSON parsing, and unified error handling

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('careercompass_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const api = {
  // System diagnostics
  getSystemStatus: async () => {
    const res = await fetch(`${API_BASE}/system/status`);
    return handleResponse(res);
  },

  // Auth
  register: async (name, email, password) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return handleResponse(res);
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Profile
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  updateProfile: async (profileData) => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return handleResponse(res);
  },

  // Assessment
  submitAssessment: async (answers) => {
    const res = await fetch(`${API_BASE}/assessment`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers })
    });
    return handleResponse(res);
  },

  getLatestAssessment: async () => {
    const res = await fetch(`${API_BASE}/assessment/latest`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Careers
  getAllCareers: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.workStyle && filters.workStyle !== 'all') params.append('workStyle', filters.workStyle);
    if (filters.education && filters.education !== 'all') params.append('education', filters.education);

    const res = await fetch(`${API_BASE}/careers?${params.toString()}`);
    return handleResponse(res);
  },

  getCareerBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/careers/${slug}`);
    return handleResponse(res);
  },

  getRecommendations: async () => {
    const res = await fetch(`${API_BASE}/careers/recommendations`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Roadmap
  getActiveRoadmap: async () => {
    const res = await fetch(`${API_BASE}/roadmap`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  selectCareerRoadmap: async (careerSlug) => {
    const res = await fetch(`${API_BASE}/roadmap/select`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ careerSlug })
    });
    return handleResponse(res);
  },

  updateRoadmapTask: async (taskId, completed) => {
    const res = await fetch(`${API_BASE}/roadmap/task`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ taskId, completed })
    });
    return handleResponse(res);
  },

  // Skill Gap
  getSkillGapAnalysis: async (careerSlug) => {
    const endpoint = careerSlug ? `${API_BASE}/skill-gap/${careerSlug}` : `${API_BASE}/skill-gap`;
    const res = await fetch(endpoint, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // AI Chat
  sendChatMessage: async (message) => {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message })
    });
    return handleResponse(res);
  },

  getChatHistory: async () => {
    const res = await fetch(`${API_BASE}/chat/history`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};
