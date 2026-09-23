import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { formatDetailedTime, formatDuration } from '../utils/cocCalculations';
import { Play, Pause, RotateCcw, FastForward, CheckCircle2, Sparkles, Zap, Flame, Clock } from 'lucide-react';

interface LiveSimulationEngineProps {
  originalSeconds: number;
  finalTargetSeconds: number;
  totalTimeSavedSeconds: number;
  percentageReduced: number;
  upgradeName: string;
  hasBuilderPotion: boolean;
  hasClockTower: boolean;
  activeBuilders: number;
}

export const LiveSimulationEngine: React.FC<LiveSimulationEngineProps> = ({
  originalSeconds,
  finalTargetSeconds,
  totalTimeSavedSeconds,
  percentageReduced,
  upgradeName,
  hasBuilderPotion,
  hasClockTower,
  activeBuilders,
}) => {
  // Real-time ticking simulation state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeMultiplier, setTimeMultiplier] = useState<number>(60); // 60x default speed
  const [elapsedSimulatedSeconds, setElapsedSimulatedSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // When original or final target seconds change, reset simulation
  useEffect(() => {
    setElapsedSimulatedSeconds(0);
    setIsCompleted(false);
    setIsRunning(false);
  }, [originalSeconds, finalTargetSeconds]);

  // Animation frame loop
  useEffect(() => {
    if (!isRunning) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp: number) => {
      if (lastTimeRef.current !== null) {
        const deltaMs = timestamp - lastTimeRef.current;
        // delta in seconds * multiplier
        const simulatedDelta = (deltaMs / 1000) * timeMultiplier;

        setElapsedSimulatedSeconds((prev) => {
          const next = prev + simulatedDelta;
          if (next >= finalTargetSeconds) {
            setIsCompleted(true);
            setIsRunning(false);
            // Trigger confetti
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#f59e0b', '#06b6d4', '#10b981', '#fbbf24'],
            });
            return finalTargetSeconds;
          }
          return next;
        });
      }
      lastTimeRef.current = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, timeMultiplier, finalTargetSeconds]);

  const handleTogglePlay = () => {
    if (isCompleted) {
      setElapsedSimulatedSeconds(0);
      setIsCompleted(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedSimulatedSeconds(0);
    setIsCompleted(false);
  };

  const handleInstantComplete = () => {
    setElapsedSimulatedSeconds(finalTargetSeconds);
    setIsCompleted(true);
    setIsRunning(false);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#06b6d4', '#10b981'],
    });
  };

  const remainingSeconds = Math.max(0, finalTargetSeconds - elapsedSimulatedSeconds);
  const progressPercent =
    finalTargetSeconds > 0
      ? Math.min(100, (elapsedSimulatedSeconds / finalTargetSeconds) * 100)
      : 100;

  const originalTimeObj = formatDetailedTime(originalSeconds);
  const finalTimeObj = formatDetailedTime(remainingSeconds);

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Visual background effect */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Display Grid */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                Resultado de Aceleración en Tiempo Real
              </span>
              {(hasBuilderPotion || hasClockTower) && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-400/40 animate-pulse">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  IMPULSO 10x ACTIVO
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              {upgradeName}
            </h2>
          </div>

          {/* Time Saved Badge */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-emerald-500/40 rounded-xl px-4 py-2 shadow-inner">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-bounce" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                Ahorro Total Obtenido
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black font-mono text-emerald-300">
                  {formatDuration(totalTimeSavedSeconds)}
                </span>
                <span className="text-xs font-bold text-emerald-400/80">
                  (-{percentageReduced}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Clocks Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          {/* Box 1: Original Base Duration */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tiempo Original sin Acelerar
              </span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                Velocidad 1x Estándar
              </span>
            </div>

            <div className="flex items-center justify-around gap-2 my-2 text-center">
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 flex-1">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-300">
                  {originalTimeObj.days}
                </span>
                <span className="text-[10px] uppercase text-slate-500 block font-bold">Días</span>
              </div>
              <span className="text-slate-600 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 flex-1">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-300">
                  {originalTimeObj.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-slate-500 block font-bold">Horas</span>
              </div>
              <span className="text-slate-600 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2 flex-1">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-300">
                  {originalTimeObj.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-slate-500 block font-bold">Min</span>
              </div>
            </div>

            <span className="text-[11px] text-slate-500 text-center block mt-1">
              Duración completa requerida originalmente
            </span>
          </div>

          {/* Box 2: New Accelerated Duration */}
          <div className="bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/50 rounded-xl p-4 flex flex-col justify-between shadow-lg ring-1 ring-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Tiempo Restante con Aceleración 10x
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded font-black">
                {isCompleted ? '¡COMPLETADO!' : 'REDUCIDO'}
              </span>
            </div>

            <div className="flex items-center justify-around gap-2 my-2 text-center">
              <div className="bg-slate-900 border border-amber-500/40 rounded-lg p-2 flex-1 shadow-inner">
                <span className="text-xl sm:text-2xl font-black font-mono text-amber-300">
                  {finalTimeObj.days}
                </span>
                <span className="text-[10px] uppercase text-amber-400/80 block font-bold">Días</span>
              </div>
              <span className="text-amber-500 font-bold">:</span>
              <div className="bg-slate-900 border border-amber-500/40 rounded-lg p-2 flex-1 shadow-inner">
                <span className="text-xl sm:text-2xl font-black font-mono text-amber-300">
                  {finalTimeObj.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-amber-400/80 block font-bold">Horas</span>
              </div>
              <span className="text-amber-500 font-bold">:</span>
              <div className="bg-slate-900 border border-amber-500/40 rounded-lg p-2 flex-1 shadow-inner">
                <span className="text-xl sm:text-2xl font-black font-mono text-amber-300">
                  {finalTimeObj.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-amber-400/80 block font-bold">Min</span>
              </div>
              <span className="text-amber-500 font-bold">:</span>
              <div className="bg-slate-900 border border-amber-500/40 rounded-lg p-2 flex-1 shadow-inner">
                <span className="text-xl sm:text-2xl font-black font-mono text-cyan-300">
                  {finalTimeObj.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-cyan-400 block font-bold">Seg</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-amber-300/80 font-medium">
              <span>{isCompleted ? 'Mejora lista para la batalla' : 'Listo en mucho menos tiempo'}</span>
              <span className="font-bold text-emerald-400">-{formatDuration(totalTimeSavedSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Live Simulation Progress Bar */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">Progreso de Construcción:</span>
              {isRunning && (
                <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  Simulando a {timeMultiplier}x...
                </span>
              )}
            </div>
            <span className="text-xs font-mono font-black text-amber-400">
              {progressPercent.toFixed(1)}%
            </span>
          </div>

          {/* Bar */}
          <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/80 relative">
            <div
              className={`h-full transition-all duration-150 rounded-full relative ${
                isCompleted
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            >
              {/* Highlight shimmer */}
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1.5">
            <span>Inicio (0s)</span>
            <span>Simulado: {formatDuration(elapsedSimulatedSeconds)}</span>
            <span>Meta: {formatDuration(finalTargetSeconds)}</span>
          </div>
        </div>

        {/* Interactive Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCompleted ? 'Repetir' : 'Iniciar Simulación en Vivo'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
              title="Reiniciar reloj"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleInstantComplete}
              disabled={isCompleted}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Finalizar al Instante</span>
            </button>
          </div>

          {/* Speed Multiplier */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Velocidad:</span>
            {[
              { label: '1x', val: 1 },
              { label: '10x', val: 10 },
              { label: '60x', val: 60 },
              { label: '300x', val: 300 },
              { label: '3600x', val: 3600 },
            ].map((speed) => (
              <button
                key={speed.val}
                onClick={() => setTimeMultiplier(speed.val)}
                className={`text-[11px] font-mono px-2 py-1 rounded-lg font-bold transition-all ${
                  timeMultiplier === speed.val
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
