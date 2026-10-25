import React, { useState, useEffect } from 'react';
import {
  MapPin,
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import { api } from '../services/api';

export const RoadmapPage = ({ initialCareerSlug }) => {
  const [roadmap, setRoadmap] = useState(null);
  const [allCareers, setAllCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  useEffect(() => {
    loadRoadmapAndCareers();
  }, [initialCareerSlug]);

  const loadRoadmapAndCareers = async () => {
    setLoading(true);
    try {
      const [roadmapRes, careersRes] = await Promise.all([
        initialCareerSlug ? api.selectCareerRoadmap(initialCareerSlug) : api.getActiveRoadmap(),
        api.getAllCareers()
      ]);
      setRoadmap(roadmapRes.roadmap);
      setAllCareers(careersRes.careers || []);
    } catch (err) {
      console.error('Failed to load learning roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCareerChange = async (slug) => {
    setLoading(true);
    try {
      const res = await api.selectCareerRoadmap(slug);
      setRoadmap(res.roadmap);
    } catch (err) {
      console.error('Failed to switch career roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId, currentCompleted) => {
    setUpdatingTaskId(taskId);
    try {
      const res = await api.updateRoadmapTask(taskId, !currentCompleted);
      setRoadmap(res.roadmap);
    } catch (err) {
      console.error('Failed to update roadmap task:', err);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        Loading your personalized learning roadmap...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No active roadmap found. Please select a career track.</p>
      </div>
    );
  }

  const progress = roadmap.progressPercentage || 0;

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto' }}>
      {/* Top Roadmap Overview Card */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">Active Learning Track</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {roadmap.steps?.length || 0} Sequential Milestones
              </span>
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800 }}>
              {roadmap.careerTitle} Roadmap
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              Step-by-step curriculum with hands-on practice tasks, estimated study time, and verified official documentation.
            </p>
          </div>

          {/* Career Switcher Dropdown */}
          <div style={{ minWidth: '220px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
              Switch Career Roadmap
            </label>
            <select
              className="form-select"
              value={roadmap.careerSlug}
              onChange={(e) => handleCareerChange(e.target.value)}
              style={{ fontWeight: 600 }}
            >
              {allCareers.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overall Completion Progress */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
              Curriculum Milestone Completion
            </span>
            <span style={{ fontSize: '1.125rem', fontWeight: 800, color: progress === 100 ? 'var(--emerald)' : 'var(--primary)' }}>
              {progress}%
            </span>
          </div>
          <div className="progress-container" style={{ height: '10px' }}>
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                background: progress === 100 ? 'var(--emerald)' : undefined
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            <span>Check off tasks as you build projects to reflect your progress.</span>
            {progress === 100 && (
              <span style={{ color: 'var(--emerald)', fontWeight: 700 }}>
                🏆 Full Roadmap Completed! Outstanding accomplishment.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sequential Roadmap Timeline Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {(roadmap.steps || []).map((step, sIdx) => {
          const stepDone = step.isCompleted;

          return (
            <div
              key={sIdx}
              className="card"
              style={{
                border: stepDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                backgroundColor: stepDone ? 'var(--bg-surface)' : 'var(--bg-surface)',
                position: 'relative',
                padding: '1.75rem'
              }}
            >
              {/* Step Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: stepDone ? 'var(--emerald-light)' : 'var(--primary-light)',
                    color: stepDone ? 'var(--emerald)' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem'
                  }}>
                    {stepDone ? <CheckCircle2 size={20} /> : step.stepNumber}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 800 }}>
                      {step.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <span className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-muted)' }}>
                        <Clock size={12} />
                        <span>{step.duration}</span>
                      </span>
                      {stepDone && (
                        <span className="badge badge-emerald">
                          Completed Phase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {step.description}
              </p>

              {/* Prerequisite skills */}
              {step.requiredSkills && step.requiredSkills.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                    Skills Covered in This Phase:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {step.requiredSkills.map((sk, idx) => (
                      <span key={idx} className="tag" style={{ fontSize: '0.75rem' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Checkbox Tasks */}
              {step.tasks && step.tasks.length > 0 && (
                <div style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    Practical Milestones & Tasks:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {step.tasks.map((task) => (
                      <label
                        key={task.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                          textDecoration: task.completed ? 'line-through' : 'none'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(task.completed)}
                          disabled={updatingTaskId === task.id}
                          onChange={() => handleToggleTask(task.id, task.completed)}
                          style={{
                            marginTop: '0.2rem',
                            width: '18px',
                            height: '18px',
                            accentColor: 'var(--primary)',
                            cursor: 'pointer'
                          }}
                        />
                        <span style={{ lineHeight: 1.45 }}>{task.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Curated Official Resources */}
              {step.resources && step.resources.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Curated Official Learning Resources:
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {step.resources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          padding: '0.375rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--primary-light)',
                          color: 'var(--primary)',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          border: '1px solid var(--primary-border)'
                        }}
                      >
                        <BookOpen size={14} />
                        <span>{res.name}</span>
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
