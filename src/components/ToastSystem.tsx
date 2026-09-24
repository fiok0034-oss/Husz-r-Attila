import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Radio, Sparkles, Flame } from 'lucide-react';
import { RANDOM_TOASTS } from '../utils/constants';

interface ToastSystemProps {
  effectsEnabled: boolean;
}

interface ToastItem {
  id: number;
  title: string;
  description: string;
}

export const ToastSystem: React.FC<ToastSystemProps> = ({ effectsEnabled }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (!effectsEnabled) return;

    // Show initial subtle alert after 8 seconds
    const initialTimeout = setTimeout(() => {
      triggerToast(RANDOM_TOASTS[0].title, RANDOM_TOASTS[0].description);
    }, 8000);

    // Periodic random events every 35-50 seconds
    const interval = setInterval(() => {
      const rand = RANDOM_TOASTS[Math.floor(Math.random() * RANDOM_TOASTS.length)];
      triggerToast(rand.title, rand.description);
    }, 42000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [effectsEnabled]);

  const triggerToast = (title: string, description: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev.slice(-2), { id, title, description }]);

    // Auto dismiss after 7 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (!effectsEnabled || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full space-y-2 pointer-events-none font-mono">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#13070b]/95 border-l-4 border-l-red-600 border border-red-950/80 rounded p-3.5 shadow-2xl backdrop-blur-sm animate-fade-in flex items-start justify-between gap-3 text-left text-xs"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-red-400 font-bold font-cinzel">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>{toast.title}</span>
            </div>
            <p className="text-neutral-300 font-sans text-xs leading-relaxed">
              {toast.description}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-500 hover:text-white p-1"
            aria-label="Értesítés bezárása"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
