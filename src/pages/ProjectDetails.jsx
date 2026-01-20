import React, { useEffect } from 'react';
import { ArrowLeft, Lightbulb, CheckCircle2, Code, BookOpen } from 'lucide-react';
import MermaidDiagram from '../components/charts/MermaidDiagram'; 
import LandingSection from '../components/sections/LandingSection';
import ProjectGallery from '../components/sections/ProjectGallery'; // Importando a Galeria

const ProjectDetails = ({ project, onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { themeColor = "#27ae60", bgGradient = "from-[#0d1117] to-[#0d1117]" } = project.identity || {};

  // CORREÇÃO: Função para buscar apenas imagens seguras para layout estático
  // Se o item no índice original for video, ele procura a próxima imagem disponível
  const safeImages = project.images.filter(img => !img.type || img.type === 'image');
  
  const getImage = (index) => {
    return safeImages[index]?.url || ""; // Retorna string vazia se não existir
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      
      {/* ... Navbar (igual) ... */}
      <nav className="fixed w-full z-50 bg-[#0d1117]/90 backdrop-blur border-b border-[#30363d] py-4 px-6 flex justify-between">
        <button onClick={onBack} className="flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Voltar
        </button>
        <span className="font-mono font-bold" style={{ color: themeColor }}>{project.title}.py</span>
      </nav>

      {/* Hero Section */}
      <header className={`relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b ${bgGradient}`}>
        {/* CORREÇÃO: Usando getImage(0) em vez de project.images[0].url */}
        {getImage(0) && (
          <img src={getImage(0)} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="hero" />
        )}
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex p-4 bg-[#161b22] rounded-full mb-6 border border-[#30363d] shadow-2xl" 
               style={{ boxShadow: `0 0 30px ${themeColor}30` }}>
             {React.cloneElement(project.icon, { color: themeColor, size: 48 })}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{project.title}</h1>
        </div>
      </header>

      <main className="pb-24">
        {/* CORREÇÃO: Usando getImage(0) e getImage(1) */}
        <LandingSection image={getImage(0)} title="O Contexto" text={project.fullDescription} align="left" />
        <LandingSection image={getImage(1)} title={project.painPoint} text={project.pain} align="right" isPainPoint={true} />

        {/* Solução */}
        <div className="py-24 bg-[#0d1117] relative">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4 font-mono uppercase tracking-widest text-sm" style={{ color: themeColor }}>
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
            {/* CORREÇÃO: Usando getImage(2) */}
            <div className="relative rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl group">
              {getImage(2) ? (
                 <img src={getImage(2)} className="w-full h-full object-cover" alt="Solution" />
              ) : (
                 <div className="w-full h-64 bg-[#161b22] flex items-center justify-center">Imagem indisponível</div>
              )}
            </div>
          </div>
        </div>

        {/* Arquitetura */}
        <div className="py-24 bg-[#0d1117] border-t border-[#30363d]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Fluxo da Aplicação
              <span className="block text-sm font-normal text-slate-500 mt-2 font-mono">Renderizado via Mermaid.js</span>
            </h2>
            {project.mermaidCode ? (
               <MermaidDiagram chartCode={project.mermaidCode} />
            ) : (
               <p className="text-center text-slate-500">Diagrama não disponível.</p>
            )}
          </div>
        </div>
        
        {/* Dev Notes (igual) ... */}
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

        {/* A Galeria é o ÚNICO lugar que sabe lidar com vídeos */}
        <div className="bg-[#0d1117] pb-12 border-t border-[#30363d]">
          <div className="container mx-auto px-6">
             <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
               <span style={{ color: themeColor }}>./output_logs</span>
               <span className="text-slate-500 text-sm font-normal"> (Galeria Visual)</span>
             </h2>
             <ProjectGallery mediaItems={project.images} />
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