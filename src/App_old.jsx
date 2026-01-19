import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Mail, Phone, MapPin, Database, BarChart2, Terminal, Cpu, 
  ExternalLink, ChevronDown, ChevronLeft, ChevronRight, Download, Code, Layers, 
  Zap, GitBranch, Camera, CheckCircle2, Server, Layout, ArrowLeft, Monitor, 
  HardDrive, Globe, PlayCircle, BookOpen, AlertTriangle, Lightbulb, Sparkles,
  Bot, MessageSquareCode, Workflow, BrainCircuit
} from 'lucide-react';

// --- TEMA E CORES ---
const theme = {
  bg: "#0d1117",        // GitHub Dark Background
  card: "#161b22",      // GitHub Dark Card
  border: "#30363d",    // GitHub Dark Border
  text: "#c9d1d9",      // GitHub Dark Text
  secondaryText: "#8b949e",
  
  // VSCode Custom Colors
  func: "#27ae60",      // Green
  keyword: "#3464ff",   // Blue
  number: "#ff7cc4",    // Pink
  string: "#f6ef7f",    // Yellow
  comment: "#8b949e",   // Muted Red/Grey
  variable: "#79c0ff",  // Light Blue
  parameter: "#c176ff", // Purple
  accent: "#f78166",    // Orange (GitHub Action color)
  ai: "#8e44ad"         // Gemini Purple
};

// --- DADOS (MOCK) ---
const projectsData = [
  {
    id: 1,
    title: "Telemetria VR & AI",
    icon: <Cpu size={24} color={theme.number} />,
    painPoint: "Pilotos virtuais não sabiam onde perdiam tempo durante a volta rápida e análise pós-corrida era lenta e desconectada da experiência.",
    desc: "Desenvolvi um co-piloto virtual que captura telemetria em tempo real de jogos como Assetto Corsa. Utiliza um modelo de IA para comparar a volta atual com a volta ideal e fornece feedback via áudio (TTS Neural) na entrada e saída de curvas.",
    fullDescription: "Este projeto nasceu da necessidade de unir minha paixão por automobilismo virtual com engenharia de dados. A solução captura pacotes UDP do jogo a 60Hz, processa em tempo real usando Python e fornece feedback auditivo imediato, funcionando como um engenheiro de pista virtual.",
    solution: "A solução consiste em uma arquitetura híbrida. Um processo Python de baixa latência captura os dados, calcula deltas em tempo real comparando com uma 'volta fantasma' ideal armazenada em cache, e envia comandos para um Frontend React que visualiza os dados e para um motor TTS que fala com o piloto.",
    techs: ["Python", "FastAPI", "React", "Polars", "WebSockets", "TTS Neural"],
    architectureType: "desktop_app",
    devNotes: "O maior desafio foi lidar com a latência. O processamento do pacote UDP e a geração do áudio precisavam ocorrer em menos de 200ms para ser útil na curva. Otimizei o uso do Polars para processamento em memória.",
    learnings: "Aprendi profundamente sobre WebSockets, processamento assíncrono em Python (asyncio) e como criar interfaces desktop performáticas usando tecnologias web (PyWebview).",
    images: [
      { url: "vite.svg", caption: "Dashboard Principal - Visão do Piloto" },
      { url: "vite.svg", caption: "Análise de Curva x Curva" },
      { url: "vite.svg", caption: "Configuração do Engenheiro Virtual" },
      { url: "vite.svg", caption: "Fluxo de Dados em Tempo Real" }
    ]
  },
  {
    id: 2,
    title: "Metodologia Ágil BI",
    icon: <BarChart2 size={24} color={theme.func} />,
    painPoint: "A construção manual de relatórios demorava 100h/mês, com alto risco de erro humano no Excel.",
    desc: "Criei um framework proprietário de ETL que automatiza a extração de ERPs e CRMs. O pipeline cruza dados financeiros e logísticos, alimenta um Data Warehouse e atualiza dashboards Power BI automaticamente a cada 15 minutos.",
    fullDescription: "O projeto visava eliminar planilhas voadoras. Centralizamos a lógica de negócio em um Data Warehouse intermediário, garantindo que o Power BI fosse apenas a camada de apresentação, não de processamento pesado.",
    solution: "Implementação de orquestrador de ETL que extrai dados via APIs e bancos SQL, valida tipagem e integridade, e carrega em Star Schema otimizado para leitura.",
    techs: ["Power BI", "SQL Server", "Python ETL", "Dax Studio"],
    architectureType: "etl_pipeline",
    devNotes: "Focar na modelagem (Star Schema) antes de criar qualquer visual foi crucial. A performance do relatório melhorou 10x apenas ajustando o modelo de dados.",
    learnings: "Governança de dados não é burocracia, é velocidade a longo prazo. Documentar as medidas DAX salvou horas de manutenção futura.",
    images: [
      { url: "/api/placeholder/800/400", caption: "Pipeline ETL" },
      { url: "/api/placeholder/800/400", caption: "Dashboard Financeiro" },
      { url: "/api/placeholder/800/400", caption: "Data Lineage" },
      { url: "/api/placeholder/800/400", caption: "Matriz de KPIs" }
    ]
  },
  {
    id: 3,
    title: "Data Quality Guard",
    icon: <Database size={24} color={theme.keyword} />,
    painPoint: "Dados inconsistentes no Datalake geravam desconfiança nos relatórios da diretoria.",
    desc: "Implementei um sistema de monitoramento estatístico (Z-Score) que varre 35 milhões de registros diariamente. Ele detecta anomalias de volume ou tipo de dado e bloqueia o pipeline antes que dados sujos cheguem ao Power BI.",
    fullDescription: "A confiança nos dados estava baixa. Criei um 'porteiro' digital que analisa estatisticamente os dados de entrada comparando com médias móveis históricas.",
    solution: "Script Python agendado que calcula Z-Score de volumetria e distribuição de valores nulos. Se o desvio padrão for > 3, um alerta é enviado no Teams e a carga é abortada.",
    techs: ["Python", "Pandas", "SciPy", "MS Teams Webhook"],
    architectureType: "data_quality",
    devNotes: "A calibração do Z-Score foi a parte difícil. Definir o que é uma anomalia vs uma sazonalidade exigiu muita análise exploratória.",
    learnings: "Observabilidade de dados (Data Observability) é essencial em pipelines de produção críticos.",
    images: [
      { url: "/api/placeholder/800/400", caption: "Alertas no Teams" },
      { url: "/api/placeholder/800/400", caption: "Gráfico de Anomalias" },
      { url: "/api/placeholder/800/400", caption: "Log de Execução" },
      { url: "/api/placeholder/800/400", caption: "Regras de Bloqueio" }
    ]
  }
];

// --- COMPONENTES AUXILIARES (MOVIDOS PARA FORA PARA EVITAR ERRO DE RENDERIZAÇÃO) ---

// Nó do Diagrama
const ArchNode = ({ icon: Icon, label, subLabel, color, x, y }) => (
  <div className="absolute flex flex-col items-center justify-center p-3 rounded-lg border bg-[#0d1117] shadow-xl z-10 w-40 text-center transition-transform hover:scale-105"
       style={{ left: x, top: y, borderColor: color }}>
    <Icon size={24} style={{ color }} className="mb-2" />
    <span className="text-xs font-bold text-white">{label}</span>
    {subLabel && <span className="text-[10px] text-slate-400 mt-1">{subLabel}</span>}
  </div>
);

// Conexão do Diagrama
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
      {label && (
        <text x="50%" y="50%" textAnchor="middle" fill="#8b949e" fontSize="10">
            {/* Texto simplificado para evitar calculo complexo de SVG no React puro sem libs */}
        </text>
      )}
      {/* Label hack simplificado para posicionamento manual aproximado */}
      {label && (
         <g transform={`translate(${(parseInt(startX)+parseInt(endX))/2 * 10}, ${(parseInt(startY)+parseInt(endY))/2})`}>
           {/* Fallback de posicionamento visual via CSS no pai se necessário, SVG puro aqui é chato de centralizar texto dinâmico sem JS complexo */}
         </g>
      )}
    </svg>
  );
};

// Diagrama de Arquitetura Simulado
const ArchitectureDiagram = ({ type }) => {
  if (type === "desktop_app") {
    return (
      <div className="relative w-full h-[400px] bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden my-8 select-none">
        <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">Architecture: Desktop App Flow</div>
        <div className="absolute top-10 left-[10%] w-[80%] h-[300px] border border-dashed border-slate-700 rounded-lg bg-slate-900/30">
            <span className="absolute top-2 right-2 text-xs text-slate-600">Aplicação Local (.exe)</span>
        </div>
        
        {/* Usando os componentes externos agora */}
        <ArchNode icon={Layout} label="GUI / Frontend" subLabel="React SPA" color={theme.variable} x="20%" y="150px" />
        <ArchNode icon={Server} label="Backend API" subLabel="FastAPI / Python" color={theme.func} x="50%" y="150px" />
        <ArchNode icon={Database} label="ERP / SQL" subLabel="SQL Server" color={theme.number} x="80%" y="50px" />
        <ArchNode icon={HardDrive} label="Engine ETL" subLabel="Polars Core" color={theme.accent} x="80%" y="250px" />
        
        <ArchConnection startX="20%" startY="180px" endX="45%" endY="180px" label="HTTP/JSON" />
        <ArchConnection startX="55%" startY="180px" endX="75%" endY="250px" label="Process Request" />
        <ArchConnection startX="75%" startY="250px" endX="75%" endY="90px" label="Query Data" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-64 bg-[#161b22] rounded-xl border border-[#30363d] text-slate-500 font-mono text-sm">
      <GitBranch size={20} className="mr-2" /> Diagrama de Arquitetura Genérico
    </div>
  );
};

const LandingSection = ({ image, title, text, align = "left", isDark = false, isPainPoint = false }) => {
  return (
    <div className={`relative w-full min-h-[500px] flex items-center overflow-hidden border-b border-[#30363d] ${isPainPoint ? 'bg-red-900/10' : ''}`}>
      <div className={`absolute inset-0 z-0 ${align === 'right' ? 'order-2' : ''}`}>
        <img src={image} alt={title} className="w-full h-full object-cover opacity-30" />
        <div className={`absolute inset-0 bg-gradient-to-r ${align === 'left' ? 'from-[#0d1117] via-[#0d1117]/90 to-transparent' : 'from-transparent via-[#0d1117]/90 to-[#0d1117]'}`}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]"></div>
      </div>
      <div className={`container mx-auto px-6 relative z-10 flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-2xl">
          {isPainPoint && (
            <div className="flex items-center gap-2 text-red-400 mb-4 font-mono uppercase tracking-widest text-sm">
              <AlertTriangle size={16} /> O Desafio (Dor)
            </div>
          )}
          {!isPainPoint && <h3 className="text-3xl font-bold mb-6" style={{ color: theme.text }}>{title}</h3>}
          {isPainPoint && <h3 className="text-3xl font-bold mb-6 text-white">" {title} "</h3>}
          <p className="text-lg leading-relaxed text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
};

const SkillRadarChart = () => {
  const size = 300; const center = size / 2; const radius = 100; const levels = 5;
  const data = [{label:"Eng. Dados",value:0.9},{label:"Analytics/BI",value:1.0},{label:"Machine Learning",value:0.8},{label:"Estatística",value:0.85},{label:"Negócios",value:0.9}];
  const angleSlice = (Math.PI * 2) / data.length;
  const getCoordinates = (value, index) => ({ x: center + radius * value * Math.cos(index * angleSlice - Math.PI / 2), y: center + radius * value * Math.sin(index * angleSlice - Math.PI / 2) });
  const pathPoints = data.map((d, i) => { const c = getCoordinates(d.value, i); return `${c.x},${c.y}`; }).join(" ");
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-4" style={{ color: theme.text }}><span style={{ color: theme.keyword }}>class</span> <span style={{ color: theme.parameter }}>SkillSet</span></h3>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {[...Array(levels)].map((_, i) => <circle key={i} cx={center} cy={center} r={(radius/levels)*(i+1)} fill="none" stroke={theme.border} strokeWidth="1" className="opacity-50" />)}
        {data.map((_, i) => { const c = getCoordinates(1.1, i); return <line key={i} x1={center} y1={center} x2={c.x} y2={c.y} stroke={theme.border} strokeWidth="1" />; })}
        <polygon points={pathPoints} fill={theme.func} fillOpacity="0.2" stroke={theme.func} strokeWidth="2" />
        {data.map((d, i) => { const c = getCoordinates(d.value, i); return <circle key={i} cx={c.x} cy={c.y} r="4" fill={theme.number} />; })}
        {data.map((d, i) => { const c = getCoordinates(1.25, i); return <text key={i} x={c.x} y={c.y} fill={theme.text} fontSize="12" textAnchor="middle" dominantBaseline="middle" className="font-mono">{d.label}</text>; })}
      </svg>
    </div>
  );
};

const ImpactChart = () => (
  <div className="w-full">
    <h3 className="text-lg font-bold mb-6" style={{ color: theme.text }}><span style={{ color: theme.keyword }}>def</span> <span style={{ color: theme.func }}>calcular_impacto</span>():</h3>
    <div className="space-y-6 font-mono text-sm">
      <div><div className="flex justify-between mb-2"><span style={{ color: theme.string }}>"Redução Manual"</span><span style={{ color: theme.number }}>-80%</span></div><div className="h-8 flex rounded-md overflow-hidden bg-[#0d1117] border border-[#30363d] relative"><div className="h-full flex items-center justify-center text-[10px] text-white/50" style={{ width: '100%', background: '#30363d' }}>Antes (100h)</div><div className="absolute top-0 left-0 h-full flex items-center pl-2 text-[10px] font-bold text-black" style={{ width: '20%', background: theme.func }}>Agora (20h)</div></div></div>
      <div><div className="flex justify-between mb-2"><span style={{ color: theme.string }}>"Dados Processados/Dia"</span><span style={{ color: theme.number }}>35 Milhões</span></div><div className="h-2 w-full bg-[#30363d] rounded-full overflow-hidden"><div className="h-full animate-pulse rounded-full" style={{ width: '95%', background: theme.keyword }}></div></div></div>
      <div><div className="flex justify-between mb-2"><span style={{ color: theme.string }}>"Confiabilidade (Z-Score)"</span><span style={{ color: theme.number }}>99.9%</span></div><div className="flex gap-1">{[...Array(20)].map((_, i) => <div key={i} className="h-6 flex-1 rounded-sm" style={{ background: i < 19 ? theme.func : '#30363d', opacity: i < 19 ? 0.6 + (i/40) : 1 }}></div>)}</div></div>
    </div>
  </div>
);

// Novo Card de AI-Augmented Workflow
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
            <h3 className="text-xl font-bold text-white tracking-wide">AI-Augmented Engineering</h3>
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


const SkillsTable = () => {
  const categories = [
    { title: "Data Science & Core", icon: <Terminal size={18} className="text-emerald-400" />, color: theme.func, skills: [{ n: "Python (Polars)", l: 5 }, { n: "Machine Learning", l: 3 }, { n: "Deep Learning", l: 3 }, { n: "AI Agents", l: 3 }, { n: "Estatística", l: 4 }] },
    { title: "Business Intelligence", icon: <Database size={18} className="text-blue-400" />, color: theme.keyword, skills: [{ n: "Power BI / DAX", l: 5 }, { n: "Power Query M", l: 5 }, { n: "SQL Relacional", l: 5 }, { n: "Data Warehousing", l: 4 }, { n: "NoSQL", l: 2 }] },
    { title: "Dev & Tools", icon: <Code size={18} className="text-pink-400" />, color: theme.number, skills: [{ n: "Office / VBA", l: 5 }, { n: "RPA", l: 5 }, { n: "React / Frontend", l: 2 }, { n: "Git", l: 4 }, { n: "Viz (Dash/Plotly)", l: 4 }] }
  ];
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories.map((cat, i) => (
        <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-opacity-50 transition-colors">
          <div className="flex items-center gap-2 mb-4 border-b border-[#30363d] pb-2">{cat.icon}<h3 className="font-bold text-white">{cat.title}</h3></div>
          <div className="space-y-3">{cat.skills.map((s, j) => (
            <div key={j}><div className="flex justify-between text-sm mb-1"><span className="text-slate-200">{s.n}</span><div className="flex gap-1">{[1,2,3,4,5].map(k => <div key={k} className="h-1.5 w-3 rounded-sm" style={{ backgroundColor: k <= s.l ? cat.color : '#30363d' }} />)}</div></div></div>
          ))}</div>
        </div>
      ))}
      
      {/* Novo Card de AI Stack (Full Width) */}
      <AIStackCard />
    </div>
  );
};

// 1. Linha de Projeto na Home (Com Carrossel Restaurado)
const ProjectRow = ({ project, onViewProject }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation(); // Impede clique no card
    setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation(); // Impede clique no card
    setCurrentImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="rounded-xl border overflow-hidden mb-8 flex flex-col lg:flex-row shadow-lg transition-all hover:border-opacity-50 bg-[#161b22] border-[#30363d] group">
      {/* Lado Esquerdo: Carrossel de Imagens */}
      <div className="lg:w-1/3 relative bg-black/50 border-r border-[#30363d] min-h-[250px] relative group/image">
        <div className="w-full h-full relative overflow-hidden">
             <img 
               src={project.images[currentImgIndex].url} 
               alt={project.title} 
               className="w-full h-full object-cover opacity-60 transition-opacity group-hover/image:opacity-80" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
             
             {/* Badge do Índice */}
             <div className="absolute top-4 right-4 text-[10px] font-mono px-2 py-1 rounded bg-black/70 text-white border border-white/10">
               {currentImgIndex + 1}/{project.images.length}
             </div>

             {/* Legenda da Imagem */}
             <div className="absolute bottom-4 left-4 right-4 text-xs text-center text-slate-300 bg-black/50 p-1 rounded backdrop-blur-sm truncate">
                {project.images[currentImgIndex].caption}
             </div>
        </div>

        {/* Botões de Navegação (Só aparecem no hover) */}
        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-emerald-600 transition-all opacity-0 group-hover/image:opacity-100 border border-white/10 hover:border-emerald-500">
          <ChevronLeft size={16} />
        </button>
        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-emerald-600 transition-all opacity-0 group-hover/image:opacity-100 border border-white/10 hover:border-emerald-500">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Lado Direito: Conteúdo */}
      <div className="lg:w-2/3 p-8 flex flex-col">
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
            {project.techs.slice(0,3).map((t, i) => <span key={i} className="text-xs px-2 py-1 rounded font-mono border border-[#30363d] text-[#79c0ff] bg-[#0d1117]">{t}</span>)}
            {project.techs.length > 3 && <span className="text-xs px-2 py-1 text-slate-500">+{project.techs.length - 3}</span>}
          </div>
          <button 
            onClick={() => onViewProject(project)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white transition-all hover:scale-105 border border-transparent hover:border-[#27ae60]"
            style={{ backgroundColor: theme.func }}
          >
            Ver Projeto <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Página Detalhada do Projeto (Landing Page)
const ProjectDetailPage = ({ project, onBack }) => {
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
        <img src={project.images[0].url} className="absolute inset-0 w-full h-full object-cover opacity-40" />
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
        
        {/* Seção 1: Contexto Completo */}
        <LandingSection 
          image={project.images[0].url} 
          title="O Contexto" 
          text={project.fullDescription} 
          align="left" 
        />

        {/* Seção 2: A Dor (Pain Point) */}
        <LandingSection 
          image={project.images[1].url} 
          title={project.painPoint} 
          text="Sem essa solução, o processo era manual, propenso a falhas e sem escalabilidade. A falta de visibilidade gerava perdas financeiras e operacionais." 
          align="right" 
          isPainPoint={true} 
        />

        {/* Seção 3: A Solução (Como Resolve) */}
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
              <img src={project.images[2].url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Seção 4: Arquitetura */}
        <div className="py-24 bg-[#0d1117] border-t border-[#30363d]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Arquitetura da Solução</h2>
              <p className="text-slate-400">Como os dados fluem do ponto A ao B.</p>
            </div>
            <ArchitectureDiagram type={project.architectureType} />
          </div>
        </div>

        {/* Seção 5: Dev Notes & Learnings */}
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
      
      {/* Footer do Projeto */}
      <footer className="py-12 text-center border-t border-[#30363d]">
        <h3 className="text-2xl font-bold text-white mb-4">Gostou do que viu?</h3>
        <button onClick={onBack} className="text-[#79c0ff] hover:underline">Voltar para lista de projetos</button>
      </footer>
    </div>
  );
};

// --- APP PRINCIPAL (SPA Orchestrator) ---
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null); // Estado para controlar a navegação SPA
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id); }
  };

  const personalInfo = {
    name: "Davi Marino",
    role: "Cientista de Dados Sênior",
    email: "davi.marino@outlook.com",
    linkedin: "https://linkedin.com/in/seu-perfil",
    github: "https://github.com/seu-usuario",
  };

  if (selectedProject) {
    return <ProjectDetailPage project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-[#264f78] selection:text-white" style={{ backgroundColor: theme.bg, color: theme.text }}>
      
      {/* Navbar Principal */}
      <nav className={`fixed w-full z-50 transition-all border-b ${isScrolled ? 'backdrop-blur-md bg-[#0d1117]/90 border-[#30363d]' : 'bg-transparent border-transparent'} py-4`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={20} color={theme.func} />
            <span className="font-bold font-mono tracking-tight text-lg">davi<span style={{ color: theme.func }}>.py</span></span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {['Sobre', 'Experiência', 'Projetos', 'Contato'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))} className="hover:text-white transition-colors" style={{ color: theme.secondaryText }}>
                <span style={{ color: theme.keyword }}>#</span>{item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="sobre" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">Transformando <br /><span style={{ color: theme.variable }}>Dados</span> em <br /><span style={{ color: theme.func }}>Decisões</span></h1>
            <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: theme.secondaryText }}>Cientista de Dados Sênior com +10 anos de experiência. Especialista em Power BI, Python e estratégias de governança de dados.</p>
            <div className="flex gap-4">
              <a href={personalInfo.linkedin} target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all hover:brightness-110 text-white" style={{ backgroundColor: "#238636" }}><Linkedin size={18} /> LinkedIn</a>
              <a href={personalInfo.github} target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all border hover:bg-[#30363d]" style={{ backgroundColor: theme.card, borderColor: theme.border, color: theme.text }}><Github size={18} /> GitHub</a>
            </div>
          </div>
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" 
                 style={{ background: `linear-gradient(to right, ${theme.func}, ${theme.keyword})` }}></div>
            
            <div className="relative rounded-lg shadow-2xl overflow-hidden border font-mono text-sm leading-6"
                 style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
              
              {/* Window Header */}
              <div className="px-4 py-2 border-b flex items-center justify-between" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-xs text-center flex-1 opacity-50">perfil_davi.py</div>
              </div>

              {/* Code Content (Restaurado para a versão completa) */}
              <div className="p-6 overflow-x-auto">
                <div className="grid grid-cols-[auto,1fr] gap-4">
                  <div className="flex flex-col text-right select-none opacity-30" style={{ color: theme.secondaryText }}>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => <span key={n}>{n}</span>)}
                  </div>
                  <pre style={{ color: theme.text }}>
                    <code>
                      <span style={{ color: theme.keyword }}>import</span> pandas <span style={{ color: theme.keyword }}>as</span> pd{'\n'}
                      <span style={{ color: theme.keyword }}>from</span> career <span style={{ color: theme.keyword }}>import</span> Experience{'\n\n'}
                      
                      <span style={{ color: theme.keyword }}>class</span> <span style={{ color: theme.variable }}>CientistaDados</span>:<br/>
                      {'    '}<span style={{ color: theme.keyword }}>def</span> <span style={{ color: theme.func }}>__init__</span>(<span style={{ color: theme.parameter }}>self</span>):<br/>
                      {'        '}<span style={{ color: theme.parameter }}>self</span>.nome = <span style={{ color: theme.string }}>"Davi Marino"</span><br/>
                      {'        '}<span style={{ color: theme.parameter }}>self</span>.xp_anos = <span style={{ color: theme.number }}>10</span><br/>
                      {'        '}<span style={{ color: theme.parameter }}>self</span>.foco = [<br/>
                      {'            '}<span style={{ color: theme.string }}>"Dashboards & BI"</span>,<br/>
                      {'            '}<span style={{ color: theme.string }}>"Engenharia de Dados"</span>,<br/>
                      {'            '}<span style={{ color: theme.string }}>"Machine Learning"</span><br/>
                      {'        '}]<br/><br/>
                      {'    '}<span style={{ color: theme.keyword }}>def</span> <span style={{ color: theme.func }}>resolver_problema</span>(<span style={{ color: theme.parameter }}>self</span>, dados):<br/>
                      {'        '}insights = <span style={{ color: theme.parameter }}>self</span>.analisar(dados)<br/>
                      {'        '}decisao = <span style={{ color: theme.parameter }}>self</span>.otimizar(insights)<br/>
                      {'        '}<span style={{ color: theme.keyword }}>return</span> decisao <span style={{ color: theme.comment }}># Impacto no negócio</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="py-20 border-t" style={{ borderColor: theme.border, backgroundColor: "#0d1117" }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-[#161b22] p-8 rounded-xl border" style={{ borderColor: theme.border }}><h2 className="text-xl font-bold mb-6 flex items-center gap-2"><GitBranch size={20} color={theme.parameter} /><span className="text-white">Skill Distribution</span></h2><SkillRadarChart /></div>
            <div><div className="mb-8"><h2 className="text-3xl font-bold mb-4">Resultados Reais</h2><p style={{ color: theme.secondaryText }}>Resolvendo problemas reais de negócio com métricas claras.</p></div><div className="bg-[#161b22] p-8 rounded-xl border relative overflow-hidden" style={{ borderColor: theme.border }}><div className="absolute top-0 right-0 p-4 opacity-5"><BarChart2 size={100} /></div><ImpactChart /></div></div>
          </div>
          <div className="mt-16"><h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Layers size={24} className="text-white" /><span className="text-white">Stack Técnica Detalhada</span></h2><SkillsTable /></div>
        </div>
      </section>

      {/* Experience */}
      <section id="experiencia" className="py-20 border-t" style={{ borderColor: theme.border }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><span style={{ color: theme.keyword }}>SELECT * FROM</span> experience</h2>
          <div className="space-y-8">
            {[
              { c: "Cielo", r: "Cientista de Dados Sênior", t: "3 anos", d: "Governança de Datalake e modelos preditivos.", tech: ["Python", "SQL", "Azure"] },
              { c: "Goop", r: "Analista Pleno | PO", t: "4 anos", d: "Estruturação da área de dados do zero.", tech: ["ETL", "Power BI"] },
              { c: "Atento", r: "Analista de Dados", t: "4 anos", d: "Automação de relatórios e VBA.", tech: ["Excel", "VBA"] }
            ].map((e, i) => (
              <div key={i} className="group relative pl-8 border-l-2" style={{ borderColor: theme.border }}>
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 bg-[#27ae60] border-[#0d1117]"></div>
                <div className="p-6 rounded-lg border bg-[#161b22] border-[#30363d] hover:border-opacity-100">
                  <div className="flex justify-between mb-2"><h3 className="text-xl font-bold text-white">{e.r}</h3><span className="text-sm text-slate-500">@ {e.c}</span></div>
                  <p className="text-slate-400 mb-4">{e.d}</p>
                  <div className="flex gap-2">{e.tech.map((t, j) => <span key={j} className="text-xs px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-[#79c0ff]">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section id="projetos" className="py-20 border-t" style={{ borderColor: theme.border, backgroundColor: "#0d1117" }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Projetos & Labs</h2>
            <a href={personalInfo.github} target="_blank" className="text-sm hover:underline flex items-center gap-1" style={{ color: theme.keyword }}>Ver todos no GitHub <ExternalLink size={14} /></a>
          </div>
          <div className="flex flex-col">
            {projectsData.map((proj) => (
              <ProjectRow key={proj.id} project={proj} onViewProject={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="py-12 border-t text-center" style={{ borderColor: theme.border, backgroundColor: theme.card }}>
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Vamos codar juntos?</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:bg-[#30363d]"><Mail size={18} color={theme.func} /><span>{personalInfo.email}</span></a>
          </div>
          <p className="text-xs" style={{ color: theme.secondaryText }}>© 2026 Davi Marino. Built with React & <span style={{ color: theme.number }}>GitHub Dark Theme</span>.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;