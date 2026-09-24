import React, { useState } from 'react';
import {
  Skull,
  Flame,
  ShieldAlert,
  Shield,
  Compass,
  HelpCircle,
  Zap,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ServiceItem } from '../types';
import { CurseRemovalSimulator } from './CurseRemovalSimulator';
import { CurseInflictSimulator } from './CurseInflictSimulator';
import { CurseTypeSelector } from './CurseTypeSelector';
import { occultAudio } from '../utils/audio';

interface ServiceCardProps {
  service: ServiceItem;
  onOrder: (service: ServiceItem) => void;
  onOpenSealModal: () => void;
  onOpenHeatmapModal: () => void;
  onOpenDiagnosticModal: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onOrder,
  onOpenSealModal,
  onOpenHeatmapModal,
  onOpenDiagnosticModal,
}) => {
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Skull': return <Skull className="w-5 h-5 text-red-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-violet-400" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-amber-300" />;
      case 'Zap': return <Zap className="w-5 h-5 text-red-500" />;
      default: return <Skull className="w-5 h-5 text-red-500" />;
    }
  };

  const handleButtonClick = () => {
    occultAudio.playRitualGong();

    if (service.id === 'vedelem-rontas-ellen') {
      onOpenSealModal();
    } else if (service.id === 'negativ-energia-tisztitas') {
      onOpenHeatmapModal();
    } else if (service.id === 'mi-a-franc') {
      onOpenDiagnosticModal();
    } else {
      onOrder(service);
    }
  };

  return (
    <div
      className={`relative rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 backdrop-blur-sm ${
        service.popular || service.badge
          ? 'bg-gradient-to-b from-red-950/60 via-black/70 to-black/80 border-red-700/80 shadow-[0_0_35px_rgba(220,38,38,0.3)] ring-1 ring-red-600/40'
          : 'bg-black/60 border-red-950/80 hover:border-red-700/80 shadow-xl'
      }`}
    >
      {/* Top badges or notice */}
      {service.badge && (
        <div className="absolute -top-3 right-6 px-3 py-1 bg-red-900 border border-red-500 text-white font-mono text-[10px] font-bold tracking-widest rounded-full uppercase shadow-lg">
          {service.badge}
        </div>
      )}

      <div className="space-y-4 text-left">
        {/* Header Icon + Price */}
        <div className="flex items-start justify-between gap-3">
          <div className="p-3 bg-black/60 rounded-lg border border-neutral-800/80 inline-flex items-center justify-center">
            {getIcon(service.iconName)}
          </div>
          <div className="text-right">
            <span className="text-xs text-neutral-500 font-mono block">SZERTARTÁSI DÍJ</span>
            <span className="text-xl sm:text-2xl font-extrabold font-cinzel text-amber-400">
              {service.formattedPrice}
            </span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold font-cinzel text-white leading-snug">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm font-cinzel italic text-neutral-300">
            „{service.subtitle}”
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          {service.description}
        </p>

        {/* Features List */}
        <div className="pt-2 border-t border-neutral-900 space-y-1.5 font-sans text-xs">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
            SZOLGÁLTATÁS TARTALMA:
          </span>
          {service.features.slice(0, 5).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-neutral-300">
              <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Interactive Expandable In-Card Simulation for specific services */}
        {service.id === 'rontas-levetele' && (
          <div className="pt-2">
            <button
              onClick={() => setShowInteractiveDemo(!showInteractiveDemo)}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 underline cursor-pointer mb-2 inline-flex items-center gap-1"
            >
              {showInteractiveDemo ? 'Szimulátor elrejtése' : '⚡ Negatív energia mérő tesztelése'}
            </button>
            {showInteractiveDemo && <CurseRemovalSimulator />}
          </div>
        )}

        {service.id === 'rontas-ratetele' && (
          <div className="pt-2">
            <button
              onClick={() => setShowInteractiveDemo(!showInteractiveDemo)}
              className="text-xs font-mono text-red-400 hover:text-red-300 underline cursor-pointer mb-2 inline-flex items-center gap-1"
            >
              {showInteractiveDemo ? 'Rituálé elrejtése' : '💀 Szimbolikus rontás-lépések megtekintése'}
            </button>
            {showInteractiveDemo && <CurseInflictSimulator />}
          </div>
        )}

        {service.id === 'atok-levetele' && (
          <div className="pt-2">
            <button
              onClick={() => setShowInteractiveDemo(!showInteractiveDemo)}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 underline cursor-pointer mb-2 inline-flex items-center gap-1"
            >
              {showInteractiveDemo ? 'Kategóriák bezárása' : '🩸 Átok-kategória választó tesztelése'}
            </button>
            {showInteractiveDemo && <CurseTypeSelector />}
          </div>
        )}
      </div>

      {/* Main Action Button */}
      <div className="pt-6 mt-4 border-t border-neutral-900/80 flex flex-col gap-2">
        <button
          onClick={handleButtonClick}
          className={`w-full py-3 px-4 font-cinzel font-bold text-xs sm:text-sm rounded transition-all cursor-pointer flex items-center justify-center gap-2 ${
            service.popular || service.badge
              ? 'bg-gradient-to-r from-red-900 via-red-800 to-red-900 hover:from-red-800 hover:to-red-700 text-white border border-red-500/60 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
              : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-amber-500/50'
          }`}
        >
          <span>{service.buttonText}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
          <span>Pátyi helyszín / Távszertartás</span>
          <span>Hivatalos jegyzőkönyvvel</span>
        </div>
      </div>
    </div>
  );
};
