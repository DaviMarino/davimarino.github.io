import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { theme } from '../../constants/theme';

const LandingSection = ({ image, title, text, align = "left", isPainPoint = false }) => {
  return (
    <div className={`relative w-full min-h-[500px] flex items-center overflow-hidden border-b border-[#30363d] ${isPainPoint ? 'bg-red-900/10' : ''}`}>
      <div className={`absolute inset-0 z-0 ${align === 'right' ? 'order-2' : ''}`}>
        <img src={image} alt={title} className="w-full h-full object-cover opacity-30" />
        <div className={`absolute inset-0 bg-gradient-to-r ${align === 'left' ? 'from-[#0d1117] via-[#0d1117]/90 to-transparent' : 'from-transparent via-[#0d1117]/90 to-[#0d1117]'}`}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]"></div>
      </div>
      <div className={`container mx-auto px-6 relative z-10 flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-2xl">
          {isPainPoint && (<div className="flex items-center gap-2 text-red-400 mb-4 font-mono uppercase tracking-widest text-sm"><AlertTriangle size={16} /> O Desafio (Dor)</div>)}
          {!isPainPoint && <h3 className="text-3xl font-bold mb-6" style={{ color: theme.text }}>{title}</h3>}
          {isPainPoint && <h3 className="text-3xl font-bold mb-6 text-white">" {title} "</h3>}
          <p className="text-lg leading-relaxed text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
