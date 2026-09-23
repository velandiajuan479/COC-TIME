export type VillageType = 'home' | 'builder_base';

export interface UpgradePreset {
  id: string;
  name: string;
  category: 'town_hall' | 'defense' | 'hero' | 'laboratory' | 'resource' | 'other';
  village: VillageType;
  level: number;
  durationSeconds: number; // in seconds
  description: string;
  iconName: string;
}

export interface BuilderSlot {
  id: number;
  name: string;
  upgradeName: string;
  durationSeconds: number;
  remainingSeconds: number;
  isActive: boolean;
}

export interface ClockTowerLevel {
  level: number;
  requiredBH: number;
  durationMinutes: number; // e.g. 3, 4, ..., 12
  timeSavedMinutes: number; // 9x duration = 27, 36, ... 108 min
  freeBoostCooldownHours: number; // 22h
}

export interface GemMineStats {
  level: number;
  gemsPerHour: number;
  capacity: number;
}

export interface SimulationResult {
  originalSeconds: number;
  builderPotionsUsed: number;
  builderPotionsHoursSavedPerBuilder: number;
  totalVillageHoursSaved: number;
  activeBuildersCount: number;
  
  clockTowerLevel: number;
  clockTowerBoostMinutes: number;
  clockTowerTimeSavedSeconds: number;
  clockTowerDaysScheduled: number;
  clockTowerTotalTimeSavedSeconds: number;

  totalTimeSavedSeconds: number;
  finalDurationSeconds: number;
  percentageReduced: number;

  gemValueEquivalent: number;
  builderPotionGemCost: number;
  netGemProfit: number;
  gemRoiMultiplier: number;

  extraBuilderGold: number;
  extraBuilderElixir: number;
  extraGemMineGems: number;
}
