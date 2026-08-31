import React, { useState } from 'react';
import { Anchor, Mail, Send, Sparkles, Shield, ExternalLink, Heart } from 'lucide-react';

export default function Footer({ onNavigate, onOpenRegister, onShowToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    onShowToast?.('¡Suscrito al boletín de IBERNAÚTICA 27 con éxito!', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-ocean-950 border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('hero')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-hydrogen-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-electric shadow-glow-cyan">
                <Anchor className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-black tracking-tight text-white font-mono">IBERNAÚTICA</span>
                <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-hydrogen-400 font-mono">27</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Jornadas técnicas y científicas sobre la transición energética y descarbonización del sector marítimo, ingeniería naval, infraestructura portuaria OPS y flota pesquera.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 font-mono text-[10px] border border-cyan-500/20">
                18 - 19 Febrero 2027
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-hydrogen-500/10 text-hydrogen-300 font-mono text-[10px] border border-hydrogen-500/20">
                Vigo & Streaming
              </span>
            </div>
          </div>

          {/* Col 3: Secciones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('programa')} className="hover:text-cyan-electric transition-colors">
                  Programa de las Jornadas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wiki')} className="hover:text-cyan-electric transition-colors">
                  Wiki Técnica & Combustibles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('foro')} className="hover:text-cyan-electric transition-colors">
                  Foro & Preguntas a Ponentes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ponentes')} className="hover:text-cyan-electric transition-colors">
                  Ponentes y Moderadores
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('documentacion')} className="hover:text-cyan-electric transition-colors">
                  Documentación & Memorias
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ejes Técnicos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Ejes Temáticos</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Suministro OPS / Cold Ironing</li>
              <li>Metanol, Amoníaco & Hidrógeno</li>
              <li>Eólica Marina Flotante (Offshore)</li>
              <li>Flota Pesquera & Javier Touza</li>
              <li>Reglamento Europeo AFIR & FuelEU</li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Boletín Técnico</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Recibe los avisos de publicación de ponencias, horarios de coloquios y memorias oficiales.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-xl bg-ocean-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-cyan-400 hover:text-white"
                  title="Suscribirse"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Institutional entities bar */}
        <div className="py-8 border-b border-white/5">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center mb-4">
            Comité Asesor y Entidades Participantes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-xs font-semibold">
            <span className="hover:text-cyan-300 transition-colors">Autoridad Portuaria de Vigo</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-cyan-300 transition-colors">GHENOVA Naval Engineering</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-cyan-300 transition-colors">ARVI (Armadores de Vigo)</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-cyan-300 transition-colors">Centro de Investigación Marina (CIM)</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-cyan-300 transition-colors">Clúster del Sector Naval</span>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© 2027 IBERNAÚTICA • Congreso Técnico de Descarbonización de la Navegación. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Diseñado con arquitectura SPA React + Firebase</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
