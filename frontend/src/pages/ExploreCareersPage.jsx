import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Filter,
  ArrowRight,
  Code2,
  Briefcase,
  ExternalLink,
  BookOpen,
  DollarSign,
  CheckCircle2,
  MapPin,
  X,
  Layers
} from 'lucide-react';
import { api } from '../services/api';

export const ExploreCareersPage = ({ onSelectCareerForRoadmap, onAnalyzeSkillGap }) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [workStyle, setWorkStyle] = useState('all');
  const [education, setEducation] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, [category, workStyle, education]);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await api.getAllCareers({
        search,
        category,
        workStyle,
        education
      });
      setCareers(res.careers || []);
    } catch (err) {
      console.error('Failed to load careers catalogue:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCareers();
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span className="badge badge-primary">Career Catalogue</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>12 Verified Tracks</span>
        </div>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 800 }}>
          Explore High-Impact Careers
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
          Search and filter across disciplines, review required technical and soft skills, inspect step-by-step roadmaps, and explore beginner projects.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem 1.5rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Input */}
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search by career title, skill (Python, React), or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Category Filter */}
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: 'auto', flex: '0 1 180px' }}
          >
            <option value="all">All Categories</option>
            <option value="engineering">Software Engineering</option>
            <option value="data">Data & AI</option>
            <option value="security">Cloud & Security</option>
            <option value="design">Design & Product</option>
            <option value="business">Business & Growth</option>
            <option value="public_sector">Civil & Public Sector</option>
          </select>

          {/* Work Style Filter */}
          <select
            className="form-select"
            value={workStyle}
            onChange={(e) => setWorkStyle(e.target.value)}
            style={{ width: 'auto', flex: '0 1 150px' }}
          >
            <option value="all">All Work Styles</option>
            <option value="remote">Remote Friendly</option>
            <option value="hybrid">Hybrid</option>
            <option value="office">In-Person Office</option>
          </select>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.625rem 1.25rem' }}>
            Filter
          </button>
        </form>
      </div>

      {/* Career Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          Loading career catalogue...
        </div>
      ) : careers.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No careers matched your search filters.</p>
          <button
            onClick={() => { setSearch(''); setCategory('all'); setWorkStyle('all'); }}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {careers.map((career) => (
            <div
              key={career.slug}
              className="card card-interactive"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => setSelectedCareer(career)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-primary">
                    {career.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {career.roadmapSteps?.length || 6} Phases
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {career.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {career.description}
                </p>

                {/* Technical Skills Preview */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.375rem', textTransform: 'uppercase' }}>
                    Key Required Skills:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {(career.requiredTechnicalSkills || []).slice(0, 4).map((sk, idx) => (
                      <span key={idx} className="tag" style={{ fontSize: '0.6875rem' }}>
                        {sk}
                      </span>
                    ))}
                    {(career.requiredTechnicalSkills || []).length > 4 && (
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                        +{career.requiredTechnicalSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                paddingTop: '0.875rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8125rem'
              }}>
                <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>
                  {career.approxSalary?.entryLevel ? career.approxSalary.entryLevel.split('/')[0] : 'Competitive'}
                </span>
                <span style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Career Modal */}
      {selectedCareer && (
        <div className="modal-overlay" onClick={() => setSelectedCareer(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '800px', maxHeight: '88vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCareer(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                padding: '0.375rem',
                borderRadius: '50%',
                color: 'var(--text-muted)',
                display: 'flex'
              }}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Career Title & Category */}
            <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-primary">{selectedCareer.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Slug: {selectedCareer.slug}</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                {selectedCareer.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginTop: '0.5rem' }}>
                {selectedCareer.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              marginBottom: '1.75rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => {
                  if (onSelectCareerForRoadmap) onSelectCareerForRoadmap(selectedCareer.slug);
                  setSelectedCareer(null);
                }}
                className="btn btn-primary"
              >
                <MapPin size={16} />
                <span>Set as Active Learning Roadmap</span>
              </button>

              <button
                onClick={() => {
                  if (onAnalyzeSkillGap) onAnalyzeSkillGap(selectedCareer.slug);
                  setSelectedCareer(null);
                }}
                className="btn btn-secondary"
              >
                <span>Analyze Skill Gap</span>
              </button>
            </div>

            {/* Salary Estimates & Roles */}
            <div className="grid-2" style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.75rem'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  Typical Entry-Level Roles:
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  {(selectedCareer.typicalRoles || []).join(' • ')}
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  Approximate Compensation:
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <strong>Entry:</strong> {selectedCareer.approxSalary?.entryLevel}
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {selectedCareer.approxSalary?.disclaimer}
                  </div>
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Required Technical & Soft Skills
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {(selectedCareer.requiredTechnicalSkills || []).map((sk, idx) => (
                  <span key={idx} className="tag tag-active" style={{ fontSize: '0.8125rem' }}>
                    {sk}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {(selectedCareer.requiredSoftSkills || []).map((sk, idx) => (
                  <span key={idx} className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)' }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Beginner Projects */}
            {selectedCareer.beginnerProjects && selectedCareer.beginnerProjects.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Beginner-Friendly Portfolio Projects
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedCareer.beginnerProjects.map((p, pIdx) => (
                    <div key={pIdx} style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{p.title}</span>
                        <span className="badge badge-primary">{p.difficulty}</span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                        {p.description}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {(p.technologies || []).map((t, tIdx) => (
                          <span key={tIdx} style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Roadmap Preview */}
            {selectedCareer.roadmapSteps && selectedCareer.roadmapSteps.length > 0 && (
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Curated Learning Roadmap ({selectedCareer.roadmapSteps.length} Steps)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedCareer.roadmapSteps.map((step, idx) => (
                    <div key={idx} style={{
                      padding: '0.875rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary)' }}>
                          Step {step.stepNumber}: {step.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {step.duration}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                        {step.description}
                      </p>

                      {/* Official resources preview */}
                      {step.resources && step.resources.length > 0 && (
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
                                gap: '0.25rem',
                                fontSize: '0.75rem',
                                color: 'var(--primary)',
                                textDecoration: 'underline'
                              }}
                            >
                              <span>{res.name}</span>
                              <ExternalLink size={11} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
