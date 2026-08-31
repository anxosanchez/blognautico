import React, { useState } from 'react';
import { ARCHIVE_DOCUMENTS } from '../data/archiveData';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Filter, 
  Search, 
  BookMarked, 
  Calendar, 
  Eye, 
  X,
  FileCheck,
  Sparkles
} from 'lucide-react';

export default function Archive({ onShowToast }) {
  const [selectedEdition, setSelectedEdition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewDoc, setActivePreviewDoc] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCitation = (doc) => {
    navigator.clipboard.writeText(doc.citation);
    setCopiedId(doc.id);
    onShowToast?.('Cita bibliográfica copiada al portapapeles', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (doc) => {
    onShowToast?.(`Descargando "${doc.title}" (${doc.fileSize})...`, 'info');
    
    // Create simulated download payload
    const element = document.createElement('a');
    const file = new Blob([
      `IBERNAÚTICA 27 - REPOSITORIO TÉCNICO Y CIENTÍFICO\n\n` +
      `Título: ${doc.title}\n` +
      `Edición: ${doc.edition}\n` +
      `Autores: ${doc.author}\n` +
      `Fecha: ${doc.date}\n` +
      `Páginas: ${doc.pages}\n\n` +
      `RESUMEN EJECUTIVO:\n${doc.abstract}\n\n` +
      `CITA OFICIAL:\n${doc.citation}\n\n` +
      `Congreso Técnico IBERNAÚTICA 27 • Vigo, Febrero 2027`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.id}-ibernautica.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredDocs = ARCHIVE_DOCUMENTS.filter(doc => {
    if (selectedEdition !== 'all' && !doc.edition.includes(selectedEdition)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.author.toLowerCase().includes(q) ||
        doc.abstract.toLowerCase().includes(q) ||
        doc.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section id="documentacion" className="py-24 relative overflow-hidden bg-ocean-900/40 border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-electric text-xs font-mono mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>REPOSITORIO DOCUMENTAL Y MEMORIAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Histórico & Documentación Técnica
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Acceso libre a los pre-prints de 2027, guías técnicas oficiales y actas íntegras de las ediciones anteriores (2023 y 2025).
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
            {['all', '2027', '2025', '2023'].map((ed) => (
              <button
                key={ed}
                onClick={() => setSelectedEdition(ed)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                  selectedEdition === ed
                    ? 'bg-cyan-500/20 text-cyan-electric border-cyan-400'
                    : 'bg-slate-900/50 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                {ed === 'all' ? 'Todos los Documentos' : `Edición ${ed}`}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar en memorias y guías..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-ocean-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between p-6 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-electric border border-cyan-500/30">
                    {doc.edition}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{doc.fileSize} • {doc.pages} págs</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-electric transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                  {doc.abstract}
                </p>

                <div className="text-[11px] text-slate-300 font-medium mb-4">
                  ✍️ <span className="text-slate-300">{doc.author}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActivePreviewDoc(doc)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-white/5 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Ficha</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyCitation(doc)}
                    title="Copiar cita académica"
                    className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 bg-slate-800/80 border border-white/5 transition-colors"
                  >
                    {copiedId === doc.id ? <Check className="w-3.5 h-3.5 text-hydrogen-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400 hover:shadow-glow-cyan flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Document Detail Preview Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-ocean-900 border border-white/15 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <button
              onClick={() => setActivePreviewDoc(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-electric border border-cyan-500/30 inline-block mb-3">
              {activePreviewDoc.type} • {activePreviewDoc.edition}
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              {activePreviewDoc.title}
            </h3>

            <p className="text-xs text-hydrogen-400 font-mono mb-4">
              Autoría: {activePreviewDoc.author} ({activePreviewDoc.date})
            </p>

            <div className="p-4 rounded-2xl bg-ocean-950/80 border border-white/5 mb-6 text-xs text-slate-300 leading-relaxed space-y-3">
              <h4 className="font-bold text-white font-mono uppercase tracking-wider text-[11px]">Resumen y Alcance:</h4>
              <p>{activePreviewDoc.abstract}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Cita Académica / Formato APA:</span>
                <button
                  onClick={() => handleCopyCitation(activePreviewDoc)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copiar Cita</span>
                </button>
              </div>
              <p className="text-xs font-mono text-slate-200 bg-ocean-950 p-2.5 rounded-lg border border-white/5">
                {activePreviewDoc.citation}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActivePreviewDoc(null)}
                className="px-4 py-2 text-xs text-slate-300 hover:text-white"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleDownload(activePreviewDoc);
                  setActivePreviewDoc(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Documento Completo ({activePreviewDoc.fileSize})</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
