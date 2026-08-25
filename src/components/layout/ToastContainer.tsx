import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClass = 'border-emerald-500/30 bg-slate-900/95 text-emerald-300';
        let iconClass = 'text-emerald-400';

        if (toast.type === 'error') {
          Icon = XCircle;
          colorClass = 'border-red-500/30 bg-slate-900/95 text-red-300';
          iconClass = 'text-red-400';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          colorClass = 'border-amber-500/30 bg-slate-900/95 text-amber-300';
          iconClass = 'text-amber-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClass = 'border-teal-500/30 bg-slate-900/95 text-teal-300';
          iconClass = 'text-teal-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-start gap-3 backdrop-blur-md transition animate-in slide-in-from-bottom-3 duration-200 ${colorClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconClass}`} />
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-semibold text-white tracking-tight">{toast.title}</h5>
              {toast.message && <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
