import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Radio, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Compass, 
  Ship, 
  Flame, 
  Wind,
  Layers,
  ChevronDown,
  Navigation,
  Anchor,
  Activity
} from 'lucide-react';

export default function Hero({ onNavigate, onOpenRegister }) {
  // Countdown Timer target: February 18, 2027 at 09:00:00 UTC
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2027-02-18T09:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-24 lg:pt-36 lg:pb-36 overflow-hidden">
      
      {/* Background Cinematic Naval Vessel Image with Atmospheric Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero_vessel_cinematic.jpg`}
          alt="Buque de investigación y carga descarbonizado con velas de rotor en la Ría de Vigo" 
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] opacity-35 filter brightness-90 contrast-110"
        />
        {/* Layered Gradient Blending to Deep Maritime Slate */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/85 to-ocean-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-ocean-950/90" />
        
        {/* Sonar Radar Scan Beam Animation */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-500/10 pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-cyan-500/15 animate-ping opacity-20" />
          <div className="absolute inset-16 rounded-full border border-cyan-500/10" />
          <div className="absolute inset-32 rounded-full border border-cyan-500/5" />
        </div>
      </div>

      {/* Dynamic Ambient Glow Layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-hydrogen-500/15 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Nautical Coordinates & Telemetry HUD */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ocean-900/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-glow-cyan mb-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-500">
            <Compass className="w-3.5 h-3.5 text-cyan-electric animate-[spin_30s_linear_infinite]" />
            <span>LAT 42° 14′ 32″ N • LON 08° 43′ 50″ W</span>
            <span className="text-slate-600">|</span>
            <span className="text-hydrogen-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-hydrogen-400 animate-ping"></span>
              RÍA DE VIGO
            </span>
          </div>

          {/* Top Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 px-4 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-glass-card mb-8">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-electric">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>IBERNAÚTICA 27</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-hydrogen-400" />
              <span>18 y 19 Febrero 2027</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Auditorio Mar de Vigo & Online</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Jornadas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-electric to-hydrogen-400">Descarbonización</span> de la Navegación y el Sector Naval
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
            El congreso técnico de referencia sobre electrificación en muelle (<strong className="text-cyan-300 font-semibold">OPS</strong>), vectores de propulsión cero emisiones (<strong className="text-hydrogen-300 font-semibold">Metanol, H2, Amoníaco</strong>), renovables marinas y la reconversión estratégica de la <strong className="text-white font-semibold">flota pesquera</strong>.
          </p>

          {/* Interactive Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 via-cyan-electric to-hydrogen-400 hover:shadow-glow-cyan-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 group"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Solicitar Acreditación Oficial</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('programa')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-850 border border-cyan-500/30 hover:border-cyan-400 hover:text-white backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/40"
            >
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>Explorar Programa Técnico</span>
            </button>
            <button
              onClick={() => onNavigate('wiki')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-base font-medium text-slate-300 bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-hydrogen-500/50 hover:text-white backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Ship className="w-5 h-5 text-hydrogen-400" />
              <span>Esquema Técnico Naval</span>
            </button>
          </div>

          {/* Countdown Clock Component with Nautical Trim */}
          <div className="max-w-2xl mx-auto mb-14 p-6 rounded-3xl bg-ocean-950/80 backdrop-blur-2xl border border-cyan-500/30 shadow-glass-card relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-mono font-medium text-slate-300 uppercase tracking-widest">Cuenta atrás para la apertura de sesiones en Vigo</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 sm:gap-4 font-mono">
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/10 shadow-inner">
                <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Días</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/10 shadow-inner">
                <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Horas</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/10 shadow-inner">
                <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Minutos</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/40 shadow-glow-cyan">
                <span className="text-2xl sm:text-4xl font-extrabold text-cyan-electric">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-cyan-400 uppercase tracking-wider mt-1">Segundos</span>
              </div>
            </div>
          </div>

          {/* Graphical Pillars Grid with Rich Imagery Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            
            {/* Pillar 1: OPS */}
            <div 
              onClick={() => onNavigate('wiki')}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-400 p-4 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="h-24 -mx-4 -mt-4 mb-3 overflow-hidden relative">
                <img 
                  src={`${import.meta.env.BASE_URL}images/ops_cold_ironing_port.jpg`}
                  alt="OPS Cold Ironing Terminal" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500 text-ocean-950">
                  OPS / 0 dB
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>OPS & Cold Ironing</span>
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">Electrificación en muelle y convertidores 50/60 Hz en dársenas.</p>
            </div>

            {/* Pillar 2: Metanol & H2 */}
            <div 
              onClick={() => onNavigate('wiki')}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-hydrogen-500/20 hover:border-hydrogen-400 p-4 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-hydrogen-500/10 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="h-24 -mx-4 -mt-4 mb-3 overflow-hidden relative">
                <img 
                  src={`${import.meta.env.BASE_URL}images/hero_vessel_cinematic.jpg`}
                  alt="Vectores de propulsión verde" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-hydrogen-400 text-ocean-950">
                  DUAL-FUEL
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-hydrogen-400" />
                <span>Metanol, NH3 & H2</span>
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">Vectores criogénicos y motores dual-fuel construidos en ría.</p>
            </div>

            {/* Pillar 3: Offshore Wind */}
            <div 
              onClick={() => onNavigate('programa')}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-blue-500/20 hover:border-blue-400 p-4 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/10 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="h-24 -mx-4 -mt-4 mb-3 overflow-hidden relative">
                <img 
                  src={`${import.meta.env.BASE_URL}images/offshore_wind_csov.jpg`}
                  alt="Buque CSOV y eólica offshore" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-400 text-ocean-950">
                  OFFSHORE
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-blue-400" />
                <span>Renovables Marinas</span>
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">Eólica marina flotante y buques de apoyo CSOV de última generación.</p>
            </div>

            {/* Pillar 4: Fishing Fleet */}
            <div 
              onClick={() => onNavigate('ponentes')}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-amber-500/20 hover:border-amber-400 p-4 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="h-24 -mx-4 -mt-4 mb-3 overflow-hidden relative">
                <img 
                  src={`${import.meta.env.BASE_URL}images/fishing_fleet_modern.jpg`}
                  alt="Flota Pesquera y Gran Sol" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-400 text-ocean-950">
                  GRAN SOL
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-amber-400" />
                <span>Flota Pesquera</span>
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">Bodegas a -25°C, Gran Sol y mesa redonda con Javier Touza.</p>
            </div>

          </div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="mt-14 flex justify-center relative z-10">
        <button 
          onClick={() => onNavigate('programa')}
          className="text-slate-400 hover:text-cyan-electric transition-colors flex flex-col items-center gap-1 animate-bounce text-xs"
        >
          <span className="font-mono text-[10px] tracking-wider uppercase">Explorar Programa y Cronograma</span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* Hydrodynamic Bottom Wave Divider */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-ocean-950 fill-current opacity-90">
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

    </section>
  );
}
