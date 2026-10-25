import React, { useState, useEffect } from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Target,
  Sparkles,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { api } from '../services/api';

export const SkillGapPage = ({ initialCareerSlug }) => {
  const [careerSlug, setCareerSlug] = useState(initialCareerSlug || 'full-stack-developer');
  const [data, setData] = useState(null);
  const [allCareers, setAllCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'radar'

  useEffect(() => {
    fetchSkillGap();
  }, [careerSlug]);

  useEffect(() => {
    api.getAllCareers()
      .then(res => setAllCareers(res.careers || []))
      .catch(err => console.error(err));
  }, []);

  const fetchSkillGap = async () => {
    setLoading(true);
    try {
      const res = await api.getSkillGapAnalysis(careerSlug);
      setData(res);
    } catch (err) {
      console.error('Failed to fetch skill gap analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        Analyzing your skill competency gaps...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Could not compute skill gap analysis. Please try selecting a different career.</p>
      </div>
    );
  }

  const {
    career,
    readinessScore,
    skillsAcquired,
    skillsToImprove,
    softSkillsAcquired,
    softSkillsToImprove,
    chartData,
    practiceTasks,
    methodology
  } = data;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Card */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">
                <GitPullRequest size={13} />
                <span>Competency Radar</span>
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Target: {career.title}
              </span>
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800 }}>
              Skill Gap & Readiness Analysis
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              Side-by-side comparison between your saved skills and industry benchmarks for <strong style={{ color: 'var(--text-primary)' }}>{career.title}</strong>.
            </p>
          </div>

          {/* Career Selector */}
          <div style={{ minWidth: '220px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
              Target Career Benchmark
            </label>
            <select
              className="form-select"
              value={careerSlug}
              onChange={(e) => setCareerSlug(e.target.value)}
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

        {/* Readiness Metric Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Readiness Score
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: readinessScore >= 60 ? 'var(--emerald)' : 'var(--primary)' }}>
              {readinessScore}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Prerequisites currently verified
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Skills Acquired
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald)' }}>
              {skillsAcquired.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Directly applicable to role
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Skills to Acquire
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--amber)' }}>
              {skillsToImprove.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Priority learning targets
            </div>
          </div>
        </div>

        {/* Methodology explainer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Info size={14} color="var(--primary)" />
          <span>{methodology}</span>
        </div>
      </div>

      {/* Visual Comparison Chart Card */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Proficiency Benchmark Comparison
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Current estimated proficiency vs target entry-level hiring benchmark (0 - 100)
            </p>
          </div>

          <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)', padding: '0.25rem' }}>
            <button
              onClick={() => setChartType('bar')}
              className={`btn btn-sm ${chartType === 'bar' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem' }}
            >
              Bar Comparison
            </button>
            <button
              onClick={() => setChartType('radar')}
              className={`btn btn-sm ${chartType === 'radar' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem' }}
            >
              Radar Map
            </button>
          </div>
        </div>

        <div style={{ height: '360px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="skill" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Current" fill="#4F46E5" name="Your Current Level" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Target" fill="#10B981" name="Target Benchmark" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <RadarChart data={chartData}>
                <PolarGrid stroke="var(--border-subtle)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <PolarRadiusAxis domain={[0, 100]} stroke="var(--border-strong)" />
                <Radar name="Your Current Level" dataKey="Current" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.4} />
                <Radar name="Target Benchmark" dataKey="Target" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                <Tooltip />
                <Legend />
              </RadarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Side by side skills breakdown */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Acquired Skills */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <CheckCircle2 size={20} color="var(--emerald)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
              Skills You Already Have ({skillsAcquired.length})
            </h3>
          </div>

          {skillsAcquired.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              No recorded skills match this track yet. Add skills to your profile or take the assessment!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skillsAcquired.map((item, idx) => (
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
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{item.name}</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.6875rem' }}>
                      Proficiency: ~{item.currentProficiency}%
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {item.recommendedAction}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills to Improve */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <AlertTriangle size={20} color="var(--amber)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
              Skills to Learn / Accelerate ({skillsToImprove.length})
            </h3>
          </div>

          {skillsToImprove.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--emerald)' }}>
              🎉 You have met all key prerequisite technical skills for this role!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skillsToImprove.map((item, idx) => (
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
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{item.name}</span>
                    <span className="badge badge-amber" style={{ fontSize: '0.6875rem' }}>
                      {item.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {item.recommendedAction}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Practice Sprints */}
      {practiceTasks && practiceTasks.length > 0 && (
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Zap size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 800 }}>
              Tailored Practice Sprints to Close Your Gaps
            </h3>
          </div>
          <div className="grid-2">
            {practiceTasks.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface-elevated)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>{t.skill}</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{t.priority}</span>
                </div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {t.title}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
