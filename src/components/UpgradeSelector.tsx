import React, { useState } from 'react';
import { UPGRADE_PRESETS } from '../data/cocData';
import { UpgradePreset, VillageType } from '../types/coc';
import { formatDuration } from '../utils/cocCalculations';
import {
  Castle,
  ShieldAlert,
  Zap,
  Target,
  Flame,
  Crosshair,
  Crown,
  Sparkles,
  FlaskConical,
  Hammer,
  Clock,
  Wrench,
  Gem,
  Sliders,
  CheckCircle2,
  Home,
} from 'lucide-react';

interface UpgradeSelectorProps {
  selectedPreset: UpgradePreset | null;
  customDurationSeconds: number;
  isCustom: boolean;
  onSelectPreset: (preset: UpgradePreset) => void;
  onCustomChange: (seconds: number) => void;
  currentVillage: VillageType;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Castle,
  ShieldAlert,
  Zap,
  Target,
  Flame,
  Crosshair,
  Crown,
  Sparkles,
  FlaskConical,
  Hammer,
  Clock,
  Wrench,
  Gem,
  Home,
};

export const UpgradeSelector: React.FC<UpgradeSelectorProps> = ({
  selectedPreset,
  customDurationSeconds,
  isCustom,
  onSelectPreset,
  onCustomChange,
  currentVillage,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Custom time fields
  const customDays = Math.floor(customDurationSeconds / 86400);
  const customHours = Math.floor((customDurationSeconds % 86400) / 3600);
  const customMinutes = Math.floor((customDurationSeconds % 3600) / 60);

  const handleCustomFieldChange = (days: number, hours: number, minutes: number) => {
    const total = Math.max(60, days * 86400 + hours * 3600 + minutes * 60);
    onCustomChange(total);
  };

  const filteredPresets = UPGRADE_PRESETS.filter((p) => {
    const matchesVillage = p.village === currentVillage;
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesVillage && matchesCategory;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            1. Selecciona la Mejora a Simular
          </h2>
          <p className="text-xs text-slate-400">
            Escoge una mejora oficial de Clash of Clans o define un tiempo personalizado.
          </p>
        </div>

        {/* Tab between Presets & Custom */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => {
              if (isCustom && UPGRADE_PRESETS.length > 0) {
                const first = UPGRADE_PRESETS.find((p) => p.village === currentVillage) || UPGRADE_PRESETS[0];
                onSelectPreset(first);
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              !isCustom
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Preajustes del Juego
          </button>
          <button
            onClick={() => onCustomChange(customDurationSeconds || 86400 * 7)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all ${
              isCustom
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tiempo Propio</span>
          </button>
        </div>
      </div>

      {!isCustom ? (
        <>
          {/* Category filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 text-xs scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos ({UPGRADE_PRESETS.filter((p) => p.village === currentVillage).length})
            </button>
            <button
              onClick={() => setActiveCategory('town_hall')}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'town_hall'
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Ayuntamientos
            </button>
            <button
              onClick={() => setActiveCategory('defense')}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'defense'
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Defensas
            </button>
            <button
              onClick={() => setActiveCategory('hero')}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'hero'
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Héroes
            </button>
            <button
              onClick={() => setActiveCategory('laboratory')}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'laboratory'
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              Laboratorio
            </button>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const isSelected = !isCustom && selectedPreset?.id === preset.id;
              const IconComp = ICON_MAP[preset.iconName] || Hammer;

              return (
                <div
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className={`group relative p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-950/60 to-slate-900 border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                      : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-amber-400 group-hover:bg-slate-700'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white truncate">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-500/30">
                          {formatDuration(preset.durationSeconds)}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                          Niv. {preset.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Custom time duration controls */
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-amber-300 font-semibold mb-3 flex items-center justify-between">
            <span>Configura el tiempo exacto que le falta a tu mejora:</span>
            <span className="font-mono text-white text-sm bg-slate-800 px-2 py-0.5 rounded">
              Total: {formatDuration(customDurationSeconds)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Days */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center">
              <label className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold mb-1">
                Días
              </label>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCustomFieldChange(Math.max(0, customDays - 1), customHours, customMinutes)}
                  className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-black text-sm"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={customDays}
                  onChange={(e) =>
                    handleCustomFieldChange(parseInt(e.target.value) || 0, customHours, customMinutes)
                  }
                  className="w-12 text-center bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold text-base rounded py-0.5"
                />
                <button
                  onClick={() => handleCustomFieldChange(customDays + 1, customHours, customMinutes)}
                  className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-black text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center">
              <label className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold mb-1">
                Horas
              </label>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCustomFieldChange(customDays, Math.max(0, customHours - 1), customMinutes)}
                  className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-black text-sm"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={customHours}
                  onChange={(e) =>
                    handleCustomFieldChange(customDays, parseInt(e.target.value) || 0, customMinutes)
                  }
                  className="w-12 text-center bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold text-base rounded py-0.5"
                />
                <button
                  onClick={() =>
                    handleCustomFieldChange(customDays, Math.min(23, customHours + 1), customMinutes)
                  }
                  className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-black text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center">
              <label className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold mb-1">
                Minutos
              </label>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCustomFieldChange(customDays, customHours, Math.max(0, customMinutes - 5))}
                  className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-black text-sm"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customMinutes}
                  onChange={(e) =>
                    handleCustomFieldChange(customDays, customHours, parseInt(e.target.value) || 0)
                  }
                  className="w-12 text-center bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold text-base rounded py-0.5"
                />
                <button
                  onClick={() =>
                    handleCustomFieldChange(customDays, customHours, Math.min(59, customMinutes + 5))
                  }
                  className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-black text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Atajos rápidos:</span>
            {[
              { label: '1 Día', sec: 86400 },
              { label: '3 Días', sec: 86400 * 3 },
              { label: '7 Días', sec: 86400 * 7 },
              { label: '14 Días', sec: 86400 * 14 },
            ].map((shortcut) => (
              <button
                key={shortcut.label}
                onClick={() => onCustomChange(shortcut.sec)}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 font-semibold"
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
