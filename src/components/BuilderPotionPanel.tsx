import React from 'react';
import { Sparkles, Users, Zap, ShieldCheck, Flame, Plus, Minus } from 'lucide-react';

interface BuilderPotionPanelProps {
  builderPotions: number;
  onBuilderPotionsChange: (count: number) => void;
  activeBuilders: number;
  onActiveBuildersChange: (count: number) => void;
  hoursSavedPerBuilder: number;
  totalVillageHoursSaved: number;
  gemCost: number;
  gemValueEquivalent: number;
  gemRoiMultiplier: number;
}

export const BuilderPotionPanel: React.FC<BuilderPotionPanelProps> = ({
  builderPotions,
  onBuilderPotionsChange,
  activeBuilders,
  onActiveBuildersChange,
  hoursSavedPerBuilder,
  totalVillageHoursSaved,
  gemCost,
  gemValueEquivalent,
  gemRoiMultiplier,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/40 border border-cyan-300/40">
            {/* Custom Potion Icon representation */}
            <div className="relative">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-200 animate-ping" />
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
              Pócimas del Constructor
              <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded">
                10x VELOCIDAD
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Acelera a todos los constructores 10 veces durante 1 hora (ahorra 9 horas por pócima).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Control 1: Number of Builder Potions */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Cantidad de Pócimas:
            </span>
            <span className="text-xs font-mono font-black text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              {builderPotions} {builderPotions === 1 ? 'poción' : 'pócimas'} ({builderPotions}h de efecto)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onBuilderPotionsChange(Math.max(0, builderPotions - 1))}
              disabled={builderPotions <= 0}
              className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center font-black transition-all active:scale-95"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="10"
                value={builderPotions}
                onChange={(e) => onBuilderPotionsChange(parseInt(e.target.value) || 0)}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10</span>
              </div>
            </div>

            <button
              onClick={() => onBuilderPotionsChange(Math.min(20, builderPotions + 1))}
              className="w-9 h-9 rounded-lg bg-cyan-600 hover:bg-cyan-500 border border-cyan-400/40 text-white flex items-center justify-center font-black transition-all active:scale-95 shadow-md shadow-cyan-950"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800/60">
            <span className="text-[10px] text-slate-400">Rápido:</span>
            {[0, 1, 3, 5, 8].map((qty) => (
              <button
                key={qty}
                onClick={() => onBuilderPotionsChange(qty)}
                className={`text-[11px] px-2 py-0.5 rounded font-bold transition-colors ${
                  builderPotions === qty
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>

        {/* Control 2: Active Builders Count */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Constructores Activos Simultáneos:
            </span>
            <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              {activeBuilders} de 6 chozas
            </span>
          </div>

          {/* Builder selection buttons 1 through 6 */}
          <div className="grid grid-cols-6 gap-1.5 mb-2">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const isSelected = activeBuilders === num;
              return (
                <button
                  key={num}
                  onClick={() => onActiveBuildersChange(num)}
                  className={`py-2 rounded-lg text-xs font-black transition-all border flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-500/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                >
                  <span className="text-xs">C{num}</span>
                  <span className="text-[9px] opacity-80">
                    {num === 6 ? 'B.O.B' : `${num}`}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 italic">
            * Cada constructor adicional multiplica el valor de cada pócima por 9 horas extra de trabajo.
          </p>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
        {/* Stat 1: Time saved per builder */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
            Ahorro por Constructor
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-cyan-400">
            {hoursSavedPerBuilder} hrs
          </span>
          <span className="text-[10px] text-slate-500 block">
            ({builderPotions} × 9h netas)
          </span>
        </div>

        {/* Stat 2: Total Village Time Saved */}
        <div className="bg-gradient-to-br from-cyan-950/40 to-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold block mb-0.5">
            Ahorro Total en Aldea
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-white">
            {totalVillageHoursSaved} hrs
          </span>
          <span className="text-[10px] text-cyan-400 block font-semibold">
            {activeBuilders} constructores × {hoursSavedPerBuilder}h
          </span>
        </div>

        {/* Stat 3: Cost in Gems */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
            Costo en Mercader
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-amber-400">
            {gemCost} gemas
          </span>
          <span className="text-[10px] text-slate-500 block">
            {builderPotions > 0 ? `${builderPotions} × 285 gemas` : '0 gemas'}
          </span>
        </div>

        {/* Stat 4: Gem ROI Multiplier */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-xl p-2.5 text-center">
          <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block mb-0.5">
            Retorno / Eficiencia
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-emerald-400">
            {builderPotions > 0 ? `${gemRoiMultiplier}x` : '-'}
          </span>
          <span className="text-[10px] text-emerald-400/80 block font-semibold">
            {builderPotions > 0 ? `equiv. a ${gemValueEquivalent} gemas` : 'Sin pócimas'}
          </span>
        </div>
      </div>
    </div>
  );
};
