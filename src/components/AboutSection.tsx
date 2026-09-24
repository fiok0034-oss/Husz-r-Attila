import React, { useState } from 'react';
import { Skull, Flame, Shield, MapPin, Car, Bus, ScrollText, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../utils/constants';
import { occultAudio } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { num: '666', label: 'Észlelt Jelenség', sub: 'Pátyon és Pest vármegyében' },
    { num: '13+', label: 'Év Tapasztalat', sub: 'Folyamatos okkult kutatás és iktatás' },
    { num: '784', label: 'Buszjárat', sub: 'Ahol a legtöbb spontán kiszorítás történik' },
    { num: '1', label: 'Oldtimer Mitsubishi', sub: 'Szenteltfölddel és láncokkal teli csomagtartó' },
  ];

  const handleStatHover = (idx: number) => {
    setHoveredStat(idx);
    occultAudio.playRadarPing();
  };

  return (
    <section id="rolam" className="py-20 bg-black/35 backdrop-blur-[2px] border-t border-red-950/60 relative font-sans overflow-hidden">
      {/* Background Satanic ambient geometry */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <svg className="w-96 h-96 animate-slow-rotate text-red-600" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <polygon points="50,5 95,80 5,80" strokeWidth="1" />
          <circle cx="50" cy="50" r="45" strokeWidth="1" />
          <polygon points="50,95 5,20 95,20" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Dramatic Biography Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Attila's Portrait Image with sinister red glowing border */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.7)] ring-2 ring-red-500/50 max-w-sm w-full group">
              <img
                src={IMAGES.attilaPortrait}
                alt="Huszár Attila - Az Utolsó Ördögűző"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 filter contrast-125 brightness-95"
              />

              {/* Crimson gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block">
                  PÁTYI OKKULT KUTATÓ
                </span>
                <span className="text-white font-cinzel font-bold text-lg sm:text-xl">
                  HUSZÁR ATTILA
                </span>
              </div>
            </div>

            {/* Required sub-image label */}
            <div className="mt-4 px-4 py-2 bg-red-950/80 border border-red-600/80 rounded-full text-center shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <span className="text-xs font-mono font-bold text-red-300 tracking-widest uppercase flex items-center gap-2">
                <Skull className="w-4 h-4 text-red-500 animate-pulse" />
                PÁTYI OKKULT KUTATÓ: HUSZÁR ATTILA
              </span>
            </div>
          </div>

          {/* Biography & Bizarre Lore Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-red-400 uppercase">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>SZEMÉLYES NYILATKOZAT · PÁTY & PEST VÁRMEGYE</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-white uppercase tracking-tight">
                HUSZÁR ATTILA
              </h2>
              <p className="text-base sm:text-lg font-cinzel text-red-500 font-semibold uppercase flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-600 animate-candle" />
                AZ UTOLSÓ ÖRDÖGŰZŐ
              </p>
            </div>

            {/* Hitvallás Box */}
            <div className="p-4 bg-[#18040b] border-l-4 border-red-600 rounded-r-lg space-y-2 shadow-lg">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                ⚡ HITVALLÁS:
              </span>
              <p className="text-sm sm:text-base font-cinzel text-neutral-200 italic leading-relaxed">
                „1992-ben születtem. Pátyon élek. Hobbi ördögűző, sátánista, a megmagyarázhatatlan dolgok mániákus kutatója. Amit más elenged, azt én előbb boncolom és iktatom.”
              </p>
            </div>

            {/* Detailed Bizarre Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              {/* Buszmegállós Ördögűzés */}
              <div className="p-4 bg-black/70 border border-red-900/60 rounded-xl space-y-2 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-2 text-amber-400 font-cinzel font-bold">
                  <Bus className="w-4 h-4 text-red-500" />
                  <span>SPONTÁN BUSZMEGÁLLÓS ÖRDÖGŰZÉS</span>
                </div>
                <p className="text-neutral-300 leading-relaxed font-sans text-xs">
                  „Ha a helyzet megkívánja, akár a pátyi Volánbusz-megállóban, a hetes buszra várva is végrehajtok egy azonnali, rögtönzött kiszorító rituálét.”
                </p>
              </div>

              {/* A Garázs és a Járművek */}
              <div className="p-4 bg-black/70 border border-red-900/60 rounded-xl space-y-2 hover:border-red-500 transition-colors">
                <div className="flex items-center gap-2 text-amber-400 font-cinzel font-bold">
                  <Car className="w-4 h-4 text-red-500" />
                  <span>A GARÁZS ÉS A JÁRMŰVEK</span>
                </div>
                <p className="text-neutral-300 leading-relaxed font-sans text-xs">
                  „Van egy legendás E30-as BMW-m, amit a garázs mélyén láncoltam le a sötétség ellen, de a mindennapi paranormális kiszállásokhoz egy öreg, rituálisan megszentelt Oldtimer Mitsubishivel járok, mert abban a csomagtartóban jobban elférnek a láncok, a viasz és a szenteltföld.”
                </p>
              </div>
            </div>

            {/* Quotes */}
            <div className="space-y-3 font-cinzel text-neutral-300 italic text-sm">
              <blockquote className="border-l-2 border-red-700/80 pl-3">
                „Mások szerint túl komolyan veszem.
                <br />
                <span className="text-white font-semibold">Én szerintem nem veszem elég komolyan.”</span>
              </blockquote>

              <blockquote className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-amber-200 font-bold text-sm sm:text-base">
                „A sötétség nem probléma. A sötétség egy ügy.”
              </blockquote>
            </div>
          </div>
        </div>

        {/* "MIÉRT HUSZÁR ATTILA?" Stats Grid */}
        <div className="mt-16 pt-10 border-t border-red-950/70">
          <div className="text-center max-w-xl mx-auto space-y-1 mb-8">
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">
              BIZONYÍTOTT PÁTYI METRIKÁK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white uppercase">
              MIÉRT HUSZÁR ATTILA?
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                onMouseEnter={() => handleStatHover(idx)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`p-5 sm:p-6 rounded-xl border text-center transition-all duration-300 cursor-default ${
                  hoveredStat === idx
                    ? 'bg-red-950/90 border-red-500 shadow-[0_0_35px_rgba(220,38,38,0.5)] scale-105'
                    : 'bg-[#12030b] border-red-950'
                }`}
              >
                <div
                  className={`text-3xl sm:text-5xl font-extrabold font-cinzel tracking-tight transition-colors ${
                    hoveredStat === idx ? 'text-amber-300' : 'text-red-500'
                  }`}
                >
                  {stat.num}
                </div>
                <div className="text-xs sm:text-sm font-cinzel font-bold text-white mt-2 uppercase">
                  {stat.label}
                </div>
                <p className="text-[11px] text-neutral-400 font-sans mt-1">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
