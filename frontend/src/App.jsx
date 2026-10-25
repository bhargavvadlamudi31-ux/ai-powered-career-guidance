import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DashboardHeader } from './components/common/DashboardHeader';
import { LandingPage } from './pages/LandingPage';
import { AuthModal } from './pages/AuthModal';
import { DashboardOverview } from './pages/DashboardOverview';
import { AssessmentPage } from './pages/AssessmentPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ExploreCareersPage } from './pages/ExploreCareersPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cross-page parameters
  const [selectedCareerForRoadmap, setSelectedCareerForRoadmap] = useState(null);
  const [selectedCareerForSkillGap, setSelectedCareerForSkillGap] = useState(null);
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [assessmentMeta, setAssessmentMeta] = useState(null);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleNavigate = (tab) => {
    // If not authenticated and trying to access dashboard/profile, prompt auth
    const protectedTabs = ['dashboard', 'assessment', 'roadmap', 'profile', 'chat'];
    if (!isAuthenticated && protectedTabs.includes(tab)) {
      handleOpenAuth('login');
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = () => {
    if (!isAuthenticated) {
      handleOpenAuth('register');
    } else {
      setActiveTab('assessment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAssessmentComplete = (topCareers, assessment) => {
    setRecommendedCareers(topCareers);
    setAssessmentMeta(assessment);
    setActiveTab('recommendations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCareerForRoadmap = (careerSlug) => {
    setSelectedCareerForRoadmap(careerSlug);
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeSkillGap = (careerSlug) => {
    setSelectedCareerForSkillGap(careerSlug);
    setActiveTab('skill-gap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if we show the dashboard layout (sidebar + dashboard header)
  const isDashboardView = isAuthenticated && activeTab !== 'landing';

  return (
    <div className="app-root">
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setActiveTab('dashboard');
        }}
      />

      {isDashboardView ? (
        // Authenticated Dashboard Layout
        <div className="dashboard-layout">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={handleNavigate}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="dashboard-main">
            <DashboardHeader
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onNavigate={handleNavigate}
            />

            <main className="dashboard-content">
              {activeTab === 'dashboard' && (
                <DashboardOverview
                  onNavigate={handleNavigate}
                  onSelectCareer={handleSelectCareerForRoadmap}
                />
              )}

              {activeTab === 'assessment' && (
                <AssessmentPage
                  onComplete={handleAssessmentComplete}
                />
              )}

              {activeTab === 'recommendations' && (
                <RecommendationsPage
                  recommendations={recommendedCareers}
                  assessmentDate={assessmentMeta?.createdAt}
                  scoringBreakdown={assessmentMeta?.scoringBreakdown}
                  onActivateRoadmap={handleSelectCareerForRoadmap}
                  onAnalyzeSkillGap={handleAnalyzeSkillGap}
                  onRetakeAssessment={() => handleNavigate('assessment')}
                />
              )}

              {activeTab === 'explore' && (
                <ExploreCareersPage
                  onSelectCareerForRoadmap={handleSelectCareerForRoadmap}
                  onAnalyzeSkillGap={handleAnalyzeSkillGap}
                />
              )}

              {activeTab === 'roadmap' && (
                <RoadmapPage
                  initialCareerSlug={selectedCareerForRoadmap}
                />
              )}

              {activeTab === 'skill-gap' && (
                <SkillGapPage
                  initialCareerSlug={selectedCareerForSkillGap}
                />
              )}

              {activeTab === 'chat' && (
                <ChatbotPage />
              )}

              {activeTab === 'profile' && (
                <ProfilePage />
              )}
            </main>
          </div>
        </div>
      ) : (
        // Public / Landing Page View
        <div>
          <Navbar
            onOpenAuth={handleOpenAuth}
            onNavigate={handleNavigate}
            activeTab={activeTab}
          />

          {activeTab === 'explore' ? (
            <div className="container" style={{ padding: '3rem 1.5rem' }}>
              <ExploreCareersPage
                onSelectCareerForRoadmap={(slug) => {
                  if (!isAuthenticated) handleOpenAuth('login');
                  else handleSelectCareerForRoadmap(slug);
                }}
                onAnalyzeSkillGap={(slug) => {
                  if (!isAuthenticated) handleOpenAuth('login');
                  else handleAnalyzeSkillGap(slug);
                }}
              />
            </div>
          ) : (
            <LandingPage
              onStartAssessment={handleStartAssessment}
              onExploreCareers={() => handleNavigate('explore')}
              onOpenAuth={handleOpenAuth}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
