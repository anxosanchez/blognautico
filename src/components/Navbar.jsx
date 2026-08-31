import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Calendar, 
  BookOpen, 
  MessageSquareText, 
  FileText, 
  Users, 
  Menu, 
  X, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onOpenRegister, unreadQuestionsCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Inicio', icon: Anchor },
    { id: 'programa', label: 'Programa', icon: Calendar },
    { id: 'wiki', label: 'Wiki Técnica', icon: BookOpen },
    { id: 'foro', label: 'Foro & Preguntas', icon: MessageSquareText, badge: unreadQuestionsCount > 0 ? unreadQuestionsCount : null },
    { id: 'ponentes', label: 'Ponentes', icon: Users },
    { id: 'documentacion', label: 'Documentación', icon: FileText },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-ocean-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-hydrogen-500/20 border border-cyan-400/30 flex items-center justify-center shadow-glow-cyan group-hover:border-cyan-400 transition-all duration-300">
              <Anchor className="w-5 h-5 text-cyan-electric group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-hydrogen-500 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-hydrogen-500"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white font-mono">IBERNAÚTICA</span>
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-hydrogen-400 font-mono">27</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Descarbonización Naval • Feb 2027</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-hydrogen-500/20 text-cyan-electric border border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-electric' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-cyan-500 text-ocean-950 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('foro')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
            >
              <Zap className="w-3.5 h-3.5 text-hydrogen-400" />
              <span>Foro Directo</span>
            </button>
            <button
              onClick={onOpenRegister}
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 via-cyan-electric to-hydrogen-400 hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acreditarse</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="px-3 py-1.5 text-xs font-bold rounded-lg text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400"
            >
              Acreditarse
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-4 p-4 rounded-2xl bg-ocean-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-electric border border-cyan-500/30'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-500 text-ocean-950">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-3 mt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Solicitar Acreditación Oficial</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
