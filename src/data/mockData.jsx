import React from 'react';
import { 
  Cpu, BarChart2, Database, Terminal, Code, Monitor, 
  Layout, Server, HardDrive, Zap, CheckCircle2, Workflow, 
  BrainCircuit, MessageSquareCode, Sparkles 
} from 'lucide-react';
import { theme } from '../constants/theme';

const CAREER_START = new Date("2012-06-04"); 

const calculateYears = (startDate) => {
  const diff = new Date() - startDate;
  const ageDate = new Date(diff); 
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const personalInfo = {
  name: "Davi Marino",
  role: "Cientista de Dados Sênior",
  xpYears: calculateYears(CAREER_START), 
  email: "davi.marino@outlook.com",
  linkedin: "https://www.linkedin.com/in/davimarino/",
  github: "https://github.com/DaviMarino",
};

export const projectsData = [
  {
    id: 1,
    title: "Mach1: Copiloto e Telemetria",
    icon: <Cpu size={24} color={theme.number} />,
    painPoint: "Os pilotos virtuais precisam de mais recursos analíticos.",
    desc: "Co-piloto virtual que captura telemetria em tempo real de simuladores como Automobilista 2, armazena e gera análises comparativas para encontrar a evolução no detalhe.",
    fullDescription: "Este projeto nasceu da necessidade de unir minha paixão por automobilismo virtual com engenharia/ciência de dados. A solução captura pacotes UDP do jogo a 60Hz, processa em tempo real usando Python, armazena de forma estruturada para gerar análises entre voltas a cada metro da corrida, após gerar uma base robusta, usamos para desenvolver um Machine Learning Copiloto com a responsabilidade de auxiliar durante a corrida com sugestões de estratégias, o que evoluiu para um projeto Text-to-Speak, com o Copiloto sintetizando sua voz para falar com o piloto via rádio, como o usuário se autentica pela Steam, seria possível a comunidade comparar voltas entre pilotos reais.",
    pain: "A dor fica aqui",
    solution: "Arquitetura híbrida com processo Python de baixa latência, motor TTS Neural e Machine Learning.",
    techs: ["Python", "Dash", "Plotly", "Flask", "SQLite", "Task Assync", "Shared Memory", "TTS Neural", "Machine Learning"],
    architectureType: "desktop_app",
    devNotes: "O maior desafio foi lidar com a latência (<200ms), otimizei o processo separando em tarefas assíncronas e orquestrando a frequência conforme a importância.",
    learnings: "Aprendi profundamente sobre Shared Memory e processamento assíncrono (asyncio).",
    images: [
      { url: "img/mach1_001.png", caption: "Dashboard Principal" },
      { url: "img/mach1_002.png", caption: "Análise de telemetria" },
      { url: "img/mach1_003.png", caption: "Gráficos comparativos" }
    ]
  },
  {
    id: 2,
    title: "Power BI: Storytelling e Dataviz",
    icon: <BarChart2 size={24} color={theme.func} />,
    painPoint: "Extrair análises avançadas com visuais modernos.",
    desc: "Este portfolio foi desenvolvido para explorar análises detalhadas com toda modernidade disponível, o objetivo principal é demonstrar que um velocímetro bonito não representa nada sem um storytelling adequado.",
    fullDescription: "O projeto nasceu a partir de alguns cursos de Storytelling e Dataviz, focado em desenvolver visuais que sequer existiam na prateleira, para mostrar que é possível desenvolver análises detalhadas aplicando correlação, filtros cruzados, neste projeto conseguimos ver uma amostra de todos os detalhes que uma base de cliente pode oferecer, cruzando com a base de produtos.",
    pain: "Desenvolver relatórios bonitos não melhoram o negócio sem o storytelling ou profundidade de conhecimento.",
    solution: "Orquestrador ETL que carrega em Star Schema otimizado para leitura, e desenvolver novos visuais com HTML e SVG.",
    techs: ["Power BI", "SQL Server", "DAX", "Power Query M", "HTML", "SVG"],
    architectureType: "etl_pipeline",
    devNotes: "Modelagem dos dados melhorou a performance do relatório em 9x",
    learnings: "Desenvolvimento de visuais com HTML e SVG abriu uma janela de oportunidades na minha mente.",
    images: [
      { url: "img/pbi_001.png", caption: "Dashboard Principal" },
      { url: "img/pbi_002.png", caption: "Analitico de Clientes" },
      { url: "img/pbi_003.png", caption: "Analítico de Produtos" }
    ]
  },
  {
    id: 3,
    title: "Piloto AI: Rede Neural autônoma",
    icon: <Cpu size={24} color={theme.keyword} />,
    painPoint: "Projeto para desenvolvimento de uma rede neural capaz de tomar decisões em um carro através de sensores.",
    desc: "Esse projeto nasceu para analisar o modelo de aprendizado de diversas redes neurais, onde que cada uma brilha e onde falha.",
    fullDescription: "Criei esse projeto usando diversas bibliotecas e metodologias de redes neurais para estudar seu método de aprendizado, usando como referência a pista de interlagos, um carro autônomo com 5 sensores de aproximação, sensor de velocidade e simulação de física como gravidade e inércia, foi fascinante observar cada modelo aprendendo no seu tempo, com micro-ajustes em parâmetros notar grandes resultados e associar ao funcionamento de um cérebro humano.",
    pain: "Como aprimorar o aprendizado de uma rede neural",
    solution: "Um projeto com Redes Neurais, tempo e pasciência.",
    techs: ["Python", "SciPy"],
    architectureType: "data_quality",
    devNotes: "Calibração e teste dos sensores.",
    learnings: "Observabilidade dos micro-ajustes no lugar certo na medida certa.",
    images: [
      { url: "img/piloto_ai_001.png", caption: "Carro autônomo" },
      { url: "img/piloto_ai_002.png", caption: "Sensores de colisão" },
      { url: "img/piloto_ai_003.png", caption: "Curva" }
    ]
  },
  {
    id: 4,
    title: "DRS - Analytics",
    icon: <BarChart2 size={24} color={theme.string} />,
    painPoint: "Desenvolver o Dashboard perfeito: Python com o melhor dos mundos no backend e React com o melhor dos mundos no frontend.",
    desc: "Sistema de acompanhamento e gestão de indicadores ultra eficiente.",
    fullDescription: "Criei esse projeto visando mesclar o melhor de dois mundos paralelos, o frontend e o backend, quando descobri que existe essa possibilidade, imediatamente comecei a desenvolver um protótipo de relatório que se tornou esse monstro robusto com análises completas, detalhadas e customizadas para cada tipo de visualização, perfil de usuário e permissão a nível de linha, com o Python orquestrando os dados, calculando os dados com Polars e servindo o React, esse sem dúvidas foi o projeto de relatório mais satisfatório até o momento.",
    pain: "Como desenvolver visuais de primeira linha para exibir minhas anáises em Python.",
    solution: "Arquitetura híbrida entre Python e React.",
    techs: ["Python", "React", "FastAPI", "Polars", "Task Assync", "SQL Server", "Parquet", "Duckdb"],
    architectureType: "data_quality",
    devNotes: "Resultados incríveis com a potência do Python para processar e servir dados, enquanto o React lindo e elegante exibe os dados com os componentes mais avançados em Javascript.",
    learnings: "Arquitetura e orquestração de dados para servir de forma eficiênte, o principal ponto é trabalhar com cache e servir o cliente com os dados mais recente possível sem repetir requisições desnecessárias no banco de dados.",
    images: [
      { url: "img/drs_001.png", caption: "Dashboard Principal" },
      { url: "img/drs_002.png", caption: "Análise de Faturamento" },
      { url: "img/drs_003.png", caption: "Gestão de Carteira" }
    ]
  }
];

export const skillsData = [
  { 
    title: "Data Science & Core", 
    icon: <Terminal size={18} className="text-emerald-400" />, 
    color: theme.func, 
    skills: [
      { n: "Python (Polars)", l: 5 }, 
      { n: "Estatística", l: 5 },
      { n: "Machine Learning", l: 4 }, 
      { n: "Deep Learning", l: 4 }, 
      { n: "AI Agents", l: 3 }
    ] 
  },
  { 
    title: "Business Intelligence", 
    icon: <Database size={18} className="text-blue-400" />, 
    color: theme.keyword, 
    skills: [
      { n: "Power BI / DAX", l: 5 }, 
      { n: "Power Query M", l: 5 }, 
      { n: "SQL Relacional", l: 5 }, 
      { n: "Data Warehousing", l: 4 }, 
      { n: "NoSQL", l: 2 }
    ] 
  },
  { 
    title: "Dev & Tools", 
    icon: <Code size={18} className="text-pink-400" />, 
    color: theme.number, 
    skills: [
      { n: "Office / VBA", l: 5 }, 
      { n: "RPA", l: 5 }, 
      { n: "Viz (Dash/Plotly)", l: 4 },
      { n: "Git", l: 3 }, 
      { n: "React / Frontend", l: 2 }
    ] 
  }
];

export const profileCode = (
  <>
    <span style={{ color: theme.keyword }}>import</span> pandas <span style={{ color: theme.keyword }}>as</span> pd{'\n'}
    <span style={{ color: theme.keyword }}>from</span> career <span style={{ color: theme.keyword }}>import</span> Experience{'\n\n'}
    
    <span style={{ color: theme.keyword }}>class</span> <span style={{ color: theme.variable }}>CientistaDados</span>:<br/>
    {'    '}<span style={{ color: theme.keyword }}>def</span> <span style={{ color: theme.func }}>__init__</span>(<span style={{ color: theme.parameter }}>self</span>):<br/>
    {'        '}<span style={{ color: theme.parameter }}>self</span>.nome = <span style={{ color: theme.string }}>"{personalInfo.name}"</span><br/>
    {'        '}<span style={{ color: theme.parameter }}>self</span>.xp_anos = <span style={{ color: theme.number }}>{personalInfo.xpYears}</span><br/>
    {'        '}<span style={{ color: theme.parameter }}>self</span>.foco = [<br/>
    {'            '}<span style={{ color: theme.string }}>"Dashboards & BI"</span>,<br/>
    {'            '}<span style={{ color: theme.string }}>"Engenharia de Dados"</span>,<br/>
    {'            '}<span style={{ color: theme.string }}>"Machine Learning"</span><br/>
    {'        '}]<br/><br/>
    {'    '}<span style={{ color: theme.keyword }}>def</span> <span style={{ color: theme.func }}>resolver_problema</span>(<span style={{ color: theme.parameter }}>self</span>, dados):<br/>
    {'        '}insights = <span style={{ color: theme.parameter }}>self</span>.analisar(dados)<br/>
    {'        '}decisao = <span style={{ color: theme.parameter }}>self</span>.otimizar(insights)<br/>
    {'        '}<span style={{ color: theme.keyword }}>return</span> decisao <span style={{ color: theme.comment }}># Impacto no negócio</span>
  </>
);