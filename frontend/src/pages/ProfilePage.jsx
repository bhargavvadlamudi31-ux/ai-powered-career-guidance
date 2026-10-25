import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Sparkles,
  BookOpen,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { profile, updateProfile, user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    ageRange: '',
    educationLevel: '',
    degree: '',
    currentYear: '',
    gpa: '',
    preferredWorkEnvironment: '',
    careerGoals: '',
    preferredLearningStyle: '',
    locationPreference: '',
    budget: '',
    technicalSkills: [],
    softSkills: [],
    interests: [],
    favouriteSubjects: []
  });

  const [techSkillInput, setTechSkillInput] = useState('');
  const [softSkillInput, setSoftSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || user?.name || '',
        ageRange: profile.ageRange || '',
        educationLevel: profile.educationLevel || '',
        degree: profile.degree || '',
        currentYear: profile.currentYear || '',
        gpa: profile.gpa || '',
        preferredWorkEnvironment: profile.preferredWorkEnvironment || '',
        careerGoals: profile.careerGoals || '',
        preferredLearningStyle: profile.preferredLearningStyle || '',
        locationPreference: profile.locationPreference || '',
        budget: profile.budget || '',
        technicalSkills: profile.technicalSkills || [],
        softSkills: profile.softSkills || [],
        interests: profile.interests || [],
        favouriteSubjects: profile.favouriteSubjects || []
      });
    }
  }, [profile, user]);

  const handleAddItem = (field, item, setInput) => {
    if (!item || !item.trim()) return;
    const trimmed = item.trim();
    if (!formData[field].includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], trimmed]
      }));
    }
    setInput('');
  };

  const handleRemoveItem = (field, indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaveSuccess(false);

    try {
      await updateProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setError(err.message || 'Failed to update student profile.');
    } finally {
      setSaving(false);
    }
  };

  const completion = profile?.completionPercentage || 0;

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Header Card */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">Personal Details & Career Context</span>
              <span className="badge badge-emerald">Encrypted & Private</span>
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800 }}>
              Student Academic & Professional Profile
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
              Your profile is used to personalize career recommendations, roadmap milestones, and skill gap benchmarks.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Profile Completion
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
              {completion}%
            </div>
          </div>
        </div>

        <div className="progress-container" style={{ height: '8px' }}>
          <div className="progress-fill" style={{ width: `${completion}%` }} />
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
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
          <span>Profile updated successfully! AI recommendations refreshed.</span>
        </div>
      )}

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--rose-light)',
          color: 'var(--rose)',
          marginBottom: '1.5rem'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        {/* Section 1: Core Academic Information */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <GraduationCap size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 800 }}>
              Academic Background & Current Stage
            </h3>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Maya Patel"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age Range</label>
              <select
                className="form-select"
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
              >
                <option value="">Select Age Range</option>
                <option value="Under 18">Under 18</option>
                <option value="18-20">18 - 20</option>
                <option value="21-24">21 - 24</option>
                <option value="25-29">25 - 29</option>
                <option value="30+">30+</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Education Level</label>
              <select
                className="form-select"
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
              >
                <option value="">Select Level</option>
                <option value="High School">High School / Pre-University</option>
                <option value="Undergraduate / Bachelor">Undergraduate / Bachelor Degree</option>
                <option value="Postgraduate / Master">Postgraduate / Master Degree</option>
                <option value="Diploma">Diploma / Polytechnic</option>
                <option value="Doctorate / PhD">Doctorate / PhD</option>
                <option value="Self-Taught">Self-Taught / Bootcamp</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Degree & Specialization</label>
              <input
                type="text"
                className="form-control"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g. B.Tech Computer Science / BBA Information Systems"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Current Year of Study</label>
              <select
                className="form-select"
                value={formData.currentYear}
                onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="Final Year">Final Year (Senior)</option>
                <option value="Recent Graduate">Recent Graduate</option>
                <option value="Working Professional Exploring Career Change">Working Professional Exploring Career Change</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Academic Performance / GPA (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="e.g. 3.8 / 4.0 or 8.5 CGPA"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Technical & Soft Skills */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sparkles size={20} color="var(--violet)" />
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 800 }}>
              Skills & Proficiencies
            </h3>
          </div>

          {/* Technical Skills Tag Manager */}
          <div className="form-group">
            <label className="form-label">Technical Skills (e.g. Python, React, SQL, Git)</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Type a skill and press Add or Enter..."
                value={techSkillInput}
                onChange={(e) => setTechSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('technicalSkills', techSkillInput, setTechSkillInput);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddItem('technicalSkills', techSkillInput, setTechSkillInput)}
                className="btn btn-secondary"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {formData.technicalSkills.map((sk, idx) => (
                <span key={idx} className="tag tag-active" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span>{sk}</span>
                  <X
                    size={13}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveItem('technicalSkills', idx)}
                  />
                </span>
              ))}
              {formData.technicalSkills.length === 0 && (
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  No technical skills added yet. Add skills like JavaScript, Python, Figma, or Docker.
                </span>
              )}
            </div>
          </div>

          {/* Soft Skills Tag Manager */}
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Soft Skills (e.g. Critical Thinking, Team Collaboration, Communication)</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Type a soft skill and press Add..."
                value={softSkillInput}
                onChange={(e) => setSoftSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('softSkills', softSkillInput, setSoftSkillInput);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddItem('softSkills', softSkillInput, setSoftSkillInput)}
                className="btn btn-secondary"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {formData.softSkills.map((sk, idx) => (
                <span key={idx} className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span>{sk}</span>
                  <X
                    size={13}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveItem('softSkills', idx)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Interests & Preferred Subjects */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <BookOpen size={20} color="var(--cyan)" />
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 800 }}>
              Interests & Favourite Subjects
            </h3>
          </div>

          <div className="form-group">
            <label className="form-label">Key Career Interests & Fields</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Machine Learning, Cloud Systems, Product Management..."
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('interests', interestInput, setInterestInput);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddItem('interests', interestInput, setInterestInput)}
                className="btn btn-secondary"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {formData.interests.map((it, idx) => (
                <span key={idx} className="badge badge-violet" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span>{it}</span>
                  <X
                    size={13}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveItem('interests', idx)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Work Style, Goals & Preferences */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Briefcase size={20} color="var(--emerald)" />
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 800 }}>
              Career Goals, Preferences & Learning Style
            </h3>
          </div>

          <div className="form-group">
            <label className="form-label">Your Primary Career Goal</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.careerGoals}
              onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
              placeholder="e.g. Secure a software engineering summer internship, transition from mechanical engineering to data analytics, or crack civil services exam."
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Preferred Work Environment</label>
              <select
                className="form-select"
                value={formData.preferredWorkEnvironment}
                onChange={(e) => setFormData({ ...formData, preferredWorkEnvironment: e.target.value })}
              >
                <option value="">Select Environment</option>
                <option value="Remote">Remote (Full Flexibility)</option>
                <option value="Hybrid">Hybrid (Balanced Office/Home)</option>
                <option value="Office">In-Person Office</option>
                <option value="Startup Environment">Fast-Moving Startup Environment</option>
                <option value="Enterprise / Corporate">Enterprise / Corporate MNC</option>
                <option value="Freelance / Contract">Freelance / Independent Consulting</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Learning Style</label>
              <select
                className="form-select"
                value={formData.preferredLearningStyle}
                onChange={(e) => setFormData({ ...formData, preferredLearningStyle: e.target.value })}
              >
                <option value="">Select Learning Style</option>
                <option value="Hands-on Projects & Building">Hands-on Projects & Building</option>
                <option value="Structured Video Courses">Structured Video Courses</option>
                <option value="Reading Documentation & Books">Reading Official Documentation & Books</option>
                <option value="Mentorship & Peer Study">Mentorship & Peer Study Groups</option>
                <option value="Fast-Paced Bootcamps">Fast-Paced Bootcamps</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Location Preference</label>
              <input
                type="text"
                className="form-control"
                value={formData.locationPreference}
                onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })}
                placeholder="e.g. Bangalore, Silicon Valley, London, or Flexible"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Budget for Learning Resources (Optional)</label>
              <select
                className="form-select"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="">Select Budget</option>
                <option value="Free / Open Source Resources Only">Free / Open Source Resources Only</option>
                <option value="Modest ($10 - $50 / month)">Modest ($10 - $50 / month)</option>
                <option value="Flexible / Premium Courses OK">Flexible / Premium Courses OK</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Action Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={saving}
            style={{ minWidth: '180px' }}
          >
            <Save size={18} />
            <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
