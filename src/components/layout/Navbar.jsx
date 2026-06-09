import React, { useState } from 'react';
import { Terminal, Menu, X, ChevronRight } from 'lucide-react';
import { theme } from '../../constants/theme';

const Navbar = ({ scrollToSection, isScrolled }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sections = ['Sobre', 'Experiência', 'Projetos', 'Contato'];

  const navigateToSection = (item) => {
    const id = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    scrollToSection(id);
    setIsMobileOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all border-b ${isScrolled ? 'backdrop-blur-md bg-[#0d1117]/90 border-[#30363d]' : 'bg-transparent border-transparent'} py-4`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={20} color={theme.func} />
            <span className="font-bold font-mono tracking-tight text-lg">davi<span style={{ color: theme.func }}>.py</span></span>
          </div>

          <button
            className="md:hidden w-10 h-10 rounded-lg border flex items-center justify-center"
            style={{ borderColor: theme.border, backgroundColor: '#161b22' }}
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {sections.map((item) => (
              <button key={item} onClick={() => navigateToSection(item)} className="hover:text-white transition-colors" style={{ color: theme.secondaryText }}>
                <span style={{ color: theme.keyword }}>#</span>{item}
              </button>
            ))}
            <a href="#/f1-english" className="hover:text-white transition-colors" style={{ color: theme.func }}>
              <span style={{ color: theme.keyword }}>#</span>F1 English
            </a>
          </div>
        </div>

        {isMobileOpen && (
          <div className="md:hidden mt-4 px-4">
            <div className="rounded-2xl border overflow-hidden shadow-2xl" style={{ borderColor: theme.border, background: 'linear-gradient(180deg, #161b22 0%, #0d1117 100%)' }}>
              {sections.map((item) => (
                <button
                  key={item}
                  onClick={() => navigateToSection(item)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left border-b hover:bg-[#1f2632] transition-colors"
                  style={{ borderColor: '#2a3342', color: theme.text }}
                >
                  <span className="text-sm font-semibold tracking-wide">
                    <span style={{ color: theme.keyword }}>#</span>{item}
                  </span>
                  <ChevronRight size={16} style={{ color: theme.secondaryText }} />
                </button>
              ))}

              <a
                href="#/f1-english"
                onClick={() => setIsMobileOpen(false)}
                className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-[#1f2632] transition-colors"
                style={{ color: theme.func }}
              >
                <span className="text-sm font-semibold tracking-wide">
                  <span style={{ color: theme.keyword }}>#</span>F1 English Tracker
                </span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        )}
      </nav>
  );
};

export default Navbar;