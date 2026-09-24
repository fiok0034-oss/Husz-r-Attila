import React, { useState } from 'react';
import { FileText, Search, CheckCircle2, Clock, Stamp, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import { BureaucraticCase } from '../types';
import { INITIAL_CASES } from '../utils/constants';
import { occultAudio } from '../utils/audio';

interface CustomerPortalProps {
  cases: BureaucraticCase[];
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ cases }) => {
  const [searchId, setSearchId] = useState('HA-666-2026');
  const [activeCase, setActiveCase] = useState<BureaucraticCase>(INITIAL_CASES[0]);
  const [searchError, setSearchError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = cases.find((c) => c.caseId.toUpperCase() === query);

    if (found) {
      setActiveCase(found);
      setSearchError(false);
      occultAudio.playSealStamp();
    } else {
      setSearchError(true);
      occultAudio.playGlitchSound();
    }
  };

  const selectPresetCase = (c: BureaucraticCase) => {
    setSearchId(c.caseId);
    setActiveCase(c);
    setSearchError(false);
    occultAudio.playSealStamp();
  };

  return (
    <section id="ugyfelkapu" className="py-20 bg-black/35 backdrop-blur-[2px] border-t border-red-950/40 relative font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-500 uppercase">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>HIVATALOS PÁTYI TÚLVILÁGI KÖZIGAZGATÁS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-cinzel text-white uppercase tracking-tight">
            SÖTÉT ÜGYFÉLKAPU
          </h2>
          <p className="text-sm text-neutral-400">
            Kövesse nyomon folyamatban lévő rontásvizsgálatát, szertartás-jegyzőkönyvét és a pátyi határozatokat.
          </p>
        </div>

        {/* Case Search Form */}
        <div className="bg-black/90 border border-neutral-800 rounded-xl p-5 sm:p-7 shadow-xl mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 font-mono">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Adja meg az ügyazonosítót (pl. HA-666-2026)"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-red-950 hover:bg-red-900 text-white font-cinzel font-bold text-xs sm:text-sm rounded-lg border border-red-700 transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Stamp className="w-4 h-4 text-amber-300" />
              ÜGY LEKÉRDEZÉSE
            </button>
          </form>

          {/* Preset Quick Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-neutral-600 text-[11px]">Gyorsbetöltés:</span>
            {cases.slice(0, 3).map((c) => (
              <button
                key={c.caseId}
                onClick={() => selectPresetCase(c)}
                className={`px-2.5 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
                  activeCase.caseId === c.caseId
                    ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                    : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-400'
                }`}
              >
                {c.caseId} ({c.serviceTitle.slice(0, 15)}...)
              </button>
            ))}
          </div>

          {searchError && (
            <div className="p-3 bg-red-950/50 border border-red-800/80 rounded text-xs text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>
                Az adott azonosító nem található a pátyi archívumban. Próbálja a fenti minta-ügyeket vagy adjon le új megrendelést!
              </span>
            </div>
          )}
        </div>

        {/* Active Case File Display */}
        {activeCase && (
          <div className="bg-[#0e090f] border-2 border-amber-900/40 rounded-xl p-6 sm:p-8 shadow-2xl text-left font-mono space-y-6 parchment-border">
            {/* Case File Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/30 pb-4">
              <div>
                <span className="text-[10px] text-amber-500 tracking-widest uppercase block">
                  PÁTYI DÉMONOLÓGIAI HIVATAL · ÜGYFÉL-TÖRZSLAP
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white flex items-center gap-2">
                  <Stamp className="w-6 h-6 text-red-600" />
                  ÜGYAZONOSÍTÓ: {activeCase.caseId}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-neutral-500 block uppercase">STÁTUSZ</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-700 rounded text-red-400 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  {activeCase.statusText}
                </span>
              </div>
            </div>

            {/* General Case Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-black/60 p-4 rounded-lg border border-neutral-900">
              <div>
                <span className="text-neutral-500 block text-[10px]">ÜGYFÉL / JELENTŐ:</span>
                <span className="text-neutral-200 font-semibold">{activeCase.clientName}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">SZOLGÁLTATÁS:</span>
                <span className="text-amber-400 font-semibold">{activeCase.serviceTitle}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">BEFOGADÁS DÁTUMA:</span>
                <span className="text-neutral-200">{activeCase.submissionDate}</span>
              </div>
            </div>

            {/* Bureaucratic Checklist Grid */}
            <div className="space-y-3">
              <span className="text-xs text-neutral-400 uppercase tracking-wider block font-cinzel font-bold">
                TÚLVILÁGI FOLYAMAT-ELLENŐRZŐ PROTOKOLL:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950 border border-neutral-900 rounded flex items-center justify-between">
                  <span className="text-neutral-400">Energetikai vizsgálat:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {activeCase.investigationStatus}
                  </span>
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-900 rounded flex items-center justify-between">
                  <span className="text-neutral-400">Szimbolikus védelem:</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> {activeCase.protectionStatus}
                  </span>
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-900 rounded flex items-center justify-between">
                  <span className="text-neutral-400">Sötétségi kompatibilitás:</span>
                  <span className="text-red-400 font-bold">
                    {activeCase.darknessCompatibility}
                  </span>
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-900 rounded flex items-center justify-between">
                  <span className="text-neutral-400">Attila értesítve:</span>
                  <span className="text-emerald-400 font-bold">
                    {activeCase.attilaNotified ? 'IGEN (SZEMÉLYESEN)' : 'FOLYAMATBAN'}
                  </span>
                </div>
              </div>
            </div>

            {/* Official Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>RITUÁLIS KAPACITÁS ÉS INTÉZÉS FOLYAMATA</span>
                <span className="text-amber-400 font-bold">{activeCase.progressPercent}%</span>
              </div>
              <div className="w-full bg-neutral-900 h-3 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="h-full bg-gradient-to-r from-red-800 via-amber-600 to-red-600 transition-all duration-700"
                  style={{ width: `${activeCase.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Case Log Notes */}
            <div className="space-y-2 pt-2 border-t border-neutral-900">
              <span className="text-[11px] text-neutral-500 uppercase block">
                JEGYZŐKÖNYVI BEJEGYZÉSEK (PÁTYI KAMRA):
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
                {activeCase.notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-mono mt-0.5">»</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing Bureaucratic Stamp */}
            <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-lg text-center space-y-1">
              <p className="text-xs text-neutral-400 font-cinzel italic">
                „Köszönjük, hogy minket választott a túlvilági ügyintézésben.”
              </p>
              <p className="text-[10px] text-neutral-600 font-mono">
                Huszár Attila · Pátyi Ördögűző Kirendeltség · Számla kiállítva és iktatva.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
