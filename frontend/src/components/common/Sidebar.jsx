import React from 'react';
import {
  Compass,
  LayoutDashboard,
  Sparkles,
  Award,
  Compass as CompassIcon,
  MapPin,
  GitPullRequest,
  Bot,
  UserCheck,
  ChevronRight,
  X,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ activeTab, onSelectTab, isOpen, onClose }) => {
  const { profile } = useAuth();
  const completion = profile?.completionPercentage || 0;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'assessment', label: 'AI Career Assessment', icon: Sparkles, badge: 'Smart' },
    { id: 'recommendations', label: 'Recommended Careers', icon: Award },
    { id: 'explore', label: 'Explore All Careers', icon: CompassIcon },
    { id: 'roadmap', label: 'My Learning Roadmap', icon: MapPin },
    { id: 'skill-gap', label: 'Skill Gap Analyzer', icon: GitPullRequest },
    { id: 'chat', label: 'AI Career Assistant', icon: Bot, badge: 'AI' },
    { id: 'profile', label: 'Student Profile', icon: UserCheck }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 95
          }}
        />
      )}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div
            onClick={() => onSelectTab('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Compass size={20} />
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.125rem',
                color: 'var(--text-primary)'
              }}>
                CareerCompass
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '0.25rem', display: 'flex' }}
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1, overflowY: 'auto' }}>
          <div style={{
            fontSize: '0.6875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            fontWeight: 700,
            padding: '0 0.75rem 0.5rem'
          }}>
            Navigation Menu
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (window.innerWidth < 900) onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span>{item.label}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    {item.badge && (
                      <span
                        className="badge"
                        style={{
                          fontSize: '0.6875rem',
                          padding: '0.1rem 0.4rem',
                          backgroundColor: isActive ? 'var(--primary)' : 'var(--border-subtle)',
                          color: isActive ? '#FFFFFF' : 'var(--text-secondary)'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight size={14} />}
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Profile Completion Indicator Card */}
        <div style={{
          padding: '1rem',
          margin: '0.75rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Profile Strength
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
              {completion}%
            </span>
          </div>
          <div className="progress-container" style={{ height: '6px' }}>
            <div className="progress-fill" style={{ width: `${completion}%` }} />
          </div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.3 }}>
            {completion < 80
              ? 'Complete profile fields to enhance AI recommendation precision.'
              : 'Profile is comprehensive for high-precision recommendations!'}
          </p>
          {completion < 80 && (
            <button
              onClick={() => onSelectTab('profile')}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--primary)',
                marginTop: '0.375rem',
                display: 'inline-block'
              }}
            >
              Update Profile &rarr;
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
