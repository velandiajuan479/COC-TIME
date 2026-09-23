import React from 'react';
import { CLOCK_TOWER_LEVELS, CLOCK_TOWER_POTION_DURATION_MINUTES } from '../data/cocData';
import { formatDuration } from '../utils/cocCalculations';
import { Clock, Gem, Coins, Droplet, Calendar, Zap, AlertCircle } from 'lucide-react';

interface ClockTowerPanelProps {
  clockTowerLevel: number;
  onClockTowerLevelChange: (lvl: number) => void;
  useClockTowerPotion: boolean;
  onUseClockTowerPotionChange: (usePotion: boolean) => void;
  clockTowerPotionCount: number;
  onClockTowerPotionCountChange: (count: number) => void;
  dailyScheduled: boolean;
  onDailyScheduledChange: (daily: boolean) => void;
  gemMineLevel: number;
  onGemMineLevelChange: (lvl: number) => void;
  
  // Results
  singleBoostMinutes: number;
  singleBoostSavedSeconds: number;
  scheduledBoostsCount: number;
  totalTimeSavedSeconds: number;
  extraGems: number;
  extraGold: number;
  extraElixir: number;
}

export const ClockTowerPanel: React.FC<ClockTowerPanelProps> = ({
  clockTowerLevel,
  onClockTowerLevelChange,
  useClockTowerPotion,
  onUseClockTowerPotionChange,
  clockTowerPotionCount,
  onClockTowerPotionCountChange,
  dailyScheduled,
  onDailyScheduledChange,
  gemMineLevel,
  onGemMineLevelChange,
  singleBoostMinutes,
  singleBoostSavedSeconds,
  scheduledBoostsCount,
  totalTimeSavedSeconds,
  extraGems,
  extraGold,
  extraElixir,
}) => {
  const currentCtData = CLOCK_TOWER_LEVELS.find((l) => l.level === clockTowerLevel) || CLOCK_TOWER_LEVELS[9];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/40 border border-amber-300/40">
            <Clock className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
              Torre del Reloj (Base del Constructor)
              <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded">
                10x VELOCIDAD
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Acelera construcciones, investigaciones del Star Lab y producción de recursos/gemas.
            </p>
          </div>
        </div>

        {/* Boost Mode Selector: Free Daily vs Potion */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs shrink-0">
          <button
            onClick={() => onUseClockTowerPotionChange(false)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              !useClockTowerPotion
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Impulso Gratis (3-12m)
          </button>
          <button
            onClick={() => onUseClockTowerPotionChange(true)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all ${
              useClockTowerPotion
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Pócima Torre (30m)</span>
          </button>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Clock Tower Level Selector */}
        {!useClockTowerPotion ? (
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Nivel de la Torre del Reloj:
              </span>
              <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                Nivel {clockTowerLevel} ({currentCtData.durationMinutes} min impulso)
              </span>
            </div>

            {/* Level grid 1 to 10 */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 mb-3">
              {CLOCK_TOWER_LEVELS.map((lvl) => {
                const isSelected = clockTowerLevel === lvl.level;
                return (
                  <button
                    key={lvl.level}
                    onClick={() => onClockTowerLevelChange(lvl.level)}
                    className={`py-2 rounded-lg text-xs font-black transition-all border flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-500/30'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                    }`}
                  >
                    <span>L{lvl.level}</span>
                    <span className="text-[9px] opacity-75 font-mono">{lvl.durationMinutes}m</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span>Requiere: Taller Niv. {currentCtData.requiredBH}+</span>
              <span className="text-amber-400 font-semibold">
                Ahorra {currentCtData.timeSavedMinutes} min por activación
              </span>
            </div>
          </div>
        ) : (
          /* Clock Tower Potion controls */
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Pócimas de la Torre del Reloj (30 min c/u):
              </span>
              <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                {clockTowerPotionCount} pócimas (
                {formatDuration(clockTowerPotionCount * CLOCK_TOWER_POTION_DURATION_MINUTES * 60)} de efecto)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onClockTowerPotionCountChange(Math.max(1, clockTowerPotionCount - 1))}
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-black"
              >
                -
              </button>
              <input
                type="range"
                min="1"
                max="10"
                value={clockTowerPotionCount}
                onChange={(e) => onClockTowerPotionCountChange(parseInt(e.target.value) || 1)}
                className="flex-1 accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <button
                onClick={() => onClockTowerPotionCountChange(Math.min(10, clockTowerPotionCount + 1))}
                className="w-9 h-9 rounded-lg bg-amber-600 hover:bg-amber-500 border border-amber-400/40 text-white flex items-center justify-center font-black"
              >
                +
              </button>
            </div>

            <p className="text-[11px] text-amber-300/90 mt-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Cada pócima ahorra 4 horas y 30 minutos de tiempo real inmediatamente.
            </p>
          </div>
        )}

        {/* Right: Daily Schedule & Gem Mine Configuration */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
          {!useClockTowerPotion && (
            <div className="mb-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={dailyScheduled}
                  onChange={(e) => onDailyScheduledChange(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-500 bg-slate-900 border-slate-700 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Simular impulsos diarios acumulados (cada 22h)
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Calcula todos los impulsos diarios posibles durante la duración de la mejora.
                  </span>
                </div>
              </label>
            </div>
          )}

          {/* Gem Mine Level Selector */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Gem className="w-3.5 h-3.5 text-emerald-400" />
                Nivel Mina de Gemas:
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Niv. {gemMineLevel}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min="1"
                max="10"
                value={gemMineLevel}
                onChange={(e) => onGemMineLevelChange(parseInt(e.target.value) || 1)}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-0.5">
              <span>Niv 1</span>
              <span>Niv 5</span>
              <span>Niv 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clock Tower Impact Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
        {/* Metric 1: Impulsos aplicados */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
            Impulsos Aplicados
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-amber-400">
            {scheduledBoostsCount} {scheduledBoostsCount === 1 ? 'impulso' : 'impulsos'}
          </span>
          <span className="text-[10px] text-slate-500 block">
            {singleBoostMinutes} min c/u a 10x
          </span>
        </div>

        {/* Metric 2: Tiempo Ahorrado Total */}
        <div className="bg-gradient-to-br from-amber-950/40 to-slate-950 border border-amber-500/30 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block mb-0.5">
            Tiempo Ahorrado (Torre)
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-white">
            {formatDuration(totalTimeSavedSeconds)}
          </span>
          <span className="text-[10px] text-amber-400 block font-semibold">
            {Math.round(totalTimeSavedSeconds / 60)} min descontados
          </span>
        </div>

        {/* Metric 3: Extra Gem Mine Gems */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block mb-0.5 flex items-center justify-center gap-1">
            <Gem className="w-3 h-3 text-emerald-400" /> Gemas Extra
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-emerald-400">
            +{extraGems} gemas
          </span>
          <span className="text-[10px] text-emerald-400/80 block">
            Mina Niv. {gemMineLevel} al 10x
          </span>
        </div>

        {/* Metric 4: Extra Builder Gold & Elixir */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 flex items-center justify-center gap-1">
            <Coins className="w-3 h-3 text-amber-400" /> Oro / Elixir Extra
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-amber-300">
            +{extraGold.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 block">
            de cada recurso
          </span>
        </div>
      </div>
    </div>
  );
};
