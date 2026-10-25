import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Clock,
  Cpu
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ChatbotPage = () => {
  const { user, profile, systemStatus } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedChips, setSuggestedChips] = useState([
    'Which career is suitable for my skills?',
    'How do I become a data scientist?',
    'What beginner projects should I build for my portfolio?',
    'How can I prepare for internships as a student?',
    'Which skills should I learn next?'
  ]);
  const messagesEndRef = useRef(null);

  const isLiveAI = systemStatus?.ai?.hasApiKey;
  const aiProviderName = systemStatus?.ai?.provider || 'Rule-Based Guidance Engine';

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadChatHistory = async () => {
    try {
      const res = await api.getChatHistory();
      if (res.messages && res.messages.length > 0) {
        setMessages(res.messages);
      } else {
        // Initial greeting
        const studentName = user?.name ? user.name.split(' ')[0] : 'there';
        setMessages([
          {
            role: 'assistant',
            content: `Hello ${studentName}! I am CompassBot, your student career counselor. I have reviewed your profile and I'm ready to help you explore career paths, brainstorm projects, and plan your learning milestones. What questions do you have today?`,
            timestamp: new Date(),
            isDemoFallback: !isLiveAI,
            suggestedFollowUps: [
              'Which career is suitable for my skills?',
              'How do I prepare for internships?',
              'What projects should I build?'
            ]
          }
        ]);
      }
    } catch (err) {
      console.warn('Could not load chat history:', err);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query || !query.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: query.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const res = await api.sendChatMessage(query.trim());
      const botMessage = {
        role: 'assistant',
        content: res.reply,
        timestamp: new Date(),
        isDemoFallback: res.isDemoFallback,
        provider: res.provider,
        suggestedFollowUps: res.suggestedFollowUps
      };
      setMessages(prev => [...prev, botMessage]);

      if (res.suggestedFollowUps && res.suggestedFollowUps.length > 0) {
        setSuggestedChips(res.suggestedFollowUps);
      }
    } catch (err) {
      const errorMessage = {
        role: 'assistant',
        content: 'I encountered an error processing your query. Please verify backend connectivity and try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Info Banner */}
      <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '1rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--violet) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0 }}>
                  CompassBot — AI Career Counselor
                </h3>
                <span className="badge" style={{
                  backgroundColor: isLiveAI ? 'var(--primary-light)' : 'var(--violet-light)',
                  color: isLiveAI ? 'var(--primary)' : 'var(--violet)',
                  border: `1px solid ${isLiveAI ? 'var(--primary-border)' : 'var(--violet-border)'}`,
                  fontSize: '0.6875rem'
                }}>
                  <Cpu size={11} style={{ marginRight: '0.2rem' }} />
                  {isLiveAI ? 'Gemini 1.5 Live' : 'Demo Rule-Based Counseling Engine'}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Context loaded: {profile?.fullName || user?.name} ({profile?.educationLevel || 'Student'})
              </p>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>Advisory guidance &middot; No job guarantee</span>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div
        className="card"
        style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '1rem',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: isUser ? 'var(--primary)' : 'var(--violet-light)',
                color: isUser ? '#FFFFFF' : 'var(--violet)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 700,
                fontSize: '0.8125rem'
              }}>
                {isUser ? <User size={18} /> : <Bot size={18} />}
              </div>

              {/* Message Bubble */}
              <div style={{
                maxWidth: '75%',
                padding: '0.875rem 1.125rem',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                backgroundColor: isUser ? 'var(--primary)' : 'var(--bg-surface-elevated)',
                color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                border: isUser ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '0.9375rem',
                lineHeight: 1.55,
                whiteSpace: 'pre-wrap',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {msg.content}

                {/* Subtext info for assistant replies */}
                {!isUser && msg.isDemoFallback && (
                  <div style={{
                    marginTop: '0.5rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.6875rem',
                    color: 'var(--text-muted)'
                  }}>
                    Engine: {msg.provider || 'Intelligent Rule-Based Career Counselor (Demo Mode)'}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading typing indicator */}
        {loading && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'var(--violet-light)',
              color: 'var(--violet)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bot size={18} />
            </div>
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '16px 16px 16px 4px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles size={16} color="var(--primary)" />
              <span>Analyzing student profile & formulating practical advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {suggestedChips.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          marginBottom: '0.5rem',
          flexShrink: 0
        }}>
          {suggestedChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="tag tag-active"
              style={{
                fontSize: '0.75rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.75rem'
              }}
            >
              <Sparkles size={11} style={{ marginRight: '0.3rem' }} />
              <span>{chip}</span>
            </button>
          ))}
        </div>
      )}

      {/* Message Input Box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexShrink: 0
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Ask CompassBot anything about your career path, skills, or projects..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={loading}
          style={{
            padding: '0.875rem 1rem',
            fontSize: '0.9375rem',
            borderRadius: 'var(--radius-lg)'
          }}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !inputText.trim()}
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '0 1.5rem',
            flexShrink: 0
          }}
        >
          <Send size={18} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
