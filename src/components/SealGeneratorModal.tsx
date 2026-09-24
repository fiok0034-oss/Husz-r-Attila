import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, X, Stamp, Check, Flame, Skull } from 'lucide-react';
import { occultAudio } from '../utils/audio';

interface SealGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
}

export const SealGeneratorModal: React.FC<SealGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultName = '',
}) => {
  const [name, setName] = useState(defaultName || 'Kovács János');
  const [sealType, setSealType] = useState('AKNAZÁR A LÉLEK KÖRÜL');
  const [isBurning, setIsBurning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sealCounter, setSealCounter] = useState(1);
  const [burnProgress, setBurnProgress] = useState(100);

  const sealTypes = [
    'AKNAZÁR A LÉLEK KÖRÜL',
    'ROSSZAKARÓ ÉS SÓGOR KIZÁRÓ PAJZS',
    'MONARCHIA-KORABELI KARMIKUS RETESZ',
    '666-OS PÁTYI ASZTRÁLIS BÉLYEG',
  ];

  const triggerWaxSealBurn = () => {
    // Required console message
    console.log('[IKTATÁS ALATT...]');

    setIsBurning(true);
    setBurnProgress(0);
    occultAudio.playSealStamp();
    occultAudio.playGlitchSound();
    setSealCounter((prev) => prev + 1);

    // Slow, grotesque burning progress
    const interval = setInterval(() => {
      setBurnProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBurning(false);
          return 100;
        }
        return prev + 12;
      });
    }, 220);
  };

  useEffect(() => {
    if (isOpen) {
      triggerWaxSealBurn();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    setCopied(true);
    occultAudio.playGlitchSound();
    navigator.clipboard?.writeText?.(`HA-666-ROTT-${sealCounter} / ${name} / ${sealType}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="seal-generator-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
    >
      {/* Grotesque SVG Filters for Slow Molten Wax Burning, Charring and Heat Displacement */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          {/* Searing Char and Boiling Wax Filter */}
          <filter id="char-burn-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045 0.065"
              numOctaves="5"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="24"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feColorMatrix
              in="displaced"
              type="matrix"
              values="
                1.4 0 0 0 0.2
                0 0.3 0 0 0
                0 0 0.1 0 0
                0 0 0 20 -4
              "
              result="charEdges"
            />
            <feGaussianBlur in="charEdges" stdDeviation="1.5" result="blurredChar" />
            <feMerge>
              <feMergeNode in="blurredChar" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Slow Heat Haze Waves */}
          <filter id="heat-haze-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02 0.07"
              numOctaves="4"
              seed="13"
              result="heatTurb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="heatTurb"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="B"
              result="heatDisp"
            />
          </filter>

          {/* Molten Boiling Wax Glow */}
          <filter id="molten-wax-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="glow" />
            <feColorMatrix
              in="glow"
              type="matrix"
              values="
                1 0 0 0 0.95
                0 0.1 0 0 0.05
                0 0 0.05 0 0
                0 0 0 22 -6
              "
              result="coloredGlow"
            />
            <feMerge>
              <feMergeNode in="coloredGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="relative bg-[#110309] border-2 border-red-700/90 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_90px_rgba(220,38,38,0.7)] text-left space-y-6 max-h-[90vh] overflow-y-auto font-sans">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900/80 transition-colors cursor-pointer"
          aria-label="Ablak bezárása"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 border-b border-red-950/80 pb-4">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs tracking-widest uppercase">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>SZEMÉLYES OKKULT VÉDELMI BÉLYEG GENERÁTOR</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white uppercase flex items-center gap-2">
            <span>HUSZÁR-FÉLE VÉDELMI DEKRÉTUM</span>
            <Flame className="w-5 h-5 text-red-500 animate-candle" />
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            Aknazár a lélek körül. Digitálisan forró viasszal és lassú SVG szimbólum-beégetéssel készített pátyi okkult okirat.
          </p>
        </div>

        {/* Configuration inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1.5">
            <label className="text-neutral-400 block">VÉDETT SZEMÉLY NEVE:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pl. Kovács János"
              className="w-full bg-black/80 border border-red-950/80 rounded p-2.5 text-neutral-200 focus:outline-none focus:border-red-500 transition-colors text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-neutral-400 block">BÉLYEG TÍPUSA:</label>
            <select
              value={sealType}
              onChange={(e) => {
                setSealType(e.target.value);
                triggerWaxSealBurn();
              }}
              className="w-full bg-black/80 border border-red-950/80 rounded p-2.5 text-neutral-200 focus:outline-none focus:border-red-500 transition-colors text-sm"
            >
              {sealTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Seal Certificate Visual Showcase with SVG Wax Burning Effect */}
        <div
          className={`relative bg-gradient-to-b from-[#1b050d] via-[#100308] to-[#080104] border-2 rounded-xl p-6 overflow-hidden shadow-2xl transition-all duration-700 ${
            isBurning
              ? 'border-red-500 shadow-[0_0_70px_rgba(239,68,68,0.9)] scale-[1.01]'
              : 'border-red-900/80 shadow-[0_0_35px_rgba(220,38,38,0.3)]'
          }`}
        >
          {/* Active Burning / Sealing Overlay */}
          {isBurning && (
            <div className="absolute inset-0 z-30 bg-red-950/50 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none">
              <div className="px-5 py-2.5 bg-black/95 border-2 border-red-500 rounded-lg text-red-400 font-mono font-bold text-sm sm:text-base tracking-widest uppercase shadow-[0_0_50px_#ff0000] flex items-center gap-3 animate-pulse">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
                <span>[IKTATÁS ALATT...]</span>
              </div>
              <div className="text-xs font-mono text-amber-300 mt-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                <span>Forró, sercegő viaszpecsét beégetése az asztrális törzslapba ({burnProgress}%)...</span>
              </div>
            </div>
          )}

          {/* Background seal watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
            <svg
              className="w-80 h-80 animate-slow-rotate text-red-600"
              viewBox="0 0 100 100"
              stroke="currentColor"
              fill="none"
            >
              <polygon points="50,5 95,80 5,80" strokeWidth="1" />
              <circle cx="50" cy="50" r="45" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
              <polygon points="50,95 5,20 95,20" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            {/* Wax Seal Sigil Visual with SVG Burning Filter */}
            <div
              className={`relative w-36 h-36 shrink-0 flex items-center justify-center rounded-full transition-all duration-1000 ${
                isBurning ? 'scale-110' : 'scale-100'
              }`}
            >
              {/* Melted dripping wax backplate with charred border */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 via-red-950 to-black border-4 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.9)]"
                style={{
                  filter: isBurning ? 'url(#char-burn-filter)' : 'url(#molten-wax-glow)',
                }}
              >
                {/* Molten wax drips */}
                <span className="absolute -bottom-3 left-6 w-3.5 h-6 bg-red-700 rounded-full blur-[0.5px]" />
                <span className="absolute -top-1.5 right-8 w-2.5 h-5 bg-red-800 rounded-full blur-[0.5px]" />
                <span className="absolute -right-2 top-10 w-4 h-3.5 bg-red-900 rounded-full blur-[0.5px]" />
              </div>

              {/* Burning Sigil SVG with filter */}
              <svg
                className={`w-24 h-24 text-amber-300 relative z-10 transition-all duration-700 ${
                  isBurning
                    ? 'rotate-90 scale-110 text-red-200 drop-shadow-[0_0_20px_#ff0000]'
                    : 'rotate-0 text-amber-300'
                }`}
                style={{
                  filter: isBurning ? 'url(#char-burn-filter)' : 'none',
                }}
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polygon points="50,10 90,80 10,80" />
                <polygon points="50,90 10,20 90,20" />
                <circle cx="50" cy="50" r="24" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="8" fill="#dc2626" />
                <line x1="50" y1="5" x2="50" y2="95" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1" strokeDasharray="3,3" />
              </svg>

              <div className="absolute -bottom-2 px-2.5 py-0.5 bg-red-950 text-amber-300 font-mono text-[9px] rounded-full border border-red-500 font-bold tracking-widest shadow-md z-20">
                HA-666-ROTT
              </div>
            </div>

            {/* Certificate Details */}
            <div className="space-y-2 text-left w-full font-mono text-xs">
              <div className="border-b border-red-950/80 pb-1 flex justify-between items-center">
                <span className="text-neutral-400">BÉLYEGZŐSZÁM:</span>
                <span className="text-red-400 font-bold tracking-wider">HA-666-ROTT-{sealCounter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">TULAJDONOS:</span>
                <span className="text-white font-bold font-cinzel text-sm">{name || 'NÉVTELEN'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">BÉLYEG TÍPUSA:</span>
                <span className="text-amber-400 font-bold">{sealType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">KOMPATIBILITÁS:</span>
                <span className="text-amber-400 font-bold">SÖTÉT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">VÉDETTSÉG SZAVATOSSÁGA:</span>
                <span className="text-emerald-400 font-bold">AMÍG A VIASZ KI NEM HŰL</span>
              </div>
              <div className="flex justify-between border-t border-red-950/60 pt-1">
                <span className="text-neutral-400">IKTATÁSI HELY:</span>
                <span className="text-neutral-300">PÁTYI OKKULT HIVATAL & OLDTIMER MITSUBISHI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={triggerWaxSealBurn}
            className="w-full sm:w-auto py-2.5 px-5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-cinzel text-xs rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            VIASZPECSÉT ÚJRAÉGETÉSE
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto py-2.5 px-6 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-cinzel font-bold text-xs rounded border border-red-500 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                IKTATÓSZÁM LEMÁSOLVA!
              </>
            ) : (
              <>
                <Stamp className="w-4 h-4 text-amber-300" />
                VÉDELEM ÉRVÉNYESÍTÉSE (HA-666-ROTT)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
