import React, { useState } from 'react';
import { AlertTriangle, X, Flame, Wrench, Skull, ShieldAlert } from 'lucide-react';
import { occultAudio } from '../utils/audio';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartInvestigation: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onStartInvestigation,
}) => {
  const [isBurning, setIsBurning] = useState<boolean | null>(null);
  const [isChairTalking, setIsChairTalking] = useState<boolean | null>(null);
  const [isBoiler, setIsBoiler] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleBoilerAnswer = (boiler: boolean) => {
    setIsBoiler(boiler);
    if (boiler) {
      occultAudio.playSealStamp();
    } else {
      occultAudio.playGlitchSound();
    }
  };

  const reset = () => {
    setIsBurning(null);
    setIsChairTalking(null);
    setIsBoiler(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleLaunch = () => {
    handleClose();
    onStartInvestigation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
      <div className="relative bg-[#0d0509] border-2 border-red-700 rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_80px_rgba(220,38,38,0.7)] text-left space-y-6 font-sans">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900/80 transition-colors"
          aria-label="Ablak bezárása"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 border-b border-red-900/60 pb-4">
          <div className="w-14 h-14 rounded-full bg-red-950 border border-red-600 flex items-center justify-center mx-auto text-red-500 animate-bounce">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white tracking-widest uppercase">
            NYUGODJ MEG.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-mono">
            PÁTYI OKKULT ELSŐSEGÉLY ÉS TRIAGE PROTOKOLL
          </p>
        </div>

        {/* Cold Bureaucratic Triage Questions */}
        <div className="space-y-4 font-mono text-xs">
          {/* Question 1: Égsz? */}
          <div className="p-3 bg-neutral-950 rounded border border-neutral-800 space-y-2">
            <div className="text-neutral-300 font-semibold flex items-center justify-between">
              <span>1. Égsz?</span>
              <span className="text-neutral-500 text-[10px]">FIZIKAI TESZT</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsBurning(true)}
                className={`flex-1 py-1.5 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  isBurning === true
                    ? 'bg-red-950 border-red-500 text-white font-bold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}
              >
                Igen, spontán kigyulladtam
              </button>
              <button
                type="button"
                onClick={() => setIsBurning(false)}
                className={`flex-1 py-1.5 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  isBurning === false
                    ? 'bg-neutral-800 border-neutral-600 text-white font-bold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}
              >
                Nem
              </button>
            </div>
          </div>

          {/* Question 2: Beszél a szék? */}
          <div className="p-3 bg-neutral-950 rounded border border-neutral-800 space-y-2">
            <div className="text-neutral-300 font-semibold flex items-center justify-between">
              <span>2. Beszél a szék?</span>
              <span className="text-neutral-500 text-[10px]">AKUSZTIKAI FELMÉRÉS</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsChairTalking(true)}
                className={`flex-1 py-1.5 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  isChairTalking === true
                    ? 'bg-red-950 border-red-500 text-white font-bold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}
              >
                Igen, ókori arámi nyelven suttog
              </button>
              <button
                type="button"
                onClick={() => setIsChairTalking(false)}
                className={`flex-1 py-1.5 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  isChairTalking === false
                    ? 'bg-neutral-800 border-neutral-600 text-white font-bold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}
              >
                Nem
              </button>
            </div>
          </div>

          {/* Question 3: A bojler az? */}
          <div className="p-3 bg-neutral-950 rounded border border-neutral-800 space-y-2">
            <div className="text-amber-400 font-bold flex items-center justify-between">
              <span>3. A bojler az?</span>
              <span className="text-amber-500/80 text-[10px]">KRITIKUS VÁLASZTÓVONAL</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleBoilerAnswer(true)}
                className={`flex-1 py-2 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  isBoiler === true
                    ? 'bg-amber-950 border-amber-500 text-amber-200 font-bold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}
              >
                Igen, a bojler kattog és forr
              </button>
              <button
                type="button"
                onClick={() => handleBoilerAnswer(false)}
                className={`flex-1 py-2 px-3 rounded border text-xs cursor-pointer transition-colors ${
                  isBoiler === false
                    ? 'bg-red-950 border-red-500 text-white font-bold shadow-md'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}
              >
                NEM, EZ NEM A BOJLER
              </button>
            </div>
          </div>
        </div>

        {/* Triage Output: If Boiler */}
        {isBoiler === true && (
          <div className="p-4 bg-neutral-950 border-2 border-neutral-700 rounded-lg text-center space-y-3 animate-fade-in font-mono">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm">
              <Wrench className="w-5 h-5 text-amber-400" />
              <span>ÜGY LEZÁRVA. HÍVJ SZERELŐT, NE ENGEM.</span>
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Huszár Attila hivatala nem végez víz-, gáz- és fűtésszerelést. A vízköves bojler és a tágulási tartály anomáliái nem tartoznak a démonológiai hatáskörbe. A beadványt elutasítottuk.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 py-2.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold rounded border border-neutral-700 cursor-pointer"
            >
              ÉRTETTEM, MEGYEK A SZERELŐHÖZ
            </button>
          </div>
        )}

        {/* Triage Output: If NOT Boiler */}
        {isBoiler === false && (
          <div className="p-5 bg-red-950/90 border-2 border-red-600 rounded-lg text-center space-y-4 animate-pulse font-mono shadow-[0_0_40px_rgba(220,38,38,0.6)]">
            <div className="flex items-center justify-center gap-2 text-red-300 font-bold font-cinzel text-lg">
              <Skull className="w-5 h-5 text-red-500 animate-bounce" />
              <span>Attila már indítja a Mitsubishit. Maradj mozdulatlan.</span>
            </div>
            <p className="text-xs text-neutral-200 font-sans leading-relaxed">
              Az ügyet kiemelt sötétségi prioritással iktattuk. Attila bepakolta a láncokat, a viaszt és a szenteltföldet az Oldtimer Mitsubishi csomagtartójába, és úton van. Ne menj a tükör elé, ne nyisd ki a spájzajtót.
            </p>
            <button
              onClick={handleLaunch}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-red-900 via-red-800 to-red-950 hover:from-red-800 hover:to-red-700 text-white font-cinzel font-bold text-xs sm:text-sm rounded border border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              [ HIVATALOS DÉMONOLÓGIAI VIZSGÁLAT INDÍTÁSA ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
