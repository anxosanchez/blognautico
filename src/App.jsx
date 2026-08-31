import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Program from './components/Program';
import Wiki from './components/Wiki';
import Forum from './components/Forum';
import Speakers from './components/Speakers';
import Archive from './components/Archive';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import Toast from './components/Toast';
import OceanBackground from './components/OceanBackground';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [toast, setToast] = useState({ message: null, type: 'info' });
  
  // Cross-component prefill states
  const [forumPrefill, setForumPrefill] = useState({
    category: null,
    sessionTitle: null
  });

  // Smooth navigation handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'programa', 'wiki', 'foro', 'ponentes', 'documentacion'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShowToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleAskQuestionForSession = (category, sessionTitle) => {
    setForumPrefill({ category, sessionTitle });
    handleNavigate('foro');
  };

  const handleAskQuestionForCategory = (category, articleTitle) => {
    setForumPrefill({ category, sessionTitle: `Debate sobre ${articleTitle}` });
    handleNavigate('foro');
  };

  const handleClearPrefill = () => {
    setForumPrefill({ category: null, sessionTitle: null });
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-electric relative">
      
      {/* Animated Maritime Canvas & Background System */}
      <OceanBackground />

      {/* Fixed Header */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Module 1: Hero Section */}
        <Hero 
          onNavigate={handleNavigate}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* Module 2: Interactive Program & Timetable */}
        <Program 
          onAskQuestionForSession={handleAskQuestionForSession}
          onShowToast={handleShowToast}
        />

        {/* Module 3: Technical Wiki & Fuel Comparison Matrix */}
        <Wiki 
          onAskQuestionForCategory={handleAskQuestionForCategory}
        />

        {/* Module 4: Live Forum & Colloquium Questions */}
        <Forum 
          prefillCategory={forumPrefill.category}
          prefillSessionTitle={forumPrefill.sessionTitle}
          onClearPrefill={handleClearPrefill}
          onShowToast={handleShowToast}
        />

        {/* Keynote Speakers Spotlight */}
        <Speakers 
          onNavigate={handleNavigate}
        />

        {/* Module 5: Technical Archive & Proceedings */}
        <Archive 
          onShowToast={handleShowToast}
        />
      </main>

      {/* Institutional Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onShowToast={handleShowToast}
      />

      {/* Registration Modal Dialog */}
      <RegistrationModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onShowToast={handleShowToast}
      />

      {/* Toast Notification Provider */}
      <Toast 
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: null, type: 'info' })}
      />

    </div>
  );
}
