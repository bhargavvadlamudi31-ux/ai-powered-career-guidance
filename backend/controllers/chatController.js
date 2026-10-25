const ChatConversation = require('../models/ChatConversation');
const StudentProfile = require('../models/StudentProfile');
const inMemoryStore = require('../services/inMemoryStore');
const { askCareerAssistant } = require('../services/aiService');
const { isMongoActive } = require('../config/db');

// @desc    Send message to AI Career Assistant
// @route   POST /api/chat
// @access  Private
const sendChatMessage = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a non-empty query message.'
      });
    }

    // Retrieve student profile to supply context
    let profile;
    let history = [];

    if (isMongoActive()) {
      profile = await StudentProfile.findOne({ user: userId });
      const conversation = await ChatConversation.findOne({ user: userId });
      if (conversation && conversation.messages) {
        history = conversation.messages.slice(-6);
      }
    } else {
      profile = inMemoryStore.findProfileByUserId(userId);
      const conversation = inMemoryStore.findChatByUserId(userId);
      if (conversation && conversation.messages) {
        history = conversation.messages.slice(-6);
      }
    }

    // Call AI counseling service
    const aiResult = await askCareerAssistant({
      message: message.trim(),
      profile: profile || { fullName: req.user.name },
      history
    });

    const userMsgObj = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    const assistantMsgObj = {
      role: 'assistant',
      content: aiResult.content,
      isDemoFallback: aiResult.isDemoFallback,
      suggestedFollowUps: aiResult.suggestedFollowUps,
      timestamp: new Date()
    };

    // Save conversation
    if (isMongoActive()) {
      await ChatConversation.findOneAndUpdate(
        { user: userId },
        {
          $push: {
            messages: { $each: [userMsgObj, assistantMsgObj] }
          }
        },
        { new: true, upsert: true }
      );
    } else {
      inMemoryStore.saveChatMessage(userId, userMsgObj);
      inMemoryStore.saveChatMessage(userId, assistantMsgObj);
    }

    return res.status(200).json({
      success: true,
      reply: assistantMsgObj.content,
      isDemoFallback: assistantMsgObj.isDemoFallback,
      provider: aiResult.provider,
      suggestedFollowUps: assistantMsgObj.suggestedFollowUps,
      disclaimer: 'CareerCompass AI recommendations are meant for educational guidance and exploration. They do not guarantee employment, salary levels, or hiring outcomes.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chat conversation history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    let conversation;
    if (isMongoActive()) {
      conversation = await ChatConversation.findOne({ user: userId });
    } else {
      conversation = inMemoryStore.findChatByUserId(userId);
    }

    return res.status(200).json({
      success: true,
      messages: conversation ? conversation.messages : []
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendChatMessage,
  getChatHistory
};
