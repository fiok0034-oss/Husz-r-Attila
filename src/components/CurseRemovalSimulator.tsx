import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Flame, Skull } from 'lucide-react';
import { occultAudio } from '../utils/audio';

export const CurseRemovalSimulator: React.FC = () => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [isRunning, setIsRunning] = useState(false);

  const startPurge = () => {
    setIsRunning(true);
    setStage(0);
    occultAudio.playRitualGong();

    setTimeout(() => {
      setStage(1);
      occultAudio.playGlitchSound();
    }, 1200);

    setTimeout(() => {
      setStage(2);
      occultAudio.playRadarPing();
    }, 2800);

    setTimeout(() => {
      setStage(3);
      setIsRunning(false);
      occultAudio.playSealStamp();
    }, 4500);
  };

  const getPercentage = () => {
    switch (stage) {
      case 0: return 98;
      case 1: return 64;
      case 2: return 22;
      case 3: return 4;
    }
  };

  const getBlocks = () => {
    switch (stage) {
      case 0: return '██████████████░░ 98% (Vizes zsák & Áporodott szag)';
      case 1: return '████████░░░░░░░░ 64% (Marhaszívbe átcsatornázva)';
      case 2: return '████░░░░░░░░░░░░ 22% (Oldtimer Mitsubishi járőrözés és elásás)';
      case 3: return '█░░░░░░░░░░░░░░░ 4% (Kaparó hang elhalkult Pátyon)';
    }
  };

  return (
    <div className="bg-black/95 border border-red-900/80 rounded-lg p-5 font-mono text-left space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-red-950 pb-2">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-cinzel">
          <Flame className="w-4 h-4 text-red-500 animate-candle" />
          <span>RONTÁS-MENTESÍTÉSI ÉS MARHASZÍV PROTOKOLL</span>
        </div>
        <span className="text-[10px] text-red-400 font-mono">PÁTY V4.9</span>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-neutral-400">RONTÁS ÉS MÉRGEZÉSI SZINT:</div>
        <div className="text-xs sm:text-sm font-bold text-red-400 tracking-tighter truncate bg-[#12050b] p-2.5 rounded border border-red-900/50">
          {getBlocks()}
        </div>
      </div>

      {/* Progress Bar Visualizer */}
      <div className="w-full bg-neutral-900 h-3.5 rounded overflow-hidden border border-neutral-800">
        <div
          className={`h-full transition-all duration-1000 ${
            stage === 3 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]'
          }`}
          style={{ width: `${getPercentage()}%` }}
        />
      </div>

      {/* Status Output */}
      <div className="min-h-[44px] flex items-center">
        {stage === 3 ? (
          <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>A marhaszív elásva a dűlőútnál. A spájzban a lekvárok megnyugodtak.</span>
          </div>
        ) : isRunning ? (
          <div className="text-xs text-amber-400 font-mono flex items-center gap-2">
            <Skull className="w-4 h-4 text-red-500 animate-spin" />
            <span>A rontás átcsatornázása folyamatban... Hallatszik a kaparás a vakolat mögül.</span>
          </div>
        ) : (
          <div className="text-xs text-neutral-400 font-mono">
            Kattints a szimuláció indításához a rontás fizikai átcsatornázásának teszteléséhez.
          </div>
        )}
      </div>

      {/* Action Trigger */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={startPurge}
          disabled={isRunning}
          className="flex-1 py-2.5 px-4 bg-red-950 hover:bg-red-900 text-red-100 border border-red-700 font-cinzel font-bold text-xs rounded transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          {isRunning ? 'MARHASZÍV BEÁSÁSA...' : 'MARHASZÍV LEVÉTEL TESZTELÉSE'}
        </button>

        {stage === 3 && (
          <button
            onClick={() => setStage(0)}
            title="Újraindítás"
            aria-label="Szimuláció újraindítása"
            className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded border border-neutral-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
