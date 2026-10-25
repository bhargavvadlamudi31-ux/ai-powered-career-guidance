import React from 'react';
import { Compass, Moon, Sun, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onOpenAuth, onNavigate, activeTab }) => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const handleScrollToSection = (sectionId) => {
    if (activeTab !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg-glass)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'all 0.2s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}>
            <Compass size={24} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}>
              CareerCompass <span className="gradient-text">AI</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.75rem'
        }} className="desktop-nav">
          <button
            onClick={() => onNavigate('landing')}
            className={`btn btn-ghost ${activeTab === 'landing' ? 'tag-active' : ''}`}
            style={{ fontWeight: 500, padding: '0.5rem 0.75rem' }}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`btn btn-ghost ${activeTab === 'explore' ? 'tag-active' : ''}`}
            style={{ fontWeight: 500, padding: '0.5rem 0.75rem' }}
          >
            Explore Careers
          </button>
          <button
            onClick={() => handleScrollToSection('how-it-works')}
            className="btn btn-ghost"
            style={{ fontWeight: 500, padding: '0.5rem 0.75rem' }}
          >
            How It Works
          </button>
          <button
            onClick={() => handleScrollToSection('features')}
            className="btn btn-ghost"
            style={{ fontWeight: 500, padding: '0.5rem 0.75rem' }}
          >
            Features
          </button>
          <button
            onClick={() => handleScrollToSection('faq')}
            className="btn btn-ghost"
            style={{ fontWeight: 500, padding: '0.5rem 0.75rem' }}
          >
            FAQ
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            {isDark ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <button
                onClick={() => onNavigate('dashboard')}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                <span>Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1.125rem', fontSize: '0.875rem' }}
              >
                <Sparkles size={16} />
                <span>Get Started Free</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
