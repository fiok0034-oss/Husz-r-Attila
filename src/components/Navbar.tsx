import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, EyeOff, AlertTriangle, Menu, X, HelpCircle } from 'lucide-react';
import { occultAudio } from '../utils/audio';

interface NavbarProps {
  onOpenEmergency: () => void;
  effectsEnabled: boolean;
  onToggleEffects: () => void;
  onSecretTrigger: () => void;
  secretClickCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEmergency,
  effectsEnabled,
  onToggleEffects,
  onSecretTrigger,
  secretClickCount,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [attilaStatus, setAttilaStatus] = useState<'ONLINE' | 'RITUAL' | 'OFFLINE'>('ONLINE');
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Status rotation: Attila online, ritual, offline
  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.6) setAttilaStatus('ONLINE');
      else if (rand < 0.85) setAttilaStatus('RITUAL');
      else setAttilaStatus('OFFLINE');
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    occultAudio.setEnabled(next);
  };

  const navLinks = [
    { label: 'Szolgáltatások', href: '#szolgaltatasok' },
    { label: 'Rituálék', href: '#ritualegenerator' },
    { label: 'Diagnosztika', href: '#diagnosztika' },
    { label: 'Radar', href: '#radar' },
    { label: 'Ügyfélkapu', href: '#ugyfelkapu' },
    { label: 'Vélemények', href: '#velemenyek' },
    { label: 'Rólam', href: '#rolam' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-red-950/60 shadow-xl'
          : 'bg-black/30 backdrop-blur-sm border-b border-red-950/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg md:text-xl font-bold tracking-wider text-[#e5e2db] font-cinzel hover:text-red-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            HUSZÁR ATTILA
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300 font-sans">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-300 transition-colors hover:underline underline-offset-8 decoration-red-600/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions and Status Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Attila Status Widget with Tooltip */}
            <div
              className="relative hidden sm:flex items-center"
              onMouseEnter={() => setShowStatusTooltip(true)}
              onMouseLeave={() => setShowStatusTooltip(false)}
            >
              <button
                type="button"
                onClick={() => setShowStatusTooltip(!showStatusTooltip)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-black/60 border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-neutral-700 transition-colors cursor-help"
                aria-label="Attila aktuális státusza"
              >
                {attilaStatus === 'ONLINE' && (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="hidden md:inline text-emerald-400 font-medium">ATTILA ONLINE</span>
                  </>
                )}
                {attilaStatus === 'RITUAL' && (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="hidden md:inline text-amber-400 font-medium">RITUÁLÉT VÉGEZ</span>
                  </>
                )}
                {attilaStatus === 'OFFLINE' && (
                  <>
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="hidden md:inline text-red-400 font-medium">NEM ELÉRHETŐ</span>
                  </>
                )}
              </button>

              {showStatusTooltip && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-[#12070a] border border-red-900/60 rounded shadow-2xl text-[11px] text-neutral-300 z-50 text-center font-sans">
                  <p className="font-semibold text-amber-300 mb-0.5">Pátyi Okkult Státusz</p>
                  <p>
                    {attilaStatus === 'ONLINE' && 'Készen áll a démoni anomáliák kivizsgálására.'}
                    {attilaStatus === 'RITUAL' && 'Valószínűleg gyertyát gyújt és kántál.'}
                    {attilaStatus === 'OFFLINE' && 'Épp rontásmentesít vagy alszik.'}
                  </p>
                </div>
              )}
            </div>

            {/* Darkness & Effects Toggle */}
            <button
              onClick={onToggleEffects}
              title={effectsEnabled ? 'Sötétségi effektusok kikapcsolása' : 'Sötétségi effektusok bekapcsolása'}
              aria-label="Sötétségi effektusok kapcsoló"
              className="p-2 rounded bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-amber-300 hover:border-neutral-700 transition-colors text-xs flex items-center gap-1.5"
            >
              {effectsEnabled ? <Eye className="w-4 h-4 text-amber-400" /> : <EyeOff className="w-4 h-4 text-neutral-500" />}
              <span className="hidden xl:inline text-[11px] font-mono">
                {effectsEnabled ? 'EFFEKTEK: BE' : 'EFFEKTEK: KI'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Sötét hangok kikapcsolása' : 'Sötét hangok bekapcsolása'}
              aria-label="Hangok kapcsoló"
              className="p-2 rounded bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-red-400 hover:border-neutral-700 transition-colors text-xs flex items-center gap-1.5"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-500 animate-pulse" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
              <span className="hidden xl:inline text-[11px] font-mono">
                {soundEnabled ? 'HANG: BE' : 'HANG: KI'}
              </span>
            </button>

            {/* Emergency CTA */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-cinzel font-bold text-xs md:text-sm rounded border border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all cursor-pointer whitespace-nowrap"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>DÉMONOM VAN</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Menü megnyitása"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070709]/98 border-b border-red-950/70 px-4 pt-3 pb-6 space-y-3 font-cinzel">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-200 hover:text-amber-400 border-b border-neutral-900 text-base"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Állapot: {attilaStatus === 'ONLINE' ? 'ONLINE' : 'RITUÁLÉT VÉGEZ'}</span>
            <button
              onClick={toggleSound}
              className="text-red-400 underline"
            >
              {soundEnabled ? '🔊 Hang kikapcsolása' : '🔇 Hang bekapcsolása'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
