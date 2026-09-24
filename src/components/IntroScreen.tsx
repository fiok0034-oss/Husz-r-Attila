import React, { useState, useEffect } from 'react';
import { Skull, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { occultAudio } from '../utils/audio';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const fullLogs = [
    '« Energiatér inicializálása...',
    '« Paranormális kapcsolat keresése (Páty körzet)...',
    '« Árnyékszint ellenőrzése... [STABIL]',
    '« Démonológiai csatorna megnyitása...',
    '« 666 kapcsolat sikeresen létrehozva.',
    '« HUSZÁR ATTILA AZONOSÍTVA. »'
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullLogs.length) {
        const nextLine = fullLogs[currentLine];
        setLines((prev) => [...prev, nextLine]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsReady(true);
        }, 500);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    occultAudio.playRitualGong();
    setIsDismissing(true);
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] text-[#e5e2db] px-4 transition-all duration-700 ${
        isDismissing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background occult aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative sigil outline */}
      <div className="absolute w-[360px] h-[360px] md:w-[500px] md:h-[500px] border border-red-900/20 rounded-full animate-slow-rotate pointer-events-none flex items-center justify-center">
        <div className="w-3/4 h-3/4 border border-amber-900/20 rotate-45" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Skull className="w-8 h-8 text-red-600 animate-occult-pulse" />
          <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase font-cinzel text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            A SÖTÉT RENDSZER INDÍTÁSA...
          </h1>
        </div>

        {/* Terminal logs box */}
        <div className="bg-black/80 border border-neutral-800 rounded-lg p-5 font-mono text-xs md:text-sm text-left shadow-2xl space-y-2 min-h-[190px] border-l-2 border-l-red-700">
          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-neutral-900 text-neutral-500 text-xs">
            <Terminal className="w-3.5 h-3.5 text-red-600" />
            <span>TERMINAL V6.6.6 // PÁTYI DÉMONOLÓGIAI KÖZPONT</span>
          </div>
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`transition-all duration-300 ${
                idx === fullLogs.length - 1
                  ? 'text-amber-400 font-bold tracking-wider'
                  : 'text-neutral-300'
              }`}
            >
              {line}
            </div>
          ))}
          {!isReady && (
            <div className="inline-block w-2 h-4 bg-red-600 animate-pulse ml-1 align-middle" />
          )}
        </div>

        {/* Entry Ready Action */}
        <div
          className={`space-y-4 transition-all duration-500 ${
            isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <p className="text-sm md:text-base font-cinzel text-neutral-300 tracking-wider">
            BELÉPHETSZ.
          </p>
          <button
            onClick={handleEnterClick}
            className="w-full py-4 px-6 bg-gradient-to-r from-red-950 via-red-800 to-red-950 hover:from-red-900 hover:via-red-700 hover:to-red-900 text-white font-cinzel font-bold text-base md:text-lg tracking-widest rounded-md border border-red-600/60 shadow-[0_0_30px_rgba(185,28,28,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            [ BELÉPEK A SÖTÉTSÉGBE ]
          </button>
          <p className="text-xs text-neutral-500 font-sans">
            A belépéssel elfogadja a pátyi okkult ügyintézési dekrétumokat.
          </p>
        </div>
      </div>
    </div>
  );
};
