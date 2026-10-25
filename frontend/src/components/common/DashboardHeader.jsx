import React from 'react';
import { Menu, Moon, Sun, LogOut, Database, Cpu, User, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const DashboardHeader = ({ onToggleSidebar, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, profile, systemStatus, logout } = useAuth();

  const isMongo = systemStatus?.database?.mode === 'mongodb';
  const isLiveAI = systemStatus?.ai?.hasApiKey;

  return (
    <header className="dashboard-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          className="btn btn-ghost"
          style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'Student'}! 👋
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
            {profile?.degree || 'Explore recommendations & track your milestones'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        {/* System Diagnostics Indicator Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="status-badges-group">
          {/* DB Badge */}
          <div
            title={systemStatus?.database?.message || 'Database status'}
            className="badge"
            style={{
              backgroundColor: isMongo ? 'var(--emerald-light)' : 'var(--amber-light)',
              color: isMongo ? 'var(--emerald)' : 'var(--amber)',
              border: `1px solid ${isMongo ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem'
            }}
          >
            <Database size={13} />
            <span>{isMongo ? 'MongoDB Live' : 'In-Memory Store'}</span>
          </div>

          {/* AI Mode Badge */}
          <div
            title={systemStatus?.ai?.note || 'AI Guidance Engine status'}
            className="badge"
            style={{
              backgroundColor: isLiveAI ? 'var(--primary-light)' : 'var(--violet-light)',
              color: isLiveAI ? 'var(--primary)' : 'var(--violet)',
              border: `1px solid ${isLiveAI ? 'var(--primary-border)' : 'var(--violet-border)'}`,
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem'
            }}
          >
            <Cpu size={13} />
            <span>{isLiveAI ? 'Gemini AI Active' : 'Rule-Based Counselor'}</span>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark/Light Mode"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-secondary)'
          }}
        >
          {isDark ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} />}
        </button>

        {/* User Avatar & Logout */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          paddingLeft: '0.5rem',
          borderLeft: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => onNavigate('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.875rem'
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
          </button>

          <button
            onClick={logout}
            className="btn btn-ghost"
            title="Log Out"
            style={{ padding: '0.5rem', color: 'var(--rose)' }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
