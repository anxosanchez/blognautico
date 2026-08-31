import React from 'react';
import { SPEAKERS } from '../data/speakersData';
import { Users, Sparkles, Award, Ship, ExternalLink, Calendar, Compass, ShieldCheck } from 'lucide-react';

export default function Speakers({ onNavigate }) {
  return (
    <section id="ponentes" className="py-24 relative overflow-hidden bg-ocean-950/70">
      
      {/* Sonar radial backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-electric text-xs font-mono mb-4 backdrop-blur-md">
            <Users className="w-3.5 h-3.5" />
            <span>PANEL DE EXPERTOS & LÍDERES MARÍTIMOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ponentes y Moderadores Destacados
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Líderes de armadores, autoridades portuarias, ingenierías navales y centros de investigación marina de referencia internacional.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEAKERS.map((sp) => (
            <div
              key={sp.id}
              className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                sp.highlight 
                  ? 'bg-slate-900/80 border-cyan-500/30 shadow-glass-card hover:border-cyan-400 hover:shadow-cyan-500/20' 
                  : 'bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/70'
              }`}
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={sp.image} 
                      alt={sp.name} 
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-lg group-hover:border-cyan-300 transition-colors"
                    />
                    {sp.highlight && (
                      <span className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-ocean-950 flex items-center gap-0.5 text-[9px] font-mono font-bold shadow-md">
                        <Award className="w-2.5 h-2.5 fill-current" />
                        KEYNOTE
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white leading-tight group-hover:text-cyan-electric transition-colors">
                      {sp.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400 mt-1 truncate">{sp.organization}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{sp.role}</p>
                    {sp.specialty && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-ocean-950 text-hydrogen-300 border border-hydrogen-500/30">
                        ⚓ {sp.specialty}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-ocean-950/80 border border-white/5 mb-4 group-hover:border-cyan-500/20 transition-colors">
                  <p className="text-[11px] font-mono text-cyan-300 font-bold mb-1.5 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                    <span className="line-clamp-1">{sp.topic}</span>
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                    {sp.bio}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[170px]">
                  {sp.sessions[0]}
                </span>
                <button
                  onClick={() => onNavigate('programa')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-electric transition-colors flex items-center gap-1 py-1 px-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Ver en Agenda</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
