import React from 'react';
import { Skull, Shield, MapPin, FileText, Stamp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-[2px] border-t border-red-950/60 pt-16 pb-12 text-neutral-400 font-sans text-xs text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="text-xl font-extrabold font-cinzel text-white tracking-wider block">
                HUSZÁR ATTILA
              </span>
              <span className="text-xs font-cinzel text-red-500 font-bold uppercase tracking-widest block">
                AZ UTOLSÓ ÖRDÖGŰZŐ
              </span>
            </div>

            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Hivatalos pátyi okkult és démonológiai szolgáltatások, szimbolikus tisztítások és asztrális ügyintézés 1992 óta.
            </p>

            <div className="flex items-center gap-2 text-amber-500 font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Székhely: 2071 Páty, Pest Vármegye</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <span className="text-white font-cinzel font-bold text-xs uppercase tracking-wider block">
              OKKULT ÜGYEK
            </span>
            <ul className="space-y-2">
              <li><a href="#szolgaltatasok" className="hover:text-amber-400 transition-colors">Szolgáltatások</a></li>
              <li><a href="#ritualegenerator" className="hover:text-amber-400 transition-colors">Rituálégenerátor</a></li>
              <li><a href="#diagnosztika" className="hover:text-amber-400 transition-colors">Démonológiai Felmérés</a></li>
              <li><a href="#radar" className="hover:text-amber-400 transition-colors">Paranormális Radar</a></li>
              <li><a href="#ugyfelkapu" className="hover:text-amber-400 transition-colors">Sötét Ügyfélkapu</a></li>
              <li><a href="#rolam" className="hover:text-amber-400 transition-colors">Attiláról</a></li>
            </ul>
          </div>

          {/* Bureaucratic stamps & official details */}
          <div className="md:col-span-4 space-y-3 font-mono text-[11px]">
            <span className="text-white font-cinzel font-bold text-xs uppercase tracking-wider block">
              SZERTARTÁSI TÁJÉKOZTATÓ
            </span>
            <div className="p-3 bg-black/60 rounded border border-neutral-900 space-y-1">
              <span className="text-amber-400 font-semibold block">ÜGYINTÉZÉSI REND:</span>
              <p className="text-neutral-400 font-sans">
                A rituálék feldolgozása érkezési sorrendben történik. Szükség esetén Attila éjfélkor közvetlenül meggyújtja a megfelelő gyertyát.
              </p>
            </div>
            <p className="text-neutral-500">
              Központi azonosító: <span className="text-neutral-300">HA-666-PATY-2026</span>
            </p>
          </div>
        </div>

        {/* Mandatory Legal & Entertainment Disclaimer */}
        <div className="pt-8 border-t border-neutral-900 space-y-3 text-center md:text-left">
          <div className="p-4 bg-neutral-950/90 rounded-lg border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed font-sans">
            <span className="font-bold text-neutral-300 block mb-1">JOGI ÉS SZÓRAKOZTATÓ NYILATKOZAT:</span>
            Az oldalon szereplő okkult szolgáltatások szimbolikus, spirituális és szórakoztató jellegűek. Nem helyettesítenek egészségügyi, pszichológiai, jogi vagy hatósági segítséget. Bármilyen valós fizikai vagy mentális probléma esetén kérjük, forduljon megfelelő szakemberhez vagy hivatalos szervhez.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-mono gap-2 pt-2">
            <span>© 2026 Huszár Attila · Minden sötét jog fenntartva.</span>
            <span>Készült Pátyon, a természetfeletti dolgok szellemében.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
