import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { ThemeMode, PaletteMode } from '../types';

export interface PaletteColors {
  id: PaletteMode;
  name: string;
  koName: string;
  primary: string; // The vibrant Dancheong pigment
  lightBg: string;
  lightCard: string;
  lightText: string;
  darkBg: string;
  darkCard: string;
  darkText: string;
  lightAccent: string;
  darkAccent: string;
  gradientFrom: string;
  gradientTo: string;
}

export const PALETTES: PaletteColors[] = [
  {
    id: 'celedon',
    name: 'Mood Mint',
    koName: '풍경색 (Poongnyeong)',
    primary: '#2F6122', // Deep contrast forest
    lightBg: '#FFFFFF',
    lightCard: '#FFFFFF',
    lightText: '#000000',
    darkBg: '#0D130C',
    darkCard: '#182216',
    darkText: '#ECF5EA',
    lightAccent: '#E2F9DB', // Playful Mint highlight from screenshot
    darkAccent: '#D1FFC2', // Slightly brighter mint highlight
    gradientFrom: 'from-[#E2F9DB]/40',
    gradientTo: 'to-[#D1FFC2]/20',
  },
  {
    id: 'terracotta',
    name: 'Dusty Rose',
    koName: '단풍색 (Danpung)',
    primary: '#851E52', // Deep contrast orchid/rose
    lightBg: '#FFFFFF',
    lightCard: '#FFFFFF',
    lightText: '#000000',
    darkBg: '#160F12',
    darkCard: '#24191E',
    darkText: '#FBF2F6',
    lightAccent: '#FCE6F4', // Pastel Whimsical Pink from screenshot
    darkAccent: '#FCDCEC', // Brighter pastel pink
    gradientFrom: 'from-[#FCE6F4]/40',
    gradientTo: 'to-[#FCDCEC]/20',
  },
  {
    id: 'gold',
    name: 'Straw Golden',
    koName: '햇살색 (Haessal)',
    primary: '#735011', // Warm rich amber
    lightBg: '#FFFFFF',
    lightCard: '#FFFFFF',
    lightText: '#000000',
    darkBg: '#15110B',
    darkCard: '#241D13',
    darkText: '#FFFBF5',
    lightAccent: '#FFF8E5', // Whimsical warm honey yellow from screenshot
    darkAccent: '#FEDAA1', // Brighter straw highlight
    gradientFrom: 'from-[#FFF8E5]/50',
    gradientTo: 'to-[#FEDAA1]/20',
  },
  {
    id: 'charcoal',
    name: 'Placid Lavender',
    koName: '은하색 (Eunha)',
    primary: '#3F2296', // Rich deep violet
    lightBg: '#FFFFFF',
    lightCard: '#FFFFFF',
    lightText: '#000000',
    darkBg: '#0E0B16',
    darkCard: '#1B152A',
    darkText: '#F5F0FF',
    lightAccent: '#EDE4FF', // Playful lavender from screenshot
    darkAccent: '#DEC9FF', // Whimsical lilac highlight
    gradientFrom: 'from-[#EDE4FF]/40',
    gradientTo: 'to-[#DEC9FF]/20',
  }
];

interface ThemeSelectorProps {
  currentMode: ThemeMode;
  currentPalette: PaletteMode;
  onModeChange: (mode: ThemeMode) => void;
  onPaletteChange: (palette: PaletteMode) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentMode,
  currentPalette,
  onModeChange,
  onPaletteChange,
}) => {
  const activePalette = PALETTES.find((p) => p.id === currentPalette) || PALETTES[0];

  return (
    <div className="flex flex-col gap-6" id="theme-selector-container">
      {/* Light / Dark Toggle */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono tracking-wider uppercase opacity-50">Visual mode</span>
        </div>
        <div className="inline-flex rounded-xl p-1 border border-black/10 bg-black/[0.02]" id="contrast-toggle-wrap">
          <button
            id="theme-light-btn"
            onClick={() => onModeChange('light')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentMode === 'light'
                ? 'bg-black text-white shadow-xs'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Sun size={13} />
            <span>Light</span>
          </button>
          <button
            id="theme-dark-btn"
            onClick={() => onModeChange('dark')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentMode === 'dark'
                ? 'bg-black text-white shadow-xs'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Moon size={13} />
            <span>Dark</span>
          </button>
        </div>
      </div>

      {/* Palette Selectors */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-[10px] font-mono tracking-wider uppercase opacity-50">color picker</span>
        </div>
        <div className="flex flex-col gap-2" id="palette-modes-list">
          {PALETTES.map((p) => (
            <button
              id={`palette-btn-${p.id}`}
              key={p.id}
              onClick={() => onPaletteChange(p.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                currentPalette === p.id ? 'scale-[1.01]' : 'hover:border-black/30'
              }`}
              style={{
                backgroundColor: currentMode === 'dark' ? p.darkCard : '#FFFFFF',
                color: currentMode === 'dark' ? p.darkText : '#000000',
                borderColor: currentPalette === p.id ? p.primary : (currentMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'),
                borderWidth: currentPalette === p.id ? '2px' : '1px',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shadow-xs flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: p.primary }}
                />
                <div>
                  <div 
                    className="text-xs font-semibold leading-none"
                    style={{ color: currentMode === 'dark' ? '#FFFFFF' : '#000000' }}
                  >
                    {p.name}
                  </div>
                  <div 
                    className="text-[9px] font-mono mt-1"
                    style={{ color: currentMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)' }}
                  >
                    {p.koName}
                  </div>
                </div>
              </div>
              
              {/* Highlight background pill preview */}
              <div 
                className="px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wider font-mono"
                style={{ backgroundColor: currentMode === 'dark' ? p.darkAccent : p.lightAccent, color: '#000000' }}
              >
                Highlight
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
