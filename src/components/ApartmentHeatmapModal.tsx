import React, { useState } from 'react';
import { Compass, X, AlertTriangle, CheckCircle2, Flame, Skull } from 'lucide-react';
import { IMAGES } from '../utils/constants';
import { occultAudio } from '../utils/audio';

interface ApartmentHeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApartmentHeatmapModal: React.FC<ApartmentHeatmapModalProps> = ({ isOpen, onClose }) => {
  const [selectedRoom, setSelectedRoom] = useState<string>('AZ_A_SZOBA_BOTTAL');
  const [cleansedRooms, setCleansedRooms] = useState<string[]>([]);
  const [lastNotification, setLastNotification] = useState<string>(
    'A radiátor mögött jelenleg 4 fiktív entitás tanyázik. A levegő páratartalma dög szagú. A tisztítást elrendeltük.'
  );

  if (!isOpen) return null;

  const rooms = [
    { id: 'KONYHA', name: 'KONYHA', risk: 65, desc: 'A hűtő és a spájz mögötti zóna. A lekvárok maguktól megsavanyodnak, a reggeli kávénak aludt vér íze van.', level: 'FERTŐZÖTT' },
    { id: 'NAPPALI', name: 'NAPPALI', risk: 48, desc: 'A parketta alatt ritmikus körmök kaparásznak. A televízió kikapcsolt állapotban is hideget sugároz.', level: 'BALJÓS' },
    { id: 'HALO', name: 'HÁLÓ', risk: 82, desc: 'A ruhásszekrény alsó fiókjából áporodott kénkőszag árad. A tükörkép 0.5 másodpercig még téged bámul.', level: 'KRITIKUS' },
    { id: 'FURDO', name: 'FÜRDŐ', risk: 78, desc: 'A lefolyóból idegen nyelvű suttogás hallatszik. A bojler kizárólag éjfélkor kezd hevesen rázkódni.', level: 'VESZÉLYES' },
    { id: 'PADLAS', name: 'PADLÁS', risk: 91, desc: 'Nehéz katonai bakancsok léptei a fejed felett a plafonon. Nincs feljáró, mégis ott járnak.', level: 'SZELLEMJÁRÁS' },
    { id: 'PINCE', name: 'PINCE', risk: 95, desc: 'Fekete szurok és nedves temetői föld szaga. A lezárt ajtó mögött valami lassú, nehézkes légzést folytat.', level: 'POKOL-KAPU' },
    { id: 'AZ_A_SZOBA_BOTTAL', name: '„AZ A SZOBA, AHOVA CSAK BOTTAL NYÚLSZ BE”', risk: 99, desc: 'A levegő nehéz és fojtogató. A radiátor mögött 4 fiktív entitás tanyázik. A páratartalom dög szagú.', level: 'EXTRÉM ENTITÁS-TELEP' },
  ];

  const currentRoom = rooms.find((r) => r.id === selectedRoom) || rooms[6];

  const handleRoomClick = (id: string) => {
    setSelectedRoom(id);
    setLastNotification(
      'A radiátor mögött jelenleg 4 fiktív entitás tanyázik. A levegő páratartalma dög szagú. A tisztítást elrendeltük.'
    );
    occultAudio.playGlitchSound();
  };

  const handleCleanse = (id: string) => {
    if (!cleansedRooms.includes(id)) {
      setCleansedRooms((prev) => [...prev, id]);
      setLastNotification(`A(z) ${currentRoom.name} helyiségben az entitás-telepet füstöléssel és szénporral felszámoltuk. Iktatva.`);
      occultAudio.playRitualGong();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative bg-[#0c060d] border-2 border-red-900/80 rounded-xl max-w-4xl w-full p-6 sm:p-8 shadow-[0_0_60px_rgba(220,38,38,0.4)] text-left space-y-6 max-h-[92vh] overflow-y-auto font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900/60 transition-colors"
          aria-label="Ablak bezárása"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 border-b border-red-950/80 pb-4">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs tracking-widest uppercase">
            <Compass className="w-4 h-4 text-red-500" />
            <span>INTERAKTÍV LAKÁS ALAPRAJZ ÉS ENTITÁS-HŐTÉRKÉP</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white uppercase">
            PÁTYI HATÓSÁGI HELYISÉG-DIAGNOSZTIKA
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            Válassz helyiséget a spektrális fertőzöttség felméréséhez és a radiátor mögötti gócok kilakoltatásához.
          </p>
        </div>

        {/* Groteszk Notification Alert */}
        <div className="p-3.5 bg-red-950/70 border border-red-600 rounded-lg flex items-start gap-3 text-xs font-mono text-amber-200 animate-pulse">
          <Skull className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-red-300 block uppercase">HATÓSÁGI OKKULT JELZÉS:</span>
            <span>{lastNotification}</span>
          </div>
        </div>

        {/* Main Grid: Room Selector & Thermal Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Room Selector Column */}
          <div className="lg:col-span-5 space-y-2 font-mono text-xs">
            <span className="text-neutral-500 uppercase block mb-1 text-[11px]">
              Kijelölt szobák listája:
            </span>
            <div className="space-y-1.5">
              {rooms.map((room) => {
                const isClean = cleansedRooms.includes(room.id);
                return (
                  <button
                    key={room.id}
                    onClick={() => handleRoomClick(room.id)}
                    className={`w-full p-2.5 rounded border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedRoom === room.id
                        ? 'bg-red-950 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                        : 'bg-[#120810] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="font-semibold text-xs">{room.name}</span>
                    <span className="text-[10px]">
                      {isClean ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> TISZTÍTVA
                        </span>
                      ) : (
                        <span
                          className={
                            room.risk > 80
                              ? 'text-red-400 font-bold'
                              : room.risk > 50
                              ? 'text-amber-400'
                              : 'text-neutral-400'
                          }
                        >
                          {room.risk}% TERHELÉS
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blueprint & Analysis Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Heatmap Visual Display */}
            <div className="relative rounded-lg overflow-hidden border-2 border-red-900/80 bg-black aspect-video flex items-center justify-center shadow-inner">
              <img
                src={IMAGES.hauntedApartmentMap}
                alt="Lakás spektrális hőtérkép"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-70"
              />

              {/* Pulsing Hotspot Anomaly */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4 font-mono">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-red-950/90 border border-red-600 rounded text-red-300 text-xs w-fit mb-2 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>SZKENNER FÓKUSZ: {currentRoom.name}</span>
                </div>
                <div className="text-xs text-neutral-200">
                  Spektrális terhelés: <span className="text-amber-400 font-bold">{currentRoom.risk}%</span> | Állapot: <span className="text-red-400 font-bold">{currentRoom.level}</span>
                </div>
              </div>
            </div>

            {/* Room Diagnostics Details */}
            <div className="bg-[#130711] border border-red-950 rounded-lg p-4 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">AKTÍV HELYISÉG:</span>
                <span className="text-amber-400 font-bold font-cinzel text-sm">{currentRoom.name}</span>
              </div>
              <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                {currentRoom.desc}
              </p>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  {cleansedRooms.includes(currentRoom.id)
                    ? 'A helyiség mentesítése iktatva.'
                    : 'Azonnali hamuvonal húzása javasolt.'}
                </span>

                <button
                  onClick={() => handleCleanse(currentRoom.id)}
                  disabled={cleansedRooms.includes(currentRoom.id)}
                  className="py-2.5 px-4 bg-red-950 hover:bg-red-900 disabled:bg-neutral-900 disabled:text-neutral-600 text-white font-cinzel font-bold text-xs rounded border border-red-700 transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {cleansedRooms.includes(currentRoom.id) ? 'MEGTISZTÍTVA' : 'RITUÁLIS TISZTÍTÁS'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
