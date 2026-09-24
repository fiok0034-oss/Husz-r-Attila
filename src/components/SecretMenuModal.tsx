import React, { useState } from 'react';
import { Skull, X, Flame, Shield, ArrowLeft, Key, Radio } from 'lucide-react';
import { occultAudio } from '../utils/audio';

interface SecretMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretMenuModal: React.FC<SecretMenuModalProps> = ({ isOpen, onClose }) => {
  const [stayed, setStayed] = useState(false);
  const [activeSecret, setActiveSecret] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStay = () => {
    setStayed(true);
    occultAudio.playRitualGong();
  };

  const handleTriggerSecret = (key: string) => {
    setActiveSecret(key);
    occultAudio.playGlitchSound();
  };

  const handleClose = () => {
    setStayed(false);
    setActiveSecret(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg overflow-y-auto">
      <div className="relative bg-[#0d050a] border-2 border-red-600 rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-[0_0_80px_rgba(220,38,38,0.7)] text-left space-y-6 font-sans">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900/80 transition-colors"
          aria-label="Ablak bezárása"
        >
          <X className="w-5 h-5" />
        </button>

        {!stayed ? (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-red-950 border border-red-500 flex items-center justify-center mx-auto text-red-500 animate-occult-pulse">
              <Skull className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-red-500 tracking-widest uppercase">
                666 KATTINTÁS HITELTELÍTVE
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-white uppercase">
                A TILTOTT MENÜ
              </h3>
              <blockquote className="text-sm sm:text-base font-cinzel italic text-amber-200/90 pt-2">
                „Ezt az oldalt nem kellett volna megtalálnod.”
              </blockquote>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-cinzel font-bold text-xs sm:text-sm">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded border border-neutral-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                [ VISSZAFORDULOK ]
              </button>

              <button
                onClick={handleStay}
                className="w-full sm:w-auto py-3 px-8 bg-red-950 hover:bg-red-900 text-white rounded border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-colors cursor-pointer"
              >
                [ MARADOK ]
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 font-mono text-xs">
            <div className="border-b border-red-900/60 pb-3 text-center space-y-1">
              <h4 className="text-lg sm:text-xl font-bold font-cinzel text-amber-400">
                RENDBEN. AKKOR FOLYTASSUK.
              </h4>
              <p className="text-neutral-400 font-sans text-xs">
                Exkluzív pátyi okkult funkciók tapasztalt démonológusoknak:
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleTriggerSecret('FREQUENCY')}
                className="w-full p-3 bg-neutral-950 hover:bg-red-950/40 border border-neutral-800 hover:border-red-600 rounded text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-200">
                  <Radio className="w-4 h-4 text-red-500" />
                  <span className="font-bold">666 Hz Tiszta Sötét Frekvencia Sugárzása</span>
                </div>
                <span className="text-amber-400 font-bold">AKTIVÁLÁS</span>
              </button>

              <button
                onClick={() => handleTriggerSecret('ATTILA_MEMO')}
                className="w-full p-3 bg-neutral-950 hover:bg-red-950/40 border border-neutral-800 hover:border-red-600 rounded text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-200">
                  <Key className="w-4 h-4 text-amber-500" />
                  <span className="font-bold">Titkos Pátyi Grimoire Jegyzet Olvasása</span>
                </div>
                <span className="text-amber-400 font-bold">MEGNYITÁS</span>
              </button>

              <button
                onClick={() => handleTriggerSecret('ASTRAL')}
                className="w-full p-3 bg-neutral-950 hover:bg-red-950/40 border border-neutral-800 hover:border-red-600 rounded text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-neutral-200">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span className="font-bold">Közvetlen Asztrális Távkapcsolat Attilával</span>
                </div>
                <span className="text-amber-400 font-bold">KAPCSOLÁS</span>
              </button>
            </div>

            {activeSecret === 'FREQUENCY' && (
              <div className="p-3 bg-red-950/60 border border-red-700 rounded text-neutral-200 space-y-1 animate-pulse">
                <span className="text-red-400 font-bold">Frekvencia generálva: 666.0 Hz</span>
                <p className="font-sans text-[11px]">
                  A szoba sarkában lévő entitások most meglepődtek.
                </p>
              </div>
            )}

            {activeSecret === 'ATTILA_MEMO' && (
              <div className="p-3 bg-neutral-950 border border-amber-900 rounded text-neutral-200 space-y-1">
                <span className="text-amber-400 font-bold font-cinzel">Huszár Attila titkos jegyzete (2026. Páty):</span>
                <p className="font-sans text-[11px] italic text-neutral-300">
                  „A legtöbb démon nem akar rosszat, csak nincs jobb dolga. Ha adsz neki egy füstölőt és megkéred, hogy ne a csillárt rázza, általában átmegy a szomszédba.”
                </p>
              </div>
            )}

            {activeSecret === 'ASTRAL' && (
              <div className="p-3 bg-neutral-950 border border-red-700 rounded text-neutral-200 space-y-1">
                <span className="text-emerald-400 font-bold">Asztrális szál rögzítve.</span>
                <p className="font-sans text-[11px]">
                  Attila megérezte a gondolatodat. Nem mond semmit, csak bólint.
                </p>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                onClick={handleClose}
                className="text-xs text-neutral-500 hover:text-neutral-300 underline cursor-pointer"
              >
                Tiltott menü bezárása és visszatérés a közigazgatásba
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
