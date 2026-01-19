import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { theme } from './constants/theme';
import { personalInfo } from './data/mockData';

// Componentes
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

const App = () => {
  const [, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null); // SPA Routing state
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito de scroll na Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função de Navegação
  const scrollToSection = (id) => {
    if (selectedProject) {
        // Se estiver num projeto, volta para a home e depois rola
        setSelectedProject(null);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        // Se já estiver na home, só rola
        const element = document.getElementById(id);
        if (element) { element.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id); }
    }
  };

  // 1. Se um projeto estiver selecionado, mostra os Detalhes
  if (selectedProject) {
    return (
      <ProjectDetails 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-[#264f78] selection:text-white" style={{ backgroundColor: theme.bg, color: theme.text }}>
      
      <Navbar scrollToSection={scrollToSection} isScrolled={isScrolled} />

      <Home setSelectedProject={setSelectedProject} />

      <footer id="contato" className="py-12 border-t text-center" style={{ borderColor: theme.border, backgroundColor: theme.card }}>
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Vamos codar</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:bg-[#30363d]">
                <Mail size={18} color={theme.func} /><span>{personalInfo.email}</span>
            </a>
          </div>
          <p className="text-xs" style={{ color: theme.secondaryText }}>© 2026 {personalInfo.name}. Built with React & <span style={{ color: theme.number }}>GitHub Dark Theme</span>.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;