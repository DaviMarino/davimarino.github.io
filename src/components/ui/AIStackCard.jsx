import React from 'react';
import { Sparkles, Workflow, Zap, CheckCircle2, BrainCircuit, Code, MessageSquareCode } from 'lucide-react';

const AIStackCard = () => {
  return (
    <div className="md:col-span-3 bg-gradient-to-r from-[#161b22] to-[#1c2128] border border-[#30363d] rounded-xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all shadow-xl">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        {/* Lado Esquerdo: O Manifesto */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Sparkles size={20} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">Engenharia Aumentada por IA</h3>
          </div>
          
          <h4 className="text-lg font-medium text-slate-200 mb-2">
            Em 2026, codar é sobre <span className="text-purple-400">orquestrar inteligência</span>.
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Não uso IAs apenas para gerar código, mas como uma extensão cognitiva. 
            Utilizo o <strong>Gemini Advanced</strong> com Gems customizados para acelerar 
            o planejamento, refinar a arquitetura e validar a segurança antes mesmo da primeira linha de código.
          </p>

          <div className="flex gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300 bg-[#0d1117] px-3 py-1.5 rounded-full border border-[#30363d]">
              <Workflow size={14} className="text-emerald-400" /> Planejamento
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 bg-[#0d1117] px-3 py-1.5 rounded-full border border-[#30363d]">
              <Zap size={14} className="text-yellow-400" /> Velocidade
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 bg-[#0d1117] px-3 py-1.5 rounded-full border border-[#30363d]">
              <CheckCircle2 size={14} className="text-blue-400" /> Validação
            </div>
          </div>
        </div>

        {/* Lado Direito: A Visualização dos Gems */}
        <div className="flex-1 w-full">
           <div className="bg-[#0d1117]/80 backdrop-blur rounded-lg border border-[#30363d] p-4 relative">
             <div className="absolute -top-3 left-4 px-2 bg-[#1c2128] text-[10px] text-purple-300 uppercase tracking-widest border border-purple-500/30 rounded">
               My Gemini Contexts
             </div>
             
             <div className="space-y-3 mt-2">
               {/* Gem 1 */}
               <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors group/gem">
                  <div className="p-1.5 rounded bg-blue-500/10 text-blue-400"><BrainCircuit size={16} /></div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-200">Architect Gem</div>
                    <div className="text-[10px] text-slate-500">System Design & Patterns (Clean Arch)</div>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
               </div>

               {/* Gem 2 */}
               <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors group/gem">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400"><Code size={16} /></div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-200">Refactor & Optmizer</div>
                    <div className="text-[10px] text-slate-500">Performance Tuning (Polars/Pandas)</div>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-50"></div>
               </div>

               {/* Gem 3 */}
               <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors group/gem">
                  <div className="p-1.5 rounded bg-pink-500/10 text-pink-400"><MessageSquareCode size={16} /></div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-200">Unit Test Generator</div>
                    <div className="text-[10px] text-slate-500">PyTest & Edge Cases Validation</div>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-500 opacity-50"></div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIStackCard;