import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../utils/constants';

export const Testimonials: React.FC = () => {
  return (
    <section id="velemenyek" className="py-20 bg-black/35 backdrop-blur-[2px] border-t border-red-950/40 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-500 uppercase">
            <Quote className="w-4 h-4 text-amber-400" />
            <span>HITELTELÍTETT ÜGYFÉLVÉLEMÉNYEK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-cinzel text-white uppercase tracking-tight">
            PÁTYI ÉS ORSZÁGOS TAPASZTALATOK
          </h2>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto">
            Valós visszajelzések olyan ügyfelektől, akik már megnyitották a Sötét Kaput és lezárták a metafizikai ügyeiket.
          </p>
        </div>

        {/* Testimonials Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-[#110a11] to-[#0a060a] border border-neutral-800 hover:border-red-900/80 rounded-xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-red-600/70 group-hover:text-red-500 transition-colors" />

                <blockquote className="text-sm sm:text-base font-cinzel italic text-neutral-200 leading-relaxed">
                  „{item.quote}”
                </blockquote>

                {item.reply && (
                  <div className="p-3 bg-red-950/40 border border-red-900/60 rounded text-xs font-mono text-amber-300 space-y-0.5">
                    <span className="text-[10px] text-red-400 block font-bold uppercase">Attila közvetlen válasza:</span>
                    <p className="font-cinzel font-bold text-sm">„{item.reply}”</p>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-4 border-t border-neutral-900/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-white font-bold block font-cinzel">{item.author}</span>
                  <span className="text-neutral-500 text-[11px]">{item.location} · {item.service}</span>
                </div>
                <span className="text-neutral-600 text-[10px]">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
