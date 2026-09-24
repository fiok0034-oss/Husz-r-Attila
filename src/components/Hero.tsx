import React from 'react';
import { Shield, Sparkles, Flame, HelpCircle, ArrowDown } from 'lucide-react';
import { ParanormalMeter } from './ParanormalMeter';
import { occultAudio } from '../utils/audio';

interface HeroProps {
  onOpenRituals: () => void;
  onOpenDiagnostic: () => void;
  onSecretClick: () => void;
  secretCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRituals,
  onOpenDiagnostic,
  onSecretClick,
  secretCount,
}) => {
  const handleRitualClick = () => {
    occultAudio.playRitualGong();
    onOpenRituals();
  };

  const handleDiagnosticClick = () => {
    occultAudio.playGlitchSound();
    onOpenDiagnostic();
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Rotating Occult Geometry SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
        <svg
          className="w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] lg:w-[780px] lg:h-[780px] animate-slow-rotate text-red-600/60"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        >
          {/* Concentric rings */}
          <circle cx="100" cy="100" r="95" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="88" />
          <circle cx="100" cy="100" r="75" strokeDasharray="6 2" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="25" />
          
          {/* Hexagram & Pentagram lines */}
          <polygon points="100,5 182,148 18,148" />
          <polygon points="100,195 18,52 182,52" />
          
          {/* Diagonal axes */}
          <line x1="10" y1="10" x2="190" y2="190" />
          <line x1="10" y1="190" x2="190" y2="10" />
          <line x1="100" y1="0" x2="100" y2="200" />
          <line x1="0" y1="100" x2="200" y2="100" />
        </svg>
      </div>

      {/* Atmospheric radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(185,28,28,0.15)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left / Main Editorial Text Zone */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Bureaucratic seal marker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-500/90 uppercase border-b border-amber-500/30 pb-1">
              <span>Hivatalos Pátyi Okkult Iroda</span>
              <span aria-hidden="true">·</span>
              <span>Démonológiai Nyilvántartás</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
                className="font-extrabold tracking-tight font-cinzel text-white leading-none drop-shadow-[0_0_25px_rgba(220,38,38,0.4)] uppercase"
              >
                HUSZÁR ATTILA
              </h1>
              <p
                style={{ fontSize: 'clamp(1.15rem, 2.8vw, 2.1rem)' }}
                className="font-bold tracking-widest font-cinzel text-red-500 uppercase flex items-center justify-center lg:justify-start gap-2"
              >
                <Flame className="w-5 h-5 md:w-7 md:h-7 text-red-600 inline-block animate-candle" />
                AZ UTOLSÓ ÖRDÖGŰZŐ
              </p>
            </div>

            {/* Motto */}
            <blockquote className="text-base sm:text-lg md:text-xl font-cinzel italic text-amber-200/90 border-l-2 border-red-700/80 pl-4 py-1 max-w-2xl mx-auto lg:mx-0">
              „Amit mások elengednek, azt én előbb megvizsgálom.”
            </blockquote>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Rontás. Levétel. Tisztítás. Védelem.
              <br />
              <span className="text-neutral-400">
                És minden, amiről a szomszédod inkább nem tudna.
              </span>
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleRitualClick}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-gradient-to-r from-red-900 via-red-800 to-red-950 hover:from-red-800 hover:to-red-700 text-white font-cinzel font-bold text-sm md:text-base tracking-wider rounded border border-red-500/50 shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                [ RITUÁLÉT KÉREK ]
              </button>

              <button
                onClick={handleDiagnosticClick}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 bg-neutral-900/90 hover:bg-neutral-800/90 text-neutral-200 font-cinzel font-semibold text-sm md:text-base tracking-wide rounded border border-neutral-700 hover:border-amber-500/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                [ NEM TUDOM MI VAN VELEM ]
              </button>
            </div>

            {/* Quiet metadata */}
            <div className="pt-2 text-xs text-neutral-500 font-mono flex items-center justify-center lg:justify-start gap-2">
              <span>Páty, Pest Vármegye</span>
              <span aria-hidden="true">·</span>
              <span>13+ Év Tapasztalat</span>
              <span aria-hidden="true">·</span>
              <span className="text-red-400 font-semibold">0% Mellébeszélés</span>
            </div>
          </div>

          {/* Right / Paranormal Live Telemetry Instrument */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ParanormalMeter onSecretClick={onSecretClick} secretCount={secretCount} />
          </div>
        </div>

        {/* Down indicator */}
        <div className="pt-12 text-center">
          <a
            href="#szolgaltatasok"
            className="inline-flex flex-col items-center text-xs text-neutral-500 hover:text-amber-400 transition-colors gap-1"
            aria-label="Ugrás a szolgáltatásokhoz"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest">Okkult Szolgáltatáskatalógus</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-red-500" />
          </a>
        </div>
      </div>
    </section>
  );
};
