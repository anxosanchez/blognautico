import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const getIcon = () => {
    if (type === 'success') return <CheckCircle2 className="w-4 h-4 text-hydrogen-400 flex-shrink-0" />;
    if (type === 'error') return <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />;
    return <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />;
  };

  const getBorderColor = () => {
    if (type === 'success') return 'border-hydrogen-500/40 shadow-glow-hydrogen';
    if (type === 'error') return 'border-rose-500/40 shadow-lg shadow-rose-500/20';
    return 'border-cyan-500/40 shadow-glow-cyan';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-ocean-900/95 backdrop-blur-xl border ${getBorderColor()} text-white text-xs max-w-md shadow-2xl`}>
        {getIcon()}
        <span className="font-medium text-slate-100 flex-1">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
