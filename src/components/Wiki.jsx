import React, { useState } from 'react';
import { WIKI_ARTICLES } from '../data/wikiData';
import VesselBlueprintViewer from './VesselBlueprintViewer';
import { 
  BookOpen, 
  Zap, 
  Flame, 
  Ship, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  BarChart3, 
  Sliders,
  ExternalLink,
  ChevronRight,
  Info,
  Compass
} from 'lucide-react';

export default function Wiki({ onAskQuestionForCategory }) {
  const [activeArticleId, setActiveArticleId] = useState('ops-cold-ironing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuelMetric, setSelectedFuelMetric] = useState('densityVolumetric'); // 'densityVolumetric' | 'densityGravimetric' | 'ghgReduction'

  const activeArticle = WIKI_ARTICLES.find(a => a.id === activeArticleId) || WIKI_ARTICLES[0];

  const filteredArticles = WIKI_ARTICLES.filter(art => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.sections.some(s => s.content.toLowerCase().includes(q))
    );
  });

  return (
    <section id="wiki" className="py-24 relative overflow-hidden bg-ocean-900/30 border-y border-white/5">
      
      {/* Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hydrogen-500/10 border border-hydrogen-500/30 text-hydrogen-400 text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>BASE DE CONOCIMIENTO TÉCNICO & ARQUITECTURA NAVAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Wiki Técnica & Simulador de Buque
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Documentación técnica preparatoria y esquemas de ingeniería naval elaborados por el comité científico para contextualizar los debates del congreso.
          </p>
        </div>

        {/* Interactive Vessel Blueprint Simulator */}
        <div className="mb-14">
          <VesselBlueprintViewer />
        </div>

        {/* Search & Topic Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {WIKI_ARTICLES.map((article) => {
            const isActive = activeArticleId === article.id;
            const getIcon = () => {
              if (article.category === 'ops') return Zap;
              if (article.category === 'combustibles') return Flame;
              return Ship;
            };
            const Icon = getIcon();

            return (
              <button
                key={article.id}
                onClick={() => setActiveArticleId(article.id)}
                className={`text-left p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isActive 
                    ? 'bg-slate-900/90 border-cyan-400 shadow-glow-cyan' 
                    : 'bg-slate-900/30 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-cyan-500 text-ocean-950 shadow-md' : 'bg-slate-800 text-cyan-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{article.readTime}</span>
                  </div>
                  
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-electric font-semibold">
                    {article.badge}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 mb-2 leading-snug">
                    {article.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 mt-3 pt-3 border-t border-white/5">
                  <span>Ver artículo y datos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Article Full View */}
        <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-glass-card">
          
          {/* Article Header */}
          <div className="border-b border-white/10 pb-8 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-electric border border-cyan-500/30">
                {activeArticle.categoryName}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{activeArticle.readTime}</span>
                </span>
                <button
                  onClick={() => onAskQuestionForCategory(activeArticle.category, activeArticle.title)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Proponer debate sobre esto</span>
                </button>
              </div>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
              {activeArticle.title}
            </h3>
            <p className="text-sm sm:text-base text-cyan-200/80 font-medium">
              {activeArticle.subtitle}
            </p>
          </div>

          {/* Key Stats Cards (if present) */}
          {activeArticle.keyStats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {activeArticle.keyStats.map((stat, sIdx) => (
                <div key={sIdx} className="p-4 rounded-2xl bg-ocean-950/60 border border-white/5">
                  <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-lg sm:text-xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-hydrogen-400">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Fuel Comparison Matrix (if active article is fuel) */}
          {activeArticle.interactiveMatrix && activeArticle.fuelComparison && (
            <div className="mb-12 p-6 rounded-3xl bg-ocean-950/90 border border-cyan-500/30 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-electric" />
                    <span>Matriz Cuantitativa de Vectores Energéticos Navales</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Comparativa de densidad energética y penalización de espacio en bodegas</p>
                </div>
                
                {/* Metric Selector Buttons */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setSelectedFuelMetric('densityVolumetric')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedFuelMetric === 'densityVolumetric' ? 'bg-cyan-500 text-ocean-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Densidad Vol. (MJ/L)
                  </button>
                  <button
                    onClick={() => setSelectedFuelMetric('densityGravimetric')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedFuelMetric === 'densityGravimetric' ? 'bg-cyan-500 text-ocean-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Densidad Grav. (MJ/kg)
                  </button>
                </div>
              </div>

              {/* Visual Bars Comparison */}
              <div className="space-y-4 mb-8">
                {activeArticle.fuelComparison.map((fuel, fIdx) => {
                  const val = selectedFuelMetric === 'densityVolumetric' ? fuel.densityVolumetric : fuel.densityGravimetric;
                  const maxVal = selectedFuelMetric === 'densityVolumetric' ? 36.0 : 120.0;
                  const percentage = Math.min(100, Math.max(5, (val / maxVal) * 100));

                  return (
                    <div key={fIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">{fuel.name} <span className="text-[10px] text-slate-400 font-normal">({fuel.type})</span></span>
                        <span className="font-mono font-bold text-cyan-electric">{val} {selectedFuelMetric === 'densityVolumetric' ? 'MJ/L' : 'MJ/kg'}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-hydrogen-400 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Technical Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="py-2.5 pr-4 font-semibold">Combustible</th>
                      <th className="py-2.5 px-3 font-semibold">Tª Almacén</th>
                      <th className="py-2.5 px-3 font-semibold">Presión</th>
                      <th className="py-2.5 px-3 font-semibold">Volumen vs MGO</th>
                      <th className="py-2.5 px-3 font-semibold">Toxicidad</th>
                      <th className="py-2.5 px-3 font-semibold">TRL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {activeArticle.fuelComparison.map((f, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 pr-4 font-bold text-white">{f.name}</td>
                        <td className="py-2.5 px-3">{f.storageTemp}</td>
                        <td className="py-2.5 px-3">{f.storagePressure}</td>
                        <td className="py-2.5 px-3 font-semibold text-amber-300">{f.cargoVolumePenalty}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                            f.toxicity.includes('Alta') ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {f.toxicity}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-cyan-electric">TRL {f.trl}/9</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Text Content Sections */}
          <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            {activeArticle.sections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-3">
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-cyan-400"></span>
                  <span>{sec.heading}</span>
                </h4>
                <div className="whitespace-pre-line text-slate-300/90 pl-3.5 border-l border-white/5">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
