import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Inicializa uma única vez
mermaid.initialize({ 
  startOnLoad: false,
  theme: 'dark', // Tema escuro padrão do mermaid
});

const MermaidDiagram = ({ chartCode }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (chartCode && ref.current) {
      // 1. Reseta o conteúdo para o código texto original
      ref.current.innerHTML = chartCode;
      ref.current.removeAttribute('data-processed');
      
      // 2. Manda desenhar
      mermaid.run({
        nodes: [ref.current]
      }).catch(err => console.error("Erro Mermaid:", err));
    }
  }, [chartCode]);

  return (
    // Fundo cinza escuro fixo para garantir contraste
    <div className="p-4 bg-[#0d1117] overflow-x-auto border border-gray-700 rounded">
      <div ref={ref} className="mermaid">
        {chartCode}
      </div>
    </div>
  );
};

export default MermaidDiagram;