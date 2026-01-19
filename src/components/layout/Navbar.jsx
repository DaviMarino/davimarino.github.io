import React from 'react';
import { Terminal } from 'lucide-react';
import { theme } from '../../constants/theme';

const Navbar = ({ scrollToSection, isScrolled }) => {
  return (
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
  );
};

export default Navbar;