import React, { useState, useEffect } from 'react';
import { 
  subscribeToForumQuestions, 
  submitQuestion, 
  toggleVoteQuestion, 
  addCommentToQuestion,
  isFirebaseActive 
} from '../firebase';
import { 
  MessageSquareText, 
  ThumbsUp, 
  MessageCircle, 
  Send, 
  Filter, 
  Plus, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  User, 
  Ship, 
  Zap, 
  Flame, 
  Wind,
  ShieldCheck,
  Radio,
  X,
  AlertCircle
} from 'lucide-react';

export default function Forum({ prefillCategory, prefillSessionTitle, onClearPrefill, onShowToast }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('votes'); // 'votes' | 'recent' | 'answered'
  
  // Submission modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    role: '',
    category: 'ops',
    sessionRef: 'Suministro de energía en puerto (OPS)',
    content: ''
  });

  // Reply drawer state
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyData, setReplyData] = useState({ author: '', role: '', text: '' });
  const [replySubmitting, setReplySubmitting] = useState(false);

  // Load questions subscription
  useEffect(() => {
    const unsubscribe = subscribeToForumQuestions((data) => {
      setQuestions(data);
      setLoading(false);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Handle prefill from Program or Wiki
  useEffect(() => {
    if (prefillCategory || prefillSessionTitle) {
      if (prefillCategory && prefillCategory !== 'all') {
        setActiveCategory(prefillCategory);
      }
      setFormData(prev => ({
        ...prev,
        category: prefillCategory && prefillCategory !== 'all' ? prefillCategory : 'ops',
        sessionRef: prefillSessionTitle || 'Sesión General IBERNAÚTICA 27'
      }));
      setIsModalOpen(true);
    }
  }, [prefillCategory, prefillSessionTitle]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClearPrefill?.();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      onShowToast?.('Por favor completa el título y la descripción de la pregunta', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitQuestion(formData);
      if (result.success) {
        onShowToast?.('¡Pregunta enviada con éxito al coloquio!', 'success');
        setFormData({
          title: '',
          author: '',
          role: '',
          category: 'ops',
          sessionRef: 'Suministro de energía en puerto (OPS)',
          content: ''
        });
        setIsModalOpen(false);
        onClearPrefill?.();
      }
    } catch (err) {
      console.error(err);
      onShowToast?.('Error al registrar la pregunta', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (questionId) => {
    try {
      await toggleVoteQuestion(questionId, 'current-user-device');
      onShowToast?.('Voto registrado para la mesa redonda', 'info');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendReply = async (questionId) => {
    if (!replyData.text.trim()) return;
    setReplySubmitting(true);
    try {
      await addCommentToQuestion(questionId, replyData);
      setReplyData({ author: '', role: '', text: '' });
      setReplyingToId(null);
      onShowToast?.('Aportación añadida al hilo de debate', 'success');
    } catch (err) {
      console.error(err);
      onShowToast?.('Error añadiendo aportación', 'error');
    } finally {
      setReplySubmitting(false);
    }
  };

  // Filter and sort questions
  const filteredQuestions = questions.filter(q => {
    if (activeCategory !== 'all' && q.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      return (
        q.title?.toLowerCase().includes(qLower) ||
        q.content?.toLowerCase().includes(qLower) ||
        q.author?.toLowerCase().includes(qLower) ||
        q.sessionRef?.toLowerCase().includes(qLower)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'votes') return (b.upvotes || 0) - (a.upvotes || 0);
    if (sortBy === 'recent') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === 'answered') return (b.isAnswered ? 1 : 0) - (a.isAnswered ? 1 : 0);
    return 0;
  });

  const categories = [
    { id: 'all', label: 'Todas las Preguntas', icon: MessageSquareText },
    { id: 'ops', label: 'OPS / Electrificación', icon: Zap },
    { id: 'renovables', label: 'Renovables Marinas', icon: Wind },
    { id: 'combustibles', label: 'Metanol / H2 / NH3', icon: Flame },
    { id: 'pesca', label: 'Flota Pesquera (Touza)', icon: Ship },
  ];

  return (
    <section id="foro" className="py-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-electric text-xs font-mono mb-4">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>FORO TÉCNICO EN VIVO & COLOQUIOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Participación y Preguntas a Ponentes
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Plantea tus dudas y propuestas para las sesiones técnicas y mesas redondas. Las preguntas más votadas se responderán en directo durante los coloquios de 15 minutos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="w-2 h-2 rounded-full bg-hydrogen-500"></span>
              <span>{isFirebaseActive() ? 'Firebase Cloud Firestore' : 'Sincronización Local / Offline'}</span>
            </div>
            <button
              onClick={handleOpenModal}
              className="px-5 py-3 rounded-2xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 via-cyan-electric to-hydrogen-400 hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Enviar Pregunta al Coloquio</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl mb-8 space-y-4">
          
          {/* Top row: Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-electric border-cyan-400 shadow-sm'
                      : 'bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por término o ponente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-ocean-950/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-mono">
              <span className="text-slate-400 text-[11px]">Ordenar por:</span>
              <button
                onClick={() => setSortBy('votes')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  sortBy === 'votes' ? 'bg-cyan-500/20 text-cyan-electric border-cyan-400' : 'bg-slate-900 text-slate-400 border-white/5'
                }`}
              >
                🔥 Más Votadas
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  sortBy === 'recent' ? 'bg-cyan-500/20 text-cyan-electric border-cyan-400' : 'bg-slate-900 text-slate-400 border-white/5'
                }`}
              >
                ⏱️ Recientes
              </button>
            </div>
          </div>

        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 text-slate-400 font-mono text-xs">
              Cargando preguntas del foro técnico...
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/30 border border-white/5">
              <MessageSquareText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white mb-1">No hay preguntas con este filtro</h4>
              <p className="text-xs text-slate-400 mb-4">Sé el primero en abrir el debate técnico para este bloque.</p>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400"
              >
                Plantea tu pregunta ahora
              </button>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isReplying = replyingToId === q.id;
              const hasComments = q.comments && q.comments.length > 0;

              return (
                <div 
                  key={q.id}
                  className="p-6 rounded-3xl bg-slate-900/40 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Upvote Button */}
                    <button
                      onClick={() => handleVote(q.id)}
                      className="flex flex-col items-center justify-center w-14 py-3 rounded-2xl bg-ocean-950/80 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-electric transition-all flex-shrink-0 group"
                      title="Votar para priorizar en el coloquio"
                    >
                      <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-mono font-bold mt-1 text-white group-hover:text-cyan-electric">
                        {q.upvotes || 0}
                      </span>
                    </button>

                    {/* Content Body */}
                    <div className="flex-1 min-w-0">
                      
                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-electric text-[10px] font-mono font-semibold border border-cyan-500/20">
                          {q.sessionRef || 'Sesión General'}
                        </span>
                        {q.isAnswered && (
                          <span className="px-2 py-0.5 rounded-md bg-hydrogen-500/15 text-hydrogen-400 text-[10px] font-mono font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Respondida en Plenario</span>
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500 font-mono">
                          {new Date(q.createdAt).toLocaleDateString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                        {q.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                        {q.content}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-hydrogen-400" />
                          <span className="font-semibold text-slate-200">{q.author}</span>
                          {q.role && <span className="text-[11px] text-slate-400">({q.role})</span>}
                        </div>

                        <button
                          onClick={() => setReplyingToId(isReplying ? null : q.id)}
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-electric transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{q.comments?.length || 0} {q.comments?.length === 1 ? 'Aportación' : 'Aportaciones'}</span>
                        </button>
                      </div>

                      {/* Comments List */}
                      {hasComments && (
                        <div className="mt-4 space-y-2.5 pl-3 border-l-2 border-cyan-500/30 pt-1">
                          {q.comments.map((comm) => (
                            <div key={comm.id} className="p-3 rounded-xl bg-ocean-950/60 border border-white/5 text-xs">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-cyan-300">{comm.author} <span className="text-[10px] text-slate-400 font-normal">({comm.role})</span></span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {comm.createdAt ? new Date(comm.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ''}
                                </span>
                              </div>
                              <p className="text-slate-200 text-xs leading-relaxed">{comm.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input Form */}
                      {isReplying && (
                        <div className="mt-4 p-4 rounded-2xl bg-ocean-950 border border-cyan-500/30">
                          <h4 className="text-xs font-bold text-white mb-2">Añadir aportación al debate</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                            <input
                              type="text"
                              placeholder="Tu Nombre / Empresa"
                              value={replyData.author}
                              onChange={(e) => setReplyData({ ...replyData, author: e.target.value })}
                              className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                            />
                            <input
                              type="text"
                              placeholder="Cargo o Institución"
                              value={replyData.role}
                              onChange={(e) => setReplyData({ ...replyData, role: e.target.value })}
                              className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                          <textarea
                            rows={2}
                            placeholder="Escribe tu argumento técnico o matiz..."
                            value={replyData.text}
                            onChange={(e) => setReplyData({ ...replyData, text: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 mb-2"
                          ></textarea>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setReplyingToId(null)}
                              className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              disabled={replySubmitting || !replyData.text.trim()}
                              onClick={() => handleSendReply(q.id)}
                              className="px-4 py-1 rounded-lg text-xs font-bold text-ocean-950 bg-cyan-electric hover:bg-cyan-400 transition-all disabled:opacity-50"
                            >
                              {replySubmitting ? 'Enviando...' : 'Publicar Aportación'}
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Submit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-ocean-900 border border-white/15 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-electric mb-2">
              <Sparkles className="w-4 h-4" />
              <span>COLABORACIÓN CIENTÍFICA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Enviar Pregunta o Propuesta Técnica
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Tu pregunta será revisada por el moderador del bloque y se someterá a votación en directo por los congresistas.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Título de la Pregunta / Enfoque *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: ¿Qué viabilidad tiene la hibridación con HVO en arrastreros?"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Bloque Temático</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="ops">Suministro de energía en puerto (OPS)</option>
                    <option value="renovables">Energías renovables marinas</option>
                    <option value="combustibles">Combustibles alternativos (H2/Metanol/NH3)</option>
                    <option value="pesca">Flota Pesquera & Mesa Javier Touza</option>
                    <option value="general">Sesión Magistral General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Sesión Dirigida</label>
                  <input
                    type="text"
                    value={formData.sessionRef}
                    onChange={(e) => setFormData({ ...formData, sessionRef: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Tu Nombre y Apellidos</label>
                  <input
                    type="text"
                    placeholder="Ej: Ing. Laura Gómez"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Entidad / Cargo</label>
                  <input
                    type="text"
                    placeholder="Ej: Astillero / Armadora / Universidad"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Detalles Técnicos y Justificación *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detalla los aspectos técnicos, datos o dudas normativas que deseas que se aborden en el coloquio..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400 hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? 'Registrando...' : 'Publicar Pregunta'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
