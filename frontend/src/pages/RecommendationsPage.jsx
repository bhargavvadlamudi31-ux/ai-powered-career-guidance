import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  GitPullRequest,
  ExternalLink,
  Code2,
  DollarSign,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { api } from '../services/api';

export const RecommendationsPage = ({
  recommendations = [],
  assessmentDate,
  scoringBreakdown,
  onActivateRoadmap,
  onAnalyzeSkillGap,
  onRetakeAssessment
}) => {
  const [expandedCareer, setExpandedCareer] = useState(recommendations[0]?.slug || null);
  const [activatingSlug, setActivatingSlug] = useState(null);
  const [activationSuccess, setActivationSuccess] = useState('');

  const toggleExpand = (slug) => {
    setExpandedCareer(expandedCareer === slug ? null : slug);
  };

  const handleActivate = async (career) => {
    setActivatingSlug(career.slug);
    setActivationSuccess('');
    try {
      await api.selectCareerRoadmap(career.slug);
      setActivationSuccess(`Activated "${career.title}" as your primary learning roadmap!`);
      if (onActivateRoadmap) onActivateRoadmap(career.slug);
    } catch (err) {
      console.error('Failed to set active roadmap:', err);
    } finally {
      setActivatingSlug(null);
    }
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <Sparkles size={48} color="var(--primary)" style={{ margin: '0 auto 1.25rem' }} />
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          No Career Assessment on File Yet
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
          Complete our 5-minute interactive assessment to receive ranked career matches with transparent compatibility scores.
        </p>
        <button onClick={onRetakeAssessment} className="btn btn-primary btn-lg">
          Take AI Career Assessment Now
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Top Banner explaining transparent methodology */}
      <div className="card" style={{
        marginBottom: '2rem',
        padding: '1.75rem',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
        border: '1px solid var(--primary-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-primary">
                <Sparkles size={13} />
                <span>AI Recommended Matches</span>
              </span>
              {assessmentDate && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Evaluated on {new Date(assessmentDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Your Top Recommended Career Pathways
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', maxWidth: '750px', lineHeight: 1.5 }}>
              Ranked by our multidimensional algorithm evaluating your technical prerequisites, analytical tendencies, creative instincts, and study objectives.
            </p>
          </div>

          <button
            onClick={onRetakeAssessment}
            className="btn btn-secondary btn-sm"
            style={{ flexShrink: 0 }}
          >
            Retake Assessment
          </button>
        </div>

        {/* Transparent scoring breakdown notice */}
        <div style={{
          marginTop: '1.25rem',
          padding: '0.875rem 1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8125rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
          <div style={{ color: 'var(--text-secondary)' }}>
            <strong>Transparent Scoring Matrix:</strong> 35% Skills Alignment &middot; 30% Aptitude Dimensions &middot; 20% Activity Interests &middot; 15% Academic/Work Fit.
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {activationSuccess && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--emerald-light)',
          color: 'var(--emerald)',
          marginBottom: '1.5rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          <span>{activationSuccess}</span>
        </div>
      )}

      {/* Recommended Career Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {recommendations.map((career, index) => {
          const isExpanded = expandedCareer === career.slug;
          const score = career.compatibilityScore || 85;

          const scoreColor = score >= 88 ? 'var(--emerald)' : score >= 75 ? 'var(--primary)' : 'var(--amber)';
          const scoreBg = score >= 88 ? 'var(--emerald-light)' : score >= 75 ? 'var(--primary-light)' : 'var(--amber-light)';

          return (
            <div
              key={career.slug || index}
              className="card"
              style={{
                border: isExpanded ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
                padding: '1.75rem'
              }}
            >
              {/* Header row */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)' }}>
                      Rank #{index + 1}
                    </span>
                    <span className="badge badge-violet">
                      {career.category || 'Technology'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {career.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {career.description}
                  </p>

                  {/* Why Match highlighted banner */}
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderLeft: `4px solid ${scoreColor}`,
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.45
                  }}>
                    <strong>Why this matches you:</strong> {career.whyMatch}
                  </div>
                </div>

                {/* Score Pill */}
                <div style={{
                  textAlign: 'center',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: scoreBg,
                  border: `1px solid ${scoreColor}`,
                  minWidth: '120px'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
                    {score}%
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: scoreColor, marginTop: '0.25rem', textTransform: 'uppercase' }}>
                    Match Score
                  </div>
                </div>
              </div>

              {/* Action buttons row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleActivate(career)}
                    className="btn btn-primary btn-sm"
                    disabled={activatingSlug === career.slug}
                  >
                    <MapPin size={15} />
                    <span>{activatingSlug === career.slug ? 'Activating...' : 'Set Active Roadmap'}</span>
                  </button>

                  <button
                    onClick={() => onAnalyzeSkillGap && onAnalyzeSkillGap(career.slug)}
                    className="btn btn-secondary btn-sm"
                  >
                    <GitPullRequest size={15} />
                    <span>Analyze Skill Gap</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleExpand(career.slug)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--primary)', fontWeight: 600 }}
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Full Breakdown'}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Expandable Deep Dive Section */}
              {isExpanded && (
                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {/* Skills Grid */}
                  <div className="grid-2">
                    <div>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <CheckCircle2 size={16} color="var(--emerald)" />
                        <span>Prerequisites & Required Technical Skills</span>
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {(career.requiredTechnicalSkills || []).map((sk, idx) => (
                          <span key={idx} className="tag tag-active" style={{ fontSize: '0.75rem' }}>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <AlertTriangle size={16} color="var(--amber)" />
                        <span>Target Skills to Accelerate (Skill Gaps)</span>
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {(career.missingSkills && career.missingSkills.length > 0
                          ? career.missingSkills
                          : (career.requiredTechnicalSkills || []).slice(2)
                        ).map((sk, idx) => (
                          <span key={idx} className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Typical Roles & Salary Estimates */}
                  <div className="grid-2" style={{ backgroundColor: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.375rem' }}>
                        <Briefcase size={16} color="var(--primary)" />
                        <span>Typical Entry-Level Job Roles:</span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        {(career.typicalRoles || ['Associate Software Developer', 'Junior Engineer']).join(' • ')}
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.375rem' }}>
                        <DollarSign size={16} color="var(--emerald)" />
                        <span>Approximate Salary Estimates:</span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        <strong>Entry:</strong> {career.approxSalary?.entryLevel || '$70,000 - $95,000'} | <strong>Experienced:</strong> {career.approxSalary?.experienced || '$120,000+'}
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          *Approximate estimates; depend on region, experience, and employer. Not a compensation guarantee.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Beginner Project Ideas */}
                  {career.beginnerProjects && career.beginnerProjects.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Code2 size={16} color="var(--violet)" />
                        <span>Recommended Beginner Portfolio Projects</span>
                      </h4>
                      <div className="grid-3">
                        {career.beginnerProjects.map((p, pIdx) => (
                          <div key={pIdx} style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{p.title}</span>
                              <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>{p.difficulty}</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                              {p.description}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                              {(p.technologies || []).map((t, tIdx) => (
                                <span key={tIdx} style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
