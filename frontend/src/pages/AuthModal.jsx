import React, { useState } from 'react';
import { X, Sparkles, LogIn, UserPlus, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && !name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setMode('login');
    setEmail('demo@careercompass.ai');
    setPassword('demo1234');
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.375rem',
            borderRadius: '50%',
            color: 'var(--text-muted)',
            display: 'flex'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--violet) 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            marginBottom: '0.75rem',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
          }}>
            <Sparkles size={24} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {mode === 'login' ? 'Welcome Back to CareerCompass' : 'Create Your Student Account'}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {mode === 'login'
              ? 'Log in to track your roadmaps, skill gaps, and AI recommendations.'
              : 'Sign up to unlock tailored career matching and milestone tracking.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-surface-elevated)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: mode === 'login' ? 'var(--bg-surface)' : 'transparent',
              color: mode === 'login' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: mode === 'register' ? 'var(--bg-surface)' : 'transparent',
              color: mode === 'register' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: mode === 'register' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--rose-light)',
            color: 'var(--rose)',
            fontSize: '0.875rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Maya Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={mode === 'register'}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {mode === 'register' && (
              <span className="form-hint">At least 6 characters with secure hashing.</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : mode === 'login' ? (
              <>
                <LogIn size={18} />
                <span>Log In to Dashboard</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Create Student Account</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials Pill */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px dashed var(--border-strong)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            ⚡ Need to test immediately for evaluation?
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            Auto-fill Preloaded Demo Student Account
          </button>
        </div>

        {/* Privacy badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.375rem',
          marginTop: '1.25rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <ShieldCheck size={14} color="#10B981" />
          <span>Passkeys hashed with bcrypt &middot; JWT protected sessions</span>
        </div>
      </div>
    </div>
  );
};
