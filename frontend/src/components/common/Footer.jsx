import React from 'react';
import { Compass, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer style={{
      backgroundColor: 'var(--navy-deep)',
      color: '#94A3B8',
      padding: '4rem 0 2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '3.5rem', gap: '2.5rem' }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Compass size={22} />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#FFFFFF'
              }}>
                CareerCompass <span style={{ color: '#818CF8' }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1.25rem' }}>
              Empowering students and aspiring professionals to discover high-compatibility career paths, bridge skill gaps, and execute step-by-step learning roadmaps.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.75rem' }}>
              <ShieldCheck size={16} color="#10B981" />
              <span>Transparent algorithmic scoring &middot; No black boxes</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Core Features
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                >
                  AI Career Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                >
                  Explore 12 Tech & Public Tracks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skill-gap')}
                  style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                >
                  Skill Gap Radar Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap')}
                  style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                >
                  Personalized Learning Roadmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chat')}
                  style={{ color: '#94A3B8', transition: 'color 0.2s', textAlign: 'left' }}
                >
                  AI Counseling Assistant (CompassBot)
                </button>
              </li>
            </ul>
          </div>

          {/* Curated Career Tracks */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Career Domains
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>Software & Full-Stack Development</li>
              <li>Data Science, Analytics & AI/ML</li>
              <li>Cloud Computing & DevOps Architecture</li>
              <li>Cybersecurity & Threat Analysis</li>
              <li>UI/UX Design & Product Management</li>
              <li>Civil Services & Public Sector Exams</li>
            </ul>
          </div>

          {/* Project & Tech Stack */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Built With Modern Stack
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1rem' }}>
              Full-Stack Architecture featuring React 19, Vite, Express.js, Node.js, MongoDB / Mongoose, Recharts, and Google Gemini / Intelligent Fallback Engine.
            </p>
            <div style={{
              padding: '0.75rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.75rem'
            }}>
              <span style={{ color: '#818CF8', fontWeight: 600 }}>Zero Tailwind CSS</span> &middot; Handcrafted CSS design tokens & media queries.
            </div>
          </div>
        </div>

        {/* Advisory & Statutory Disclaimer */}
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '2.5rem',
          fontSize: '0.75rem',
          lineHeight: 1.6,
          color: '#64748B'
        }}>
          <strong style={{ color: '#E2E8F0' }}>Important Career & Salary Disclaimer:</strong> CareerCompass AI provides career compatibility scores, roadmap milestones, and educational suggestions for exploratory and educational guidance purposes. Compatibility scores are computed transparently based on self-reported inputs and do not constitute a clinical psychological assessment. Salary figures are approximate industry estimates that vary by geography, skills, and employer tiers. Career recommendations do not guarantee employment, salary brackets, or examination clearance.
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.8125rem'
        }}>
          <div>
            &copy; {new Date().getFullYear()} CareerCompass AI. Designed for modern students & ambitious career builders.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Academic Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
