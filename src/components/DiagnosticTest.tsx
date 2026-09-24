import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, RotateCcw, AlertTriangle, Stamp, FileText, ArrowRight } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../utils/constants';
import { occultAudio } from '../utils/audio';

interface DiagnosticTestProps {
  onOrderMiAFranc?: () => void;
}

export const DiagnosticTest: React.FC<DiagnosticTestProps> = ({ onOrderMiAFranc }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (score: number) => {
    occultAudio.playGlitchSound();
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      occultAudio.playRitualGong();
    }
  };

  const calculateRiskIndex = () => {
    const total = answers.reduce((a, b) => a + b, 0);
    const max = DIAGNOSTIC_QUESTIONS.length * 35;
    return Math.min(99, Math.max(12, Math.round((total / max) * 100)));
  };

  const getVerdict = (risk: number) => {
    if (risk < 35) {
      return {
        title: 'ALACSONY DÉMONI ANOMÁLIA',
        desc: 'A rendszer szerint jelenleg nincs bizonyítható démoni aktivitás. De azért én nem aludnék ott.',
        advice: 'Egy alapos szellőztetés és a bojler vízkőtelenítése javasolt.',
      };
    } else if (risk < 70) {
      return {
        title: 'KÖZEPES PARANORMÁLIS TERHELTSÉG',
        desc: 'Valami határozottan nincs rendben. A szomszéd vagy egy kósza asztrális entitás jelen van.',
        advice: 'Személyes védelmi pecsét vagy rontáslevétel azonnal javasolt.',
      };
    } else {
      return {
        title: 'KRITIKUS DÉMONOLÓGIAI VÉSZHELYZET',
        desc: 'A spektrum azonnali beavatkozást igényel. Attila már érzi a rezgést Pátyon.',
        advice: 'Azonnali „Mi a franc történik velem?” vagy Teljes Sötétség protokoll elindítása!',
      };
    }
  };

  const resetTest = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const riskIndex = isCompleted ? calculateRiskIndex() : 0;
  const verdict = isCompleted ? getVerdict(riskIndex) : null;
  const currentQ = DIAGNOSTIC_QUESTIONS[currentStep];

  return (
    <section id="diagnosztika" className="py-20 bg-black/35 backdrop-blur-[2px] border-t border-red-950/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>INGYENES DÉMONOLÓGIAI GYORS-AUDIT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-white uppercase">
            DÉMONOLÓGIAI HELYZETFELMÉRÉS
          </h2>
          <p className="text-sm text-neutral-400 font-sans">
            Válaszoljon 5 hivatalos metafizikai kérdésre és a rendszer kiszámítja az Ön személyes paranormális kockázati indexét.
          </p>
        </div>

        {/* Questionnaire Box */}
        <div className="bg-black/90 border border-red-900/60 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left font-sans">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500 border-b border-neutral-900 pb-3">
                <span>KÉRDÉS {currentStep + 1} / {DIAGNOSTIC_QUESTIONS.length}</span>
                <span className="text-amber-500">PÁTYI SZABVÁNY V4.1</span>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-white leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.score)}
                    className="w-full p-4 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-red-600/80 hover:bg-red-950/40 text-left text-neutral-200 transition-all font-sans text-sm sm:text-base flex items-center justify-between group cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-red-400 transition-colors shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 font-mono text-left">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-red-500 text-xs font-bold font-cinzel">
                  <Stamp className="w-4 h-4 text-red-500" />
                  <span>HIVATALOS FELMÉRÉSI EREDMÉNY</span>
                </div>
                <span className="text-xs text-neutral-500">AZONOSÍTÓ: DIAG-{Date.now().toString().slice(-4)}</span>
              </div>

              {/* Risk Index Big Metric */}
              <div className="bg-[#140b10] border border-red-900/60 rounded-lg p-6 text-center space-y-2">
                <span className="text-xs text-neutral-400 uppercase tracking-widest block">
                  DÉMONOLÓGIAI KOCKÁZATI INDEX
                </span>
                <div className="text-4xl sm:text-6xl font-extrabold font-cinzel text-red-500 animate-occult-pulse">
                  {riskIndex}%
                </div>
                <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden max-w-md mx-auto">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-1000"
                    style={{ width: `${riskIndex}%` }}
                  />
                </div>
              </div>

              {/* Verdict Details */}
              <div className="space-y-3 bg-neutral-950 p-5 rounded-lg border border-neutral-800">
                <div className="text-base font-bold font-cinzel text-amber-400">
                  {verdict?.title}
                </div>
                <blockquote className="text-sm font-cinzel italic text-neutral-200 border-l-2 border-red-700 pl-3">
                  „{verdict?.desc}”
                </blockquote>
                <p className="text-xs text-neutral-400 font-sans pt-1">
                  <span className="text-red-400 font-semibold">Javasolt intézkedés:</span> {verdict?.advice}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={resetTest}
                  className="w-full sm:w-auto py-3 px-5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-cinzel text-xs rounded border border-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  TESZT ÚJRAKITÖLTÉSE
                </button>

                {onOrderMiAFranc && (
                  <button
                    onClick={onOrderMiAFranc}
                    className="w-full sm:w-auto flex-1 py-3 px-6 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-cinzel font-bold text-xs sm:text-sm rounded border border-red-600 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-300" />
                    „MI A FRANC TÖRTÉNIK VELEM?” CSOMAG KÉRÉSE (13 666 Ft)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
