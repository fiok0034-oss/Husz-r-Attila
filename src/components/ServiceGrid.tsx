import React from 'react';
import { Sparkles, Flame, ShieldAlert } from 'lucide-react';
import { SERVICES } from '../utils/constants';
import { ServiceCard } from './ServiceCard';
import { ServiceItem } from '../types';

interface ServiceGridProps {
  onOrder: (service: ServiceItem) => void;
  onOpenSealModal: () => void;
  onOpenHeatmapModal: () => void;
  onOpenDiagnosticModal: () => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  onOrder,
  onOpenSealModal,
  onOpenHeatmapModal,
  onOpenDiagnosticModal,
}) => {
  return (
    <section id="szolgaltatasok" className="py-20 bg-black/35 backdrop-blur-[2px] border-t border-red-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-red-400 uppercase">
            <Flame className="w-4 h-4 text-red-500 animate-candle" />
            <span>HIVATALOS PÁTYI DÉMONOLÓGIAI KATALÓGUS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-cinzel text-white uppercase tracking-tight">
            OKKULT SZOLGÁLTATÁSOK
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-2xl mx-auto">
            Minden rituálé hivatalos nyilvántartási számmal, lepecsételt digitális jegyzőkönyvvel és Attila személyes figyelmével párosul.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOrder={onOrder}
              onOpenSealModal={onOpenSealModal}
              onOpenHeatmapModal={onOpenHeatmapModal}
              onOpenDiagnosticModal={onOpenDiagnosticModal}
            />
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 p-5 bg-black/60 backdrop-blur-md border border-amber-900/50 rounded-xl text-center font-mono text-xs text-neutral-300 max-w-2xl mx-auto space-y-1 shadow-2xl">
          <span className="text-amber-400 font-semibold uppercase block">
            ⚖ Hivatalos Túlvilági Garancia
          </span>
          <p className="font-sans text-xs">
            Amennyiben a szertartást követő 72 órán belül nem észlel javulást, Attila újabb gyertyát gyújt és 30 másodpercig csendben néz a távolba.
          </p>
        </div>
      </div>
    </section>
  );
};
