import React, { useState } from 'react';
import { 
  PROGRAM_DAYS, 
  PROGRAM_CATEGORIES 
} from '../data/programData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Tag, 
  Sparkles, 
  MessageSquare, 
  ChevronRight, 
  ChevronDown, 
  Bookmark, 
  Check, 
  Share2, 
  Zap, 
  Ship, 
  Wind, 
  Flame,
  Info
} from 'lucide-react';

export default function Program({ onAskQuestionForSession, onShowToast }) {
  const [selectedDayId, setSelectedDayId] = useState('day-2'); // default to technical intensive day 2
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedSessions, setBookmarkedSessions] = useState([]);
  const [expandedSubTalks, setExpandedSubTalks] = useState({
    's2-2': true,
    's2-4': true,
    's2-6': true,
    's2-8': true
  });

  const toggleBookmark = (sessionId, sessionTitle) => {
    if (bookmarkedSessions.includes(sessionId)) {
      setBookmarkedSessions(prev => prev.filter(id => id !== sessionId));
      onShowToast?.(`Sesión eliminada de tu agenda personal`, 'info');
    } else {
      setBookmarkedSessions(prev => [...prev, sessionId]);
      onShowToast?.(`"${sessionTitle}" añadida a tu agenda personal`, 'success');
    }
  };

  const toggleSubtalks = (sessionId) => {
    setExpandedSubTalks(prev => ({
      ...prev,
      [sessionId]: !prev[sessionId]
    }));
  };

  const currentDay = PROGRAM_DAYS.find(d => d.id === selectedDayId) || PROGRAM_DAYS[0];

  const filteredSessions = currentDay.sessions.filter(session => {
    if (selectedCategory === 'all') return true;
    return session.category === selectedCategory;
  });

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'ops':
        return 'bg-cyan-500/15 text-cyan-electric border-cyan-500/30';
      case 'renovables':
        return 'bg-emerald-500/15 text-hydrogen-400 border-emerald-500/30';
      case 'combustibles':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'pesca':
        return 'bg-blue-500/15 text-sky-300 border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-white/10';
    }
  };

  return (
    <section id="programa" className="py-24 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-hydrogen-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-electric text-xs font-mono mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>CRONOGRAMA CIENTÍFICO Y TÉCNICO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Programa de las Jornadas
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Estructurado en dos jornadas con conferencias magistrales, bloques técnicos intensivos de 45 minutos + coloquio y mesas redondas de alto nivel.
          </p>
        </div>

        {/* Day Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          {PROGRAM_DAYS.map((day) => {
            const isSelected = selectedDayId === day.id;
            return (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-slate-900 to-ocean-900 border-cyan-400 text-white shadow-glow-cyan'
                    : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
                    isSelected ? 'bg-cyan-500 text-ocean-950 shadow-md' : 'bg-slate-800 text-slate-300'
                  }`}>
                    D{day.dayNumber}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">{day.title}</h3>
                    <p className="text-xs text-slate-400 font-mono">{day.shortDate}</p>
                  </div>
                </div>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-electric animate-pulse hidden sm:block"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start md:justify-center">
          {PROGRAM_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-electric border-cyan-400 shadow-sm'
                    : 'bg-slate-900/30 text-slate-400 border-white/5 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Day Description Banner */}
        <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/5 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDay.date}</span>
            </div>
            <p className="text-sm text-slate-300">{currentDay.description}</p>
          </div>
          <div className="text-xs text-slate-400 font-mono whitespace-nowrap flex items-center gap-2">
            <span>{filteredSessions.length} {filteredSessions.length === 1 ? 'Sesión programada' : 'Sesiones programadas'}</span>
          </div>
        </div>

        {/* Timeline Sessions List */}
        <div className="space-y-6">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/20 border border-white/5">
              <Info className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">No hay sesiones en esta categoría para este día</h4>
              <p className="text-sm text-slate-400 mb-4">Selecciona "Todas las Sesiones" o cambia de jornada para ver el resto del cronograma.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-electric border border-cyan-500/30"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            filteredSessions.map((session, index) => {
              const isBookmarked = bookmarkedSessions.includes(session.id);
              const hasSubtalks = Boolean(session.subTalks && session.subTalks.length > 0);
              const isExpanded = expandedSubTalks[session.id];

              return (
                <div 
                  key={session.id}
                  className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                    session.highlight 
                      ? 'bg-slate-900/60 border border-cyan-500/30 shadow-glass-card hover:border-cyan-400' 
                      : 'bg-slate-900/30 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Highlight Glow for Key Sessions */}
                  {session.highlight && (
                    <div className="absolute top-0 right-10 -translate-y-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-hydrogen-500 text-ocean-950 shadow-md">
                      {session.specialBadge || 'SESIÓN TÉCNICA PRINCIPAL'}
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    
                    {/* Left Meta: Time, Location, Badge */}
                    <div className="lg:w-72 flex-shrink-0">
                      <div className="flex items-center gap-2 text-cyan-electric font-mono font-bold text-base mb-1.5">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>{session.time}</span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        <span>{session.duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="truncate">{session.location}</span>
                      </div>

                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${getCategoryBadgeClass(session.category)}`}>
                        {session.categoryLabel}
                      </span>
                    </div>

                    {/* Center: Title, Description, Speakers, SubTalks */}
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-electric transition-colors">
                        {session.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3 text-sm text-slate-300">
                        <User className="w-4 h-4 text-hydrogen-400 flex-shrink-0" />
                        <span className="font-semibold text-white">{session.speaker}</span>
                        {session.speakerRole && (
                          <span className="text-xs text-slate-400 hidden sm:inline">— {session.speakerRole}</span>
                        )}
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {session.description}
                      </p>

                      {/* Sub-Talks Accordion / Breakdown */}
                      {hasSubtalks && (
                        <div className="mt-4 p-4 rounded-2xl bg-ocean-950/70 border border-white/5">
                          <button
                            onClick={() => toggleSubtalks(session.id)}
                            className="w-full flex items-center justify-between text-xs font-mono font-bold text-cyan-300 hover:text-cyan-electric transition-colors pb-2"
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Desglose de Conferencias (2x45 min + 15 min Coloquio)</span>
                            </span>
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 space-y-3 pt-3 border-t border-white/5">
                              {session.subTalks.map((sub, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-xs">
                                  <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono font-semibold whitespace-nowrap">
                                    {sub.time}
                                  </span>
                                  <div className="flex-1">
                                    <p className="font-medium text-slate-200">{sub.title}</p>
                                    <p className="text-slate-400 text-[11px] mt-0.5">{sub.speaker}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Round Table Participants if any */}
                      {session.roundTableParticipants && (
                        <div className="mt-4 p-4 rounded-2xl bg-ocean-950/80 border border-blue-500/20">
                          <h4 className="text-xs font-bold font-mono text-cyan-electric mb-3 flex items-center gap-2">
                            <Ship className="w-4 h-4 text-cyan-400" />
                            <span>Panelistas de la Mesa Redonda</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {session.roundTableParticipants.map((part, pIdx) => (
                              <div key={pIdx} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                                <p className="text-xs font-bold text-white">{part.name}</p>
                                <p className="text-[11px] text-slate-400">{part.role}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {session.tags && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-4">
                          {session.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Interactive Actions */}
                    <div className="flex flex-row lg:flex-col items-center justify-end gap-2 lg:w-44 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <button
                        onClick={() => toggleBookmark(session.id, session.title)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                          isBookmarked
                            ? 'bg-hydrogen-500/20 text-hydrogen-400 border border-hydrogen-500/40'
                            : 'bg-slate-800/80 text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isBookmarked ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>En mi Agenda</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Guardar</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onAskQuestionForSession(session.category, session.title)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold text-cyan-electric bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Preguntar en Foro</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
