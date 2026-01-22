import React from 'react';
import { 
  Cpu, BarChart2, Database, Terminal, Code, 
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
    icon: <Cpu size={24} />,
    painPoint: "Os pilotos virtuais precisam de mais recursos analíticos.",
    desc: "Co-piloto virtual que captura telemetria em tempo real de simuladores como Automobilista 2.",
    fullDescription: "Este projeto nasceu da necessidade de unir minha paixão por automobilismo virtual com engenharia de dados. A solução captura pacotes UDP do jogo a 60Hz, processa em tempo real usando Python, armazena de forma estruturada para gerar análises entre voltas a cada metro da corrida.",
    pain: "A falta de feedback imediato impedia a evolução dos pilotos.",
    solution: "Arquitetura híbrida com processo Python de baixa latência, motor TTS Neural e Machine Learning.",
    techs: ["Python", "Dash", "Plotly", "Flask", "SQLite", "Task Assync", "Shared Memory", "TTS Neural"],
    architectureType: "desktop_app",
    
    identity: {
      themeColor: "#e74c3c",
      bgGradient: "from-red-900/20 via-[#0d1117] to-[#0d1117]",
    },

    devNotes: "O maior desafio foi lidar com a latência (<200ms).",
    learnings: "Aprendi profundamente sobre Shared Memory e processamento assíncrono.",
    images: [
      { type: "image", url: "img/mach1_001.png", caption: "Dashboard Principal" },
      { type: "image", url: "img/mach1_002.png", caption: "Análise de telemetria" },
      { type: "image", url: "img/mach1_003.png", caption: "Gráficos comparativos" }
    ],
    // ATENÇÃO: Código alinhado à esquerda para evitar erro de sintaxe
    mermaidCode: `graph TD
subgraph Simulador
A[Assetto Corsa / AMS2] -->|UDP 60Hz| B(Python Listener)
end
subgraph Backend
B --> C{Shared Memory}
C -->|Leitura| D[FastAPI / Socket]
C -->|Delta| E[AI Copilot]
end
subgraph Frontend
D -->|JSON| F[React Dashboard]
E -->|Audio| G[TTS Neural]
G -->|Voz| H((Piloto))
end
classDef ai fill:#161b22,stroke:#e74c3c,stroke-width:2px;
classDef std fill:#161b22,stroke:#30363d,stroke-width:1px;
class E,G ai;
class A,B,C,D,F,H std;`
  },
  {
    id: 2,
    title: "Power BI: Storytelling e Dataviz",
    icon: <BarChart2 size={24} />,
    painPoint: "Extrair análises avançadas com visuais modernos.",
    desc: "Portfólio desenvolvido para explorar análises detalhadas com modernidade.",
    fullDescription: "O projeto nasceu focado em desenvolver visuais que sequer existiam na prateleira, para mostrar que é possível desenvolver análises detalhadas aplicando correlação e filtros cruzados.",
    pain: "Relatórios bonitos não melhoram o negócio sem profundidade de conhecimento.",
    solution: "Orquestrador ETL que carrega em Star Schema otimizado e novos visuais com HTML e SVG.",
    techs: ["Power BI", "SQL Server", "DAX", "Power Query M", "HTML", "SVG"],
    architectureType: "etl_pipeline",

    identity: {
      themeColor: "#f1c40f",
      bgGradient: "from-yellow-900/10 via-[#0d1117] to-[#0d1117]",
    },

    devNotes: "Modelagem dos dados melhorou a performance do relatório em 9x.",
    learnings: "Desenvolvimento de visuais com HTML e SVG abriu uma janela de oportunidades.",
    images: [
      { type: "image", url: "img/pbi_001.png", caption: "Dashboard Principal" },
      { type: "image", url: "img/pbi_002.png", caption: "Analitico de Clientes" },
      { type: "image", url: "img/pbi_003.png", caption: "Analítico de Produtos" }
    ],
    mermaidCode: `graph LR
subgraph Fontes
ERP[(SQL Server)]
XLS[Metas Excel]
end
subgraph ETL
ERP -->|M| P[Staging]
XLS -->|M| P
P -->|Transf| DW[(Data Warehouse)]
DW -->|Star Schema| M[Modelo Tabular]
end
subgraph Viz
M -->|DAX| KPI[Calculo KPIs]
KPI -->|Render| V[HTML/SVG]
KPI -->|Show| S[Dashboard]
end
classDef dw fill:#161b22,stroke:#f1c40f,stroke-width:2px;
class DW,M,KPI dw;`
  },
  {
    id: 3,
    title: "Piloto AI: Rede Neural autônoma",
    icon: <Cpu size={24} />,
    painPoint: "Desenvolver uma rede neural capaz de tomar decisões de pilotagem.",
    desc: "Estudo sobre modelos de aprendizado de redes neurais.",
    fullDescription: "Usei a pista de Interlagos como referência para treinar um carro autônomo com 5 sensores de aproximação, sensor de velocidade e física simulada.",
    pain: "Como aprimorar o aprendizado de uma rede neural 'black box'?",
    solution: "Um projeto com Redes Neurais, tempo, paciência e ajustes finos.",
    techs: ["Python", "SciPy", "TensorFlow", "Pandas"],
    architectureType: "data_quality",

    identity: {
      themeColor: "#8e44ad",
      bgGradient: "from-purple-900/20 via-[#0d1117] to-[#0d1117]",
    },

    devNotes: "A calibração e teste dos sensores foi crítica.",
    learnings: "Observabilidade dos micro-ajustes no lugar certo na medida certa.",
    images: [
      { type: "image", url: "img/piloto_ai_001.png", caption: "Carro autônomo" },
      { type: "image", url: "img/piloto_ai_002.png", caption: "Sensores de colisão" },
      { type: "image", url: "img/piloto_ai_003.png", caption: "Curva" }
    ],
    mermaidCode: `graph TD
subgraph Inputs
S1(Distancia Frontal) --> NN
S2(Distancia Lateral) --> NN
S3(Velocidade) --> NN
end
subgraph BlackBox
NN[Input Layer] --> H1[Hidden 1]
H1 --> H2[Hidden 2]
H2 --> OUT[Output]
end
subgraph Atuadores
OUT -->|0.0-1.0| A1[Acelerador]
OUT -->|-1.0-1.0| A2[Volante]
OUT -->|0/1| A3[Freio]
end
A1 --> S3
A2 --> S1
classDef neural fill:#161b22,stroke:#8e44ad,stroke-width:2px;
class NN,H1,H2,OUT neural;`
  },
  {
    id: 4,
    title: "DRS - Analytics",
    icon: <BarChart2 size={24} />,
    painPoint: "O Dashboard perfeito: Backend Python robusto + Frontend React moderno.",
    desc: "Sistema de acompanhamento e gestão de indicadores ultra eficiente.",
    fullDescription: "Este projeto visa mesclar o melhor de dois mundos: Python orquestrando e calculando dados (Polars) e React servindo a interface.",
    pain: "Como exibir análises complexas do Python em uma interface web?",
    solution: "Arquitetura híbrida entre Python (FastAPI/Polars) e React.",
    techs: ["Python", "React", "FastAPI", "Polars", "Redis", "SQL Server"],
    architectureType: "data_quality",

    identity: {
      themeColor: "#3498db",
      bgGradient: "from-blue-900/20 via-[#0d1117] to-[#0d1117]",
    },

    devNotes: "Resultados incríveis combinando Polars e React.",
    learnings: "Trabalhar com cache inteligente (Redis) para servir o dado mais recente.",
    images: [
      { type: "image", url: "img/drs_001.png", caption: "Dashboard Principal" },
      { type: "image", url: "img/drs_002.png", caption: "Análise de Faturamento" },
      { type: "image", url: "img/drs_003.png", caption: "Gestão de Carteira" }
    ],
    // CORREÇÃO AQUI: Aspas nos nomes compostos "User (React)" e "Polars Engine"
    mermaidCode: `sequenceDiagram
participant User as "User (React)"
participant API as FastAPI
participant Cache as Redis
participant Engine as "Polars Engine"
participant DB as SQL Server
User->>API: GET /kpi
API->>Cache: Check Key
alt Cache Hit
Cache-->>API: JSON (10ms)
API-->>User: Render
else Cache Miss
API->>Engine: Process
Engine->>DB: Select
DB-->>Engine: Raw Data
Engine->>Engine: GroupBy
Engine-->>API: DataFrame
API->>Cache: Save
API-->>User: Render
end`
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
    <span style={{ color: theme.comment }}># v1.0.3</span>{'\n'}
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

export const experienceData = [
  {
    company: "Cielo",
    role: "Cientista de Dados Sênior",
    period: "39 meses",
    tech: ["Python", "SQL", "Azure", "Power BI", "AWS Athena", "Databricks"],
    // Estrutura em blocos para permitir formatação rica
    content: [
      { 
        type: "paragraph", 
        text: "Na Cielo, atuei na equipe de Ciência de Dados aplicada ao Atendimento, sendo responsável pelo desenvolvimento e monitoramento de indicadores críticos para executivos e conselheiros." 
      },
      { 
        type: "header", 
        text: "📊 Desenvolvimento e Otimização de Relatórios:" 
      },
      { 
        type: "list", 
        items: [
          "Criação e implementação de +30 dashboards analíticos em Power BI, aplicando técnicas avançadas de DAX e Power Query para otimização de performance.",
          "Monitoramento e gestão do Power BI Service, garantindo alta disponibilidade e acessibilidade dos relatórios, mesmo sob alto volume de publicações.",
          "Governança de dados no Datalake, lidando com +35 milhões de registros diários, assegurando qualidade e integridade dos dados por meio de scripts automatizados em Python."
        ]
      },
      { 
        type: "header", 
        text: "📂 Gestão e Monitoramento de Dados:" 
      },
      { 
        type: "list", 
        items: [
          "Construção de indicadores críticos utilizando SQL Server, Oracle DB, Impala Datalake e AWS Athena, estruturando processos de ETL eficientes.",
          "Desenvolvimento de ferramentas personalizadas em Python para padronização e integração de dados no AWS Athena, otimizando a conexão com o Power BI.",
          "Implementação de ferramentas de monitoramento de qualidade de dados (Z-Score para volumetria e validação textual/numérica)."
        ]
      }
    ]
  },
  {
    company: "Goop",
    role: "Analista Pleno | PO",
    period: "56 meses",
    tech: ["ETL", "Power BI", "SQL", "Modelagem de Dados"],
    content: [
      { 
        type: "paragraph", 
        text: "Atuei na estruturação da área de dados do zero, transformando processos manuais em pipelines de inteligência." 
      },
      { 
        type: "header", 
        text: "🚀 Principais Entregas:" 
      },
      { 
        type: "list", 
        items: [
          "Mapeamento de processos e definição de KPIs estratégicos junto à diretoria.",
          "Implementação do primeiro Data Warehouse da empresa, centralizando dados dispersos.",
          "Automação de cargas de dados reduzindo o tempo de fechamento mensal em 70%."
        ]
      }
    ]
  },
  {
    company: "Atento",
    role: "Analista de Dados",
    period: "54 meses",
    tech: ["Excel", "VBA", "Access", "Automação"],
    content: [
      { 
        type: "paragraph", 
        text: "Foco em automação de relatórios operacionais e desenvolvimento de ferramentas para aumento de produtividade." 
      },
      { 
        type: "list", 
        items: [
          "Desenvolvimento de macros complexas em VBA para consolidação de planilhas.",
          "Criação de dashboards operacionais em Excel para acompanhamento de filas de atendimento.",
          "Redução de erros manuais através de validações automatizadas de input de dados."
        ]
      }
    ]
  }
];