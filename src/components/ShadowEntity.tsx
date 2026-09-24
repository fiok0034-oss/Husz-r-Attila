import React, { useState, useEffect } from 'react';
import { occultAudio } from '../utils/audio';

interface ShadowEntityProps {
  effectsEnabled: boolean;
}

export const ShadowEntity: React.FC<ShadowEntityProps> = ({ effectsEnabled }) => {
  const [position, setPosition] = useState<{ top: string; left: string; corner: number }>({
    top: '85%',
    left: '92%',
    corner: 0,
  });
  const [isVanished, setIsVanished] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!effectsEnabled) return null;

  const corners = [
    { top: '82%', left: '88%' },
    { top: '20%', left: '4%' },
    { top: '75%', left: '5%' },
    { top: '15%', left: '92%' },
  ];

  const handleMouseEnter = () => {
    // Evade slightly
    setPosition((prev) => {
      const nextCorner = (prev.corner + 1) % corners.length;
      return { ...corners[nextCorner], corner: nextCorner };
    });
  };

  const handleClick = () => {
    occultAudio.playGlitchSound();
    setMessage('„Nem kellett volna.”');
    setIsVanished(true);

    setTimeout(() => {
      setMessage(null);
    }, 2500);

    // Reappear elsewhere in 12 seconds
    setTimeout(() => {
      const randCorner = Math.floor(Math.random() * corners.length);
      setPosition({ ...corners[randCorner], corner: randCorner });
      setIsVanished(false);
    }, 12000);
  };

  if (isVanished && !message) return null;

  return (
    <>
      {message && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black/95 border border-red-900 rounded font-cinzel text-red-400 text-sm italic shadow-2xl animate-fade-in pointer-events-none">
          {message}
        </div>
      )}

      {!isVanished && (
        <div
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          style={{ top: position.top, left: position.left }}
          aria-label="Ismeretlen jelenlét"
          className="fixed z-30 w-16 h-16 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-1000 opacity-25 hover:opacity-70 pointer-events-auto filter blur-md"
        >
          {/* Subtle dark blob with eerie red center */}
          <div className="w-full h-full rounded-full bg-gradient-to-r from-black via-neutral-900 to-red-950/40 animate-occult-pulse" />
        </div>
      )}
    </>
  );
};
