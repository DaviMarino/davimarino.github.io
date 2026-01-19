import React, { useEffect } from 'react';
import { ArrowLeft, Lightbulb, CheckCircle2, Code, BookOpen } from 'lucide-react';
import ArchitectureDiagram from '../components/charts/ArchitectureDiagram';
import LandingSection from '../components/sections/LandingSection';

const ProjectDetails = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Rola para o topo ao abrir
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] animate-in fade-in duration-500">
      
      {/* Navbar Minimalista */}
      <nav className="fixed w-full z-50 bg-[#0d1117]/80 backdrop-blur border-b border-[#30363d] py-4 px-6 flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Voltar ao Portfólio
        </button>
        <span className="font-mono font-bold text-[#79c0ff]">{project.title}.py</span>
      </nav>

      {/* Hero do Projeto */}
      <header className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={project.images[0].url} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/50 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center justify-center p-4 bg-[#161b22] rounded-full mb-6 shadow-2xl border border-[#30363d]">
            {project.icon}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{project.title}</h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light">{project.desc}</p>
        </div>
      </header>

      {/* Conteúdo Landing Page */}
      <main className="pb-24">
        <LandingSection image={project.images[0].url} title="O Contexto" text={project.fullDescription} align="left" />
        <LandingSection image={project.images[1].url} title={project.painPoint} text={project.pain} align="right" isPainPoint={true} />

        {/* Solução */}
        <div className="py-24 bg-[#0d1117] relative">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-4 font-mono uppercase tracking-widest text-sm">
                <Lightbulb size={16} /> A Solução
              </div>
              <h3 className="text-4xl font-bold text-white mb-6">Engenharia Inteligente</h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">{project.solution}</p>
              
              <div className="grid grid-cols-2 gap-4">
                 {project.techs.map((tech, i) => (
                   <div key={i} className="flex items-center gap-2 p-3 rounded bg-[#161b22] border border-[#30363d]">
                     <CheckCircle2 size={16} className="text-emerald-500" />
                     <span className="font-mono text-sm">{tech}</span>
                   </div>
                 ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl group">
              <img src={project.images[2].url} className="w-full h-full object-cover" alt="Solução" />
            </div>
          </div>
        </div>

        {/* Arquitetura */}
        <div className="py-24 bg-[#0d1117] border-t border-[#30363d]">
          <div className="container mx-auto px-6">
            <ArchitectureDiagram type={project.architectureType} />
          </div>
        </div>

        {/* Dev Notes */}
        <div className="py-24 bg-[#161b22] border-t border-[#30363d]">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Code className="text-blue-400" /> Notas do Desenvolvedor
              </h3>
              <div className="p-6 bg-[#0d1117] rounded-xl border border-[#30363d] font-mono text-sm leading-relaxed text-slate-300">
                "{project.devNotes}"
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="text-yellow-400" /> Aprendizados
              </h3>
              <div className="p-6 bg-[#0d1117] rounded-xl border border-[#30363d] font-mono text-sm leading-relaxed text-slate-300">
                "{project.learnings}"
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-12 text-center border-t border-[#30363d]">
        <button onClick={onBack} className="text-[#79c0ff] hover:underline">Voltar para lista de projetos</button>
      </footer>
    </div>
  );
};

export default ProjectDetails;