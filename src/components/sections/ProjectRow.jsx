import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { theme } from '../../constants/theme';

const ProjectRow = ({ project, onViewProject }) => {
  // CORREÇÃO: Filtramos apenas o que é imagem para o carrossel do card
  const validImages = project.images.filter(img => !img.type || img.type === 'image');
  
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    if (validImages.length > 1) {
      setCurrentImgIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (validImages.length > 1) {
      setCurrentImgIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  // Fallback caso não tenha imagem nenhuma
  const currentImage = validImages[currentImgIndex] || { url: '', caption: '' };

  return (
    <div className="rounded-xl border overflow-hidden mb-8 flex flex-col lg:flex-row shadow-lg transition-all hover:border-opacity-50 bg-[#161b22] border-[#30363d] group">
      
      {/* Lado Esquerdo: Carrossel */}
      <div className="lg:w-1/3 relative bg-black/50 border-r border-[#30363d] min-h-[250px] group/image">
        <div className="w-full h-full relative overflow-hidden">
          {currentImage.url ? (
            <img
              src={currentImage.url}
              alt={project.title}
              className="w-full h-full object-cover opacity-60 transition-opacity group-hover/image:opacity-80"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600 bg-[#0d1117]">Sem Imagem</div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
          
          {/* Badge do Índice */}
          {validImages.length > 0 && (
            <div className="absolute top-4 right-4 text-[10px] font-mono px-2 py-1 rounded bg-black/70 text-white border border-white/10">
              {currentImgIndex + 1}/{validImages.length}
            </div>
          )}
          
          {/* Legenda */}
          {currentImage.caption && (
            <div className="absolute bottom-4 left-4 right-4 text-xs text-center text-slate-300 bg-black/50 p-1 rounded backdrop-blur-sm truncate">
              {currentImage.caption}
            </div>
          )}
        </div>

        {/* Botões só aparecem se tiver mais de 1 imagem VÁLIDA */}
        {validImages.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/image:opacity-100 hover:bg-emerald-600 transition-all"><ChevronLeft size={16} /></button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/image:opacity-100 hover:bg-emerald-600 transition-all"><ChevronRight size={16} /></button>
          </>
        )}
      </div>

      {/* Lado Direito: Conteúdo (Mantém igual) */}
      <div className="lg:w-2/3 p-8 flex flex-col">
        {/* ... (código existente do texto e botões) ... */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            {project.icon} {project.title}
          </h3>
        </div>
        <div className="mb-4 p-3 rounded bg-[#0d1117] border-l-2 border-l-[#ff7cc4] border border-[#30363d]">
          <p className="text-xs text-slate-400 italic">"{project.painPoint}"</p>
        </div>
        <p className="text-slate-400 mb-6 flex-grow leading-relaxed">{project.desc}</p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2">
            {project.techs.slice(0, 3).map((t, i) => <span key={i} className="text-xs px-2 py-1 rounded font-mono border border-[#30363d] text-[#79c0ff] bg-[#0d1117]">{t}</span>)}
            {project.techs.length > 3 && <span className="text-xs px-2 py-1 text-slate-500">+{project.techs.length - 3}</span>}
          </div>
          <button
            onClick={() => onViewProject(project)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white transition-all hover:scale-105"
            style={{ backgroundColor: theme.func }}
          >
             Ver Projeto <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectRow;