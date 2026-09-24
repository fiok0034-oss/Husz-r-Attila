import React, { useState } from 'react';
import { Flame, Skull, AlertOctagon, Sparkles, Check, Stamp, Clock, Zap } from 'lucide-react';
import { occultAudio } from '../utils/audio';

export const RitualGenerator: React.FC = () => {
  const [goal, setGoal] = useState('ROSSZAKARÓ_BLOKK');
  const [intensity, setIntensity] = useState('KOMOLY');
  const [timing, setTiming] = useState('ÉJFÉL');
  const [darkness, setDarkness] = useState(666);
  const [isBlackout, setIsBlackout] = useState(false);
  const [blackoutStage, setBlackoutStage] = useState<'WARNING' | 'CANCELLED'>('WARNING');
  const [activatedProtocol, setActivatedProtocol] = useState<string | null>(null);

  const goals = [
    { id: 'ROSSZAKARÓ_BLOKK', name: 'Rosszakaró / Szomszéd Blokkolása' },
    { id: 'ATOKTORES', name: 'Generációs Átok Feloldása' },
    { id: 'LAKAS_VEDELEM', name: 'Otthoni Tértisztítás & Asztrális Zár' },
    { id: 'MI_A_FRANC', name: 'Univerzális Paranormális Beavatkozás' },
  ];

  const timings = [
    { id: 'ÉJFÉL', name: 'Éjfél (00:00 - Pátyi idő)' },
    { id: 'UJHOLD', name: 'Újhold sötét fázisa' },
    { id: 'PENTEK_13', name: 'Péntek 13. vagy baljós kedd' },
    { id: 'ALKONYAT', name: 'Pátyi Alkonyat (Amikor a szél megáll)' },
  ];

  const handleIntensityClick = (val: string) => {
    if (val === 'NE_NYOMD_MEG') {
      occultAudio.playGlitchSound();
      setIsBlackout(true);
      setBlackoutStage('WARNING');

      setTimeout(() => {
        setBlackoutStage('CANCELLED');
        occultAudio.playRitualGong();
      }, 3000);

      setTimeout(() => {
        setIsBlackout(false);
      }, 5000);
      return;
    }

    setIntensity(val);
    occultAudio.playSealStamp();
  };

  const handleActivate = () => {
    occultAudio.playRitualGong();
    const id = `HA-RITUÁLÉ-${Math.floor(1000 + Math.random() * 9000)}-2026`;
    setActivatedProtocol(id);
  };

  return (
    <section id="ritualegenerator" className="py-20 bg-black/35 backdrop-blur-[2px] border-t border-red-950/40 relative">
      {/* Easter Egg Blackout Screen */}
      {isBlackout && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center animate-fade-in font-cinzel">
          {blackoutStage === 'WARNING' ? (
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-red-600 tracking-widest animate-pulse">
                ÉN SZÓLTAM.
              </h2>
              <p className="text-sm font-mono text-neutral-400">
                A rendszer sötétségi kapacitása túlcsordult. 3 másodperc csend...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-4xl font-bold text-amber-400 tracking-wider">
                RITUÁLÉ TÖRÖLVE.
              </h2>
              <p className="text-xs font-mono text-neutral-500">
                A kísérletet jegyzőkönyveztük a pátyi szervereken.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-red-400 uppercase">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>INTERAKTÍV SZERTARTÁS-KONFIGURÁTOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-cinzel text-white uppercase tracking-tight">
            GENERÁLD LE A SAJÁT RITUÁLÉDAT
          </h2>
          <p className="text-sm text-neutral-400 font-sans">
            Állítsa össze az Önre szabott szimbolikus okkult rituálét 5 paraméter alapján.
          </p>
        </div>

        <div className="bg-black/90 border border-red-900/60 rounded-xl p-6 sm:p-10 shadow-2xl space-y-8 text-left font-sans">
          {/* Step 1: Goal */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase border-b border-neutral-900 pb-2">
              <span className="w-5 h-5 rounded-full bg-red-950 border border-red-700 flex items-center justify-center text-red-300 font-bold">1</span>
              <span>VÁLASSZ CÉLT:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`p-3.5 rounded-lg border text-left text-xs sm:text-sm font-cinzel font-semibold transition-all cursor-pointer ${
                    goal === g.id
                      ? 'bg-red-950/80 border-red-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{g.name}</span>
                    {goal === g.id && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Intensity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase border-b border-neutral-900 pb-2">
              <span className="w-5 h-5 rounded-full bg-red-950 border border-red-700 flex items-center justify-center text-red-300 font-bold">2</span>
              <span>VÁLASSZ INTENZITÁST:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'ENYHE', label: 'Enyhe' },
                { id: 'KOMOLY', label: 'Komoly' },
                { id: 'NAGYON_KOMOLY', label: 'Nagyon komoly' },
                { id: 'NE_NYOMD_MEG', label: 'NE NYOMD MEG', danger: true },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleIntensityClick(item.id)}
                  className={`py-3 px-3 rounded-lg border font-cinzel text-xs font-bold transition-all cursor-pointer text-center ${
                    item.danger
                      ? 'bg-red-950 border-red-600 text-red-300 hover:bg-red-900 hover:text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                      : intensity === item.id
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Timing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase border-b border-neutral-900 pb-2">
              <span className="w-5 h-5 rounded-full bg-red-950 border border-red-700 flex items-center justify-center text-red-300 font-bold">3</span>
              <span>VÁLASSZ IDŐPONTOT:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timings.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTiming(t.id)}
                  className={`p-3 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer ${
                    timing === t.id
                      ? 'bg-neutral-900 border-amber-500/80 text-amber-300 shadow-sm'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span>{t.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Darkness Level */}
          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase border-b border-neutral-900 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-950 border border-red-700 flex items-center justify-center text-red-300 font-bold">4</span>
                <span>SÖTÉTSÉGI SZINT BEÁLLÍTÁSA:</span>
              </div>
              <span className="text-red-400 font-bold text-sm">{darkness} / 666</span>
            </div>
            <input
              type="range"
              min="1"
              max="666"
              value={darkness}
              onChange={(e) => setDarkness(Number(e.target.value))}
              className="w-full accent-red-600 h-2 bg-neutral-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Step 5: Activation Button */}
          <div className="pt-4 border-t border-neutral-900 space-y-4">
            <button
              onClick={handleActivate}
              className="w-full py-4 px-6 bg-gradient-to-r from-red-900 via-red-800 to-red-950 hover:from-red-800 hover:to-red-700 text-white font-cinzel font-bold text-base tracking-wider rounded-lg border border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>RITUÁLÉ AKTIVÁLÁSA ÉS JEGYZŐKÖNYVEZÉS</span>
            </button>

            {activatedProtocol && (
              <div className="p-4 bg-[#140a10] border border-red-800 rounded-lg font-mono text-xs space-y-2 text-left animate-occult-pulse">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-cinzel">
                    <Stamp className="w-4 h-4 text-red-500" />
                    <span>RITUÁLÉ SIKERESEN RÖGZÍTVE!</span>
                  </div>
                  <span className="text-amber-400 font-bold">{activatedProtocol}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-neutral-300 text-[11px] pt-1">
                  <div>Cél: <span className="text-white font-semibold">{goal}</span></div>
                  <div>Intenzitás: <span className="text-white font-semibold">{intensity}</span></div>
                  <div>Időpont: <span className="text-white font-semibold">{timing}</span></div>
                  <div>Sötétség: <span className="text-red-400 font-bold">{darkness} FOK</span></div>
                </div>
                <p className="text-[10px] text-neutral-400 font-sans pt-1">
                  A jegyzőkönyvet a Sötét Ügyfélkapuban nyomon követheti. Attila értesítést kapott.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
