import React from 'react';
import { theme } from '../../constants/theme';

const ImpactChart = () => (
  <div className="w-full">
    <h3 className="text-lg font-bold mb-6" style={{ color: theme.text }}>
      <span style={{ color: theme.keyword }}>def</span> <span style={{ color: theme.func }}>calcular_impacto</span>():
    </h3>
    <div className="space-y-6 font-mono text-sm">
      {/* Item 1 */}
      <div>
        <div className="flex justify-between mb-2">
          <span style={{ color: theme.string }}>"Redução Manual"</span>
          <span style={{ color: theme.number }}>-80%</span>
        </div>
        <div className="h-8 flex rounded-md overflow-hidden bg-[#0d1117] border border-[#30363d] relative">
          <div className="h-full flex items-center justify-center text-[10px] text-white/50" style={{ width: '100%', background: '#30363d' }}>Antes (100h)</div>
          <div className="absolute top-0 left-0 h-full flex items-center pl-2 text-[10px] font-bold text-black" style={{ width: '20%', background: theme.func }}>Agora (20h)</div>
        </div>
      </div>
      
      {/* Item 2 */}
      <div>
        <div className="flex justify-between mb-2">
          <span style={{ color: theme.string }}>"Dados Processados/Dia"</span>
          <span style={{ color: theme.number }}>35 Milhões</span>
        </div>
        <div className="h-2 w-full bg-[#30363d] rounded-full overflow-hidden">
          <div className="h-full animate-pulse rounded-full" style={{ width: '95%', background: theme.keyword }}></div>
        </div>
      </div>
      
      {/* Item 3 */}
      <div>
        <div className="flex justify-between mb-2">
          <span style={{ color: theme.string }}>"Confiabilidade (Z-Score)"</span>
          <span style={{ color: theme.number }}>99.9%</span>
        </div>
        <div className="flex gap-1">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-6 flex-1 rounded-sm" style={{ background: i < 19 ? theme.func : '#30363d', opacity: i < 19 ? 0.6 + (i/40) : 1 }}></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ImpactChart;