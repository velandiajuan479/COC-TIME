import React from 'react';
import { SimulationResult } from '../types/coc';
import { Gem, TrendingUp, Award, AlertTriangle, BookOpen, Hammer, Sparkles, Check } from 'lucide-react';

interface GemEfficiencyCardProps {
  simulation: SimulationResult;
}

export const GemEfficiencyCard: React.FC<GemEfficiencyCardProps> = ({ simulation }) => {
  const {
    builderPotionsUsed,
    activeBuildersCount,
    gemValueEquivalent,
    builderPotionGemCost,
    netGemProfit,
    gemRoiMultiplier,
    extraGemMineGems,
    extraBuilderGold,
    extraBuilderElixir,
  } = simulation;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/40 border border-emerald-300/40">
            <Gem className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              Análisis Económico de Gemas y Recursos
            </h3>
            <p className="text-xs text-slate-400">
              Evaluación de rentabilidad vs compra directa de gemas y objetos mágicos de Clash of Clans.
            </p>
          </div>
        </div>

        {builderPotionsUsed > 0 && (
          <span className="hidden sm:inline-flex text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            ROI: {gemRoiMultiplier}x Rentabilidad
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Card 1: Trader Cost vs Gem Value */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>Inversión en Mercader</span>
            <span className="text-amber-400 font-mono">{builderPotionGemCost} Gemas</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1 mb-2">
            <div className="flex justify-between">
              <span>Pócimas adquiridas:</span>
              <span className="font-mono text-white">{builderPotionsUsed}</span>
            </div>
            <div className="flex justify-between">
              <span>Precio unitario:</span>
              <span className="font-mono text-slate-400">285 gemas / 30 medallas</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            * Disponible en la tienda diaria del Mercader y Asaltos de Clan.
          </div>
        </div>

        {/* Card 2: Value Generated (Gem Rush) */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
            <span>Valor Acelerado (Rush)</span>
            <span className="text-emerald-300 font-mono font-black text-sm">
              +{gemValueEquivalent} Gemas
            </span>
          </div>
          <div className="text-xs text-slate-300 space-y-1 mb-2">
            <div className="flex justify-between">
              <span>Constructores cubiertos:</span>
              <span className="font-mono text-cyan-400">{activeBuildersCount} simultáneos</span>
            </div>
            <div className="flex justify-between">
              <span>Horas aldea recortadas:</span>
              <span className="font-mono text-white">{simulation.totalVillageHoursSaved} hrs</span>
            </div>
          </div>
          <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300/80 font-medium">
            {builderPotionsUsed > 0
              ? `Ahorras ${netGemProfit >= 0 ? '+' : ''}${netGemProfit} gemas frente a completar con gemas.`
              : 'Selecciona pócimas para calcular el retorno.'}
          </div>
        </div>

        {/* Card 3: Clock Tower extra harvest */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-2">
            <span>Botín Extra de Torre del Reloj</span>
            <span className="text-amber-300 font-mono">10x Producción</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1 mb-2">
            <div className="flex justify-between">
              <span>Gemas extra (Mina):</span>
              <span className="font-mono text-emerald-400 font-bold">+{extraGemMineGems} gemas</span>
            </div>
            <div className="flex justify-between">
              <span>Oro / Elixir extra:</span>
              <span className="font-mono text-amber-300 font-bold">+{extraBuilderGold.toLocaleString()}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            * Extraído sin costo de tus recolectores de la Base del Constructor.
          </div>
        </div>
      </div>

      {/* Pro Strategy Tips & Comparison with Books */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          Guía de Eficiencia Estratégica en Clash of Clans
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <span className="font-bold text-white block mb-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              ¿Cuándo usar la Pócima del Constructor?
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Es óptima cuando tienes <strong>5 o 6 constructores activos al mismo tiempo</strong>.
              Una sola pócima ahorra 54 horas combinadas, lo que supera con creces el costo del mercader.
              Ideal durante eventos como Juegos del Clan o antes de la Liga de Guerra de Clanes (CWL).
            </p>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <span className="font-bold text-white block mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Pócima vs Libro de Construcción:
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Para mejoras individuales extremadamente largas (&gt;14 días como TH17 o Águila de Artillería),
              un <strong>Libro de Construcción</strong> (925 gemas) es más eficiente.
              Para acelerar toda tu aldea de golpe con múltiples mejoras medias, la pócima reina suprema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
