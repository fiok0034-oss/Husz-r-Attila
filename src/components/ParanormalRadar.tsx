import React, { useEffect, useRef, useState } from 'react';
import { Radio, RefreshCw, AlertCircle, Compass } from 'lucide-react';
import { occultAudio } from '../utils/audio';

export const ParanormalRadar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [radarStatus, setRadarStatus] = useState<string>('KERESÉS...');
  const [detectedCount, setDetectedCount] = useState<number>(0);
  const [statusDetail, setStatusDetail] = useState<string>('Pátyi spektrum szkennelése aktív.');

  const statusQuotes = [
    { title: 'KERESÉS...', detail: 'Pátyi spektrum szkennelése aktív.', count: 0 },
    { title: '1 JELENSÉG ÉSZLELVE.', detail: '...valószínűleg csak a hűtő kompresszora.', count: 1 },
    { title: 'ANOMÁLIA A FÜRDŐSZOBA FELŐL.', detail: 'Rezgési frekvencia: 432 Hz. Bojler gyanú.', count: 2 },
    { title: 'POLTERGEIST REZGÉS.', detail: 'A szomszéd fúrógépének spektrális tükröződése.', count: 1 },
    { title: 'TISZTA ENERGIAZÓNA.', detail: 'Jelenleg nincs kimutatható démoni entitás a szobádban.', count: 0 },
    { title: '3 GYERTYA-EKVIVALENS JEL.', detail: 'Ismeretlen okkult jelenlét a padlás irányából.', count: 3 },
  ];

  useEffect(() => {
    let quoteIndex = 0;
    const statusInterval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % statusQuotes.length;
      const cur = statusQuotes[quoteIndex];
      setRadarStatus(cur.title);
      setStatusDetail(cur.detail);
      setDetectedCount(cur.count);
      if (cur.count > 0) {
        occultAudio.playRadarPing();
      }
    }, 6000);

    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animationFrameId: number;
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;
    const radius = center - 15;

    // Simulated blips
    const blips = [
      { r: radius * 0.45, theta: 0.8, life: 1.0, active: true },
      { r: radius * 0.75, theta: 2.3, life: 0.8, active: true },
      { r: radius * 0.6, theta: 4.5, life: 0.5, active: true },
    ];

    const render = () => {
      // Clear with slight trailing opacity
      ctx.fillStyle = 'rgba(7, 7, 9, 0.2)';
      ctx.fillRect(0, 0, size, size);

      // Radar circles
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
      ctx.lineWidth = 1;

      for (let r = radius / 3; r <= radius; r += radius / 3) {
        ctx.beginPath();
        ctx.arc(center, center, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(center, 15);
      ctx.lineTo(center, size - 15);
      ctx.moveTo(15, center);
      ctx.lineTo(size - 15, center);
      ctx.stroke();

      // Sweeping beam
      angle += 0.035;
      if (angle >= Math.PI * 2) angle -= Math.PI * 2;

      ctx.beginPath();
      ctx.moveTo(center, center);
      const sweepX = center + Math.cos(angle) * radius;
      const sweepY = center + Math.sin(angle) * radius;
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Beam glow wedge
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0.3)');
      gradient.addColorStop(1, 'rgba(220, 38, 38, 0)');

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle - 0.4, angle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Blips
      blips.forEach((blip) => {
        const bx = center + Math.cos(blip.theta) * blip.r;
        const by = center + Math.sin(blip.theta) * blip.r;

        // Calculate proximity to sweep angle
        let diff = angle - blip.theta;
        while (diff < 0) diff += Math.PI * 2;
        while (diff >= Math.PI * 2) diff -= Math.PI * 2;

        if (diff < 0.2) {
          blip.life = 1.0;
        } else {
          blip.life = Math.max(0.05, blip.life - 0.008);
        }

        ctx.beginPath();
        ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, ${blip.life})`;
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="radar" className="py-16 bg-black/35 backdrop-blur-[2px] border-y border-red-950/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-red-400 uppercase">
            <Compass className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span>ÉLŐ SPEKTRUM SZKENNER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-white">
            PARANORMÁLIS RADAR
          </h2>
          <p className="text-sm text-neutral-400 font-sans">
            Folyamatos frekvenciavizsgálat Páty és a szomszédos települések metafizikai hullámhosszán.
          </p>
        </div>

        <div className="bg-black/80 border border-red-900/60 rounded-xl p-6 md:p-8 max-w-3xl mx-auto shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Radar Screen Canvas */}
          <div className="md:col-span-6 flex justify-center">
            <div className="relative p-2 bg-[#050508] border-2 border-red-900/80 rounded-full shadow-[0_0_25px_rgba(185,28,28,0.3)]">
              <canvas ref={canvasRef} className="rounded-full w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]" />
              <div className="absolute inset-0 rounded-full pointer-events-none border border-red-500/20" />
            </div>
          </div>

          {/* Radar Telemetry & Status Logs */}
          <div className="md:col-span-6 space-y-5 font-mono text-left">
            <div className="space-y-1">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
                RADAR ÁLLAPOT:
              </span>
              <div className="text-lg md:text-xl font-bold font-cinzel text-amber-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                {radarStatus}
              </div>
              <p className="text-xs text-neutral-300 font-sans italic pt-1">
                {statusDetail}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800 text-xs">
              <div className="bg-neutral-900/90 p-3 rounded border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">ÉSZLELT ENTITÁSOK</span>
                <span className="text-base font-bold text-red-400">{detectedCount} db</span>
              </div>
              <div className="bg-neutral-900/90 p-3 rounded border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">SZKENNER SUGÁR</span>
                <span className="text-base font-bold text-neutral-200">13.6 km</span>
              </div>
            </div>

            <div className="bg-red-950/30 border border-red-900/50 p-3 rounded text-[11px] text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 text-red-400 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span>PÁTYI DÉMONOLÓGIAI TANÁCS</span>
              </div>
              <p className="font-sans">
                Ha a radar 3-nál több blipet mutat a lakásod körül, azonnal ellenőrizd a bojlert és csukd be a spájzajtót.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
