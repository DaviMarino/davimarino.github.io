import React from 'react';
import { theme } from '../../constants/theme';

const SkillRadarChart = () => {
  const size = 300; 
  const center = size / 2; 
  const radius = 100; 
  const levels = 5;
  const data = [
    {label:"Eng. Dados", value:0.9},
    {label:"Analytics/BI", value:1.0},
    {label:"Machine Learning", value:0.8},
    {label:"Estatística", value:0.85},
    {label:"Negócios", value:0.9}
  ];
  
  const angleSlice = (Math.PI * 2) / data.length;
  
  // Função auxiliar para calcular X e Y no círculo
  const getCoordinates = (value, index) => ({ 
    x: center + radius * value * Math.cos(index * angleSlice - Math.PI / 2), 
    y: center + radius * value * Math.sin(index * angleSlice - Math.PI / 2) 
  });
  
  const pathPoints = data.map((d, i) => { 
    const c = getCoordinates(d.value, i); 
    return `${c.x},${c.y}`; 
  }).join(" ");

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-4" style={{ color: theme.text }}>
        <span style={{ color: theme.keyword }}>class</span> <span style={{ color: theme.parameter }}>SkillSet</span>
      </h3>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Círculos concêntricos (níveis) */}
        {[...Array(levels)].map((_, i) => (
          <circle key={i} cx={center} cy={center} r={(radius/levels)*(i+1)} fill="none" stroke={theme.border} strokeWidth="1" className="opacity-50" />
        ))}
        {/* Linhas radiais */}
        {data.map((_, i) => { 
          const c = getCoordinates(1.1, i); 
          return <line key={i} x1={center} y1={center} x2={c.x} y2={c.y} stroke={theme.border} strokeWidth="1" />; 
        })}
        {/* Área preenchida (os dados) */}
        <polygon points={pathPoints} fill={theme.func} fillOpacity="0.2" stroke={theme.func} strokeWidth="2" />
        {/* Pontos nos vértices */}
        {data.map((d, i) => { 
          const c = getCoordinates(d.value, i); 
          return <circle key={i} cx={c.x} cy={c.y} r="4" fill={theme.number} />; 
        })}
        {/* Rótulos (Texto) */}
        {data.map((d, i) => { 
          const c = getCoordinates(1.25, i); 
          return <text key={i} x={c.x} y={c.y} fill={theme.text} fontSize="12" textAnchor="middle" dominantBaseline="middle" className="font-mono">{d.label}</text>; 
        })}
      </svg>
    </div>
  );
};

export default SkillRadarChart;