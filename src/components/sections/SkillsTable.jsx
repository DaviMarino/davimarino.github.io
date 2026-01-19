import React from 'react';
import AIStackCard from '../ui/AIStackCard';
import { skillsData } from '../../data/mockData';

const SkillsTable = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {skillsData.map((cat, i) => (
        <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-opacity-50 transition-colors">
          <div className="flex items-center gap-2 mb-4 border-b border-[#30363d] pb-2">
            {cat.icon}
            <h3 className="font-bold text-white">{cat.title}</h3>
          </div>
          <div className="space-y-3">
            {cat.skills.map((s, j) => (
              <div key={j}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-200">{s.n}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(k => (
                      <div key={k} className="h-1.5 w-3 rounded-sm" style={{ backgroundColor: k <= s.l ? cat.color : '#30363d' }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <AIStackCard />
    </div>
  );
};

export default SkillsTable;