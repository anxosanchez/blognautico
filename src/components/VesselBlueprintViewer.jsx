import React, { useState } from 'react';
import { 
  Zap, 
  Flame, 
  Wind, 
  BatteryCharging, 
  Ship, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Cpu, 
  Gauge, 
  Thermometer, 
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const SHIP_SYSTEMS = [
  {
    id: 'ops',
    name: 'Conexión Eléctrica OPS (Cold Ironing)',
    category: 'Electrificación Portuaria',
    badge: 'Muelle Cero Emisiones',
    icon: Zap,
    color: 'from-cyan-400 to-blue-500',
    accentColor: '#00F2FE',
    coordinates: { x: '18%', y: '68%' },
    description: 'Toma de corriente en muelle de alta/media tensión (6.6 kV / 11 kV) con convertidor estático de frecuencia a bordo (50 Hz red terrestre a 60 Hz red de buque).',
    telemetry: {
      emissionsCut: '100% en puerto',
      fuelSaved: '4.2 ton MGO/día',
      noiseLevel: '< 55 dB(A)',
      standard: 'IEC/IEEE 80005-1'
    },
    diagramHighlights: ['hatch', 'converter', 'switchboard'],
    advantages: [
      'Eliminación total de humos, óxidos de nitrógeno (NOx) y partículas (PM) en dársenas urbanas',
      'Parada completa de motores auxiliares diésel durante estancias de descarga y descanso de tripulación',
      'Cumplimiento anticipado del reglamento FuelEU Maritime para buques portacontenedores y pasaje'
    ]
  },
  {
    id: 'methanol',
    name: 'Tanques Criogénicos e-Metanol & H2',
    category: 'Vectores de Combustible',
    badge: 'Combustibles Renovables',
    icon: Flame,
    color: 'from-emerald-400 to-teal-500',
    accentColor: '#10B981',
    coordinates: { x: '45%', y: '72%' },
    description: 'Tanques estructurales de acero inoxidable con inertización de nitrógeno (N2) y doble barrera para almacenamiento seguro de e-metanol líquido y vectores verdes.',
    telemetry: {
      emissionsCut: '92% Well-to-Wake',
      fuelSaved: 'Zero SOx & PM',
      noiseLevel: 'Estándar IMO Tier III',
      standard: 'Código IGF / IMO MSC.1'
    },
    diagramHighlights: ['tanks', 'fuel-lines', 'engine'],
    advantages: [
      'Líquido a temperatura y presión ambiente para metanol (evita criogenia extrema a -253°C de H2 puro)',
      'Compatible con bunkering por camión cisterna o gabarra en el Puerto de Vigo',
      'Huella de carbono neta neutral cuando se produce con CO2 biogénico e hidrógeno verde'
    ]
  },
  {
    id: 'rotors',
    name: 'Velas Rígidas Flettner (e-Sails)',
    category: 'Propulsión Eólica Asistida',
    badge: 'WAPS (Wind Propulsion)',
    icon: Wind,
    color: 'from-sky-400 to-indigo-500',
    accentColor: '#38BDF8',
    coordinates: { x: '35%', y: '25%' },
    description: 'Rotores cilíndricos verticales giratorios que aprovechan el efecto Magnus para generar empuje aerodinámico perpendicular al viento aparente.',
    telemetry: {
      emissionsCut: '15% - 24% en ruta',
      fuelSaved: '2.8 ton MGO/1000 nm',
      noiseLevel: 'Silencioso',
      standard: 'DNV WAPS Notation'
    },
    diagramHighlights: ['rotors', 'mast', 'wind-arrows'],
    advantages: [
      'Empuje suplementario directo sin consumo de combustible adicional en tránsitos del Atlántico',
      'Control automatizado de rotación vinculado a la estación meteorológica y cartas de viento a bordo',
      'Sistemas abatibles para facilitar maniobras de carga/descarga y paso bajo puentes'
    ]
  },
  {
    id: 'bess',
    name: 'Baterías BESS & Hibridación',
    category: 'Almacenamiento Energético',
    badge: 'Peak-Shaving & Maniobra',
    icon: BatteryCharging,
    color: 'from-amber-400 to-orange-500',
    accentColor: '#F59E0B',
    coordinates: { x: '68%', y: '70%' },
    description: 'Banco de baterías de ion-litio LFP de 2.4 MWh refrigerado por líquido con sistema de extinción por agua nebulizada e inversor bidireccional.',
    telemetry: {
      emissionsCut: '35% maniobra portuaria',
      fuelSaved: '1.2 ton/maniobra',
      noiseLevel: '0 dB en atraque',
      standard: 'ClassNK / Bureau Veritas Battery-1'
    },
    diagramHighlights: ['battery', 'inverter', 'propeller'],
    advantages: [
      'Navegación en aguas interiores de la ría en modo 100% eléctrico libre de ruidos y emisiones',
      'Absorción de picos de carga (Peak Shaving) en winches y compresores de congelación de pesca',
      'Arranque instantáneo (Blackout Prevention) como respaldo de seguridad para la navegación'
    ]
  }
];

export default function VesselBlueprintViewer() {
  const [activeSystemId, setActiveSystemId] = useState('ops');
  const activeSystem = SHIP_SYSTEMS.find(s => s.id === activeSystemId) || SHIP_SYSTEMS[0];

  return (
    <div className="w-full rounded-3xl bg-slate-950/80 border border-cyan-500/30 p-6 lg:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden relative">
      
      {/* Background Blueprint Grid & HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-electric mb-1">
            <Activity className="w-4 h-4 animate-pulse text-cyan-400" />
            <span className="tracking-widest uppercase">ESQUEMA TÉCNICO INTERACTIVO • ARQUITECTURA NAVAL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Ship className="w-6 h-6 text-cyan-400" />
            <span>Buque de Referencia Descarbonizado • Ría de Vigo 2027</span>
          </h3>
        </div>

        {/* System Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-ocean-900/90 border border-white/10 text-xs">
          {SHIP_SYSTEMS.map((sys) => {
            const Icon = sys.icon;
            const isSelected = sys.id === activeSystemId;
            return (
              <button
                key={sys.id}
                onClick={() => setActiveSystemId(sys.id)}
                className={`px-3 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-cyan-500 text-ocean-950 font-bold shadow-md shadow-cyan-500/30 scale-[1.02]' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sys.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Blueprint Canvas Area */}
      <div className="relative w-full aspect-[16/8] min-h-[280px] max-h-[440px] rounded-2xl bg-ocean-950/90 border border-cyan-500/20 overflow-hidden mb-6 p-4 flex items-center justify-center">
        
        {/* Blueprint Nautical Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 242, 254, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 242, 254, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Blueprint SVG Ship Silhouette & Cutaway */}
        <svg viewBox="0 0 1000 480" className="w-full h-full max-w-4xl drop-shadow-[0_0_15px_rgba(0,242,254,0.15)]">
          <defs>
            <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0b152d" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="cyanEnergyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Water Surface Line */}
          <line x1="40" y1="360" x2="960" y2="360" stroke="#00F2FE" strokeWidth="2" strokeDasharray="8 6" opacity="0.4" />
          <text x="60" y="380" fill="#00F2FE" opacity="0.6" fontSize="12" fontFamily="monospace">LÍNEA DE FLOTACIÓN (WL)</text>

          {/* Main Ship Hull Profile (Modern Inverted Eco Bow) */}
          <path 
            d="M 120 340 
               L 160 360 
               L 820 360 
               Q 920 350 940 300 
               L 910 210 
               L 780 210 
               L 780 240 
               L 260 240 
               L 260 260 
               L 140 260 
               Z" 
            fill="url(#hullGrad)" 
            stroke="#38bdf8" 
            strokeWidth="2.5" 
          />

          {/* Superstructure & Wheelhouse */}
          <path 
            d="M 720 210 
               L 870 210 
               L 850 120 
               L 750 120 
               Z" 
            fill="#1e293b" 
            stroke="#00F2FE" 
            strokeWidth="2" 
          />
          {/* Bridge Windows */}
          <polygon points="760,135 840,135 830,160 765,160" fill="#00F2FE" fillOpacity="0.4" stroke="#00F2FE" strokeWidth="1" />

          {/* Radar Mast */}
          <line x1="795" y1="120" x2="795" y2="65" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="795" cy="65" r="5" fill="#38bdf8" />
          <line x1="780" y1="80" x2="810" y2="80" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Flettner Rotor 1 (Fore) */}
          <g className={activeSystemId === 'rotors' ? 'animate-pulse' : ''}>
            <rect 
              x="360" 
              y="90" 
              width="45" 
              height="150" 
              rx="12" 
              fill={activeSystemId === 'rotors' ? 'rgba(56, 189, 248, 0.3)' : '#0f172a'} 
              stroke={activeSystemId === 'rotors' ? '#00F2FE' : '#64748b'} 
              strokeWidth="2.5" 
              filter={activeSystemId === 'rotors' ? 'url(#glowEffect)' : undefined}
            />
            {/* Rotor rotating spiral markings */}
            <line x1="365" y1="120" x2="400" y2="135" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="365" y1="160" x2="400" y2="175" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="365" y1="200" x2="400" y2="215" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
            <text x="382" y="78" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">ROTOR 01</text>
          </g>

          {/* Flettner Rotor 2 (Aft) */}
          <g className={activeSystemId === 'rotors' ? 'animate-pulse' : ''}>
            <rect 
              x="550" 
              y="90" 
              width="45" 
              height="150" 
              rx="12" 
              fill={activeSystemId === 'rotors' ? 'rgba(56, 189, 248, 0.3)' : '#0f172a'} 
              stroke={activeSystemId === 'rotors' ? '#00F2FE' : '#64748b'} 
              strokeWidth="2.5" 
              filter={activeSystemId === 'rotors' ? 'url(#glowEffect)' : undefined}
            />
            <line x1="555" y1="120" x2="590" y2="135" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="555" y1="160" x2="590" y2="175" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="555" y1="200" x2="590" y2="215" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
            <text x="572" y="78" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">ROTOR 02</text>
          </g>

          {/* INTERNAL COMPARTMENTS */}
          {/* 1. OPS Reception Locker (Aft/Stern Hatch) */}
          <g className={activeSystemId === 'ops' ? 'animate-pulse' : ''}>
            <rect 
              x="170" 
              y="265" 
              width="70" 
              height="75" 
              rx="6" 
              fill={activeSystemId === 'ops' ? 'rgba(0, 242, 254, 0.25)' : '#0f172a'} 
              stroke={activeSystemId === 'ops' ? '#00F2FE' : '#475569'} 
              strokeWidth="2" 
              filter={activeSystemId === 'ops' ? 'url(#glowEffect)' : undefined}
            />
            <Zap x="195" y="290" className="w-5 h-5 text-cyan-400" />
            <text x="205" y="325" textAnchor="middle" fill="#00F2FE" fontSize="9" fontFamily="monospace" fontWeight="bold">OPS HATCH</text>
          </g>

          {/* Shore Power Cable when OPS is active */}
          {activeSystemId === 'ops' && (
            <g>
              <path 
                d="M 40 290 Q 110 320 170 300" 
                fill="none" 
                stroke="#00F2FE" 
                strokeWidth="4" 
                strokeDasharray="6 4" 
                className="animate-pulse"
              />
              <circle cx="40" cy="290" r="8" fill="#00F2FE" filter="url(#glowEffect)" />
              <text x="40" y="270" fill="#00F2FE" fontSize="11" fontFamily="monospace" fontWeight="bold">RED OPS MUELLE (6.6 kV)</text>
            </g>
          )}

          {/* 2. Fuel Tanks (e-Methanol & H2) */}
          <g className={activeSystemId === 'methanol' ? 'animate-pulse' : ''}>
            <rect 
              x="430" 
              y="265" 
              width="140" 
              height="75" 
              rx="10" 
              fill={activeSystemId === 'methanol' ? 'rgba(16, 185, 129, 0.25)' : '#0f172a'} 
              stroke={activeSystemId === 'methanol' ? '#10B981' : '#475569'} 
              strokeWidth="2" 
              filter={activeSystemId === 'methanol' ? 'url(#glowEffect)' : undefined}
            />
            {/* Cylindrical tank cutaway lines */}
            <line x1="480" y1="265" x2="480" y2="340" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            <line x1="520" y1="265" x2="520" y2="340" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            <Flame x="490" y="285" className="w-5 h-5 text-emerald-400" />
            <text x="500" y="325" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">TANQUES e-METANOL / H2</text>
          </g>

          {/* 3. Engine Room / Dual Fuel GenSet */}
          <g>
            <rect 
              x="260" 
              y="265" 
              width="150" 
              height="75" 
              rx="6" 
              fill="#0b1329" 
              stroke="#3b82f6" 
              strokeWidth="1.5" 
            />
            <text x="335" y="300" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace" fontWeight="bold">MOTOR DUAL-FUEL</text>
            <text x="335" y="318" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">TIER III SCR DE-NOx</text>
          </g>

          {/* 4. Battery Storage BESS */}
          <g className={activeSystemId === 'bess' ? 'animate-pulse' : ''}>
            <rect 
              x="590" 
              y="265" 
              width="100" 
              height="75" 
              rx="8" 
              fill={activeSystemId === 'bess' ? 'rgba(245, 158, 11, 0.25)' : '#0f172a'} 
              stroke={activeSystemId === 'bess' ? '#f59e0b' : '#475569'} 
              strokeWidth="2" 
              filter={activeSystemId === 'bess' ? 'url(#glowEffect)' : undefined}
            />
            <BatteryCharging x="630" y="285" className="w-5 h-5 text-amber-400" />
            <text x="640" y="325" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">BESS 2.4 MWh</text>
          </g>

          {/* 5. Modern Fish Hold / Cargo Space */}
          <g>
            <rect 
              x="710" 
              y="245" 
              width="110" 
              height="95" 
              rx="6" 
              fill="#06122b" 
              stroke="#0284c7" 
              strokeWidth="1.5" 
            />
            <text x="765" y="285" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">BODEGA FRIGORÍFICA</text>
            <text x="765" y="305" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">-25°C CO2 / NH3</text>
          </g>

          {/* Propeller & Rudder (Aft) */}
          <path d="M 120 340 L 95 340 L 95 315 L 120 315 Z" fill="#38bdf8" opacity="0.8" />
          <circle cx="105" cy="328" r="16" fill="none" stroke="#00F2FE" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite]" />

          {/* Interactive Clickable Hotspots overlay */}
          {SHIP_SYSTEMS.map((sys) => {
            const isTarget = sys.id === activeSystemId;
            return (
              <g 
                key={sys.id} 
                onClick={() => setActiveSystemId(sys.id)}
                className="cursor-pointer transition-all hover:scale-110"
              >
                <circle 
                  cx={sys.id === 'ops' ? 205 : sys.id === 'rotors' ? 475 : sys.id === 'methanol' ? 500 : 640} 
                  cy={sys.id === 'ops' ? 260 : sys.id === 'rotors' ? 120 : sys.id === 'methanol' ? 250 : 250} 
                  r={isTarget ? 14 : 9} 
                  fill={sys.accentColor} 
                  fillOpacity={isTarget ? 0.9 : 0.4} 
                  stroke="#ffffff" 
                  strokeWidth={isTarget ? 2.5 : 1}
                  filter={isTarget ? 'url(#glowEffect)' : undefined}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Instruction Badge */}
        <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-slate-900/90 border border-white/10 text-[11px] font-mono text-slate-300 backdrop-blur-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Haz clic en los componentes del buque o en las pestañas para inspeccionar la tecnología</span>
        </div>
      </div>

      {/* System Telemetry & Technical Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-ocean-900/60 border border-cyan-500/20 backdrop-blur-xl">
        
        {/* Left column: System Profile */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-electric border border-cyan-500/30">
              {activeSystem.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Normativa: <strong className="text-white">{activeSystem.telemetry.standard}</strong>
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {activeSystem.name}
          </h4>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeSystem.description}
          </p>

          <div className="space-y-2 pt-2">
            <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-hydrogen-400" />
              <span>Ventajas Clave de Implementación:</span>
            </h5>
            <ul className="space-y-1.5">
              {activeSystem.advantages.map((adv, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Live Telemetry Gauges */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 self-center">
          <div className="p-4 rounded-2xl bg-ocean-950/80 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Reducción Emisiones</span>
              <Gauge className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black font-mono text-cyan-electric">
              {activeSystem.telemetry.emissionsCut}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-950/80 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Ahorro / Impacto</span>
              <Flame className="w-4 h-4 text-hydrogen-400" />
            </div>
            <p className="text-sm sm:text-base font-bold font-mono text-white">
              {activeSystem.telemetry.fuelSaved}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-950/80 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Nivel Acústico</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-sm sm:text-base font-bold font-mono text-slate-200">
              {activeSystem.telemetry.noiseLevel}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-950/80 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Regulación Marina</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs font-bold font-mono text-hydrogen-300">
              {activeSystem.telemetry.standard}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
