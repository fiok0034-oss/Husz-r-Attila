import React, { useEffect, useState, useRef } from 'react';
import { IMAGES } from '../utils/constants';

interface InteractiveOccultSceneProps {
  effectsEnabled: boolean;
  darknessLevel: number;
}

export const InteractiveOccultScene: React.FC<InteractiveOccultSceneProps> = ({
  effectsEnabled,
  darknessLevel,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth mouse tracking with requestAnimationFrame interpolation
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x: targetX, y: targetY });
    };

    const updateSmooth = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setSmoothPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateSmooth);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Interactive floating ash, dust, and smoke particles canvas
  useEffect(() => {
    if (!effectsEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animFrame: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ash and burning ember particles
    const particleCount = Math.min(85, Math.floor(width / 18));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.2 + 0.8,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.6 + 0.2,
      baseOpacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(215, 38, 38,' : Math.random() > 0.5 ? 'rgba(195, 140, 60,' : 'rgba(140, 140, 145,',
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse interactive wind offset
      const windX = mousePos.x * 1.5;
      const windY = mousePos.y * 0.8;

      particles.forEach((p) => {
        p.pulse += 0.04;
        p.y += p.speedY + windY * 0.2;
        p.x += p.speedX + windX * 0.5;

        // Reset if offscreen
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const dynamicOpacity = Math.max(0.1, p.baseOpacity + Math.sin(p.pulse) * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${dynamicOpacity})`;
        ctx.shadowBlur = p.size > 2 ? 10 : 4;
        ctx.shadowColor = '#dc2626';
        ctx.fill();
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [effectsEnabled, mousePos]);

  // 3D camera transforms
  const camRotateY = smoothPos.x * 4.5; // Turning camera left/right
  const camRotateX = smoothPos.y * -3.5; // Tilting camera up/down
  const camTranslateX = smoothPos.x * -35; // Panning camera
  const camTranslateY = smoothPos.y * -25;
  const runeTranslateX = smoothPos.x * 20;
  const runeTranslateY = smoothPos.y * 15;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Moving Camera Rig */}
      <div
        className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)] will-change-transform"
        style={{
          transform: effectsEnabled
            ? `rotateX(${camRotateX}deg) rotateY(${camRotateY}deg) translate3d(${camTranslateX}px, ${camTranslateY}px, 0px) scale(1.08)`
            : 'scale(1.02)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.08s ease-out',
        }}
      >
        {/* Master Photorealistic Underground Occult Horror Scene */}
        <img
          src={IMAGES.undergroundChamberBg}
          alt="Hatalmas földalatti okkult templom rituális körrel és démonikus szoborral"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-125 saturate-110 brightness-95"
        />

        {/* Dynamic Volumetric Blood-Red Lighting from the Ritual Floor Circle */}
        <div
          className="absolute inset-0 mix-blend-screen pointer-events-none transition-all duration-700"
          style={{
            background:
              'radial-gradient(ellipse 65% 45% at 50% 75%, rgba(185, 28, 28, 0.45) 0%, rgba(139, 0, 0, 0.25) 40%, transparent 75%)',
            transform: `translate3d(${runeTranslateX}px, ${runeTranslateY}px, 20px)`,
            opacity: 0.7 + (darknessLevel / 666) * 0.3,
          }}
        />

        {/* Demonic Altar & Horned Statue Halo in the Background */}
        <div
          className="absolute top-[18%] left-[50%] -translate-x-1/2 w-[420px] h-[320px] mix-blend-screen pointer-events-none animate-pulse"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.5) 0%, rgba(90, 10, 20, 0.25) 50%, transparent 80%)',
            filter: 'blur(30px)',
            transform: `translate3d(${camTranslateX * 0.4}px, ${camTranslateY * 0.3}px, -40px)`,
          }}
        />

        {/* Candle Flame Heat Glow Points (flickering warm amber & red light) */}
        <div
          className="absolute inset-0 mix-blend-screen pointer-events-none animate-candle"
          style={{
            background: `
              radial-gradient(circle at 18% 78%, rgba(245, 158, 11, 0.35) 0%, transparent 18%),
              radial-gradient(circle at 82% 76%, rgba(239, 68, 68, 0.38) 0%, transparent 20%),
              radial-gradient(circle at 35% 85%, rgba(220, 38, 38, 0.3) 0%, transparent 15%),
              radial-gradient(circle at 65% 88%, rgba(245, 158, 11, 0.3) 0%, transparent 16%)
            `,
          }}
        />

        {/* Volumetric Fog & Smoke Swirls reacting to cursor */}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-40 transition-transform duration-1000"
          style={{
            background:
              'radial-gradient(circle at 45% 60%, rgba(180, 160, 150, 0.35) 0%, rgba(80, 20, 30, 0.2) 45%, transparent 75%)',
            transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -30}px, 40px) scale(1.1)`,
            filter: 'blur(15px)',
          }}
        />
      </div>

      {/* Floating Ash, Embers, and Dust Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-75"
      />

      {/* Cinematic Vignette - deepens borders while keeping the central temple crystal clear */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(8, 2, 6, 0.45) 70%, rgba(5, 1, 4, 0.85) 100%)',
        }}
      />

      {/* 35mm Analog Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none z-30 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
