import React, { useState } from 'react';
import { saveRegistration } from '../firebase';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  Mail, 
  User, 
  Phone, 
  QrCode, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Download
} from 'lucide-react';

export default function RegistrationModal({ isOpen, onClose, onShowToast }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Pass Generated
  const [submitting, setSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    attendanceMode: 'presencial', // 'presencial' | 'streaming'
    dinnerAccess: true,
    newsletter: true
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      onShowToast?.('Por favor completa los campos obligatorios', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await saveRegistration(formData);
      if (res.success) {
        setRegistrationResult(res.registration);
        setStep(2);
        onShowToast?.('¡Acreditación confirmada para IBERNAÚTICA 27!', 'success');
        
        // Launch celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }
    } catch (err) {
      console.error(err);
      onShowToast?.('Error al tramitar la inscripción', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadBadge = () => {
    onShowToast?.('Descargando comprobante de acreditación digital...', 'info');
    const element = document.createElement('a');
    const file = new Blob([
      `====================================================\n` +
      `       PASE OFICIAL DE CONGRESISTA - IBERNAÚTICA 27\n` +
      `   Jornadas sobre Descarbonización de la Navegación\n` +
      `====================================================\n\n` +
      `ID DE REGISTRO:  ${registrationResult?.id}\n` +
      `CONGRESISTA:     ${registrationResult?.name}\n` +
      `ENTIDAD:         ${registrationResult?.company} (${registrationResult?.role || 'Delegado'})\n` +
      `EMAIL:           ${registrationResult?.email}\n` +
      `MODALIDAD:       ${registrationResult?.attendanceMode === 'presencial' ? 'Presencial (Auditorio Mar de Vigo)' : 'Streaming Global Directo'}\n` +
      `FECHAS:          18 y 19 de Febrero de 2027\n` +
      `HORARIO:         J1: 16:00 - 21:00 | J2: 09:00 - 18:30\n\n` +
      `Presenta este pase en el mostrador de acreditaciones para retirar tu credencial NFC oficial.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Acreditacion_${registrationResult?.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-ocean-900 border border-white/15 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-electric mb-2">
              <Sparkles className="w-4 h-4" />
              <span>REGISTRO DE ASISTENTES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Acreditación IBERNAÚTICA 27
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Completa tus datos profesionales para recibir tu pase con acceso a las dos jornadas técnicas, área expo y plataforma de debate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Attendance Mode Selector */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendanceMode: 'presencial' })}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    formData.attendanceMode === 'presencial'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                      : 'bg-ocean-950/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <p className="text-xs font-bold text-cyan-electric">🏢 Presencial</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Auditorio Mar de Vigo</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendanceMode: 'streaming' })}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    formData.attendanceMode === 'streaming'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                      : 'bg-ocean-950/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <p className="text-xs font-bold text-hydrogen-400">📡 Streaming Global</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Acceso HD con votación</p>
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Nombre Completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ej: David Fernández Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Correo Electrónico Profesional *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="nombre@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Entidad / Empresa / Astillero *</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ej: Astilleros Ría de Vigo"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Cargo / Especialidad Técnica</label>
                <input
                  type="text"
                  placeholder="Ej: Director Técnico / Ingeniero de Propulsión"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-ocean-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                    className="rounded bg-ocean-950 border-white/20 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>Recibir notificaciones del programa y publicación de memorias técnicas</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400 hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? 'Emitiendo pase...' : 'Confirmar Acreditación'}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Step 2: Digital Badge Pass Preview */
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-hydrogen-500 flex items-center justify-center mx-auto mb-4 text-ocean-950 font-bold shadow-glow-cyan">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-black text-white mb-1">
              ¡Acreditación Generada con Éxito!
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Te hemos enviado la confirmación a tu correo. Guarda tu identificador único:
            </p>

            {/* Digital Pass Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-ocean-950 border-2 border-cyan-400/40 text-left shadow-glass-card mb-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-electric font-bold">PASE DE CONGRESISTA</span>
                  <h4 className="text-sm font-extrabold text-white font-mono">IBERNAÚTICA 27</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400">ID Oficial:</span>
                  <p className="text-xs font-mono font-bold text-cyan-electric">{registrationResult?.id}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] font-mono">NOMBRE:</span>
                  <p className="font-bold text-white text-sm">{registrationResult?.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono">ENTIDAD:</span>
                    <p className="text-slate-200 truncate">{registrationResult?.company}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono">MODALIDAD:</span>
                    <p className="text-cyan-300 font-semibold">{registrationResult?.attendanceMode === 'presencial' ? 'Presencial (Vigo)' : 'Streaming HD'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>18 - 19 Febrero 2027</span>
                <span className="text-hydrogen-400">● Validado</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleDownloadBadge}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-ocean-950 bg-gradient-to-r from-cyan-400 to-hydrogen-400 hover:shadow-glow-cyan flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Comprobante</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800"
              >
                Finalizar
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
