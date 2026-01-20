import React, { useState } from 'react';
import { Play, Image as ImageIcon, FileVideo } from 'lucide-react'; // Renomeando Image para evitar conflito
import { theme } from '../../constants/theme';

const ProjectGallery = ({ mediaItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!mediaItems || mediaItems.length === 0) return null;

  const activeItem = mediaItems[activeIndex];
  const isVideo = activeItem.type === 'video';

  return (
    <div className="w-full my-12 animate-in fade-in duration-700">
      
      {/* Cabeçalho da "Janela" */}
      <div className="flex items-center justify-between px-4 py-2 rounded-t-lg border-x border-t"
           style={{ backgroundColor: theme.card, borderColor: theme.border }}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-xs font-mono opacity-60">
           media_viewer.exe — {activeIndex + 1}/{mediaItems.length}
        </div>
        <div className="w-10"></div> {/* Espaçador para centralizar */}
      </div>

      {/* Área Principal de Visualização (The Monitor) */}
      <div className="relative w-full aspect-video bg-black border-x border-b overflow-hidden flex items-center justify-center group"
           style={{ borderColor: theme.border }}>
        
        {isVideo ? (
          <video 
            key={activeItem.url} // Key força o reload ao trocar de vídeo
            src={activeItem.url} 
            className="w-full h-full object-contain"
            controls
            autoPlay={false} // Evita sustos, deixa o usuário dar play
          />
        ) : (
          <img 
            src={activeItem.url} 
            alt={activeItem.caption} 
            className="w-full h-full object-contain"
          />
        )}

        {/* Legenda Flutuante (Overlay) */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded border border-white/10 text-center transition-opacity opacity-0 group-hover:opacity-100">
          <p className="text-sm text-slate-200 font-mono">{activeItem.caption}</p>
        </div>
      </div>

      {/* Lista de Miniaturas (Thumbnails) */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {mediaItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded border overflow-hidden transition-all ${
                isActive ? 'ring-2 ring-offset-1 ring-offset-[#0d1117]' : 'opacity-50 hover:opacity-100'
              }`}
              style={{ 
                borderColor: isActive ? theme.func : theme.border,
                ringColor: theme.func 
              }}
            >
              {/* Ícone indicador de tipo */}
              <div className="absolute top-1 right-1 z-10">
                {item.type === 'video' ? 
                  <FileVideo size={12} className="text-white drop-shadow-md" /> : 
                  <ImageIcon size={12} className="text-white drop-shadow-md" />
                }
              </div>

              {/* Thumbnail (Se for vídeo, tenta pegar o frame ou mostra um placeholder escuro) */}
              {item.type === 'video' ? (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                   <Play size={20} className="text-white/50" />
                </div>
              ) : (
                <img src={item.url} className="w-full h-full object-cover" alt="thumb" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGallery;