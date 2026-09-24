import React, { useState } from 'react';
import { X, Check, Stamp, AlertCircle, Calendar, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { BureaucraticCase, ServiceItem } from '../types';
import { SERVICES } from '../utils/constants';
import { occultAudio } from '../utils/audio';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: ServiceItem | null;
  onOrderSuccess: (newCase: BureaucraticCase) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedService,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [serviceId, setServiceId] = useState<string>(selectedService?.id || SERVICES[0].id);
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('Páty és környéke');
  const [timing, setTiming] = useState('LEGKÖZELEBBI ÉJFÉL');
  const [description, setDescription] = useState('');
  const [darknessLevel, setDarknessLevel] = useState(450);
  const [generatedCase, setGeneratedCase] = useState<BureaucraticCase | null>(null);

  if (!isOpen) return null;

  const currentService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  const handleNext = () => {
    occultAudio.playSealStamp();
    setStep((prev) => (Math.min(6, prev + 1) as 1 | 2 | 3 | 4 | 5 | 6));
  };

  const handleBack = () => {
    setStep((prev) => (Math.max(1, prev - 1) as 1 | 2 | 3 | 4 | 5 | 6));
  };

  const handleDemoSubmit = () => {
    occultAudio.playRitualGong();
    const caseId = `HA-${Math.floor(100 + Math.random() * 899)}-2026`;
    const newCase: BureaucraticCase = {
      caseId,
      clientName: clientName || 'Névtelen Pátyi Ügyfél',
      serviceTitle: currentService.title,
      submissionDate: new Date().toLocaleDateString('hu-HU') + ' ' + new Date().toLocaleTimeString('hu-HU').slice(0, 5),
      darknessLevel,
      status: 'RITUAL_FOLYAMATBAN',
      statusText: 'BEFOGADVA / INTÉZÉS ALATT',
      progressPercent: 25,
      investigationStatus: 'FOLYAMATBAN',
      protectionStatus: 'VÁRAKOZIK',
      darknessCompatibility: 'OPTIMÁLIS',
      attilaNotified: true,
      notes: [
        `Ügyfél bejelentése: ${description || 'Általános okkult kivizsgálási igény.'}`,
        'Ügyazonosító sikeresen lepecsételve a pátyi törzskönyvben.',
        'Sötétségi szint kalibrálva.',
        'Attila értesítve: IGEN.'
      ],
      location: location || 'Páty',
    };

    setGeneratedCase(newCase);
    setStep(6);
    onOrderSuccess(newCase);
  };

  const handleFinish = () => {
    setStep(1);
    setGeneratedCase(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative bg-[#0d070e] border border-red-900/80 rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(220,38,38,0.3)] text-left space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900/80 transition-colors"
          aria-label="Ablak bezárása"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-neutral-800 pb-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-wider">
            <Stamp className="w-4 h-4 text-amber-400" />
            <span>PÁTYI OKKULT ÜGYINTÉZÉSI ÉS RENDELÉSI MODUL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
            {step === 6 ? 'Rituálé Sikeresen Rögzítve' : `Szertartás Igénylés (${step}/5)`}
          </h3>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-4 font-mono text-xs">
            <span className="text-neutral-400 block uppercase">1. VÁLASSZON SZOLGÁLTATÁST:</span>
            <div className="space-y-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setServiceId(s.id)}
                  className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    serviceId === s.id
                      ? 'bg-red-950 border-red-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold font-cinzel text-sm block">{s.title}</span>
                    <span className="text-[11px] text-neutral-400 font-sans italic">„{s.subtitle}”</span>
                  </div>
                  <span className="text-amber-400 font-bold font-cinzel text-sm ml-2">{s.formattedPrice}</span>
                </button>
              ))}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="py-2.5 px-6 bg-red-900 hover:bg-red-800 text-white font-cinzel font-bold text-xs rounded border border-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>TOVÁBB AZ IDŐPONTRA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Timing & Location */}
        {step === 2 && (
          <div className="space-y-4 font-mono text-xs">
            <span className="text-neutral-400 block uppercase">2. VÁLASSZON IDŐPONTOT ÉS HELYSZÍNT:</span>
            
            <div className="space-y-3">
              <div>
                <label className="text-neutral-400 block mb-1">IDŐPONT:</label>
                <select
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 text-sm focus:border-red-500 outline-none"
                >
                  <option value="LEGKÖZELEBBI ÉJFÉL">Legközelebbi Éjfél (00:00)</option>
                  <option value="ÚJHOLDAS SÖTÉTSÉG">Újholdas Éjszaka</option>
                  <option value="PÉNTEK 13">Péntek 13. vagy Baljós Kedd</option>
                  <option value="SÜRGŐS PÁTYI TRIAGE">Sürgős pátyi kiszállás (24 órán belül)</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">HELYSZÍN / TELEPÜLÉS:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Pl. Páty, Biatorbágy, Budapest..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 text-sm focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={handleBack}
                className="py-2 px-4 bg-neutral-900 text-neutral-300 rounded border border-neutral-700 text-xs cursor-pointer"
              >
                Vissza
              </button>
              <button
                onClick={handleNext}
                className="py-2.5 px-6 bg-red-900 hover:bg-red-800 text-white font-cinzel font-bold text-xs rounded border border-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>TOVÁBB A PANASZRA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: "Mi a helyzet?" */}
        {step === 3 && (
          <div className="space-y-4 font-mono text-xs">
            <span className="text-neutral-400 block uppercase">3. „MI A HELYZET?” – PANASZLEÍRÁS:</span>

            <div className="space-y-3">
              <div>
                <label className="text-neutral-400 block mb-1">AZ ÖN NEVE / JELIGÉJE:</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Pl. Kovács B. (vagy Névtelen)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 text-sm focus:border-red-500 outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">ÍRJA LE RÉSZLETESEN A PARANORMÁLIS PANASZT:</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Pl. A szomszéd furcsán néz rám a kerítésen át, és a spájzban éjfélkor hideg van..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-neutral-200 text-sm focus:border-red-500 outline-none font-sans"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={handleBack}
                className="py-2 px-4 bg-neutral-900 text-neutral-300 rounded border border-neutral-700 text-xs cursor-pointer"
              >
                Vissza
              </button>
              <button
                onClick={handleNext}
                className="py-2.5 px-6 bg-red-900 hover:bg-red-800 text-white font-cinzel font-bold text-xs rounded border border-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>TOVÁBB A SÖTÉTSÉG SZINTRE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Darkness Level */}
        {step === 4 && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center text-neutral-400 uppercase">
              <span>4. SÖTÉTSÉGI SZINT KALIBRÁCIÓ:</span>
              <span className="text-red-400 font-bold text-sm">{darknessLevel} / 666</span>
            </div>

            <input
              type="range"
              min="1"
              max="666"
              value={darknessLevel}
              onChange={(e) => setDarknessLevel(Number(e.target.value))}
              className="w-full accent-red-600 h-2 bg-neutral-900 rounded-lg cursor-pointer"
            />

            <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-neutral-300 text-xs">
              <span className="text-amber-400 font-semibold block mb-1">Rendszer megjegyzés:</span>
              {darknessLevel < 200
                ? 'Enyhe terheltség. Valószínűleg elég lesz 1 db gyertya és egy halk kántálás.'
                : darknessLevel < 500
                ? 'Komoly energetikai konfliktus. Pátyi archívumi beavatkozás javasolt.'
                : '666-os csúcsérték! Attila teljes védőöltözetben fogja végezni a rituálét.'}
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={handleBack}
                className="py-2 px-4 bg-neutral-900 text-neutral-300 rounded border border-neutral-700 text-xs cursor-pointer"
              >
                Vissza
              </button>
              <button
                onClick={handleNext}
                className="py-2.5 px-6 bg-red-900 hover:bg-red-800 text-white font-cinzel font-bold text-xs rounded border border-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>TOVÁBB AZ ÖSSZEGZÉSRE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Summary & Demo Payment */}
        {step === 5 && (
          <div className="space-y-5 font-mono text-xs">
            <span className="text-neutral-400 block uppercase">5. MEGRENDELÉS ÉS FIZETÉSI MODUL:</span>

            {/* Dossier Overview */}
            <div className="bg-black p-4 rounded-lg border border-red-900/60 space-y-2">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Szolgáltatás:</span>
                <span className="text-white font-bold font-cinzel">{currentService.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Ügyfél:</span>
                <span className="text-neutral-200">{clientName || 'Névtelen'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Időpont:</span>
                <span className="text-neutral-200">{timing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Sötétségi fok:</span>
                <span className="text-red-400 font-bold">{darknessLevel} / 666</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm">
                <span className="text-neutral-300 font-bold">ÖSSZESEN FIZETENDŐ:</span>
                <span className="text-amber-400 font-extrabold font-cinzel text-base">{currentService.formattedPrice}</span>
              </div>
            </div>

            {/* Official Demo Payment Notice */}
            <div className="p-4 bg-[#180d12] border border-amber-900/50 rounded-lg text-center space-y-2">
              <div className="text-amber-400 font-bold font-cinzel text-sm">
                FIZETÉSI MODUL
              </div>
              <p className="text-xs text-neutral-300 font-sans italic">
                „A démonok jelenleg készpénzt fogadnak.”
              </p>
              <p className="text-[11px] text-neutral-500 font-sans">
                A gomb megnyomásával a rendszer létrehozza a digitális törzslapot és azonnal elindítja a túlvilági ügyintézést.
              </p>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={handleBack}
                className="py-2 px-4 bg-neutral-900 text-neutral-300 rounded border border-neutral-700 text-xs cursor-pointer"
              >
                Vissza
              </button>
              <button
                onClick={handleDemoSubmit}
                className="py-3 px-8 bg-gradient-to-r from-red-900 via-red-800 to-red-950 hover:from-red-800 hover:to-red-700 text-white font-cinzel font-bold text-xs sm:text-sm rounded border border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Stamp className="w-4 h-4 text-amber-300" />
                [ DEMÓ MEGRENDELÉS ]
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Success Confirmation */}
        {step === 6 && generatedCase && (
          <div className="space-y-6 font-mono text-center py-2 animate-occult-pulse">
            <div className="w-16 h-16 rounded-full bg-red-950 border-2 border-red-500 flex items-center justify-center mx-auto text-red-400">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs text-amber-500 font-bold tracking-widest uppercase block">
                SÖTÉT ÜGYAZONOSÍTÓ GENERÁLVA
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white">
                {generatedCase.caseId}
              </h4>
              <p className="text-xs text-neutral-300 font-sans max-w-md mx-auto">
                Ügyét rögzítettük a pátyi szervereken. Az állapot a Sötét Ügyfélkapuban azonnal követhető.
              </p>
            </div>

            <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-xs text-neutral-400 text-left space-y-1">
              <div>Ügyfél: <span className="text-white font-semibold">{generatedCase.clientName}</span></div>
              <div>Szolgáltatás: <span className="text-amber-400 font-semibold">{generatedCase.serviceTitle}</span></div>
              <div>Attila értesítve: <span className="text-emerald-400 font-semibold">IGEN</span></div>
            </div>

            <button
              onClick={handleFinish}
              className="py-3 px-8 bg-red-950 hover:bg-red-900 text-white font-cinzel font-bold text-xs rounded border border-red-600 transition-colors cursor-pointer"
            >
              ÜGYFÉLKAPU MEGTEKINTÉSE ÉS BEZÁRÁS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
