import React from 'react';
import { Linkedin, Github, ExternalLink, GitBranch, BarChart2, Layers } from 'lucide-react';
import { theme } from '../constants/theme';
// Adicionamos o profileCode na importação
import { personalInfo, projectsData, profileCode } from '../data/mockData';
import ProjectRow from '../components/sections/ProjectRow';
import SkillRadarChart from '../components/charts/SkillRadarChart';
import ImpactChart from '../components/charts/ImpactChart';
import SkillsTable from '../components/sections/SkillsTable';

const Home = ({ setSelectedProject }) => {
  return (
    <>
      {/* Hero Section */}
      <section id="sobre" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Transformando <br /><span style={{ color: theme.variable }}>Dados</span> em <br /><span style={{ color: theme.func }}>Decisões</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: theme.secondaryText }}>
                {personalInfo.role}. Especialista em Power BI, Python e estratégias de governança de dados.
            </p>
            <div className="flex gap-4">
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-md font-medium text-white bg-[#238636] hover:brightness-110"><Linkedin size={18} /> LinkedIn</a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-md font-medium border hover:bg-[#30363d]" style={{ backgroundColor: theme.card, borderColor: theme.border, color: theme.text }}><Github size={18} /> GitHub</a>
            </div>
          </div>
          
          {/* Mockup do Código (Agora limpo!) */}
          <div className="relative rounded-lg shadow-2xl overflow-hidden border font-mono text-sm leading-6" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
             <div className="px-4 py-2 border-b flex items-center bg-[#161b22] border-[#30363d]">
               <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div><div className="w-3 h-3 rounded-full bg-[#27c93f]"></div></div>
             </div>
             <div className="p-6 overflow-x-auto">
                <div className="grid grid-cols-[auto,1fr] gap-4">
                  {/* Linhas numeradas */}
                  <div className="flex flex-col text-right select-none opacity-30" style={{ color: theme.secondaryText }}>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => <span key={n}>{n}</span>)}
                  </div>
                  {/* O código vem do mockData agora */}
                  <pre style={{ color: theme.text }}>
                    <code>
                      {profileCode}
                    </code>
                  </pre>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Analytics & Charts */}
      <section className="py-20 border-t" style={{ borderColor: theme.border, backgroundColor: "#0d1117" }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-[#161b22] p-8 rounded-xl border" style={{ borderColor: theme.border }}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><GitBranch size={20} color={theme.parameter} /><span className="text-white">Skill Distribution</span></h2>
                <SkillRadarChart />
            </div>
            <div>
                <div className="mb-8"><h2 className="text-3xl font-bold mb-4">Resultados Reais</h2><p style={{ color: theme.secondaryText }}>Resolvendo problemas reais de negócio com métricas claras.</p></div>
                <div className="bg-[#161b22] p-8 rounded-xl border relative overflow-hidden" style={{ borderColor: theme.border }}>
                    <div className="absolute top-0 right-0 p-4 opacity-5"><BarChart2 size={100} /></div>
                    <ImpactChart />
                </div>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Layers size={24} className="text-white" /><span className="text-white">Stack Técnica Detalhada</span></h2>
            <SkillsTable />
          </div>
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
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-sm hover:underline flex items-center gap-1" style={{ color: theme.keyword }}>Ver todos no GitHub <ExternalLink size={14} /></a>
          </div>
          <div className="flex flex-col">
            {projectsData.map((proj) => (
              <ProjectRow key={proj.id} project={proj} onViewProject={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;