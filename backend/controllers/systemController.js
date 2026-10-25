const { getDBStatus } = require('../config/db');

// @desc    Get system diagnostic and configuration status
// @route   GET /api/system/status
// @access  Public
const getSystemStatus = (req, res) => {
  const dbStatus = getDBStatus();
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);

  const aiStatus = {
    provider: hasGemini ? 'Google Gemini 1.5' : hasOpenAI ? 'OpenAI GPT' : 'Rule-Based Guidance Engine (Demo Mode)',
    hasApiKey: hasGemini || hasOpenAI,
    isDemoFallback: !(hasGemini || hasOpenAI),
    note: !(hasGemini || hasOpenAI)
      ? 'Running with built-in intelligent rule-based career guidance. Configure GEMINI_API_KEY in backend/.env for live LLM responses.'
      : 'Live external AI provider configured.'
  };

  return res.status(200).json({
    success: true,
    system: 'CareerCompass AI — AI-Powered Student Career Guidance System',
    version: '1.0.0',
    timestamp: new Date(),
    database: dbStatus,
    ai: aiStatus
  });
};

module.exports = {
  getSystemStatus
};
