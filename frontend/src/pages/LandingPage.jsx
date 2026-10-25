import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Target,
  GitPullRequest,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Brain,
  Code,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Footer } from '../components/common/Footer';

export const LandingPage = ({ onStartAssessment, onExploreCareers, onOpenAuth, onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const careerCategories = [
    {
      title: 'Software & Web Engineering',
      count: '2 Core Tracks',
      desc: 'Architect modern full-stack web applications, scalable backend microservices, and distributed cloud systems.',
      icon: Code,
      color: '#4F46E5',
      badge: 'High Demand'
    },
    {
      title: 'Data & Artificial Intelligence',
      count: '3 Core Tracks',
      desc: 'Extract predictive value from massive datasets, train deep neural nets, and implement generative LLMs.',
      icon: Brain,
      color: '#7C3AED',
      badge: 'Exponential Growth'
    },
    {
      title: 'Cloud & Cybersecurity',
      count: '2 Core Tracks',
      desc: 'Provision elastic cloud infrastructure on AWS/Azure and defend enterprise networks against cyber attacks.',
      icon: Shield,
      color: '#0891B2',
      badge: 'Mission Critical'
    },
    {
      title: 'Design & Product Leadership',
      count: '2 Core Tracks',
      desc: 'Craft intuitive UI/UX prototypes in Figma and steer cross-functional product roadmaps from ideation to scale.',
      icon: Layers,
      color: '#EA580C',
      badge: 'High Creative Impact'
    },
    {
      title: 'Business & Growth Strategy',
      count: '2 Core Tracks',
      desc: 'Optimize operational workflows, analyze business requirements, and execute performance marketing campaigns.',
      icon: TrendingUp,
      color: '#059669',
      badge: 'Cross-Disciplinary'
    },
    {
      title: 'Civil Services & Competitive Exams',
      count: '1 Comprehensive Track',
      desc: 'Structured syllabus blueprints, quantitative aptitude mastery, and civil services analytical preparation.',
      icon: Award,
      color: '#D97706',
      badge: 'Public Sector'
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Create Your Student Profile',
      desc: 'Detail your education level, current year of study, existing technical foundation, soft skills, and work style preferences.'
    },
    {
      step: '02',
      title: 'Take the Interactive AI Assessment',
      desc: 'Answer a 10-minute multidimensional questionnaire evaluating problem-solving, analytical aptitude, and creative instincts.'
    },
    {
      step: '03',
      title: 'Receive Transparent Recommendations',
      desc: 'Review ranked career compatibility scores with clear explanations of why each path matches your specific strengths.'
    },
    {
      step: '04',
      title: 'Follow Step-by-Step Roadmaps',
      desc: 'Execute interactive milestone roadmaps with curated official resources, beginner project ideas, and skill gap tracking.'
    }
  ];

  const demoTestimonials = [
    {
      name: 'Rohan Sharma',
      role: '3rd Year B.Tech Student',
      university: 'National Institute of Technology',
      content: 'I was overwhelmed choosing between Web Dev and Data Science. The skill gap analyzer showed me that my React & JavaScript skills gave me a 92% compatibility with Full-Stack, saving me months of second-guessing!',
      tag: 'Full-Stack Developer Track'
    },
    {
      name: 'Priya Venkatesh',
      role: 'B.Sc Computer Science Graduate',
      university: 'City University',
      content: 'The milestone roadmaps with official links (like Harvard CS50 and MDN) gave me the structure I was missing. Following the roadmap helped me build three GitHub projects that earned me my first internship interview.',
      tag: 'Software Developer Track'
    },
    {
      name: 'Arjun Mehta',
      role: 'Final Year Economics Student',
      university: 'Delhi University',
      content: 'Coming from an economics background, CareerCompass showed me how my statistical intuition mapped directly to Business & Data Analytics. The transparent scoring explained exactly how my profile was evaluated.',
      tag: 'Data Analyst Track'
    }
  ];

  const faqs = [
    {
      q: 'How does CareerCompass calculate my career compatibility score?',
      a: 'Compatibility scores are calculated transparently using a multi-factor weighting algorithm: 35% technical skill overlap, 30% aptitude dimension alignment (analytical, problem-solving, creativity, communication), 20% interest affinity, and 15% academic & work-style suitability. We do not use black-box scoring or claim clinical psychological validation.'
    },
    {
      q: 'What if I am a complete beginner with no technical skills yet?',
      a: 'CareerCompass is built specifically for students! When you rate your skills as beginner, the system highlights entry-level tracks (such as Frontend/Full-Stack, UI/UX Design, or Data Analytics) and provides step-by-step foundation roadmaps starting from scratch.'
    },
    {
      q: 'Are the recommended courses and learning resources free?',
      a: 'Yes! All roadmaps prioritize premier, open-access, and free learning resources including Harvard CS50, freeCodeCamp, MDN Web Docs, Scikit-Learn documentation, and official cloud training portals.'
    },
    {
      q: 'How does the AI Career Assistant (CompassBot) work?',
      a: 'CompassBot connects to secure backend LLM services (such as Google Gemini) or seamlessly falls back to our intelligent rule-based career counseling engine. It uses your authenticated profile as context to provide personalized, realistic advice for internships, resume structuring, and projects.'
    },
    {
      q: 'Are the salary estimates guaranteed?',
      a: 'No. All salary estimates shown in the platform are approximate industry benchmarks based on aggregate market reports. They vary widely based on geography, economic cycles, employer tier, and individual competency. CareerCompass never guarantees employment or specific compensation.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 6rem',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79, 70, 229, 0.15), transparent)'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          {/* Top Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            marginBottom: '1.75rem',
            border: '1px solid var(--primary-border)'
          }}>
            <Sparkles size={14} />
            <span>AI-Powered Personalized Career Guidance for Students</span>
          </div>

          {/* Main Hero Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            maxWidth: '920px',
            margin: '0 auto 1.5rem',
            color: 'var(--text-primary)'
          }}>
            Discover Your Future with <span className="gradient-text">AI Guidance</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Stop guessing your career path. Assess your strengths, analyze your skill gaps, and follow curated milestone roadmaps tailored specifically for college students and aspiring tech professionals.
          </p>

          {/* Call to Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}>
            <button
              onClick={onStartAssessment}
              className="btn btn-primary btn-lg"
              style={{
                boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
                padding: '1rem 2rem'
              }}
            >
              <Target size={20} />
              <span>Start Career Assessment</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onExploreCareers}
              className="btn btn-secondary btn-lg"
              style={{ padding: '1rem 1.75rem' }}
            >
              <Compass size={18} />
              <span>Explore 12 Career Tracks</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '960px',
            margin: '0 auto',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>12+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                High-Growth Tech & Public Tracks
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--violet)' }}>100%</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Transparent Algorithmic Scoring
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--cyan)' }}>70+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Structured Learning Milestones
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--emerald)' }}>Free</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Curated Official Learning Resources
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              Built for Student Success
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Everything You Need to Chart Your Career Path
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
              An integrated platform designed to eliminate student career anxiety through transparent guidance, actionable roadmaps, and continuous tracking.
            </p>
          </div>

          <div className="grid-4">
            {/* Feature 1 */}
            <div className="card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Brain size={24} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                AI-Powered Career Matching
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Multi-factor compatibility calculation evaluating technical skills, analytical aptitude, creativity, and work preferences with transparent explanations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--violet-light)',
                color: 'var(--violet)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <GitPullRequest size={24} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                Interactive Skill Gap Analysis
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Compare your current abilities against industry benchmarks. Visual charts highlight acquired strengths and prioritize the exact skills you need next.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--cyan-light)',
                color: 'var(--cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                Step-by-Step Roadmaps
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Actionable learning phases with verified free resources (CS50, MDN, Coursera), estimated durations, beginner portfolio projects, and completion checkboxes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--emerald-light)',
                color: 'var(--emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                24/7 AI Career Counselor
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Get instant, grounded advice on internship preparation, portfolio project ideas, and interview strategies using your profile context safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-violet" style={{ marginBottom: '0.75rem' }}>
              Simple 4-Step Process
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              How CareerCompass AI Works
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
              From initial self-assessment to landing your first internship, we guide you at every step.
            </p>
          </div>

          <div className="grid-4" style={{ position: 'relative' }}>
            {howItWorksSteps.map((s, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    fontSize: '1.75rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    opacity: 0.35,
                    marginBottom: '0.75rem'
                  }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Categories Showcase */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                Curated Catalogue
              </span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>
                Explore 12 Diverse Career Tracks
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                From modern AI engineering to competitive public examinations.
              </p>
            </div>
            <button
              onClick={onExploreCareers}
              className="btn btn-secondary"
            >
              <span>View All 12 Full Profiles</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-3">
            {careerCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="card card-interactive"
                  onClick={onExploreCareers}
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        color: cat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={22} />
                      </div>
                      <span className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)' }}>
                        {cat.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      {cat.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {cat.desc}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--primary)'
                  }}>
                    <span>{cat.count}</span>
                    <span>Explore Track &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section (Clearly labeled sample/demo content) */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="badge" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Sample Student Stories (Demo Content)
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Empowering Students Across Campuses
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem' }}>
              See how sample students use CareerCompass to bridge uncertainty and accelerate career prep.
            </p>
          </div>

          <div className="grid-3">
            {demoTestimonials.map((t, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {t.tag}
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    "{t.content}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--violet) 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem'
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{t.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {t.role} &middot; {t.university}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              Frequently Asked Questions
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>
              Got Questions? We Have Answers.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    borderColor: isOpen ? 'var(--primary)' : 'var(--border-subtle)'
                  }}
                  onClick={() => toggleFaq(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0 }}>
                      {faq.q}
                    </h4>
                    {isOpen ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </div>

                  {isOpen && (
                    <div style={{
                      marginTop: '0.875rem',
                      paddingTop: '0.875rem',
                      borderTop: '1px solid var(--border-subtle)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{
        padding: '5rem 0',
        backgroundColor: 'var(--bg-primary)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            padding: '3.5rem 2rem',
            background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
            borderRadius: 'var(--radius-xl)',
            color: '#FFFFFF',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
              Ready to Accelerate Your Career Journey?
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#E0E7FF', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Join thousands of students who have discovered their true career fit through transparent algorithmic guidance and structured roadmaps.
            </p>
            <button
              onClick={onStartAssessment}
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#4338CA',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}
            >
              <Sparkles size={18} color="#4338CA" />
              <span style={{ fontWeight: 700 }}>Start Career Assessment Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
