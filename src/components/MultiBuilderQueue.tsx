import React from 'react';
import { BuilderSlot } from '../types/coc';
import { formatDuration } from '../utils/cocCalculations';
import { Hammer, UserCheck, UserX, Clock, Sparkles } from 'lucide-react';

interface MultiBuilderQueueProps {
  builders: BuilderSlot[];
  builderPotionsHoursSaved: number;
  onToggleBuilder: (id: number) => void;
  onUpdateUpgradeName: (id: number, name: string) => void;
  onUpdateDurationDays: (id: number, days: number) => void;
}

export const MultiBuilderQueue: React.FC<MultiBuilderQueueProps> = ({
  builders,
  builderPotionsHoursSaved,
  onToggleBuilder,
  onUpdateUpgradeName,
  onUpdateDurationDays,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Hammer className="w-5 h-5 text-amber-400" />
            Chozas de Constructores Activos (Impacto Simultáneo)
          </h3>
          <p className="text-xs text-slate-400">
            Cada pócima del constructor acelera a todos los constructores trabajando a la vez.
          </p>
        </div>

        <div className="bg-cyan-950/70 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300">Ahorro por choza:</span>
          <span className="font-mono font-bold text-cyan-300">
            -{builderPotionsHoursSaved}h
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {builders.map((builder) => {
          const finalDuration = Math.max(
            0,
            builder.durationSeconds - builderPotionsHoursSaved * 3600
          );
          const savedSeconds = builder.durationSeconds - finalDuration;
          const percentDone =
            builder.durationSeconds > 0
              ? Math.min(100, (savedSeconds / builder.durationSeconds) * 100)
              : 0;

          return (
            <div
              key={builder.id}
              className={`rounded-xl border p-3.5 transition-all ${
                builder.isActive
                  ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                      builder.id === 6
                        ? 'bg-purple-600 text-white'
                        : 'bg-amber-500 text-slate-950'
                    }`}
                  >
                    C{builder.id}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {builder.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {builder.id === 6 ? 'Choza de B.O.B' : `Choza #${builder.id}`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleBuilder(builder.id)}
                  className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-colors ${
                    builder.isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {builder.isActive ? (
                    <>
                      <UserCheck className="w-3 h-3" />
                      <span>Activo</span>
                    </>
                  ) : (
                    <>
                      <UserX className="w-3 h-3" />
                      <span>Libre</span>
                    </>
                  )}
                </button>
              </div>

              {builder.isActive ? (
                <>
                  {/* Upgrade Name & Days Input */}
                  <div className="space-y-2 mb-3">
                    <div>
                      <label className="text-[10px] text-slate-400 block font-semibold mb-0.5">
                        Mejora en curso:
                      </label>
                      <input
                        type="text"
                        value={builder.upgradeName}
                        onChange={(e) => onUpdateUpgradeName(builder.id, e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded px-2 py-1 font-medium focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Duración:</span>
                      <div className="flex items-center gap-1">
                        {[3, 7, 10, 14].map((d) => (
                          <button
                            key={d}
                            onClick={() => onUpdateDurationDays(builder.id, d)}
                            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                              Math.round(builder.durationSeconds / 86400) === d
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {d}d
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Impact */}
                  <div className="bg-slate-900/90 rounded-lg p-2 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Original:</span>
                      <span>{formatDuration(builder.durationSeconds)}</span>
                    </div>
                    <div className="flex justify-between text-amber-300 font-bold">
                      <span>Con Pócimas:</span>
                      <span>{formatDuration(finalDuration)}</span>
                    </div>
                    {savedSeconds > 0 && (
                      <div className="flex justify-between text-emerald-400 text-[11px] font-bold">
                        <span>Ahorro:</span>
                        <span>-{formatDuration(savedSeconds)}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar representing saved time */}
                  <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all"
                      style={{ width: `${percentDone}%` }}
                    />
                  </div>
                </>
              ) : (
                <div className="py-6 text-center text-xs text-slate-500 italic">
                  Constructor inactivo. Haz clic en "Libre" para asignarle una tarea.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
