import React, { useState } from 'react';
import { 
  Anchor, Clock, MessageSquare, BookOpen, 
  ArrowRight, Users, Zap, Fuel, Wind, 
  Send, ThumbsUp, MessageCircle, Calendar, ShieldCheck
} from 'lucide-react';

export default function App() {
  const [diaActivo, setDiaActivo] = useState(2);
  const [seccionActiva, setSeccionActiva] = useState('programa');

  // Estado del foro de debate
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      autor: "Comunidad Portuaria",
      tema: "Mesa 1: Transición Marítima y Puertos",
      texto: "Para Carlos Botana y Ana Arévalo: ¿Qué plazos reales se manejan para la conexión OPS de buques en muelle entre Vigo y Barcelona?",
      votos: 14,
      respuestas: 4
    },
    {
      id: 2,
      autor: "Sector Extractivo",
      tema: "Mesa 4: Descarbonización de la Pesca",
      texto: "Pregunta para Javier Touza (ARVI) y Javier Garat (CEPESCA): ¿Qué ayudas y adaptaciones de espacio en bodega se contemplan para la reconversión de la flota de arrastre?",
      votos: 22,
      respuestas: 6
    },
    {
      id: 3,
      autor: "Ingeniería Naval",
      tema: "Mesa 3: Tecnologías para la Transición",
      texto: "Para Ingeteam y Astilleros Armón/Gondan: ¿Cuál es el límite práctico actual de electrificación completa frente a hibridación en buques de trabajo?",
      votos: 9,
      respuestas: 2
    }
  ]);
  const [nuevoTema, setNuevoTema] = useState('');
  const [nuevoTexto, setNuevoTexto] = useState('');

  const agregarPregunta = (e) => {
    e.preventDefault();
    if (!nuevoTexto.trim()) return;
    setComentarios([
      {
        id: Date.now(),
        autor: "Participante IBERNAÚTICA",
        tema: nuevoTema || "General",
        texto: nuevoTexto,
        votos: 1,
        respuestas: 0
      },
      ...comentarios
    ]);
    setNuevoTexto('');
    setNuevoTema('');
  };

  const mesasJornada2 = [
    {
      horario: "09:30 - 11:15",
      numero: "Mesa 1",
      titulo: "Transición Marítima y Suministro Portuario",
      moderador: "Rafael",
      formato: "Presentación (5 min/ponente) + Debate abierto (coloquio)",
      ponentes: [
        { nombre: "Carlos Botana", entidad: "Presidente Autoridad Portuaria de Vigo" },
        { nombre: "Javier", entidad: "GHENOVA" },
        { nombre: "Ana Arévalo", entidad: "Puerto de Barcelona" },
        { nombre: "Paco / Beatriz", entidad: "Iberdrola (Puerto de Vigo)" },
        { nombre: "Representante", entidad: "Hidrógeno Verde Bilbao / Astilleros Armón" }
      ],
      tag: "Electrificación & OPS"
    },
    {
      horario: "11:45 - 13:30",
      numero: "Mesa 2",
      titulo: "Energías Renovables Marinas",
      moderador: "Beatriz",
      formato: "Exposiciones individuales + Coloquio técnico",
      ponentes: [
        { nombre: "Representante", entidad: "Blunova (Plataforma en Vigo)" },
        { nombre: "Representante", entidad: "Magallanes Renovables" },
        { nombre: "Representante Técnico", entidad: "Inega" },
        { nombre: "Carla / Javier", entidad: "Navantia Seanergies" }
      ],
      tag: "Offshore & Maremotriz"
    },
    {
      horario: "15:00 - 16:45",
      numero: "Mesa 3",
      titulo: "Tecnologías y Combustibles para la Transición Energética",
      moderador: "Rafael",
      formato: "Barcos eléctricos, propulsión y nuevos vectores energéticos",
      ponentes: [
        { nombre: "Javier", entidad: "Astilleros Armón / Gondán (Propulsión y buques eléctricos)" },
        { nombre: "Especialista Eléctrico", entidad: "Ingeteam (Propulsión eléctrica)" },
        { nombre: "Carmen / Rafael", entidad: "Barkila" },
        { nombre: "Plantas Híbridas", entidad: "Finanzauto (Sistemas híbridos / Moeve reserva)" }
      ],
      tag: "Propulsión Limpia"
    },
    {
      horario: "17:00 - 18:30",
      numero: "Mesa 4",
      titulo: "Mesa Redonda: Descarbonización en el Sector Pesquero",
      moderador: "Por confirmar / Rafael",
      formato: "Mesa de clausura: retos específicos de la flota y gobernanza",
      ponentes: [
        { nombre: "Javier Touza", entidad: "Presidente ARVI (Cooperativa de Armadores de Vigo)" },
        { nombre: "Javier Garat", entidad: "Presidente CEPESCA / Clúster Marítimo Español" },
        { nombre: "José Antonio Sotelo / Grupo García Costa", entidad: "Sector Armador y Operativa" },
        { nombre: "Especialista Motorización", entidad: "Finanzauto (Daniel Voces en reserva)" }
      ],
      tag: "Flota Pesquera"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar Glass */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Anchor className="text-cyan-400 w-6 h-6" />
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              IBERNAÚTICA 27
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-6 text-sm">
            <button 
              onClick={() => setSeccionActiva('programa')} 
              className={`hover:text-cyan-400 transition-colors ${seccionActiva === 'programa' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
            >
              Programa Oficial
            </button>
            <button 
              onClick={() => setSeccionActiva('wiki')} 
              className={`hover:text-cyan-400 transition-colors ${seccionActiva === 'wiki' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
            >
              Wiki & Ejes
            </button>
            <button 
              onClick={() => setSeccionActiva('foro')} 
              className={`hover:text-cyan-400 transition-colors ${seccionActiva === 'foro' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
            >
              Foro de Debate
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs tracking-wider uppercase font-mono">
            <Calendar className="w-3.5 h-3.5" /> 18 y 19 de Febrero de 2027
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-tight">
            Jornadas de Descarbonización de la Navegación y el Sector Naval
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl font-light max-w-2xl mx-auto">
            Encuentro estratégico de alto nivel: puertos sostenibles, energías marinas, propulsión limpia y transición energética de la flota pesquera.
          </p>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
        
        {/* SECCIÓN 1: PROGRAMA ACTUALIZADO */}
        {seccionActiva === 'programa' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Programa de las Jornadas</h2>
                <p className="text-sm text-slate-400">18 - 19 de Febrero de 2027</p>
              </div>
              <div className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setDiaActivo(1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    diaActivo === 1 ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Jueves 18 (Apertura)
                </button>
                <button
                  onClick={() => setDiaActivo(2)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    diaActivo === 2 ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Viernes 19 (Mesas Técnicas)
                </button>
              </div>
            </div>

            {diaActivo === 1 ? (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-2">
                    <Clock className="w-4 h-4" /> Durante todo el día
                  </div>
                  <h3 className="text-lg font-bold text-white">Inscripciones y Entrega de Documentación</h3>
                  <p className="text-slate-400 text-sm mt-1">Recepción, acreditación de congresistas y entrega del material oficial.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/40 border border-cyan-500/30 backdrop-blur-xl space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono">
                    <Clock className="w-4 h-4" /> Tarde
                  </div>
                  <h3 className="text-2xl font-bold text-white">Conferencia Inaugural de Apertura</h3>
                  <p className="text-slate-300 text-sm">
                    Visión global sobre la sostenibilidad en el sector marítimo y el impulso de la economía azul.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-xs uppercase font-mono text-cyan-400">Renovables Marinas</span>
                      <p className="font-semibold text-white mt-1">Pablo (Director de Inega)</p>
                      <p className="text-xs text-slate-400">Perspectiva técnica sobre eólica marina y transición verde.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-xs uppercase font-mono text-cyan-400">Perspectiva Política e Institucional</span>
                      <p className="font-semibold text-white mt-1">Isaac (Director Xeral de Pesca - Xunta de Galicia)</p>
                      <p className="text-xs text-slate-400">Gobernanza, marco regulatorio y apoyo a la flota.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {mesasJornada2.map((m, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold">
                          {m.numero}
                        </span>
                        <h4 className="font-bold text-white text-lg">{m.titulo}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                        <Clock className="w-3.5 h-3.5" /> {m.horario}
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap gap-4">
                      <span><strong className="text-slate-300">Modera:</strong> {m.moderador}</span>
                      <span><strong className="text-slate-300">Dinámica:</strong> {m.formato}</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Integrantes y Entidades:</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {m.ponentes.map((p, pIdx) => (
                          <div key={pIdx} className="px-3 py-2 rounded-lg bg-slate-950/50 border border-slate-800 text-sm flex flex-col">
                            <span className="text-slate-200 font-medium">{p.nombre}</span>
                            <span className="text-xs text-slate-400">{p.entidad}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECCIÓN 2: WIKI & EJES */}
        {seccionActiva === 'wiki' && (
          <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">OPS y Conexión Portuaria</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Interconexión eléctrica muelle-buque (*Cold Ironing*). Experiencias comparadas en la dársena de Vigo, Puerto de Barcelona y soluciones desarrolladas por GHENOVA e Iberdrola.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Eólica Marina y Renovables</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Despliegue de tecnología offshore con Blunova, Magallanes Renovables, Inega y Navantia Seanergies, compatibilizando la explotación energética con los caladeros de pesca.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Fuel className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Barcos Eléctricos y Fabricación de Motores</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Desarrollos de astilleros de vanguardia (Armón, Gondán) junto a fabricantes de propulsión eléctrica como Ingeteam, plantas híbridas de Finanzauto y vectores como el hidrógeno verde.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Descarbonización de la Pesca</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Debate estratégico liderado por ARVI (Javier Touza) y CEPESCA (Javier Garat) sobre la modernización de los buques pesqueros, limitaciones de espacio para almacenamiento criogénico y competitividad.
              </p>
            </div>
          </div>
        )}

        {/* SECCIÓN 3: FORO DE DISCUSIÓN */}
        {seccionActiva === 'foro' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Formulario */}
            <form onSubmit={agregarPregunta} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-cyan-400" /> Plantear pregunta para el coloquio de las mesas redondas
              </h3>
              <div>
                <select
                  value={nuevoTema}
                  onChange={(e) => setNuevoTema(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Seleccionar Mesa Destino</option>
                  <option value="Mesa 1: Transición Marítima y Puertos">Mesa 1: Transición Marítima y Puertos</option>
                  <option value="Mesa 2: Renovables Marinas">Mesa 2: Renovables Marinas</option>
                  <option value="Mesa 3: Tecnologías para la Transición">Mesa 3: Tecnologías para la Transición</option>
                  <option value="Mesa 4: Descarbonización de la Pesca">Mesa 4: Descarbonización de la Pesca</option>
                </select>
              </div>
              <textarea
                placeholder="Escribe tu consulta dirigida a los ponentes o moderadores..."
                rows="3"
                value={nuevoTexto}
                onChange={(e) => setNuevoTexto(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:outline-none focus:border-cyan-500 text-slate-200"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Enviar para el Coloquio
              </button>
            </form>

            {/* Listado */}
            <div className="space-y-4">
              {comentarios.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-md space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="text-cyan-400 font-semibold">{item.tema}</span>
                    <span>{item.autor}</span>
                  </div>
                  <p className="text-slate-200 text-sm">{item.texto}</p>
                  <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
                    <button className="flex items-center gap-1 hover:text-cyan-400">
                      <ThumbsUp className="w-3.5 h-3.5" /> {item.votos}
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> {item.respuestas} respuestas
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-500">
        IBERNAÚTICA 27 • 18 y 19 de Febrero de 2027 • Vigo
      </footer>
    </div>
  );
}
