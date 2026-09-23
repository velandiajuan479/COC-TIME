import { CLOCK_TOWER_LEVELS, CLOCK_TOWER_POTION_DURATION_MINUTES, GEM_MINE_DATA } from '../data/cocData';
import { SimulationResult } from '../types/coc';

export const formatDuration = (totalSeconds: number): string => {
  if (totalSeconds <= 0) return '0s (¡Completado!)';

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || (days === 0 && hours === 0)) parts.push(`${minutes}m`);
  if (seconds > 0 && days === 0 && hours === 0) parts.push(`${seconds}s`);

  return parts.length > 0 ? parts.join(' ') : '0s';
};

export const formatDetailedTime = (totalSeconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const safeSec = Math.max(0, Math.floor(totalSeconds));
  return {
    days: Math.floor(safeSec / 86400),
    hours: Math.floor((safeSec % 86400) / 3600),
    minutes: Math.floor((safeSec % 3600) / 60),
    seconds: Math.floor(safeSec % 60),
  };
};

/**
 * Calculates Clash of Clans gem rush cost for a given remaining duration
 */
export const calculateGemsForTime = (seconds: number): number => {
  if (seconds <= 0) return 0;
  if (seconds <= 60) return 1;

  // < 1 hour: 1 to 20 gems
  if (seconds <= 3600) {
    return Math.max(1, Math.round((seconds / 3600) * 20));
  }
  // 1 hour to 24 hours: 20 to 260 gems
  if (seconds <= 86400) {
    const fraction = (seconds - 3600) / (86400 - 3600);
    return Math.round(20 + fraction * 240);
  }
  // 1 day to 7 days: 260 to 1000 gems
  if (seconds <= 604800) {
    const fraction = (seconds - 86400) / (604800 - 86400);
    return Math.round(260 + fraction * 740);
  }
  // > 7 days: 1000 to ~1863 gems at 14 days
  const extraDays = (seconds - 604800) / 86400;
  return Math.round(1000 + extraDays * 123.3);
};

export interface SimulationParams {
  baseDurationSeconds: number;
  builderPotions: number;
  activeBuilders: number;
  clockTowerLevel: number; // 0 for none, 1-10
  useClockTowerPotion: boolean;
  clockTowerPotionCount: number;
  clockTowerDailyScheduled: boolean; // apply 1 boost per ~day of construction
  gemMineLevel: number;
}

export const runFullSimulation = (params: SimulationParams): SimulationResult => {
  const {
    baseDurationSeconds,
    builderPotions,
    activeBuilders,
    clockTowerLevel,
    useClockTowerPotion,
    clockTowerPotionCount,
    clockTowerDailyScheduled,
    gemMineLevel,
  } = params;

  let currentDuration = baseDurationSeconds;

  // 1. Builder Potions impact
  // Each potion gives 1h at 10x -> does 10h of work in 1h real time. Net saved per builder: 9 hours (32400 seconds)
  // If remaining time is less than 10h, it completes faster:
  let builderPotionsTimeSavedSingle = 0;
  let simulatedRemainingForPotion = currentDuration;

  for (let i = 0; i < builderPotions; i++) {
    if (simulatedRemainingForPotion <= 0) break;
    if (simulatedRemainingForPotion >= 36000) {
      // Full 10 hours done in 1h
      simulatedRemainingForPotion -= 36000;
      builderPotionsTimeSavedSingle += 32400; // 9 hours saved
    } else {
      // Partial completion
      const realTimeToFinish = simulatedRemainingForPotion / 10;
      const saved = simulatedRemainingForPotion - realTimeToFinish;
      builderPotionsTimeSavedSingle += saved;
      simulatedRemainingForPotion = 0;
    }
  }

  const builderPotionsHoursSavedPerBuilder = builderPotionsTimeSavedSingle / 3600;
  const totalVillageHoursSaved = builderPotionsHoursSavedPerBuilder * Math.max(1, activeBuilders);

  currentDuration = Math.max(0, currentDuration - builderPotionsTimeSavedSingle);

  // 2. Clock Tower impact
  const ctData = CLOCK_TOWER_LEVELS.find((l) => l.level === clockTowerLevel);
  const singleBoostMinutes = useClockTowerPotion
    ? CLOCK_TOWER_POTION_DURATION_MINUTES
    : ctData
      ? ctData.durationMinutes
      : 0;

  let ctTimeSavedSingleBoostSeconds = 0;
  if (singleBoostMinutes > 0) {
    // single boost saves 9 * singleBoostMinutes minutes of work
    ctTimeSavedSingleBoostSeconds = singleBoostMinutes * 9 * 60;
  }

  // Calculate number of scheduled boosts if user enabled daily boosts over upgrade duration
  let ctScheduledBoosts = 0;
  let totalCtTimeSavedSeconds = 0;

  if (useClockTowerPotion) {
    // Explicit potion count
    ctScheduledBoosts = Math.max(1, clockTowerPotionCount);
    totalCtTimeSavedSeconds = Math.min(currentDuration, ctScheduledBoosts * ctTimeSavedSingleBoostSeconds);
  } else if (clockTowerLevel > 0) {
    if (clockTowerDailyScheduled) {
      // 1 boost every 22h over current duration
      const daysOfWork = currentDuration / 86400;
      ctScheduledBoosts = Math.max(1, Math.ceil(daysOfWork * (24 / 22)));
      totalCtTimeSavedSeconds = Math.min(currentDuration, ctScheduledBoosts * ctTimeSavedSingleBoostSeconds);
    } else {
      ctScheduledBoosts = 1;
      totalCtTimeSavedSeconds = Math.min(currentDuration, ctTimeSavedSingleBoostSeconds);
    }
  }

  currentDuration = Math.max(0, currentDuration - totalCtTimeSavedSeconds);

  // Total time saved for the selected upgrade
  const totalTimeSavedSeconds = baseDurationSeconds - currentDuration;
  const percentageReduced = baseDurationSeconds > 0 ? (totalTimeSavedSeconds / baseDurationSeconds) * 100 : 0;

  // Gem Economics
  // Original gems vs New gems
  const originalGems = calculateGemsForTime(baseDurationSeconds);
  const finalGems = calculateGemsForTime(currentDuration);
  const gemValueEquivalent = Math.max(0, originalGems - finalGems);

  // Builder potion cost in gems (Trader cost is 285 gems)
  const builderPotionGemCost = builderPotions * 285;
  
  // Total village gem equivalent: each builder's saved time has gem value!
  const singleBuilderSavedGems = gemValueEquivalent;
  const villageGemsEquivalent = Math.round(singleBuilderSavedGems * (activeBuilders >= 1 ? (activeBuilders * 0.85) : 1));
  const netGemProfit = villageGemsEquivalent - builderPotionGemCost;
  const gemRoiMultiplier = builderPotionGemCost > 0 ? Number((villageGemsEquivalent / builderPotionGemCost).toFixed(2)) : 1;

  // Collector & Gem Mine Boost
  // During boost, collectors run 10x faster (producing 9x bonus)
  const gm = GEM_MINE_DATA.find((g) => g.level === gemMineLevel) || GEM_MINE_DATA[GEM_MINE_DATA.length - 1];
  const totalBoostMinutesElapsed = ctScheduledBoosts * singleBoostMinutes;
  // Extra gems = (gems/hr / 60) * boostMinutes * 9
  const extraGemMineGems = Number(((gm.gemsPerHour / 60) * totalBoostMinutesElapsed * 9).toFixed(2));

  // Builder Gold & Elixir (Assuming Level 10 collectors produce 6,000/hr)
  const collectorRatePerHour = 6000;
  const extraBuilderGold = Math.round((collectorRatePerHour / 60) * totalBoostMinutesElapsed * 9);
  const extraBuilderElixir = extraBuilderGold;

  return {
    originalSeconds: baseDurationSeconds,
    builderPotionsUsed: builderPotions,
    builderPotionsHoursSavedPerBuilder: Number(builderPotionsHoursSavedPerBuilder.toFixed(1)),
    totalVillageHoursSaved: Number(totalVillageHoursSaved.toFixed(1)),
    activeBuildersCount: activeBuilders,

    clockTowerLevel,
    clockTowerBoostMinutes: singleBoostMinutes,
    clockTowerTimeSavedSeconds: ctTimeSavedSingleBoostSeconds,
    clockTowerDaysScheduled: ctScheduledBoosts,
    clockTowerTotalTimeSavedSeconds: totalCtTimeSavedSeconds,

    totalTimeSavedSeconds,
    finalDurationSeconds: currentDuration,
    percentageReduced: Number(percentageReduced.toFixed(1)),

    gemValueEquivalent: villageGemsEquivalent,
    builderPotionGemCost,
    netGemProfit,
    gemRoiMultiplier,

    extraBuilderGold,
    extraBuilderElixir,
    extraGemMineGems,
  };
};
