import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  effectsEnabled: boolean;
  darknessLevel: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  effectsEnabled,
  darknessLevel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!effectsEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Embers & occult particles
    const particleCount = Math.min(80, Math.floor(width / 20));
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      fadeSpeed: number;
    }> = [];

    const colors = [
      'rgba(220, 38, 38, ',   // Blood Red
      'rgba(239, 68, 68, ',   // Crimson
      'rgba(197, 160, 89, ',  // Dirty Gold
      'rgba(147, 51, 234, ',  // Deep Occult Purple
      'rgba(120, 20, 20, ',   // Dark Dried Blood
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 0.8,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        fadeSpeed: (Math.random() * 0.007 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    let pentagramAngle = 0;

    const drawPentagram = (cx: number, cy: number, r: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = `rgba(220, 38, 38, ${opacity})`;
      ctx.lineWidth = 1;

      // Outer circle
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      // Pentagram star
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const theta = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle slow rotating satanic pentagrams in the backdrop
      pentagramAngle += 0.002;
      drawPentagram(width * 0.85, height * 0.25, Math.min(180, width * 0.18), pentagramAngle, 0.08);
      drawPentagram(width * 0.12, height * 0.75, Math.min(150, width * 0.15), -pentagramAngle * 0.8, 0.06);

      // Darkness overlay adjustment
      if (darknessLevel > 300) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.5, (darknessLevel - 300) / 750)})`;
        ctx.fillRect(0, 0, width, height);
      }

      // Render Embers & Occult Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.fadeSpeed;

        if (p.opacity <= 0.1 || p.opacity >= 0.85) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, p.opacity)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#dc2626';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectsEnabled, darknessLevel]);

  if (!effectsEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
