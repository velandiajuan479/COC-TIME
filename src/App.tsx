import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth } from './services/firebaseAuth';
import { UPGRADE_PRESETS, CLOCK_TOWER_LEVELS } from './data/cocData';
import { UpgradePreset, VillageType, BuilderSlot } from './types/coc';
import { runFullSimulation, formatDuration } from './utils/cocCalculations';
import { Header } from './components/Header';
import { UpgradeSelector } from './components/UpgradeSelector';
import { BuilderPotionPanel } from './components/BuilderPotionPanel';
import { ClockTowerPanel } from './components/ClockTowerPanel';
import { LiveSimulationEngine } from './components/LiveSimulationEngine';
import { MultiBuilderQueue } from './components/MultiBuilderQueue';
import { GemEfficiencyCard } from './components/GemEfficiencyCard';
import { SheetsExportModal } from './components/SheetsExportModal';
import {
  Castle,
  Clock,
  Sparkles,
  Zap,
  Hammer,
  Gem,
  Award,
  Calendar,
  Layers,
} from 'lucide-react';

const INITIAL_BUILDERS: BuilderSlot[] = [
  {
    id: 1,
    name: 'Constructor 1',
    upgradeName: 'Águila de Artillería (Niv. 6)',
    durationSeconds: 15 * 86400,
    remainingSeconds: 15 * 86400,
    isActive: true,
  },
  {
    id: 2,
    name: 'Constructor 2',
    upgradeName: 'Torre Infernal (Niv. 9)',
    durationSeconds: 12 * 86400,
    remainingSeconds: 12 * 86400,
    isActive: true,
  },
  {
    id: 3,
    name: 'Constructor 3',
    upgradeName: 'Ballesta (Niv. 10)',
    durationSeconds: 11 * 86400,
    remainingSeconds: 11 * 86400,
    isActive: true,
  },
  {
    id: 4,
    name: 'Constructor 4',
    upgradeName: 'Rey Bárbaro (Niv. 95)',
    durationSeconds: 8 * 86400,
    remainingSeconds: 8 * 86400,
    isActive: true,
  },
  {
    id: 5,
    name: 'Constructor 5',
    upgradeName: 'Monolito (Niv. 3)',
    durationSeconds: 14 * 86400,
    remainingSeconds: 14 * 86400,
    isActive: true,
  },
  {
    id: 6,
    name: 'B.O.B (6to Constructor)',
    upgradeName: 'Catapulta (Niv. 5)',
    durationSeconds: 13.5 * 86400,
    remainingSeconds: 13.5 * 86400,
    isActive: true,
  },
];

export default function App() {
  const [village, setVillage] = useState<VillageType>('home');
  const [townHallLevel, setTownHallLevel] = useState<number>(15);
  const [selectedPreset, setSelectedPreset] = useState<UpgradePreset>(UPGRADE_PRESETS[0]);
  const [customDurationSeconds, setCustomDurationSeconds] = useState<number>(14 * 86400);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Builder Potions State
  const [builderPotions, setBuilderPotions] = useState<number>(2);
  const [activeBuildersCount, setActiveBuildersCount] = useState<number>(6);

  // Clock Tower State
  const [clockTowerLevel, setClockTowerLevel] = useState<number>(10);
  const [useClockTowerPotion, setUseClockTowerPotion] = useState<boolean>(false);
  const [clockTowerPotionCount, setClockTowerPotionCount] = useState<number>(1);
  const [dailyScheduled, setDailyScheduled] = useState<boolean>(true);
  const [gemMineLevel, setGemMineLevel] = useState<number>(10);

  // Multi-Builder Slots
  const [builders, setBuilders] = useState<BuilderSlot[]>(INITIAL_BUILDERS);

  // Auth & Workspace Modal
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState<boolean>(false);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => setCurrentUser(user),
      () => setCurrentUser(null)
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // When village changes, update preset recommendation and Town Hall
  const handleVillageChange = (newVillage: VillageType) => {
    setVillage(newVillage);
    if (newVillage === 'builder_base') {
      setTownHallLevel(10);
      setActiveBuildersCount(2); // Master builder + B.O.B
    } else {
      setTownHallLevel(15);
      setActiveBuildersCount(6);
    }
    const matching = UPGRADE_PRESETS.find((p) => p.village === newVillage);
    if (matching) {
      setSelectedPreset(matching);
      setIsCustom(false);
    }
  };

  const handleSelectPreset = (preset: UpgradePreset) => {
    setSelectedPreset(preset);
    setIsCustom(false);
  };

  const handleCustomChange = (seconds: number) => {
    setCustomDurationSeconds(seconds);
    setIsCustom(true);
  };

  const handleAssignCurrentUpgradeToBuilder = (id: number) => {
    const upgradeTitle = isCustom ? 'Mejora Personalizada' : selectedPreset.name;
    const upgradeDur = isCustom ? customDurationSeconds : selectedPreset.durationSeconds;
    setBuilders((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              upgradeName: upgradeTitle,
              durationSeconds: upgradeDur,
              remainingSeconds: upgradeDur,
              isActive: true,
            }
          : b
      )
    );
  };

  // Builder Slot actions
  const handleToggleBuilder = (id: number) => {
    setBuilders((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
      const activeCount = next.filter((b) => b.isActive).length;
      setActiveBuildersCount(Math.max(1, activeCount));
      return next;
    });
  };

  const handleUpdateUpgradeName = (id: number, name: string) => {
    setBuilders((prev) => prev.map((b) => (b.id === id ? { ...b, upgradeName: name } : b)));
  };

  const handleUpdateDurationDays = (id: number, days: number) => {
    setBuilders((prev) =>
      prev.map((b) => (b.id === id ? { ...b, durationSeconds: days * 86400 } : b))
    );
  };

  // Run the full simulation calculations
  const effectiveBaseDuration = isCustom
    ? customDurationSeconds
    : selectedPreset?.durationSeconds || 86400;

  const simulation = runFullSimulation({
    baseDurationSeconds: effectiveBaseDuration,
    builderPotions,
    activeBuilders: activeBuildersCount,
    clockTowerLevel: village === 'builder_base' || clockTowerLevel > 0 ? clockTowerLevel : 0,
    useClockTowerPotion,
    clockTowerPotionCount,
    clockTowerDailyScheduled: dailyScheduled,
    gemMineLevel,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header
        village={village}
        onVillageChange={handleVillageChange}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Hero Quick Banner */}
        <section className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                Simulador de Aceleración y Economía de Mejoras
              </h2>
              <p className="text-xs text-slate-400">
                Prueba cómo las <strong className="text-cyan-300">Pócimas del Constructor</strong> y la{' '}
                <strong className="text-amber-300">Torre del Reloj (10x)</strong> reducen semanas de espera a horas y días en Clash of Clans.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Ahorro Global Calculado:
              </span>
              <span className="text-sm sm:text-base font-black font-mono text-emerald-400">
                {formatDuration(simulation.totalTimeSavedSeconds)} (-{simulation.percentageReduced}%)
              </span>
            </div>
          </div>
        </section>

        {/* Live Simulation Engine (Real-time Clock & Interactive Progression) */}
        <LiveSimulationEngine
          originalSeconds={simulation.originalSeconds}
          finalTargetSeconds={simulation.finalDurationSeconds}
          totalTimeSavedSeconds={simulation.totalTimeSavedSeconds}
          percentageReduced={simulation.percentageReduced}
          upgradeName={isCustom ? 'Mejora Personalizada' : selectedPreset.name}
          hasBuilderPotion={builderPotions > 0}
          hasClockTower={clockTowerLevel > 0}
          activeBuilders={activeBuildersCount}
        />

        {/* Upgrade Selection (Town Hall, Building Levels & Custom Days/Hours) */}
        <UpgradeSelector
          selectedPreset={selectedPreset}
          customDurationSeconds={customDurationSeconds}
          isCustom={isCustom}
          onSelectPreset={handleSelectPreset}
          onCustomChange={handleCustomChange}
          currentVillage={village}
          currentTownHall={townHallLevel}
          onTownHallChange={setTownHallLevel}
        />

        {/* Two-Column Simulation Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Module 1: Pócimas del Constructor */}
          <BuilderPotionPanel
            builderPotions={builderPotions}
            onBuilderPotionsChange={setBuilderPotions}
            activeBuilders={activeBuildersCount}
            onActiveBuildersChange={(cnt) => {
              setActiveBuildersCount(cnt);
              setBuilders((prev) =>
                prev.map((b, idx) => ({ ...b, isActive: idx < cnt }))
              );
            }}
            hoursSavedPerBuilder={simulation.builderPotionsHoursSavedPerBuilder}
            totalVillageHoursSaved={simulation.totalVillageHoursSaved}
            gemCost={simulation.builderPotionGemCost}
            gemValueEquivalent={simulation.gemValueEquivalent}
            gemRoiMultiplier={simulation.gemRoiMultiplier}
          />

          {/* Module 2: Torre del Reloj */}
          <ClockTowerPanel
            clockTowerLevel={clockTowerLevel}
            onClockTowerLevelChange={setClockTowerLevel}
            useClockTowerPotion={useClockTowerPotion}
            onUseClockTowerPotionChange={setUseClockTowerPotion}
            clockTowerPotionCount={clockTowerPotionCount}
            onClockTowerPotionCountChange={setClockTowerPotionCount}
            dailyScheduled={dailyScheduled}
            onDailyScheduledChange={setDailyScheduled}
            gemMineLevel={gemMineLevel}
            onGemMineLevelChange={setGemMineLevel}
            singleBoostMinutes={simulation.clockTowerBoostMinutes}
            singleBoostSavedSeconds={simulation.clockTowerTimeSavedSeconds}
            scheduledBoostsCount={simulation.clockTowerDaysScheduled}
            totalTimeSavedSeconds={simulation.clockTowerTotalTimeSavedSeconds}
            extraGems={simulation.extraGemMineGems}
            extraGold={simulation.extraBuilderGold}
            extraElixir={simulation.extraBuilderElixir}
          />
        </div>

        {/* Multi-Builder Slots / Huts Queue */}
        <MultiBuilderQueue
          builders={builders}
          builderPotionsHoursSaved={simulation.builderPotionsHoursSavedPerBuilder}
          onToggleBuilder={handleToggleBuilder}
          onUpdateUpgradeName={handleUpdateUpgradeName}
          onUpdateDurationDays={handleUpdateDurationDays}
          onAssignCurrentUpgrade={handleAssignCurrentUpgradeToBuilder}
          currentUpgradeName={isCustom ? 'Mejora Personalizada' : selectedPreset.name}
        />

        {/* Gem & Resource ROI Analytics */}
        <GemEfficiencyCard simulation={simulation} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 px-4 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Simulador de Pócimas del Constructor y Torre del Reloj para Clash of Clans. Tiempos y cálculos basados en la mecánica oficial de Supercell.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Velocidad 10x</span>
            <span>•</span>
            <span>Ahorro de Gemas</span>
            <span>•</span>
            <button
              onClick={() => setIsSheetsModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline"
            >
              Exportar a Google Sheets
            </button>
          </div>
        </div>
      </footer>

      {/* Sheets Export Modal */}
      <SheetsExportModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        selectedUpgrade={
          isCustom
            ? { name: 'Mejora Personalizada', durationSeconds: customDurationSeconds }
            : selectedPreset
        }
        simulation={simulation}
        builders={builders}
      />
    </div>
  );
}
