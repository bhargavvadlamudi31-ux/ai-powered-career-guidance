import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Brain,
  Code,
  Layers,
  Users,
  Target,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AssessmentPage = ({ onComplete }) => {
  const { profile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form State covering all required dimensions
  const [answers, setAnswers] = useState({
    // Step 1: Technical Aptitude & Core Foundation
    technicalLevel: 'intermediate',
    technicalRating: 75,
    preferredTechDomain: 'web_and_software',
    toolsComfort: ['git', 'javascript', 'python'],

    // Step 2: Problem Solving & Analytical Thinking
    problemSolvingRating: 80,
    analyticalRating: 85,
    puzzleComfort: 'enjoy_complex_logic',
    dataApproach: 'structured_quantitative',

    // Step 3: Creativity & Design Thinking
    creativityRating: 70,
    visualDesignInterest: 'moderate',
    productIdeation: 'enjoy_brainstorming_features',

    // Step 4: Communication & Collaboration
    communicationRating: 75,
    leadershipRating: 70,
    teamDynamic: 'cross_functional',
    presentationComfort: 'comfortable_small_groups',

    // Step 5: Interests & Preferred Activities
    selectedInterests: ['Web Development', 'Machine Learning & AI', 'Building Products'],
    favoriteActivity: 'building_hands_on_apps',

    // Step 6: Work Style, Environment & Career Goals
    preferredWorkStyle: 'hybrid',
    organizationType: 'growth_startup',
    targetTimeline: 'internship_next_term',
    primaryGoal: 'secure_impactful_internship'
  });

  const totalSteps = 6;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const handleNext = () => {
    setError('');
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleInterest = (interest) => {
    const current = answers.selectedInterests || [];
    if (current.includes(interest)) {
      setAnswers({ ...answers, selectedInterests: current.filter(i => i !== interest) });
    } else {
      setAnswers({ ...answers, selectedInterests: [...current, interest] });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await api.submitAssessment(answers);
      if (onComplete) {
        onComplete(res.topCareers, res.assessment);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit assessment. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Top Header Card */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">Multidimensional Career Discovery</span>
              <span className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-muted)' }}>
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              AI Career Assessment Questionnaire
            </h2>
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>
            {progressPercent}% Complete
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container" style={{ height: '8px' }}>
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Methodology notice */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <ShieldCheck size={14} color="#10B981" />
          <span>
            Transparent scoring: Evaluates skill overlap (35%), aptitude dimensions (30%), interests (20%), and work preferences (15%). Not a clinical psychological exam.
          </span>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--rose-light)',
          color: 'var(--rose)',
          marginBottom: '1.5rem'
        }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Questionnaire Body */}
      <div className="card" style={{ padding: '2rem' }}>
        {/* Step 1: Technical Aptitude & Core Foundation */}
        {currentStep === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
              <Code size={22} color="var(--primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                1. Technical Foundation & Tool Familiarity
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
              How comfortable are you with code, command-line interfaces, and software tools?
            </p>

            <div className="form-group">
              <label className="form-label">Self-Assessed Technical Confidence (0 to 100)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={answers.technicalRating}
                  onChange={(e) => setAnswers({ ...answers, technicalRating: Number(e.target.value) })}
                  style={{ flex: 1, accentColor: 'var(--primary)', height: '6px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--primary)', width: '45px' }}>
                  {answers.technicalRating}%
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Which technical domain attracts you most?</label>
              <div className="grid-2">
                {[
                  { id: 'web_and_software', label: 'Web Applications & Software Systems', desc: 'Building responsive apps, APIs, and client-server products' },
                  { id: 'data_and_ai', label: 'Data Science & Machine Learning', desc: 'Discovering patterns, statistics, training neural networks' },
                  { id: 'cloud_and_security', label: 'Cloud Architecture & Cybersecurity', desc: 'Managing servers, automation, defense and networks' },
                  { id: 'design_and_product', label: 'User Experience & Product Strategy', desc: 'UI prototyping, user journeys, feature specifications' }
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, preferredTechDomain: opt.id })}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${answers.preferredTechDomain === opt.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: answers.preferredTechDomain === opt.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.25rem', color: answers.preferredTechDomain === opt.id ? 'var(--primary)' : 'var(--text-primary)' }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {opt.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Problem Solving & Analytical Thinking */}
        {currentStep === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
              <Brain size={22} color="var(--violet)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                2. Problem Solving & Analytical Thinking
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
              We evaluate your mental model when tackling ambiguous bugs or debugging complex logic.
            </p>

            <div className="form-group">
              <label className="form-label">Problem Solving Aptitude Self-Rating (0 to 100)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={answers.problemSolvingRating}
                  onChange={(e) => setAnswers({ ...answers, problemSolvingRating: Number(e.target.value) })}
                  style={{ flex: 1, accentColor: 'var(--violet)', height: '6px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--violet)', width: '45px' }}>
                  {answers.problemSolvingRating}%
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Analytical Thinking & Data Rigor (0 to 100)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={answers.analyticalRating}
                  onChange={(e) => setAnswers({ ...answers, analyticalRating: Number(e.target.value) })}
                  style={{ flex: 1, accentColor: 'var(--cyan)', height: '6px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--cyan)', width: '45px' }}>
                  {answers.analyticalRating}%
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">When faced with an unfamiliar technical problem, what is your instinct?</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { id: 'break_down_logically', label: 'Deconstruct into atomic sub-problems and test hypotheses systematically' },
                  { id: 'search_patterns', label: 'Look for existing architectural patterns, documentation, and proven solutions' },
                  { id: 'collaborate_discuss', label: 'Bounce ideas off teammates and talk through design trade-offs' }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: answers.puzzleComfort === opt.id ? 'var(--primary-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="puzzleComfort"
                      checked={answers.puzzleComfort === opt.id}
                      onChange={() => setAnswers({ ...answers, puzzleComfort: opt.id })}
                    />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Creativity & Design Thinking */}
        {currentStep === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
              <Layers size={22} color="var(--primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                3. Creativity & Design Thinking
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
              Understanding user empathy, visual aesthetics, and creative innovation.
            </p>

            <div className="form-group">
              <label className="form-label">Creative & Design Thinking Index (0 to 100)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={answers.creativityRating}
                  onChange={(e) => setAnswers({ ...answers, creativityRating: Number(e.target.value) })}
                  style={{ flex: 1, accentColor: 'var(--primary)', height: '6px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--primary)', width: '45px' }}>
                  {answers.creativityRating}%
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">How much do you care about visual aesthetics and user interface polish?</label>
              <div className="grid-3">
                {[
                  { id: 'very_high', label: 'Essential', desc: 'I love crafting pixel-perfect, delightful user interfaces' },
                  { id: 'moderate', label: 'Balanced', desc: 'I appreciate good UI but also enjoy backend logic' },
                  { id: 'low', label: 'Minimal', desc: 'I prefer pure algorithms, data, or terminal systems' }
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, visualDesignInterest: opt.id })}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${answers.visualDesignInterest === opt.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: answers.visualDesignInterest === opt.id ? 'var(--primary-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {opt.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Communication & Collaboration */}
        {currentStep === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
              <Users size={22} color="var(--emerald)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                4. Communication & Leadership Instincts
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
              Software engineering and modern tech require cross-functional teamwork, writing clear docs, and leadership.
            </p>

            <div className="form-group">
              <label className="form-label">Communication & Articulation Comfort (0 to 100)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={answers.communicationRating}
                  onChange={(e) => setAnswers({ ...answers, communicationRating: Number(e.target.value) })}
                  style={{ flex: 1, accentColor: 'var(--emerald)', height: '6px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--emerald)', width: '45px' }}>
                  {answers.communicationRating}%
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Leadership & Initiative Willingness (0 to 100)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={answers.leadershipRating}
                  onChange={(e) => setAnswers({ ...answers, leadershipRating: Number(e.target.value) })}
                  style={{ flex: 1, accentColor: 'var(--amber)', height: '6px' }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--amber)', width: '45px' }}>
                  {answers.leadershipRating}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Interests & Preferred Activities */}
        {currentStep === 5 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
              <Sparkles size={22} color="var(--cyan)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                5. Interests & Favorite Activities
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Select all topics and fields that genuinely spark your curiosity.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.5rem' }}>
              {[
                'Web Development',
                'Mobile Apps',
                'Machine Learning & AI',
                'Data Analytics & BI',
                'Cloud Architecture & DevOps',
                'Cybersecurity & Ethical Hacking',
                'UI/UX Design',
                'Product Strategy & Management',
                'Business Process Analysis',
                'Digital Marketing & SEO',
                'Civil Services & Governance',
                'Competitive Exam Aptitude',
                'Database Architecture',
                'Algorithms & LeetCode',
                'Blockchain & Cryptography'
              ].map((interest) => {
                const isSelected = answers.selectedInterests?.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`tag ${isSelected ? 'tag-active' : ''}`}
                    style={{
                      padding: '0.5rem 0.875rem',
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected && <CheckCircle2 size={14} style={{ marginRight: '0.375rem' }} />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 6: Work Style, Environment & Career Goals */}
        {currentStep === 6 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
              <Target size={22} color="var(--primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                6. Work Style, Environment & Goals
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
              Final step: align your preferences with company stages and career timelines.
            </p>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Preferred Workplace Model</label>
                <select
                  className="form-select"
                  value={answers.preferredWorkStyle}
                  onChange={(e) => setAnswers({ ...answers, preferredWorkStyle: e.target.value })}
                >
                  <option value="remote">Fully Remote (Work from anywhere)</option>
                  <option value="hybrid">Hybrid (2-3 days office flexibility)</option>
                  <option value="office">In-Person Office Environment</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Organization Culture</label>
                <select
                  className="form-select"
                  value={answers.organizationType}
                  onChange={(e) => setAnswers({ ...answers, organizationType: e.target.value })}
                >
                  <option value="growth_startup">Fast-Paced Startup (High ownership)</option>
                  <option value="enterprise">Established Enterprise / MNC (Structure & mentorship)</option>
                  <option value="public_sector">Public Sector / Government (Public service & stability)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Immediate Career Milestone Goal</label>
              <select
                className="form-select"
                value={answers.primaryGoal}
                onChange={(e) => setAnswers({ ...answers, primaryGoal: e.target.value })}
              >
                <option value="secure_impactful_internship">Secure an impactful Summer/Fall Internship</option>
                <option value="full_time_graduate_role">Land a Full-Time Entry-Level SDE/Analyst Job</option>
                <option value="explore_switch_domains">Explore different domains before committing</option>
                <option value="prepare_competitive_exams">Systematic preparation for competitive exams</option>
              </select>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              <span>Next Dimension</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary btn-lg"
              disabled={submitting}
            >
              {submitting ? (
                <span>Calculating Recommendations...</span>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Submit & View Recommendations</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
