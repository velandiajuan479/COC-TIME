import { BuildingDefinition, BuildingLevelInfo, VillageType } from '../types/coc';

export interface HallLevelInfo {
  level: number;
  name: string;
  shortName: string;
  theme: string;
  colorClass: string;
  borderClass: string;
  badgeBg: string;
}

export const TOWN_HALL_LEVELS: HallLevelInfo[] = [
  { level: 1, name: 'Ayuntamiento 1', shortName: 'TH1', theme: 'Básico', colorClass: 'text-amber-400', borderClass: 'border-amber-500/40', badgeBg: 'bg-amber-500/10' },
  { level: 2, name: 'Ayuntamiento 2', shortName: 'TH2', theme: 'Madera', colorClass: 'text-amber-400', borderClass: 'border-amber-500/40', badgeBg: 'bg-amber-500/10' },
  { level: 3, name: 'Ayuntamiento 3', shortName: 'TH3', theme: 'Piedra', colorClass: 'text-slate-300', borderClass: 'border-slate-500/40', badgeBg: 'bg-slate-500/10' },
  { level: 4, name: 'Ayuntamiento 4', shortName: 'TH4', theme: 'Hierro', colorClass: 'text-slate-300', borderClass: 'border-slate-500/40', badgeBg: 'bg-slate-500/10' },
  { level: 5, name: 'Ayuntamiento 5', shortName: 'TH5', theme: 'Oro Antiguo', colorClass: 'text-amber-300', borderClass: 'border-amber-400/40', badgeBg: 'bg-amber-400/10' },
  { level: 6, name: 'Ayuntamiento 6', shortName: 'TH6', theme: 'Granito', colorClass: 'text-orange-400', borderClass: 'border-orange-500/40', badgeBg: 'bg-orange-500/10' },
  { level: 7, name: 'Ayuntamiento 7', shortName: 'TH7', theme: 'Elixir Oscuro', colorClass: 'text-purple-400', borderClass: 'border-purple-500/40', badgeBg: 'bg-purple-500/10' },
  { level: 8, name: 'Ayuntamiento 8', shortName: 'TH8', theme: 'Oro y Calaveras', colorClass: 'text-yellow-400', borderClass: 'border-yellow-500/40', badgeBg: 'bg-yellow-500/10' },
  { level: 9, name: 'Ayuntamiento 9', shortName: 'TH9', theme: 'Castillo Oscuro', colorClass: 'text-zinc-300', borderClass: 'border-zinc-500/50', badgeBg: 'bg-zinc-800' },
  { level: 10, name: 'Ayuntamiento 10', shortName: 'TH10', theme: 'Lava y Fuego', colorClass: 'text-red-400', borderClass: 'border-red-500/50', badgeBg: 'bg-red-500/15' },
  { level: 11, name: 'Ayuntamiento 11', shortName: 'TH11', theme: 'Mármol Blanco', colorClass: 'text-amber-200', borderClass: 'border-amber-200/50', badgeBg: 'bg-amber-100/10' },
  { level: 12, name: 'Ayuntamiento 12', shortName: 'TH12', theme: 'Electricidad Azul', colorClass: 'text-blue-400', borderClass: 'border-blue-500/50', badgeBg: 'bg-blue-500/15' },
  { level: 13, name: 'Ayuntamiento 13', shortName: 'TH13', theme: 'Hielo y Turquesa', colorClass: 'text-teal-300', borderClass: 'border-teal-500/50', badgeBg: 'bg-teal-500/15' },
  { level: 14, name: 'Ayuntamiento 14', shortName: 'TH14', theme: 'Selva Azteca', colorClass: 'text-emerald-400', borderClass: 'border-emerald-500/50', badgeBg: 'bg-emerald-500/15' },
  { level: 15, name: 'Ayuntamiento 15', shortName: 'TH15', theme: 'Magia Arcana', colorClass: 'text-fuchsia-400', borderClass: 'border-fuchsia-500/50', badgeBg: 'bg-fuchsia-500/15' },
  { level: 16, name: 'Ayuntamiento 16', shortName: 'TH16', theme: 'Naturaleza y Fusión', colorClass: 'text-orange-300', borderClass: 'border-orange-400/50', badgeBg: 'bg-orange-400/15' },
  { level: 17, name: 'Ayuntamiento 17', shortName: 'TH17', theme: 'Energía Solar y Cañón', colorClass: 'text-cyan-300', borderClass: 'border-cyan-400/50', badgeBg: 'bg-cyan-400/15' },
];

export const BUILDER_HALL_LEVELS: HallLevelInfo[] = [
  { level: 1, name: 'Taller Constructor 1', shortName: 'BH1', theme: 'Básico', colorClass: 'text-amber-400', borderClass: 'border-amber-500/40', badgeBg: 'bg-amber-500/10' },
  { level: 2, name: 'Taller Constructor 2', shortName: 'BH2', theme: 'Madera', colorClass: 'text-amber-400', borderClass: 'border-amber-500/40', badgeBg: 'bg-amber-500/10' },
  { level: 3, name: 'Taller Constructor 3', shortName: 'BH3', theme: 'Piedra', colorClass: 'text-slate-300', borderClass: 'border-slate-500/40', badgeBg: 'bg-slate-500/10' },
  { level: 4, name: 'Taller Constructor 4', shortName: 'BH4', theme: 'Torre del Reloj', colorClass: 'text-amber-300', borderClass: 'border-amber-400/40', badgeBg: 'bg-amber-400/10' },
  { level: 5, name: 'Taller Constructor 5', shortName: 'BH5', theme: 'Máquina Bélica', colorClass: 'text-yellow-400', borderClass: 'border-yellow-500/40', badgeBg: 'bg-yellow-500/10' },
  { level: 6, name: 'Taller Constructor 6', shortName: 'BH6', theme: 'Calcinador', colorClass: 'text-orange-400', borderClass: 'border-orange-500/40', badgeBg: 'bg-orange-500/10' },
  { level: 7, name: 'Taller Constructor 7', shortName: 'BH7', theme: 'Cañón Gigante', colorClass: 'text-red-400', borderClass: 'border-red-500/40', badgeBg: 'bg-red-500/10' },
  { level: 8, name: 'Taller Constructor 8', shortName: 'BH8', theme: 'Mega-Tesla', colorClass: 'text-blue-400', borderClass: 'border-blue-500/40', badgeBg: 'bg-blue-500/10' },
  { level: 9, name: 'Taller Constructor 9', shortName: 'BH9', theme: 'Choza de B.O.B', colorClass: 'text-purple-400', borderClass: 'border-purple-500/40', badgeBg: 'bg-purple-500/10' },
  { level: 10, name: 'Taller Constructor 10', shortName: 'BH10', theme: 'Electro-Helicóptero', colorClass: 'text-cyan-300', borderClass: 'border-cyan-400/50', badgeBg: 'bg-cyan-400/15' },
];

// Helper to construct level arrays easily
function createLevels(
  entries: { level: number; reqTH: number; d: number; h?: number; m?: number; s?: number; cost?: string }[]
): BuildingLevelInfo[] {
  return entries.map((e) => {
    const totalSeconds =
      (e.d || 0) * 86400 +
      (e.h || 0) * 3600 +
      (e.m || 0) * 60 +
      (e.s || 0);
    return {
      level: e.level,
      requiredTH: e.reqTH,
      durationSeconds: Math.max(10, totalSeconds),
      cost: e.cost,
    };
  });
}

export const BUILDINGS_CATALOG: BuildingDefinition[] = [
  // AYUNTAMIENTO
  {
    id: 'town-hall',
    name: 'Ayuntamiento',
    category: 'town_hall',
    village: 'home',
    iconName: 'Castle',
    unlockedAtTH: 1,
    maxLevel: 17,
    description: 'El corazón de tu aldea. Subir de nivel desbloquea nuevos edificios, héroes y defensas.',
    levels: createLevels([
      { level: 2, reqTH: 1, d: 0, h: 0, m: 0, s: 10, cost: '1,000 Oro' },
      { level: 3, reqTH: 2, d: 0, h: 1, m: 0, cost: '4,000 Oro' },
      { level: 4, reqTH: 3, d: 0, h: 3, m: 0, cost: '25,000 Oro' },
      { level: 5, reqTH: 4, d: 0, h: 6, m: 0, cost: '150,000 Oro' },
      { level: 6, reqTH: 5, d: 0, h: 12, m: 0, cost: '750,000 Oro' },
      { level: 7, reqTH: 6, d: 1, h: 0, cost: '1.2M Oro' },
      { level: 8, reqTH: 7, d: 2, h: 0, cost: '2M Oro' },
      { level: 9, reqTH: 8, d: 3, h: 0, cost: '3M Oro' },
      { level: 10, reqTH: 9, d: 4, h: 0, cost: '5M Oro' },
      { level: 11, reqTH: 10, d: 5, h: 0, cost: '7M Oro' },
      { level: 12, reqTH: 11, d: 6, h: 0, cost: '9.5M Oro' },
      { level: 13, reqTH: 12, d: 8, h: 0, cost: '12M Oro' },
      { level: 14, reqTH: 13, d: 10, h: 0, cost: '16M Oro' },
      { level: 15, reqTH: 14, d: 12, h: 0, cost: '18M Oro' },
      { level: 16, reqTH: 15, d: 14, h: 0, cost: '20M Oro' },
      { level: 17, reqTH: 16, d: 16, h: 0, cost: '21M Oro' },
    ]),
  },

  // CAÑÓN
  {
    id: 'cannon',
    name: 'Cañón',
    category: 'defense',
    village: 'home',
    iconName: 'ShieldAlert',
    unlockedAtTH: 1,
    maxLevel: 21,
    description: 'Defensa terrestre clásica de tiro continuo rápido.',
    levels: createLevels([
      { level: 1, reqTH: 1, d: 0, h: 0, m: 0, s: 10, cost: '250 Oro' },
      { level: 2, reqTH: 1, d: 0, h: 0, m: 1, cost: '1,000 Oro' },
      { level: 3, reqTH: 2, d: 0, h: 0, m: 10, cost: '4,000 Oro' },
      { level: 4, reqTH: 3, d: 0, h: 0, m: 45, cost: '16,000 Oro' },
      { level: 5, reqTH: 4, d: 0, h: 2, m: 0, cost: '50,000 Oro' },
      { level: 6, reqTH: 5, d: 0, h: 4, m: 0, cost: '100,000 Oro' },
      { level: 7, reqTH: 5, d: 0, h: 8, m: 0, cost: '200,000 Oro' },
      { level: 8, reqTH: 6, d: 0, h: 12, m: 0, cost: '400,000 Oro' },
      { level: 9, reqTH: 7, d: 0, h: 18, m: 0, cost: '800,000 Oro' },
      { level: 10, reqTH: 8, d: 1, h: 0, cost: '1.2M Oro' },
      { level: 11, reqTH: 9, d: 1, h: 12, cost: '1.8M Oro' },
      { level: 12, reqTH: 10, d: 2, h: 0, cost: '2.5M Oro' },
      { level: 13, reqTH: 10, d: 2, h: 12, cost: '3.5M Oro' },
      { level: 14, reqTH: 11, d: 3, h: 0, cost: '4.5M Oro' },
      { level: 15, reqTH: 11, d: 4, h: 0, cost: '6M Oro' },
      { level: 16, reqTH: 12, d: 5, h: 0, cost: '7.5M Oro' },
      { level: 17, reqTH: 12, d: 6, h: 0, cost: '9M Oro' },
      { level: 18, reqTH: 13, d: 7, h: 0, cost: '11M Oro' },
      { level: 19, reqTH: 13, d: 8, h: 0, cost: '13M Oro' },
      { level: 20, reqTH: 14, d: 10, h: 0, cost: '16M Oro' },
      { level: 21, reqTH: 15, d: 12, h: 0, cost: '18M Oro' },
    ]),
  },

  // TORRE DE ARQUERAS
  {
    id: 'archer-tower',
    name: 'Torre de Arqueras',
    category: 'defense',
    village: 'home',
    iconName: 'Crosshair',
    unlockedAtTH: 2,
    maxLevel: 21,
    description: 'Ataca objetivos terrestres y aéreos a gran distancia.',
    levels: createLevels([
      { level: 1, reqTH: 2, d: 0, h: 0, m: 1, cost: '1,000 Oro' },
      { level: 2, reqTH: 2, d: 0, h: 0, m: 10, cost: '2,000 Oro' },
      { level: 3, reqTH: 3, d: 0, h: 0, m: 30, cost: '5,000 Oro' },
      { level: 4, reqTH: 4, d: 0, h: 2, m: 0, cost: '20,000 Oro' },
      { level: 5, reqTH: 5, d: 0, h: 4, m: 0, cost: '80,000 Oro' },
      { level: 6, reqTH: 5, d: 0, h: 8, m: 0, cost: '180,000 Oro' },
      { level: 7, reqTH: 6, d: 0, h: 12, m: 0, cost: '360,000 Oro' },
      { level: 8, reqTH: 7, d: 0, h: 18, m: 0, cost: '720,000 Oro' },
      { level: 9, reqTH: 8, d: 1, h: 0, cost: '1M Oro' },
      { level: 10, reqTH: 8, d: 1, h: 12, cost: '1.5M Oro' },
      { level: 11, reqTH: 9, d: 2, h: 0, cost: '2.2M Oro' },
      { level: 12, reqTH: 10, d: 2, h: 12, cost: '3.2M Oro' },
      { level: 13, reqTH: 10, d: 3, h: 0, cost: '4.2M Oro' },
      { level: 14, reqTH: 11, d: 4, h: 0, cost: '5.5M Oro' },
      { level: 15, reqTH: 11, d: 5, h: 0, cost: '7M Oro' },
      { level: 16, reqTH: 12, d: 6, h: 0, cost: '8.5M Oro' },
      { level: 17, reqTH: 12, d: 7, h: 0, cost: '10M Oro' },
      { level: 18, reqTH: 13, d: 8, h: 0, cost: '12M Oro' },
      { level: 19, reqTH: 13, d: 9, h: 0, cost: '14M Oro' },
      { level: 20, reqTH: 14, d: 10, h: 0, cost: '16.5M Oro' },
      { level: 21, reqTH: 15, d: 12, h: 0, cost: '18.5M Oro' },
    ]),
  },

  // MORTERO
  {
    id: 'mortar',
    name: 'Mortero',
    category: 'defense',
    village: 'home',
    iconName: 'Target',
    unlockedAtTH: 3,
    maxLevel: 16,
    description: 'Proyectiles de área devastadores contra grupos de tropas terrestres.',
    levels: createLevels([
      { level: 1, reqTH: 3, d: 0, h: 1, m: 0, cost: '8,000 Oro' },
      { level: 2, reqTH: 4, d: 0, h: 4, m: 0, cost: '32,000 Oro' },
      { level: 3, reqTH: 5, d: 0, h: 8, m: 0, cost: '120,000 Oro' },
      { level: 4, reqTH: 6, d: 0, h: 16, m: 0, cost: '400,000 Oro' },
      { level: 5, reqTH: 7, d: 1, h: 0, cost: '800,000 Oro' },
      { level: 6, reqTH: 8, d: 1, h: 12, cost: '1.4M Oro' },
      { level: 7, reqTH: 9, d: 2, h: 12, cost: '2.5M Oro' },
      { level: 8, reqTH: 10, d: 3, h: 12, cost: '4M Oro' },
      { level: 9, reqTH: 11, d: 5, h: 0, cost: '6M Oro' },
      { level: 10, reqTH: 11, d: 6, h: 0, cost: '8M Oro' },
      { level: 11, reqTH: 12, d: 7, h: 0, cost: '10M Oro' },
      { level: 12, reqTH: 12, d: 8, h: 0, cost: '12M Oro' },
      { level: 13, reqTH: 13, d: 9, h: 0, cost: '14M Oro' },
      { level: 14, reqTH: 14, d: 10, h: 12, cost: '16M Oro' },
      { level: 15, reqTH: 15, d: 12, h: 0, cost: '18M Oro' },
      { level: 16, reqTH: 16, d: 13, h: 0, cost: '19.5M Oro' },
    ]),
  },

  // COHETES ANTIAÉREOS
  {
    id: 'air-defense',
    name: 'Cohetes Antiaéreos',
    category: 'defense',
    village: 'home',
    iconName: 'Flame',
    unlockedAtTH: 4,
    maxLevel: 14,
    description: 'La pesadilla de dragones, globos y tropas voladoras.',
    levels: createLevels([
      { level: 1, reqTH: 4, d: 0, h: 2, m: 0, cost: '22,500 Oro' },
      { level: 2, reqTH: 4, d: 0, h: 6, m: 0, cost: '90,000 Oro' },
      { level: 3, reqTH: 5, d: 0, h: 12, m: 0, cost: '270,000 Oro' },
      { level: 4, reqTH: 6, d: 1, h: 0, cost: '700,000 Oro' },
      { level: 5, reqTH: 7, d: 1, h: 12, cost: '1.4M Oro' },
      { level: 6, reqTH: 8, d: 2, h: 0, cost: '2.1M Oro' },
      { level: 7, reqTH: 9, d: 3, h: 0, cost: '3.2M Oro' },
      { level: 8, reqTH: 10, d: 4, h: 0, cost: '4.8M Oro' },
      { level: 9, reqTH: 11, d: 5, h: 12, cost: '7M Oro' },
      { level: 10, reqTH: 12, d: 7, h: 0, cost: '9.5M Oro' },
      { level: 11, reqTH: 13, d: 8, h: 12, cost: '12.5M Oro' },
      { level: 12, reqTH: 14, d: 10, h: 0, cost: '15.5M Oro' },
      { level: 13, reqTH: 15, d: 11, h: 12, cost: '17.5M Oro' },
      { level: 14, reqTH: 16, d: 13, h: 0, cost: '19.5M Oro' },
    ]),
  },

  // TORRE DE MAGOS
  {
    id: 'wizard-tower',
    name: 'Torre de Magos',
    category: 'defense',
    village: 'home',
    iconName: 'Sparkles',
    unlockedAtTH: 5,
    maxLevel: 16,
    description: 'Dispara rayos arcanos de salpicadura a tierra y aire.',
    levels: createLevels([
      { level: 1, reqTH: 5, d: 0, h: 5, m: 0, cost: '180,000 Oro' },
      { level: 2, reqTH: 5, d: 0, h: 12, m: 0, cost: '360,000 Oro' },
      { level: 3, reqTH: 6, d: 0, h: 18, m: 0, cost: '720,000 Oro' },
      { level: 4, reqTH: 7, d: 1, h: 0, cost: '1.3M Oro' },
      { level: 5, reqTH: 8, d: 1, h: 12, cost: '2M Oro' },
      { level: 6, reqTH: 8, d: 2, h: 0, cost: '2.8M Oro' },
      { level: 7, reqTH: 9, d: 2, h: 12, cost: '3.8M Oro' },
      { level: 8, reqTH: 10, d: 3, h: 12, cost: '5.2M Oro' },
      { level: 9, reqTH: 10, d: 4, h: 12, cost: '6.8M Oro' },
      { level: 10, reqTH: 11, d: 6, h: 0, cost: '8.8M Oro' },
      { level: 11, reqTH: 12, d: 7, h: 12, cost: '11M Oro' },
      { level: 12, reqTH: 12, d: 8, h: 12, cost: '13M Oro' },
      { level: 13, reqTH: 13, d: 10, h: 0, cost: '15M Oro' },
      { level: 14, reqTH: 14, d: 11, h: 0, cost: '17M Oro' },
      { level: 15, reqTH: 15, d: 12, h: 12, cost: '19M Oro' },
      { level: 16, reqTH: 16, d: 13, h: 12, cost: '20.5M Oro' },
    ]),
  },

  // TORRE TESLA OCULTA
  {
    id: 'hidden-tesla',
    name: 'Torre Tesla Oculta',
    category: 'defense',
    village: 'home',
    iconName: 'Zap',
    unlockedAtTH: 7,
    maxLevel: 14,
    description: 'Permanece oculta bajo tierra hasta que las tropas se aproximan.',
    levels: createLevels([
      { level: 1, reqTH: 7, d: 0, h: 12, m: 0, cost: '1M Oro' },
      { level: 2, reqTH: 7, d: 0, h: 18, m: 0, cost: '1.5M Oro' },
      { level: 3, reqTH: 7, d: 1, h: 0, cost: '2M Oro' },
      { level: 4, reqTH: 8, d: 1, h: 12, cost: '2.5M Oro' },
      { level: 5, reqTH: 8, d: 2, h: 0, cost: '3M Oro' },
      { level: 6, reqTH: 8, d: 2, h: 12, cost: '3.6M Oro' },
      { level: 7, reqTH: 9, d: 3, h: 12, cost: '4.5M Oro' },
      { level: 8, reqTH: 10, d: 4, h: 12, cost: '6M Oro' },
      { level: 9, reqTH: 11, d: 6, h: 0, cost: '8M Oro' },
      { level: 10, reqTH: 12, d: 7, h: 12, cost: '10.5M Oro' },
      { level: 11, reqTH: 13, d: 9, h: 0, cost: '13M Oro' },
      { level: 12, reqTH: 14, d: 10, h: 12, cost: '15.5M Oro' },
      { level: 13, reqTH: 15, d: 12, h: 0, cost: '18M Oro' },
      { level: 14, reqTH: 16, d: 13, h: 0, cost: '19.5M Oro' },
    ]),
  },

  // BALLESTA
  {
    id: 'x-bow',
    name: 'Ballesta',
    category: 'defense',
    village: 'home',
    iconName: 'Crosshair',
    unlockedAtTH: 9,
    maxLevel: 11,
    description: 'Cadencia ultra rápida con selector de modo tierra o tierra y aire.',
    levels: createLevels([
      { level: 1, reqTH: 9, d: 2, h: 0, cost: '3M Oro' },
      { level: 2, reqTH: 9, d: 2, h: 12, cost: '4.2M Oro' },
      { level: 3, reqTH: 9, d: 3, h: 0, cost: '5.5M Oro' },
      { level: 4, reqTH: 10, d: 4, h: 0, cost: '7M Oro' },
      { level: 5, reqTH: 11, d: 5, h: 12, cost: '9M Oro' },
      { level: 6, reqTH: 12, d: 7, h: 0, cost: '11.5M Oro' },
      { level: 7, reqTH: 13, d: 8, h: 12, cost: '14M Oro' },
      { level: 8, reqTH: 13, d: 9, h: 12, cost: '16M Oro' },
      { level: 9, reqTH: 14, d: 10, h: 12, cost: '18M Oro' },
      { level: 10, reqTH: 15, d: 12, h: 0, cost: '19.5M Oro' },
      { level: 11, reqTH: 16, d: 13, h: 12, cost: '21M Oro' },
    ]),
  },

  // TORRE INFERNAL
  {
    id: 'inferno-tower',
    name: 'Torre Infernal',
    category: 'defense',
    village: 'home',
    iconName: 'Flame',
    unlockedAtTH: 10,
    maxLevel: 10,
    description: 'Modo único que derrite héroes o modo múltiple que frena enjambres.',
    levels: createLevels([
      { level: 1, reqTH: 10, d: 3, h: 0, cost: '5M Oro' },
      { level: 2, reqTH: 10, d: 3, h: 12, cost: '6.5M Oro' },
      { level: 3, reqTH: 10, d: 4, h: 0, cost: '8M Oro' },
      { level: 4, reqTH: 11, d: 5, h: 12, cost: '10M Oro' },
      { level: 5, reqTH: 11, d: 6, h: 12, cost: '12M Oro' },
      { level: 6, reqTH: 12, d: 8, h: 0, cost: '14.5M Oro' },
      { level: 7, reqTH: 13, d: 9, h: 12, cost: '17M Oro' },
      { level: 8, reqTH: 14, d: 11, h: 0, cost: '19M Oro' },
      { level: 9, reqTH: 15, d: 12, h: 12, cost: '20.5M Oro' },
      { level: 10, reqTH: 16, d: 13, h: 12, cost: '22M Oro' },
    ]),
  },

  // ÁGUILA DE ARTILLERÍA
  {
    id: 'eagle-artillery',
    name: 'Águila de Artillería',
    category: 'defense',
    village: 'home',
    iconName: 'ShieldAlert',
    unlockedAtTH: 11,
    maxLevel: 7,
    description: 'Se activa al desplegar suficiente ejército y bombardea todo el mapa.',
    levels: createLevels([
      { level: 1, reqTH: 11, d: 6, h: 0, cost: '8M Oro' },
      { level: 2, reqTH: 11, d: 7, h: 12, cost: '10M Oro' },
      { level: 3, reqTH: 12, d: 9, h: 12, cost: '13M Oro' },
      { level: 4, reqTH: 13, d: 11, h: 0, cost: '16M Oro' },
      { level: 5, reqTH: 14, d: 13, h: 0, cost: '19M Oro' },
      { level: 6, reqTH: 15, d: 15, h: 0, cost: '21M Oro' },
      { level: 7, reqTH: 16, d: 16, h: 0, cost: '23M Oro' },
    ]),
  },

  // CATAPULTA (SCATTERSHOT)
  {
    id: 'scattershot',
    name: 'Catapulta',
    category: 'defense',
    village: 'home',
    iconName: 'Target',
    unlockedAtTH: 13,
    maxLevel: 5,
    description: 'Dispara pesadas rocas que estallan en esquirlas detrás del objetivo impactado.',
    levels: createLevels([
      { level: 1, reqTH: 13, d: 9, h: 0, cost: '15M Oro' },
      { level: 2, reqTH: 13, d: 10, h: 12, cost: '17M Oro' },
      { level: 3, reqTH: 14, d: 11, h: 12, cost: '19M Oro' },
      { level: 4, reqTH: 15, d: 12, h: 12, cost: '21M Oro' },
      { level: 5, reqTH: 16, d: 14, h: 0, cost: '23M Oro' },
    ]),
  },

  // MONOLITO
  {
    id: 'monolith',
    name: 'Monolito',
    category: 'defense',
    village: 'home',
    iconName: 'Zap',
    unlockedAtTH: 15,
    maxLevel: 3,
    description: 'Imbuido de Elixir Oscuro, inflige daño fijo más daño porcentual por salud.',
    levels: createLevels([
      { level: 1, reqTH: 15, d: 11, h: 0, cost: '300,000 Elixir Oscuro' },
      { level: 2, reqTH: 15, d: 13, h: 0, cost: '340,000 Elixir Oscuro' },
      { level: 3, reqTH: 16, d: 14, h: 0, cost: '380,000 Elixir Oscuro' },
    ]),
  },

  // TORRE DE HECHIZOS
  {
    id: 'spell-tower',
    name: 'Torre de Hechizos',
    category: 'defense',
    village: 'home',
    iconName: 'FlaskConical',
    unlockedAtTH: 15,
    maxLevel: 4,
    description: 'Lanza hechizos defensivos (Rabia, Invisibilidad, Veneno) a su alrededor.',
    levels: createLevels([
      { level: 1, reqTH: 15, d: 9, h: 0, cost: '14M Oro' },
      { level: 2, reqTH: 15, d: 11, h: 0, cost: '16M Oro' },
      { level: 3, reqTH: 15, d: 12, h: 0, cost: '18M Oro' },
      { level: 4, reqTH: 16, d: 13, h: 12, cost: '20.5M Oro' },
    ]),
  },

  // CASTILLO DEL CLAN
  {
    id: 'clan-castle',
    name: 'Castillo del Clan',
    category: 'defense',
    village: 'home',
    iconName: 'Home',
    unlockedAtTH: 2,
    maxLevel: 12,
    description: 'Alberga tropas defensoras y de refuerzo donadas por tus compañeros de clan.',
    levels: createLevels([
      { level: 1, reqTH: 2, d: 0, h: 0, m: 0, s: 10, cost: '10,000 Oro' },
      { level: 2, reqTH: 4, d: 0, h: 2, m: 0, cost: '100,000 Oro' },
      { level: 3, reqTH: 6, d: 0, h: 8, m: 0, cost: '800,000 Oro' },
      { level: 4, reqTH: 8, d: 1, h: 0, cost: '1.8M Oro' },
      { level: 5, reqTH: 9, d: 2, h: 0, cost: '3.5M Elixir' },
      { level: 6, reqTH: 10, d: 3, h: 0, cost: '5.5M Elixir' },
      { level: 7, reqTH: 11, d: 5, h: 0, cost: '8.5M Elixir' },
      { level: 8, reqTH: 12, d: 7, h: 0, cost: '11M Elixir' },
      { level: 9, reqTH: 13, d: 9, h: 0, cost: '14M Elixir' },
      { level: 10, reqTH: 14, d: 11, h: 0, cost: '17M Elixir' },
      { level: 11, reqTH: 15, d: 13, h: 0, cost: '19.5M Elixir' },
      { level: 12, reqTH: 16, d: 14, h: 0, cost: '22M Elixir' },
    ]),
  },

  // LABORATORIO
  {
    id: 'laboratory',
    name: 'Laboratorio',
    category: 'laboratory',
    village: 'home',
    iconName: 'FlaskConical',
    unlockedAtTH: 3,
    maxLevel: 15,
    description: 'Investiga y sube el poder de tus tropas, hechizos y máquinas de asedio.',
    levels: createLevels([
      { level: 1, reqTH: 3, d: 0, h: 0, m: 30, cost: '25,000 Elixir' },
      { level: 2, reqTH: 4, d: 0, h: 2, m: 0, cost: '50,000 Elixir' },
      { level: 3, reqTH: 5, d: 0, h: 5, m: 0, cost: '150,000 Elixir' },
      { level: 4, reqTH: 6, d: 0, h: 12, m: 0, cost: '500,000 Elixir' },
      { level: 5, reqTH: 7, d: 1, h: 0, cost: '1M Elixir' },
      { level: 6, reqTH: 8, d: 1, h: 12, cost: '1.6M Elixir' },
      { level: 7, reqTH: 9, d: 2, h: 12, cost: '2.8M Elixir' },
      { level: 8, reqTH: 10, d: 3, h: 12, cost: '4.5M Elixir' },
      { level: 9, reqTH: 11, d: 5, h: 0, cost: '7M Elixir' },
      { level: 10, reqTH: 12, d: 7, h: 0, cost: '9.5M Elixir' },
      { level: 11, reqTH: 13, d: 9, h: 0, cost: '12M Elixir' },
      { level: 12, reqTH: 14, d: 11, h: 0, cost: '15M Elixir' },
      { level: 13, reqTH: 15, d: 12, h: 12, cost: '18M Elixir' },
      { level: 14, reqTH: 16, d: 13, h: 12, cost: '20M Elixir' },
      { level: 15, reqTH: 17, d: 14, h: 0, cost: '21.5M Elixir' },
    ]),
  },

  // CAMPAMENTO
  {
    id: 'army-camp',
    name: 'Campamento',
    category: 'army',
    village: 'home',
    iconName: 'Hammer',
    unlockedAtTH: 1,
    maxLevel: 12,
    description: 'Aumenta el tamaño total de tu ejército atacante.',
    levels: createLevels([
      { level: 1, reqTH: 1, d: 0, h: 0, m: 2, cost: '250 Elixir' },
      { level: 2, reqTH: 2, d: 0, h: 0, m: 5, cost: '2,500 Elixir' },
      { level: 3, reqTH: 3, d: 0, h: 1, m: 0, cost: '10,000 Elixir' },
      { level: 4, reqTH: 4, d: 0, h: 3, m: 0, cost: '100,000 Elixir' },
      { level: 5, reqTH: 5, d: 0, h: 6, m: 0, cost: '250,000 Elixir' },
      { level: 6, reqTH: 6, d: 0, h: 12, m: 0, cost: '750,000 Elixir' },
      { level: 7, reqTH: 7, d: 1, h: 0, cost: '1.5M Elixir' },
      { level: 8, reqTH: 9, d: 2, h: 0, cost: '2.5M Elixir' },
      { level: 9, reqTH: 10, d: 4, h: 0, cost: '5M Elixir' },
      { level: 10, reqTH: 11, d: 6, h: 0, cost: '8M Elixir' },
      { level: 11, reqTH: 13, d: 8, h: 0, cost: '13M Elixir' },
      { level: 12, reqTH: 15, d: 11, h: 0, cost: '19M Elixir' },
    ]),
  },

  // REY BÁRBARO
  {
    id: 'barbarian-king',
    name: 'Rey Bárbaro',
    category: 'hero',
    village: 'home',
    iconName: 'Crown',
    unlockedAtTH: 7,
    maxLevel: 95,
    description: 'El coloso guerrero de primera línea. Aumenta su salud, daño y habilidades.',
    levels: Array.from({ length: 95 }, (_, i) => {
      const lvl = i + 1;
      let reqTH = 7;
      if (lvl > 10) reqTH = 8;
      if (lvl > 20) reqTH = 9;
      if (lvl > 30) reqTH = 10;
      if (lvl > 40) reqTH = 11;
      if (lvl > 50) reqTH = 12;
      if (lvl > 65) reqTH = 13;
      if (lvl > 75) reqTH = 14;
      if (lvl > 80) reqTH = 15;
      if (lvl > 90) reqTH = 16;

      // Realistic CoC hero durations curve
      let durationHours = 6;
      if (lvl <= 5) durationHours = 6;
      else if (lvl <= 10) durationHours = 12;
      else if (lvl <= 20) durationHours = 24;
      else if (lvl <= 35) durationHours = 36;
      else if (lvl <= 50) durationHours = 60;
      else if (lvl <= 65) durationHours = 96;
      else if (lvl <= 80) durationHours = 144;
      else durationHours = 192; // 8 days

      return {
        level: lvl,
        requiredTH: reqTH,
        durationSeconds: durationHours * 3600,
        cost: `${Math.min(350, Math.round(10 + lvl * 3.5))}K Elixir Oscuro`,
      };
    }),
  },

  // REINA ARQUERA
  {
    id: 'archer-queen',
    name: 'Reina Arquera',
    category: 'hero',
    village: 'home',
    iconName: 'Crown',
    unlockedAtTH: 9,
    maxLevel: 95,
    description: 'Ataque a gran distancia de altísimo daño concentrado.',
    levels: Array.from({ length: 95 }, (_, i) => {
      const lvl = i + 1;
      let reqTH = 9;
      if (lvl > 30) reqTH = 10;
      if (lvl > 40) reqTH = 11;
      if (lvl > 50) reqTH = 12;
      if (lvl > 65) reqTH = 13;
      if (lvl > 75) reqTH = 14;
      if (lvl > 80) reqTH = 15;
      if (lvl > 90) reqTH = 16;

      let durationHours = 8;
      if (lvl <= 5) durationHours = 8;
      else if (lvl <= 15) durationHours = 16;
      else if (lvl <= 30) durationHours = 36;
      else if (lvl <= 50) durationHours = 72;
      else if (lvl <= 65) durationHours = 108;
      else if (lvl <= 80) durationHours = 144;
      else durationHours = 192;

      return {
        level: lvl,
        requiredTH: reqTH,
        durationSeconds: durationHours * 3600,
        cost: `${Math.min(360, Math.round(15 + lvl * 3.6))}K Elixir Oscuro`,
      };
    }),
  },

  // GRAN CENTINELA
  {
    id: 'grand-warden',
    name: 'Gran Centinela',
    category: 'hero',
    village: 'home',
    iconName: 'Sparkles',
    unlockedAtTH: 11,
    maxLevel: 70,
    description: 'Héroe de apoyo arcano que otorga vida extra y el Tomo Eterno.',
    levels: Array.from({ length: 70 }, (_, i) => {
      const lvl = i + 1;
      let reqTH = 11;
      if (lvl > 20) reqTH = 12;
      if (lvl > 40) reqTH = 13;
      if (lvl > 50) reqTH = 14;
      if (lvl > 55) reqTH = 15;
      if (lvl > 65) reqTH = 16;

      let durationHours = 12;
      if (lvl <= 5) durationHours = 12;
      else if (lvl <= 15) durationHours = 24;
      else if (lvl <= 30) durationHours = 60;
      else if (lvl <= 45) durationHours = 108;
      else if (lvl <= 60) durationHours = 144;
      else durationHours = 192;

      return {
        level: lvl,
        requiredTH: reqTH,
        durationSeconds: durationHours * 3600,
        cost: `${Math.min(22, Math.round(3 + lvl * 0.28))}M Elixir`,
      };
    }),
  },

  // LUCHADORA REAL
  {
    id: 'royal-champion',
    name: 'Luchadora Real',
    category: 'hero',
    village: 'home',
    iconName: 'ShieldAlert',
    unlockedAtTH: 13,
    maxLevel: 45,
    description: 'Salta muros y lanza su escudo teledirigido directo contra las defensas.',
    levels: Array.from({ length: 45 }, (_, i) => {
      const lvl = i + 1;
      let reqTH = 13;
      if (lvl > 25) reqTH = 14;
      if (lvl > 30) reqTH = 15;
      if (lvl > 40) reqTH = 16;

      let durationHours = 36;
      if (lvl <= 5) durationHours = 36;
      else if (lvl <= 15) durationHours = 72;
      else if (lvl <= 25) durationHours = 120;
      else durationHours = 192;

      return {
        level: lvl,
        requiredTH: reqTH,
        durationSeconds: durationHours * 3600,
        cost: `${Math.min(380, Math.round(80 + lvl * 6.6))}K Elixir Oscuro`,
      };
    }),
  },

  // ===================== BASE DEL CONSTRUCTOR =====================
  // TALLER DEL CONSTRUCTOR
  {
    id: 'builder-hall',
    name: 'Taller del Constructor',
    category: 'town_hall',
    village: 'builder_base',
    iconName: 'Hammer',
    unlockedAtTH: 1,
    maxLevel: 10,
    description: 'El centro neurálgico de la Base del Constructor.',
    levels: createLevels([
      { level: 2, reqTH: 1, d: 0, h: 0, m: 0, s: 10, cost: '3,500 Oro' },
      { level: 3, reqTH: 2, d: 0, h: 0, m: 5, cost: '30,000 Oro' },
      { level: 4, reqTH: 3, d: 0, h: 1, m: 0, cost: '200,000 Oro' },
      { level: 5, reqTH: 4, d: 0, h: 8, m: 0, cost: '400,000 Oro' },
      { level: 6, reqTH: 5, d: 1, h: 0, cost: '1.2M Oro' },
      { level: 7, reqTH: 6, d: 2, h: 0, cost: '1.8M Oro' },
      { level: 8, reqTH: 7, d: 3, h: 0, cost: '2.8M Oro' },
      { level: 9, reqTH: 8, d: 4, h: 0, cost: '3.8M Oro' },
      { level: 10, reqTH: 9, d: 6, h: 0, cost: '4.8M Oro' },
    ]),
  },

  // TORRE DEL RELOJ
  {
    id: 'clock-tower',
    name: 'Torre del Reloj',
    category: 'defense',
    village: 'builder_base',
    iconName: 'Clock',
    unlockedAtTH: 4,
    maxLevel: 10,
    description: 'Acelera el tiempo de toda la base 10x cada día.',
    levels: createLevels([
      { level: 1, reqTH: 4, d: 0, h: 2, m: 0, cost: '150,000 Oro' },
      { level: 2, reqTH: 4, d: 0, h: 6, m: 0, cost: '250,000 Oro' },
      { level: 3, reqTH: 5, d: 0, h: 12, m: 0, cost: '500,000 Oro' },
      { level: 4, reqTH: 6, d: 1, h: 0, cost: '800,000 Oro' },
      { level: 5, reqTH: 7, d: 1, h: 12, cost: '1.2M Oro' },
      { level: 6, reqTH: 8, d: 2, h: 0, cost: '1.6M Oro' },
      { level: 7, reqTH: 9, d: 3, h: 0, cost: '2.2M Oro' },
      { level: 8, reqTH: 9, d: 4, h: 0, cost: '2.8M Oro' },
      { level: 9, reqTH: 10, d: 5, h: 0, cost: '3.5M Oro' },
      { level: 10, reqTH: 10, d: 6, h: 0, cost: '4.2M Oro' },
    ]),
  },

  // MEGA-TESLA
  {
    id: 'mega-tesla',
    name: 'Mega-Tesla',
    category: 'defense',
    village: 'builder_base',
    iconName: 'Zap',
    unlockedAtTH: 8,
    maxLevel: 10,
    description: 'Dispara rayos gigantescos de alto voltaje. Requisito clave para desbloquear a B.O.B.',
    levels: createLevels([
      { level: 1, reqTH: 8, d: 1, h: 0, cost: '2.5M Oro' },
      { level: 2, reqTH: 8, d: 1, h: 12, cost: '2.8M Oro' },
      { level: 3, reqTH: 8, d: 2, h: 0, cost: '3.2M Oro' },
      { level: 4, reqTH: 8, d: 2, h: 12, cost: '3.6M Oro' },
      { level: 5, reqTH: 8, d: 3, h: 0, cost: '4M Oro' },
      { level: 6, reqTH: 8, d: 3, h: 12, cost: '4.4M Oro' },
      { level: 7, reqTH: 9, d: 4, h: 0, cost: '4.8M Oro' },
      { level: 8, reqTH: 9, d: 5, h: 0, cost: '5.2M Oro' },
      { level: 9, reqTH: 9, d: 6, h: 0, cost: '5.6M Oro' },
      { level: 10, reqTH: 10, d: 7, h: 0, cost: '6.2M Oro' },
    ]),
  },

  // CALCINADOR (ROASTER)
  {
    id: 'roaster',
    name: 'Calcinador',
    category: 'defense',
    village: 'builder_base',
    iconName: 'Flame',
    unlockedAtTH: 6,
    maxLevel: 10,
    description: 'Lanza continuas llamaradas de fuego que calcinan tanto tropas terrestres como aéreas.',
    levels: createLevels([
      { level: 1, reqTH: 6, d: 0, h: 12, m: 0, cost: '1.2M Oro' },
      { level: 2, reqTH: 6, d: 1, h: 0, cost: '1.5M Oro' },
      { level: 3, reqTH: 6, d: 1, h: 12, cost: '1.8M Oro' },
      { level: 4, reqTH: 7, d: 2, h: 0, cost: '2.2M Oro' },
      { level: 5, reqTH: 7, d: 2, h: 12, cost: '2.6M Oro' },
      { level: 6, reqTH: 8, d: 3, h: 0, cost: '3M Oro' },
      { level: 7, reqTH: 8, d: 3, h: 12, cost: '3.5M Oro' },
      { level: 8, reqTH: 9, d: 4, h: 0, cost: '4M Oro' },
      { level: 9, reqTH: 9, d: 5, h: 0, cost: '4.5M Oro' },
      { level: 10, reqTH: 10, d: 6, h: 0, cost: '5.2M Oro' },
    ]),
  },

  // MACHACADOR (CRUSHER)
  {
    id: 'crusher',
    name: 'Machacador',
    category: 'defense',
    village: 'builder_base',
    iconName: 'ShieldAlert',
    unlockedAtTH: 3,
    maxLevel: 10,
    description: 'Aplasta implacablemente a cualquier tropa que se atreva a pisar su radio.',
    levels: createLevels([
      { level: 1, reqTH: 3, d: 0, h: 1, m: 0, cost: '35,000 Oro' },
      { level: 2, reqTH: 3, d: 0, h: 4, m: 0, cost: '100,000 Oro' },
      { level: 3, reqTH: 4, d: 0, h: 8, m: 0, cost: '250,000 Oro' },
      { level: 4, reqTH: 5, d: 0, h: 16, m: 0, cost: '500,000 Oro' },
      { level: 5, reqTH: 6, d: 1, h: 0, cost: '1M Oro' },
      { level: 6, reqTH: 7, d: 1, h: 12, cost: '1.6M Oro' },
      { level: 7, reqTH: 8, d: 2, h: 0, cost: '2.2M Oro' },
      { level: 8, reqTH: 9, d: 3, h: 0, cost: '3M Oro' },
      { level: 9, reqTH: 9, d: 4, h: 0, cost: '3.8M Oro' },
      { level: 10, reqTH: 10, d: 5, h: 0, cost: '4.6M Oro' },
    ]),
  },

  // MINA DE GEMAS
  {
    id: 'gem-mine',
    name: 'Mina de Gemas',
    category: 'resource',
    village: 'builder_base',
    iconName: 'Gem',
    unlockedAtTH: 3,
    maxLevel: 10,
    description: 'Extrae gemas verdes puras lentamente de las profundidades.',
    levels: createLevels([
      { level: 1, reqTH: 3, d: 0, h: 1, m: 0, cost: '120,000 Elixir' },
      { level: 2, reqTH: 4, d: 0, h: 4, m: 0, cost: '200,000 Elixir' },
      { level: 3, reqTH: 5, d: 0, h: 8, m: 0, cost: '350,000 Elixir' },
      { level: 4, reqTH: 6, d: 0, h: 16, m: 0, cost: '600,000 Elixir' },
      { level: 5, reqTH: 7, d: 1, h: 0, cost: '1M Elixir' },
      { level: 6, reqTH: 8, d: 1, h: 12, cost: '1.5M Elixir' },
      { level: 7, reqTH: 9, d: 2, h: 0, cost: '2.2M Elixir' },
      { level: 8, reqTH: 9, d: 3, h: 0, cost: '3M Elixir' },
      { level: 9, reqTH: 10, d: 4, h: 0, cost: '3.8M Elixir' },
      { level: 10, reqTH: 10, d: 5, h: 0, cost: '4.8M Elixir' },
    ]),
  },

  // MÁQUINA BÉLICA
  {
    id: 'battle-machine',
    name: 'Máquina Bélica',
    category: 'hero',
    village: 'builder_base',
    iconName: 'Wrench',
    unlockedAtTH: 5,
    maxLevel: 35,
    description: 'El poderoso meca tripulado por el Maestro Constructor con Martillo Eléctrico.',
    levels: Array.from({ length: 35 }, (_, i) => {
      const lvl = i + 1;
      let reqTH = 5;
      if (lvl > 5) reqTH = 6;
      if (lvl > 10) reqTH = 7;
      if (lvl > 20) reqTH = 8;
      if (lvl > 25) reqTH = 9;
      if (lvl > 30) reqTH = 10;

      let durationHours = 8;
      if (lvl <= 5) durationHours = 8;
      else if (lvl <= 10) durationHours = 16;
      else if (lvl <= 20) durationHours = 36;
      else if (lvl <= 30) durationHours = 72;
      else durationHours = 120; // 5 days

      return {
        level: lvl,
        requiredTH: reqTH,
        durationSeconds: durationHours * 3600,
        cost: `${Math.min(5, parseFloat((1 + lvl * 0.12).toFixed(1)))}M Elixir`,
      };
    }),
  },
];
