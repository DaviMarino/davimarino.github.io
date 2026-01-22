import React, { useEffect, useState } from 'react';
import { Github, MapPin, Users, Book, ExternalLink } from 'lucide-react';
// CORREÇÃO: Removi a importação de 'theme' pois não era usada

const GithubCard = ({ username }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Falha ao buscar dados');
        const jsonData = await response.json();
        setData(jsonData);
      } catch { 
        // CORREÇÃO: Removi o '(err)' para evitar o warning 'err is defined but never used'
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchGithubData();
  }, [username]);

  if (loading) return (
    <div className="w-[300px] h-[180px] rounded-md animate-pulse border bg-[#161b22] border-[#30363d] p-4 flex flex-col justify-between">
       <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-[#30363d]"></div>
          <div className="flex-1 space-y-2">
             <div className="h-4 w-3/4 bg-[#30363d] rounded"></div>
             <div className="h-3 w-1/2 bg-[#30363d] rounded"></div>
          </div>
       </div>
       <div className="h-8 w-full bg-[#30363d] rounded mt-4"></div>
    </div>
  );

  if (error || !data) return null;

  return (
    <a 
      href={data.html_url} 
      target="_blank" 
      rel="noreferrer"
      className="group block w-full md:w-[320px] bg-[#161b22] border border-[#30363d] rounded-xl p-5 transition-all hover:border-[#79c0ff] hover:shadow-lg relative overflow-hidden text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#161b22] to-[#202630] opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={data.avatar_url} 
            alt={data.name} 
            className="w-14 h-14 rounded-full border-2 border-[#30363d] group-hover:border-[#79c0ff] transition-colors" 
          />
          <div>
            <h3 className="font-bold text-white group-hover:text-[#79c0ff] transition-colors flex items-center gap-2">
              {data.name || data.login}
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <span className="text-sm font-mono text-slate-500">@{data.login}</span>
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-4 line-clamp-2 h-10">
          {data.bio || "Data Scientist & Developer."}
        </p>

        <div className="grid grid-cols-3 gap-2 py-3 border-t border-[#30363d]">
          <div className="text-center">
             <div className="text-xs text-slate-500 font-mono mb-1 flex justify-center items-center gap-1">
                <Book size={12} /> Repos
             </div>
             <span className="font-bold text-white text-sm">{data.public_repos}</span>
          </div>
          <div className="text-center border-l border-[#30363d]">
             <div className="text-xs text-slate-500 font-mono mb-1 flex justify-center items-center gap-1">
                <Users size={12} /> Follows
             </div>
             <span className="font-bold text-white text-sm">{data.followers}</span>
          </div>
          <div className="text-center border-l border-[#30363d]">
             <div className="text-xs text-slate-500 font-mono mb-1 flex justify-center items-center gap-1">
                <Github size={12} /> 
             </div>
             <span className="font-bold text-emerald-400 text-sm">Pro</span>
          </div>
        </div>
        
        {data.location && (
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                <MapPin size={12} /> {data.location}
            </div>
        )}
      </div>
    </a>
  );
};

export default GithubCard;