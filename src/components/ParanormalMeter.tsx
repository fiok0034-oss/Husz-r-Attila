import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Zap, Radio } from 'lucide-react';

interface ParanormalMeterProps {
  onSecretClick: () => void;
  secretCount: number;
}

export const ParanormalMeter: React.FC<ParanormalMeterProps> = ({
  onSecretClick,
  secretCount,
}) => {
  const [activity, setActivity] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuating between 82% and 96%
      const jitter = Math.floor(Math.random() * 9) - 4;
      setActivity((prev) => Math.min(99, Math.max(76, prev + jitter)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Compute progress bar blocks
  const totalBlocks = 18;
  const filledBlocks = Math.round((activity / 100) * totalBlocks);
  const barString = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  return (
    <div className="bg-[#0e0a0f]/90 border border-red-900/50 rounded-lg p-5 font-mono shadow-[0_0_30px_rgba(139,0,0,0.25)] text-left space-y-4 max-w-sm w-full backdrop-blur-sm relative overflow-hidden">
      {/* Subtle scanline line effect */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600/40 animate-pulse" />

      <div className="flex items-center justify-between border-b border-red-950/60 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-neutral-300">
            PARANORMÁLIS AKTIVITÁS
          </span>
        </div>
        <span className="text-xs px-2 py-0.5 bg-red-950/80 border border-red-800/40 text-red-400 font-bold rounded">
          ÉLŐ
        </span>
      </div>

      {/* ASCII-like Live Bar */}
      <div className="space-y-1">
        <div className="text-sm md:text-base text-red-500 font-bold tracking-tighter truncate select-none">
          {barString} <span className="text-amber-400 ml-1">{activity}%</span>
        </div>
        <div className="flex justify-between text-[10px] text-neutral-500">
          <span>0% BÉKE</span>
          <span>50% ZAVAR</span>
          <span>100% INFERNÓ</span>
        </div>
      </div>

      {/* Grid Indicators */}
      <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-neutral-900">
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase">DÉMONI JELENLÉT</span>
          <span className="text-red-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            ÉSZLELVE
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase">ENERGIASZINT</span>
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            KRITIKUS
          </span>
        </div>
      </div>

      {/* Darkness level badge with Easter Egg click target */}
      <div className="pt-2 border-t border-neutral-900/80 flex items-center justify-between">
        <span className="text-[11px] text-neutral-400">SÖTÉTSÉGI FOKOZAT:</span>
        <button
          onClick={onSecretClick}
          className="px-2.5 py-1 bg-red-950/90 border border-red-700/60 rounded text-red-400 hover:text-white hover:bg-red-800 transition-colors font-bold text-xs tracking-wider cursor-pointer active:scale-95"
          title="Kattints ide a tiltott okkult frekvenciáért"
        >
          666 {secretCount > 0 && <span className="text-neutral-400 text-[10px]">({secretCount}/6)</span>}
        </button>
      </div>
    </div>
  );
};
