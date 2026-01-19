import React from 'react';
import { Layout, Server, Database, HardDrive, GitBranch } from 'lucide-react';
import { theme } from '../../constants/theme';

// Nó do Diagrama (Interno deste arquivo)
const ArchNode = ({ icon: Icon, label, subLabel, color, x, y }) => (
  <div className="absolute flex flex-col items-center justify-center p-3 rounded-lg border bg-[#0d1117] shadow-xl z-10 w-40 text-center transition-transform hover:scale-105"
       style={{ left: x, top: y, borderColor: color }}>
    <Icon size={24} style={{ color }} className="mb-2" />
    <span className="text-xs font-bold text-white">{label}</span>
    {subLabel && <span className="text-[10px] text-slate-400 mt-1">{subLabel}</span>}
  </div>
);

// Conexão do Diagrama (Interno deste arquivo)
const ArchConnection = ({ startX, startY, endX, endY, label }) => {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#30363d" />
        </marker>
      </defs>
      <path d={`M ${startX} ${startY} L ${endX} ${endY}`} stroke="#30363d" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
      {label && (
        <rect x={(parseFloat(startX)+parseFloat(endX))/2 + "%"} y={(parseFloat(startY)+parseFloat(endY))/2 + "px"} width="60" height="20" fill="#0d1117" transform="translate(-30, -10)" />
      )}
    </svg>
  );
};

const ArchitectureDiagram = ({ type }) => {
  if (type === "desktop_app") {
    return (
      <div className="relative w-full h-[400px] bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden my-8 select-none">
        <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">Architecture: Desktop App Flow</div>
        <div className="absolute top-10 left-[10%] w-[80%] h-[300px] border border-dashed border-slate-700 rounded-lg bg-slate-900/30">
            <span className="absolute top-2 right-2 text-xs text-slate-600">Aplicação Local (.exe)</span>
        </div>
        
        <ArchNode icon={Layout} label="GUI / Frontend" subLabel="React SPA" color={theme.variable} x="20%" y="150px" />
        <ArchNode icon={Server} label="Backend API" subLabel="FastAPI / Python" color={theme.func} x="50%" y="150px" />
        <ArchNode icon={Database} label="ERP / SQL" subLabel="SQL Server" color={theme.number} x="80%" y="50px" />
        <ArchNode icon={HardDrive} label="Engine ETL" subLabel="Polars Core" color={theme.accent} x="80%" y="250px" />
        
        <ArchConnection startX="20%" startY="180px" endX="45%" endY="180px" label="HTTP/JSON" />
        <ArchConnection startX="55%" startY="180px" endX="75%" endY="250px" label="Process" />
        <ArchConnection startX="75%" startY="250px" endX="75%" endY="90px" label="Query" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-64 bg-[#161b22] rounded-xl border border-[#30363d] text-slate-500 font-mono text-sm">
      <GitBranch size={20} className="mr-2" /> Diagrama de Arquitetura Genérico
    </div>
  );
};

export default ArchitectureDiagram;