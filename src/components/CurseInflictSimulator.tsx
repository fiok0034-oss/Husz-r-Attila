import React, { useState } from 'react';
import { Skull, Flame, Stamp, Volume2, Check, Clock } from 'lucide-react';
import { occultAudio } from '../utils/audio';

export const CurseInflictSimulator: React.FC = () => {
  const [candleLit, setCandleLit] = useState(false);
  const [knocks, setKnocks] = useState(0);
  const [silenceActive, setSilenceActive] = useState(false);
  const [silenceSeconds, setSilenceSeconds] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);
  const [anonymousId] = useState(() => `RONTÁS-${Math.floor(1000 + Math.random() * 9000)}-2026`);

  const handleLightCandle = () => {
    setCandleLit(true);
    occultAudio.playRitualGong();
  };

  const handleKnock = () => {
    if (knocks < 3) {
      const next = knocks + 1;
      setKnocks(next);
      occultAudio.playSealStamp();

      if (next === 3) {
        setSilenceActive(true);
        let left = 5;
        const interval = setInterval(() => {
          left--;
          setSilenceSeconds(left);
          if (left <= 0) {
            clearInterval(interval);
            setSilenceActive(false);
            setIsCompleted(true);
            occultAudio.playGlitchSound();
          }
        }, 1000);
      }
    }
  };

  const resetAll = () => {
    setCandleLit(false);
    setKnocks(0);
    setSilenceActive(false);
    setSilenceSeconds(5);
    setIsCompleted(false);
  };

  return (
    <div className="bg-[#0c060d] border border-red-900/80 rounded-lg p-5 font-mono text-left space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-red-950 pb-2">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-cinzel">
          <Skull className="w-4 h-4 text-red-500" />
          <span>SZIMBOLIKUS RONTÁS-BEJEGYZÉSI PROTOKOLL</span>
        </div>
        <span className="text-[10px] text-amber-400 font-mono bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
          IKTATÓ: {anonymousId}
        </span>
      </div>

      <p className="text-xs text-neutral-300 font-sans leading-relaxed">
        Hivatalos rontási eljárás: aludt vér ízű kávé, fekete szurok a mennyezetről és döglött darázs a borítékban 4 szigorú lépésben:
      </p>

      {/* Step Indicators */}
      <div className="space-y-2.5 text-xs">
        {/* Step 1: Candle */}
        <div className="flex items-center justify-between p-2.5 rounded bg-neutral-950 border border-neutral-900">
          <div className="flex items-center gap-2">
            <Flame className={`w-4 h-4 ${candleLit ? 'text-amber-500 animate-candle' : 'text-neutral-600'}`} />
            <span className={candleLit ? 'text-neutral-200 font-semibold' : 'text-neutral-500'}>
              1. Fekete méhviasz gyertya meggyújtása
            </span>
          </div>
          {!candleLit ? (
            <button
              onClick={handleLightCandle}
              className="px-2.5 py-1 bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 text-[11px] rounded transition-colors cursor-pointer"
            >
              GYÚJTÁS
            </button>
          ) : (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> ÉG
            </span>
          )}
        </div>

        {/* Step 2: Three Knocks */}
        <div className="flex items-center justify-between p-2.5 rounded bg-neutral-950 border border-neutral-900">
          <div className="flex items-center gap-2">
            <Volume2 className={`w-4 h-4 ${knocks > 0 ? 'text-amber-400' : 'text-neutral-600'}`} />
            <span className={candleLit ? 'text-neutral-200 font-semibold' : 'text-neutral-500'}>
              2. Háromszori kopogás az asztal alatt ({knocks}/3)
            </span>
          </div>
          <button
            onClick={handleKnock}
            disabled={!candleLit || knocks >= 3}
            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-amber-300 border border-neutral-700 text-[11px] rounded transition-colors cursor-pointer"
          >
            {knocks >= 3 ? 'KÉSZ' : 'KOPOGÁS'}
          </button>
        </div>

        {/* Step 3: Unreasonable Silence */}
        <div className="flex items-center justify-between p-2.5 rounded bg-neutral-950 border border-neutral-900">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${silenceActive ? 'text-red-500 animate-spin' : 'text-neutral-600'}`} />
            <span className={knocks >= 3 ? 'text-neutral-200 font-semibold' : 'text-neutral-500'}>
              3. Fojtogató, indokolatlan csend
            </span>
          </div>
          {silenceActive && (
            <span className="text-red-400 font-bold animate-pulse text-xs">
              CSEND ({silenceSeconds} mp)...
            </span>
          )}
          {isCompleted && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> MEGTÖRTÉNT
            </span>
          )}
        </div>
      </div>

      {/* Final Outcome */}
      {isCompleted && (
        <div className="p-3.5 bg-red-950/80 border border-red-700 rounded space-y-2 animate-pulse">
          <div className="flex items-center gap-2 text-red-300 font-bold font-cinzel text-sm">
            <Stamp className="w-4 h-4 text-red-500" />
            <span>A HIVATALOS RONTÁSI IDÉZÉST KIÁLLÍTOTTUK.</span>
          </div>
          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            Döglött darázs mellékelve a borítékban. Az ügy lezárva. Fellebbezésnek helye nincs.
          </p>
          <button
            onClick={resetAll}
            className="text-[11px] text-amber-400 underline font-mono cursor-pointer pt-1 block"
          >
            Új rontási eljárás indítása
          </button>
        </div>
      )}
    </div>
  );
};
