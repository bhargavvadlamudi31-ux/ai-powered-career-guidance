import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  GitPullRequest,
  BookOpen,
  MapPin,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const DashboardOverview = ({ onNavigate, onSelectCareer }) => {
  const { user, profile } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [latestAssessment, setLatestAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo realistic weekly study activity hours chart data
  const weeklyActivityData = [
    { day: 'Mon', hours: 2.5, tasks: 3 },
    { day: 'Tue', hours: 3.8, tasks: 4 },
    { day: 'Wed', hours: 1.5, tasks: 2 },
    { day: 'Thu', hours: 4.2, tasks: 5 },
    { day: 'Fri', hours: 3.0, tasks: 3 },
    { day: 'Sat', hours: 5.5, tasks: 6 },
    { day: 'Sun', hours: 4.0, tasks: 4 }
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [recsRes, roadmapRes, assessRes] = await Promise.all([
        api.getRecommendations().catch(() => ({ recommendations: [] })),
        api.getActiveRoadmap().catch(() => ({ roadmap: null })),
        api.getLatestAssessment().catch(() => ({ hasAssessment: false }))
      ]);

      setRecommendations(recsRes.recommendations || []);
      setActiveRoadmap(roadmapRes.roadmap || null);
      if (assessRes.hasAssessment) {
        setLatestAssessment(assessRes.assessment);
      }
    } catch (err) {
      console.error('Failed to load dashboard overview data:', err);
    } finally {
      setLoading(false);
    }
  };

  const completion = profile?.completionPercentage || 0;
  const topCareers = recommendations.slice(0, 5);

  const compatibilityChartData = topCareers.map((c) => ({
    name: c.title.length > 16 ? c.title.substring(0, 14) + '...' : c.title,
    fullName: c.title,
    Compatibility: c.compatibilityScore || 80
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Welcome Banner Card */}
      <div className="card" style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.1) 100%)',
        border: '1px solid var(--primary-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
              <span className="badge badge-primary">Student Command Center</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Term: {profile?.currentYear || 'Academic Year'}
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Hello, {user?.name || 'Student'}!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '650px', lineHeight: 1.5 }}>
              {profile?.careerGoals
                ? `Target Goal: "${profile.careerGoals}"`
                : 'Track your personalized career milestones, monitor your skill gap radar, and consult CompassBot anytime.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('assessment')}
              className="btn btn-primary"
            >
              <Sparkles size={16} />
              <span>{latestAssessment ? 'Retake Assessment' : 'Take Career Assessment'}</span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="btn btn-secondary"
            >
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Quick Metric Cards */}
      <div className="grid-4">
        {/* Profile Completion */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Profile Strength
            </span>
            <span className="badge badge-primary">{completion}%</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {completion < 80 ? 'Developing' : 'High Quality'}
          </div>
          <div className="progress-container" style={{ height: '6px', marginBottom: '0.5rem' }}>
            <div className="progress-fill" style={{ width: `${completion}%` }} />
          </div>
          <button
            onClick={() => onNavigate('profile')}
            style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}
          >
            Update skills & bio &rarr;
          </button>
        </div>

        {/* Latest Assessment */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Top Career Match
            </span>
            <span className="badge badge-emerald">
              {topCareers[0]?.compatibilityScore || 92}%
            </span>
          </div>
          <div style={{ fontSize: '1.1875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {topCareers[0]?.title || 'Full-Stack Developer'}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.5rem' }}>
            {topCareers[0]?.category || 'Software Engineering'}
          </p>
          <button
            onClick={() => onNavigate('recommendations')}
            style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}
          >
            Inspect top 5 matches &rarr;
          </button>
        </div>

        {/* Active Roadmap Progress */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Roadmap Progress
            </span>
            <span className="badge badge-violet">
              {activeRoadmap?.progressPercentage || 0}%
            </span>
          </div>
          <div style={{ fontSize: '1.1875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {activeRoadmap?.careerTitle || 'Select a Track'}
          </div>
          <div className="progress-container" style={{ height: '6px', marginBottom: '0.5rem' }}>
            <div className="progress-fill" style={{ width: `${activeRoadmap?.progressPercentage || 0}%` }} />
          </div>
          <button
            onClick={() => onNavigate('roadmap')}
            style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}
          >
            Open step-by-step roadmap &rarr;
          </button>
        </div>

        {/* AI Assistant Quick Launcher */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              CompassBot AI
            </span>
            <span className="badge badge-emerald">Online</span>
          </div>
          <div style={{ fontSize: '1.1875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Career Assistant
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.5rem' }}>
            Ask questions about internship prep, projects, and interview prep.
          </p>
          <button
            onClick={() => onNavigate('chat')}
            style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}
          >
            Start counseling session &rarr;
          </button>
        </div>
      </div>

      {/* Main Charts & Activity Row */}
      <div className="grid-2">
        {/* Career Compatibility Comparison Bar Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                Top 5 Career Compatibility Scores
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Calculated transparently across skills, dimensions, and interests
              </p>
            </div>
            <button
              onClick={() => onNavigate('recommendations')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', color: 'var(--primary)' }}
            >
              View Details
            </button>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compatibilityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Bar dataKey="Compatibility" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Compatibility %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Learning Activity Area Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                Weekly Learning Progress
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Tracked hours dedicated to roadmap milestones this week
              </p>
            </div>
            <span className="badge badge-emerald">24.5 Total Hours</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Area type="monotone" dataKey="hours" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#hoursGrad)" name="Hours Studied" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Roadmap Next Tasks & Skills to Improve */}
      <div className="grid-2">
        {/* Next Pending Tasks on Active Roadmap */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                Next Roadmap Milestones
              </h3>
            </div>
            <button
              onClick={() => onNavigate('roadmap')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', color: 'var(--primary)' }}
            >
              Open Roadmap &rarr;
            </button>
          </div>

          {activeRoadmap?.steps ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activeRoadmap.steps.slice(0, 3).map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Step {step.stepNumber}: {step.title}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      {step.duration}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              No active roadmap selected. Select a career to generate an actionable path!
            </p>
          )}
        </div>

        {/* Priority Skills to Accelerate */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GitPullRequest size={18} color="var(--amber)" />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                High-Priority Skill Gaps
              </h3>
            </div>
            <button
              onClick={() => onNavigate('skill-gap')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', color: 'var(--primary)' }}
            >
              Skill Radar &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { skill: 'Data Structures & Algorithms', role: 'Software Developer', priority: 'Urgent Prerequisite', level: 'Need ~40% boost' },
              { skill: 'Docker & Containerization', role: 'Full-Stack Developer', priority: 'High Priority', level: 'Need ~50% boost' },
              { skill: 'Relational Database Indexing & SQL', role: 'Data Analyst / SDE', priority: 'Recommended', level: 'Need ~30% boost' }
            ].map((sk, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{sk.skill}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Target Role: {sk.role}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.6875rem' }}>
                    {sk.priority}
                  </span>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {sk.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
