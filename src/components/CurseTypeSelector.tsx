import React, { useState } from 'react';
import { ShieldAlert, Check } from 'lucide-react';
import { occultAudio } from '../utils/audio';

interface CurseTypeSelectorProps {
  onSelectType?: (type: string) => void;
}

export const CurseTypeSelector: React.FC<CurseTypeSelectorProps> = ({ onSelectType }) => {
  const [selectedType, setSelectedType] = useState<string>('MACSKA_SZISZEG');

  const types = [
    { id: 'SZEMELYES', label: 'SZEMÉLYES', desc: 'A te gerincedben lüktető, személyre szabott sötétség.' },
    { id: 'CSALADI_ROVAS', label: 'CSALÁDI ROVÁS', desc: 'Monarchia-korabeli dédnagyanyai karmikus adósság és rokonok átkai.' },
    { id: 'INGATLANTERHELES', label: 'INGATLANTERHELÉS', desc: 'Fekete szurok a mennyezeten, léptek a padláson és savanyodó lekvárok.' },
    { id: 'MACSKA_SZISZEG', label: '„NEM TUDOM, DE A MACSKA MÁR HARMADIK NAPJA A FALAT BÁMULJA ÉS SZISZEG”', desc: 'Univerzális metafizikai vészhelyzet.', note: 'Ez a leggyakoribb és legveszélyesebb pátyi eset.' },
  ];

  const handleSelect = (id: string) => {
    setSelectedType(id);
    occultAudio.playSealStamp();
    onSelectType?.(id);
  };

  const activeItem = types.find((t) => t.id === selectedType);

  return (
    <div className="bg-[#0b080d] border border-red-900/60 rounded-lg p-5 font-mono text-left space-y-4 shadow-xl">
      <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-cinzel border-b border-neutral-800 pb-2">
        <ShieldAlert className="w-4 h-4 text-red-500" />
        <span>VÁLASSZON ÁTOK-KATEGÓRIÁT (HATÁSKÖR)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {types.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(item.id)}
            className={`p-3 rounded border text-left transition-all cursor-pointer ${
              selectedType === item.id
                ? 'bg-red-950/90 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold font-cinzel">
              <span>{item.label}</span>
              {selectedType === item.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">{item.desc}</p>
          </button>
        ))}
      </div>

      {activeItem?.note && (
        <div className="p-3 bg-red-950/40 border border-red-900/60 rounded text-xs text-amber-300 font-cinzel font-semibold flex items-center justify-between animate-occult-pulse">
          <span className="text-red-400">Attila megjegyzése:</span>
          <span className="text-amber-200 italic">„{activeItem.note}”</span>
        </div>
      )}
    </div>
  );
};
