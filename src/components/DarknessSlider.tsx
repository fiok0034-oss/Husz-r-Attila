import React, { useState } from 'react';
import { Moon, Skull, AlertTriangle, Flame } from 'lucide-react';
import { occultAudio } from '../utils/audio';

interface DarknessSliderProps {
  darknessLevel: number;
  onDarknessChange: (val: number) => void;
}

export const DarknessSlider: React.FC<DarknessSliderProps> = ({
  darknessLevel,
  onDarknessChange,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const getDarknessReaction = (val: number) => {
    if (val === 0) return 'Steril gyanútlanság.';
    if (val < 100) return 'Valami nem stimmel a levegőben.';
    if (val < 250) return 'A teáskanna magától zörög.';
    if (val >= 250 && val <= 350) return 'Garázsban rekedt E30-as üvöltés.';
    if (val < 500) return 'A mennyezetből sűrű szurok kezd szivárogni.';
    if (val < 666) return 'A falból hideg szag árad.';
    return 'HIBA: A SÖTÉTSÉG MÁR A KÉPERNYŐDBEN VAN.';
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onDarknessChange(val);

    if (val === 666) {
      setIsGlitching(true);
      occultAudio.playGlitchSound();
      setTimeout(() => setIsGlitching(false), 1200);
    } else if (val === 100 || val === 300 || val === 500) {
      occultAudio.playRadarPing();
    }
  };

  return (
    <section className={`py-16 bg-black/40 backdrop-blur-[2px] border-y border-red-950/60 relative ${isGlitching || darknessLevel === 666 ? 'animate-glitch' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-red-500 uppercase">
          <Moon className="w-4 h-4 text-red-500" />
          <span>FOLYAMATOS SÖTÉTSÉGI FOKOZAT SZABÁLYZÓ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-cinzel text-white uppercase tracking-tight">
          MENNYIRE LEGYEN SÖTÉT?
        </h2>

        {/* Big Display Value */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-6xl sm:text-8xl font-extrabold font-cinzel transition-all duration-300 ${
            darknessLevel === 666
              ? 'text-red-500 animate-pulse drop-shadow-[0_0_40px_rgba(220,38,38,0.9)]'
              : 'text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]'
          }`}>
            {darknessLevel}
          </span>
          <span className="text-xs font-mono text-neutral-400 text-left">
            / 666<br />MAX. OKKULT SKÁLA
          </span>
        </div>

        {/* Reaction Quote */}
        <div className="min-h-[60px] flex items-center justify-center px-4">
          <blockquote className={`text-base sm:text-2xl font-cinzel italic font-bold transition-colors ${
            darknessLevel === 666
              ? 'text-red-400 font-extrabold animate-pulse'
              : 'text-amber-200'
          }`}>
            „{getDarknessReaction(darknessLevel)}”
          </blockquote>
        </div>

        {/* Giant Slider */}
        <div className="max-w-xl mx-auto space-y-3 font-mono">
          <input
            type="range"
            min="0"
            max="666"
            step="1"
            value={darknessLevel}
            onChange={handleSliderChange}
            aria-label="Sötétségi szint csúszka"
            className="w-full accent-red-600 h-4 bg-neutral-900 rounded-lg cursor-pointer transition-all border border-red-950 shadow-inner"
          />
          <div className="grid grid-cols-5 text-[10px] sm:text-xs text-neutral-400 pt-1 text-center">
            <span>0<br /><span className="text-neutral-500 text-[9px]">Gyanútlanság</span></span>
            <span>100<br /><span className="text-neutral-500 text-[9px]">Teáskanna</span></span>
            <span>300<br /><span className="text-neutral-500 text-[9px]">Padlás</span></span>
            <span>500<br /><span className="text-neutral-500 text-[9px]">Hideg szag</span></span>
            <span className="text-red-500 font-bold">666<br /><span className="text-red-400 text-[9px]">INFERNÓ</span></span>
          </div>
        </div>

        {darknessLevel >= 600 && (
          <div className="p-3 bg-red-950/60 border border-red-600/80 rounded-lg max-w-lg mx-auto text-xs text-red-300 font-mono animate-pulse">
            ⚠ FIGYELEM: 600 fölött a pátyi szervereken spontán áporodott kénkőszag és képernyőtorzulás léphet fel.
          </div>
        )}
      </div>
    </section>
  );
};
