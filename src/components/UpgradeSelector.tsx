import React, { useState, useEffect, useMemo } from 'react';
import { BUILDINGS_CATALOG, TOWN_HALL_LEVELS, BUILDER_HALL_LEVELS, HallLevelInfo } from '../data/buildingsData';
import { BuildingDefinition, BuildingLevelInfo, UpgradePreset, VillageType } from '../types/coc';
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
  ChevronRight,
  Layers,
  AlertCircle,
  ArrowRight,
  Sparkle,
} from 'lucide-react';

interface UpgradeSelectorProps {
  selectedPreset: UpgradePreset | null;
  customDurationSeconds: number;
  isCustom: boolean;
  onSelectPreset: (preset: UpgradePreset) => void;
  onCustomChange: (seconds: number) => void;
  currentVillage: VillageType;
  currentTownHall: number;
  onTownHallChange: (th: number) => void;
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
  currentTownHall,
  onTownHallChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('cannon');
  const [selectedLevel, setSelectedLevel] = useState<number>(14);

  // Available halls for current village
  const hallList = currentVillage === 'home' ? TOWN_HALL_LEVELS : BUILDER_HALL_LEVELS;
  const currentHallInfo = hallList.find((h) => h.level === currentTownHall) || hallList[hallList.length - 1];

  // Buildings available for this village
  const villageBuildings = useMemo(() => {
    return BUILDINGS_CATALOG.filter((b) => b.village === currentVillage);
  }, [currentVillage]);

  // Selected building object
  const currentBuilding = useMemo(() => {
    return villageBuildings.find((b) => b.id === selectedBuildingId) || villageBuildings[0];
  }, [villageBuildings, selectedBuildingId]);

  // Max level reachable at the current TH/BH
  const maxLevelAtCurrentHall = useMemo(() => {
    if (!currentBuilding) return 1;
    const availableLevels = currentBuilding.levels.filter((lvl) => lvl.requiredTH <= currentTownHall);
    if (availableLevels.length === 0) return currentBuilding.levels[0]?.level || 1;
    return availableLevels[availableLevels.length - 1].level;
  }, [currentBuilding, currentTownHall]);

  // Level info for currently selected level
  const currentLevelInfo = useMemo(() => {
    if (!currentBuilding) return null;
    return (
      currentBuilding.levels.find((l) => l.level === selectedLevel) ||
      currentBuilding.levels[currentBuilding.levels.length - 1]
    );
  }, [currentBuilding, selectedLevel]);

  // When village changes, update default building
  useEffect(() => {
    const firstBuilding = villageBuildings[0];
    if (firstBuilding) {
      setSelectedBuildingId(firstBuilding.id);
      const defLvl = firstBuilding.levels[Math.floor(firstBuilding.levels.length / 2)]?.level || 1;
      setSelectedLevel(defLvl);
    }
  }, [currentVillage, villageBuildings]);

  // Helper to commit building + level upgrade to parent preset
  const commitBuildingUpgrade = (building: BuildingDefinition, level: number) => {
    const info = building.levels.find((l) => l.level === level) || building.levels[building.levels.length - 1];
    if (!info) return;

    const preset: UpgradePreset = {
      id: `${building.id}-${level}`,
      name: `${building.name} (Nivel ${level})`,
      category: building.category === 'army' ? 'other' : building.category,
      village: building.village,
      level: level,
      durationSeconds: info.durationSeconds,
      description: `${building.description} • Costo: ${info.cost || 'N/A'} • Requiere ${
        building.village === 'home' ? 'TH' : 'BH'
      } ${info.requiredTH}`,
      iconName: building.iconName,
    };
    onSelectPreset(preset);
  };

  const handleSelectBuilding = (building: BuildingDefinition) => {
    setSelectedBuildingId(building.id);
    // Find appropriate level for this building according to current TH
    const availableLevels = building.levels.filter((lvl) => lvl.requiredTH <= currentTownHall);
    const targetLvl = availableLevels.length > 0
      ? availableLevels[availableLevels.length - 1].level
      : building.levels[0].level;
    setSelectedLevel(targetLvl);
    commitBuildingUpgrade(building, targetLvl);
  };

  const handleLevelChange = (newLevel: number) => {
    if (!currentBuilding) return;
    const minLvl = currentBuilding.levels[0]?.level || 1;
    const maxLvl = currentBuilding.maxLevel;
    const clamped = Math.max(minLvl, Math.min(maxLvl, newLevel));
    setSelectedLevel(clamped);
    commitBuildingUpgrade(currentBuilding, clamped);
  };

  // Custom time inputs
  const customDays = Math.floor(customDurationSeconds / 86400);
  const customHours = Math.floor((customDurationSeconds % 86400) / 3600);
  const customMinutes = Math.floor((customDurationSeconds % 3600) / 60);

  const handleCustomFieldChange = (days: number, hours: number, minutes: number) => {
    const total = Math.max(60, days * 86400 + hours * 3600 + minutes * 60);
    onCustomChange(total);
  };

  // Filter buildings by category
  const filteredBuildings = villageBuildings.filter((b) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'defense') return b.category === 'defense';
    if (activeCategory === 'hero') return b.category === 'hero';
    if (activeCategory === 'town_hall') return b.category === 'town_hall';
    if (activeCategory === 'laboratory') return b.category === 'laboratory' || b.category === 'army';
    return true;
  });

  const isLevelExceedingHall = currentLevelInfo ? currentLevelInfo.requiredTH > currentTownHall : false;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm space-y-4">
      {/* Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            1. Selecciona Ayuntamiento y Nivel de Mejora
          </h2>
          <p className="text-xs text-slate-400">
            Ajusta tu nivel de Ayuntamiento/Taller para ver los niveles disponibles y selecciona cualquier nivel de edificio.
          </p>
        </div>

        {/* Tab between Building Selector & Custom Duration */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs shrink-0">
          <button
            onClick={() => {
              if (isCustom && currentBuilding) {
                commitBuildingUpgrade(currentBuilding, selectedLevel);
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              !isCustom
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Selector por Ayuntamiento
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
            <span>Tiempo Manual</span>
          </button>
        </div>
      </div>

      {!isCustom ? (
        <div className="space-y-4">
          {/* STEP A: Town Hall / Builder Hall Picker Bar */}
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Castle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Nivel de {currentVillage === 'home' ? 'Ayuntamiento (TH)' : 'Taller del Constructor (BH)'}:
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-mono font-bold ${currentHallInfo.colorClass}`}>
                  {currentHallInfo.name}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full hidden sm:inline">
                  {currentHallInfo.theme}
                </span>
              </div>
            </div>

            {/* Hall selector pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {hallList.map((hall) => {
                const isActive = hall.level === currentTownHall;
                return (
                  <button
                    key={hall.level}
                    onClick={() => onTownHallChange(hall.level)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-lg ring-2 ring-amber-400/50 scale-105'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {hall.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP B: Main Building & Level Configurator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: Building Selector by Categories (7 cols) */}
            <div className="lg:col-span-7 space-y-2.5">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'defense', label: 'Defensas' },
                  { id: 'hero', label: 'Héroes' },
                  { id: 'laboratory', label: 'Ejército / Lab' },
                  { id: 'town_hall', label: 'Ayuntamiento' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-slate-700 text-white border border-slate-600'
                        : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Building Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                {filteredBuildings.map((building) => {
                  const isSelected = currentBuilding?.id === building.id;
                  const IconComp = ICON_MAP[building.iconName] || Hammer;
                  const isUnlocked = building.unlockedAtTH <= currentTownHall;

                  // Find max level for this building at current TH
                  const availableLevels = building.levels.filter((lvl) => lvl.requiredTH <= currentTownHall);
                  const maxLvlAtTH = availableLevels.length > 0
                    ? availableLevels[availableLevels.length - 1].level
                    : 0;

                  return (
                    <button
                      key={building.id}
                      onClick={() => handleSelectBuilding(building)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-gradient-to-br from-amber-950/70 to-slate-900 border-amber-500 ring-1 ring-amber-500/50 shadow-md'
                          : isUnlocked
                          ? 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/30 border-slate-900 opacity-60 hover:opacity-90'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-800 text-amber-400'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white truncate block">
                            {building.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          {isUnlocked ? (
                            <span className="text-[10px] text-amber-300 font-mono">
                              Máx {currentHallInfo.shortName}: Niv. {maxLvlAtTH}
                            </span>
                          ) : (
                            <span className="text-[10px] text-red-400 font-medium">
                              Desbloquea en {currentVillage === 'home' ? 'TH' : 'BH'} {building.unlockedAtTH}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Level Tuner & Detail Panel (5 cols) */}
            {currentBuilding && currentLevelInfo && (
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between shadow-xl">
                <div>
                  {/* Top info badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                        {React.createElement(ICON_MAP[currentBuilding.iconName] || Hammer, { className: 'w-4 h-4' })}
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-white">{currentBuilding.name}</h3>
                        <span className="text-[10px] text-slate-400">
                          {currentBuilding.levels[0]?.level === 1
                            ? `Niveles 1 al ${currentBuilding.maxLevel}`
                            : `Niveles ${currentBuilding.levels[0]?.level} al ${currentBuilding.maxLevel}`}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Tiempo Base</span>
                      <span className="text-sm font-mono font-black text-amber-400">
                        {formatDuration(currentLevelInfo.durationSeconds)}
                      </span>
                    </div>
                  </div>

                  {/* Level Stepper and Slider */}
                  <div className="my-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Nivel a Mejorar:
                      </span>

                      {/* Stepper with Big Number */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLevelChange(selectedLevel - 1)}
                          disabled={selectedLevel <= (currentBuilding.levels[0]?.level || 1)}
                          className="w-8 h-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 rounded-lg text-white font-black text-sm border border-slate-700 flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <div className="bg-amber-500/15 border border-amber-500/40 px-3 py-1 rounded-lg text-center min-w-[70px]">
                          <span className="text-base font-black font-mono text-amber-300">
                            Niv. {selectedLevel}
                          </span>
                        </div>
                        <button
                          onClick={() => handleLevelChange(selectedLevel + 1)}
                          disabled={selectedLevel >= currentBuilding.maxLevel}
                          className="w-8 h-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 rounded-lg text-white font-black text-sm border border-slate-700 flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Slider */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min={currentBuilding.levels[0]?.level || 1}
                        max={currentBuilding.maxLevel}
                        value={selectedLevel}
                        onChange={(e) => handleLevelChange(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>Niv. {currentBuilding.levels[0]?.level || 1}</span>
                        <span>
                          Máx {currentHallInfo.shortName}: Niv. {maxLevelAtCurrentHall}
                        </span>
                        <span>Niv. {currentBuilding.maxLevel} (Máx Absoluto)</span>
                      </div>
                    </div>

                    {/* Quick Level Shortcut Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold mr-1">Atajos:</span>
                      {/* Level 1 / start */}
                      <button
                        onClick={() => handleLevelChange(currentBuilding.levels[0]?.level || 1)}
                        className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-mono"
                      >
                        Niv. {currentBuilding.levels[0]?.level || 1}
                      </button>

                      {/* Intermediate levels */}
                      {currentBuilding.maxLevel >= 10 && (
                        <button
                          onClick={() => handleLevelChange(Math.round(currentBuilding.maxLevel / 2))}
                          className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-mono"
                        >
                          Niv. {Math.round(currentBuilding.maxLevel / 2)}
                        </button>
                      )}

                      {/* Max level for current TH */}
                      {maxLevelAtCurrentHall > 0 && (
                        <button
                          onClick={() => handleLevelChange(maxLevelAtCurrentHall)}
                          className={`text-[10px] px-2 py-0.5 rounded border font-mono font-bold ${
                            selectedLevel === maxLevelAtCurrentHall
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800'
                          }`}
                        >
                          Máx {currentHallInfo.shortName} (Niv. {maxLevelAtCurrentHall})
                        </button>
                      )}

                      {/* Absolute Max */}
                      <button
                        onClick={() => handleLevelChange(currentBuilding.maxLevel)}
                        className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-mono"
                      >
                        Máx (Niv. {currentBuilding.maxLevel})
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status Notice / Town Hall requirement warning */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Costo de mejora:</span>
                    <span className="font-mono font-bold text-amber-300">
                      {currentLevelInfo.cost || 'Varía'}
                    </span>
                  </div>

                  {isLevelExceedingHall ? (
                    <div className="bg-amber-950/40 border border-amber-500/40 rounded-lg p-2 flex items-start gap-1.5 text-[11px] text-amber-300">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        Este nivel requiere <strong>{currentVillage === 'home' ? 'TH' : 'BH'} {currentLevelInfo.requiredTH}</strong> (tu aldea está configurada en {currentHallInfo.shortName}).
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 rounded-lg px-2.5 py-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Disponible en {currentHallInfo.shortName}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {selectedLevel === maxLevelAtCurrentHall ? 'Nivel tope de este TH' : 'Mejora en curso'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Manual Custom Time Controls */
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
