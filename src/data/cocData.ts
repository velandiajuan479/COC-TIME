import { ClockTowerLevel, UpgradePreset, GemMineStats } from '../types/coc';

export const CLOCK_TOWER_LEVELS: ClockTowerLevel[] = [
  { level: 1, requiredBH: 4, durationMinutes: 3, timeSavedMinutes: 27, freeBoostCooldownHours: 22 },
  { level: 2, requiredBH: 4, durationMinutes: 4, timeSavedMinutes: 36, freeBoostCooldownHours: 22 },
  { level: 3, requiredBH: 5, durationMinutes: 5, timeSavedMinutes: 45, freeBoostCooldownHours: 22 },
  { level: 4, requiredBH: 6, durationMinutes: 6, timeSavedMinutes: 54, freeBoostCooldownHours: 22 },
  { level: 5, requiredBH: 7, durationMinutes: 7, timeSavedMinutes: 63, freeBoostCooldownHours: 22 },
  { level: 6, requiredBH: 8, durationMinutes: 8, timeSavedMinutes: 72, freeBoostCooldownHours: 22 },
  { level: 7, requiredBH: 9, durationMinutes: 9, timeSavedMinutes: 81, freeBoostCooldownHours: 22 },
  { level: 8, requiredBH: 9, durationMinutes: 10, timeSavedMinutes: 90, freeBoostCooldownHours: 22 },
  { level: 9, requiredBH: 10, durationMinutes: 11, timeSavedMinutes: 99, freeBoostCooldownHours: 22 },
  { level: 10, requiredBH: 10, durationMinutes: 12, timeSavedMinutes: 108, freeBoostCooldownHours: 22 },
];

export const CLOCK_TOWER_POTION_DURATION_MINUTES = 30; // 30 min at 10x -> saves 270 min (4h 30m)

export const GEM_MINE_DATA: GemMineStats[] = [
  { level: 1, gemsPerHour: 0.088, capacity: 10 },
  { level: 2, gemsPerHour: 0.104, capacity: 11 },
  { level: 3, gemsPerHour: 0.120, capacity: 12 },
  { level: 4, gemsPerHour: 0.136, capacity: 13 },
  { level: 5, gemsPerHour: 0.152, capacity: 14 },
  { level: 6, gemsPerHour: 0.168, capacity: 16 },
  { level: 7, gemsPerHour: 0.184, capacity: 18 },
  { level: 8, gemsPerHour: 0.200, capacity: 20 },
  { level: 9, gemsPerHour: 0.216, capacity: 22 },
  { level: 10, gemsPerHour: 0.231, capacity: 24 },
];

export const UPGRADE_PRESETS: UpgradePreset[] = [
  // Aldea Principal - Ayuntamientos
  {
    id: 'th-17',
    name: 'Ayuntamiento 17',
    category: 'town_hall',
    village: 'home',
    level: 17,
    durationSeconds: 16 * 86400, // 16 días
    description: 'Mejora del corazón de la aldea principal a nivel 17.',
    iconName: 'Castle',
  },
  {
    id: 'th-16',
    name: 'Ayuntamiento 16',
    category: 'town_hall',
    village: 'home',
    level: 16,
    durationSeconds: 14 * 86400, // 14 días
    description: 'Desbloquea fusión de defensas y temática de naturaleza.',
    iconName: 'Castle',
  },
  {
    id: 'th-15',
    name: 'Ayuntamiento 15',
    category: 'town_hall',
    village: 'home',
    level: 15,
    durationSeconds: 13 * 86400, // 13 días
    description: 'Magia arcana y temática de raíces mágicas.',
    iconName: 'Castle',
  },
  {
    id: 'th-14',
    name: 'Ayuntamiento 14',
    category: 'town_hall',
    village: 'home',
    level: 14,
    durationSeconds: 11 * 86400, // 11 días
    description: 'Estilo selvático con giga infierno y animales de héroe.',
    iconName: 'Castle',
  },

  // Aldea Principal - Defensas
  {
    id: 'eagle-artillery-6',
    name: 'Águila de Artillería (Nivel 6)',
    category: 'defense',
    village: 'home',
    level: 6,
    durationSeconds: 15 * 86400, // 15 días
    description: 'Defensa de rango masivo de 3 proyectiles explosivos.',
    iconName: 'ShieldAlert',
  },
  {
    id: 'monolith-3',
    name: 'Monolito (Nivel 3)',
    category: 'defense',
    village: 'home',
    level: 3,
    durationSeconds: 14 * 86400, // 14 días
    description: 'Defensa de daño porcentual devastadora para tanques y héroes.',
    iconName: 'Zap',
  },
  {
    id: 'scattershot-5',
    name: 'Catapulta (Nivel 5)',
    category: 'defense',
    village: 'home',
    level: 5,
    durationSeconds: 13.5 * 86400, // 13 días 12h
    description: 'Lanza proyectiles de esquirlas que dañan tropas detrás del objetivo.',
    iconName: 'Target',
  },
  {
    id: 'inferno-9',
    name: 'Torre Infernal (Nivel 9)',
    category: 'defense',
    village: 'home',
    level: 9,
    durationSeconds: 12 * 86400, // 12 días
    description: 'Modo único o múltiple con rayos abrasadores concentrados.',
    iconName: 'Flame',
  },
  {
    id: 'xbow-10',
    name: 'Ballesta (Nivel 10)',
    category: 'defense',
    village: 'home',
    level: 10,
    durationSeconds: 11 * 86400, // 11 días
    description: 'Tiro rápido terrestre o aéreo de largo alcance.',
    iconName: 'Crosshair',
  },
  {
    id: 'clan-castle-11',
    name: 'Castillo del Clan (Nivel 11)',
    category: 'defense',
    village: 'home',
    level: 11,
    durationSeconds: 14 * 86400, // 14 días
    description: 'Aloja 50 espacios de tropas defensivas y hechizos donados.',
    iconName: 'Home',
  },

  // Aldea Principal - Héroes y Laboratorio
  {
    id: 'king-95',
    name: 'Rey Bárbaro (Nivel 95)',
    category: 'hero',
    village: 'home',
    level: 95,
    durationSeconds: 8 * 86400, // 8 días
    description: 'El coloso de primera línea con el Guantelete de Gigante.',
    iconName: 'Crown',
  },
  {
    id: 'queen-95',
    name: 'Reina Arquera (Nivel 95)',
    category: 'hero',
    village: 'home',
    level: 95,
    durationSeconds: 8 * 86400, // 8 días
    description: 'Daño masivo a distancia con Habilidad de Sigilo o Flecha Gigante.',
    iconName: 'Crown',
  },
  {
    id: 'warden-70',
    name: 'Gran Centinela (Nivel 70)',
    category: 'hero',
    village: 'home',
    level: 70,
    durationSeconds: 8 * 86400, // 8 días
    description: 'Aura vital y Tomo Eterno de invulnerabilidad.',
    iconName: 'Sparkles',
  },
  {
    id: 'lab-dragon-11',
    name: 'Dragón Eléctrico (Nivel 7)',
    category: 'laboratory',
    village: 'home',
    level: 7,
    durationSeconds: 14 * 86400, // 14 días
    description: 'Investigación en el laboratorio: rayos encadenados de alto daño.',
    iconName: 'FlaskConical',
  },

  // Base del Constructor
  {
    id: 'bh-10',
    name: 'Taller del Constructor 10',
    category: 'town_hall',
    village: 'builder_base',
    level: 10,
    durationSeconds: 8 * 86400, // 8 días
    description: 'Desbloquea el nivel 10 de la Torre del Reloj y el Helicóptero Bélico.',
    iconName: 'Hammer',
  },
  {
    id: 'clock-tower-10',
    name: 'Torre del Reloj (Nivel 10)',
    category: 'defense',
    village: 'builder_base',
    level: 10,
    durationSeconds: 6 * 86400, // 6 días
    description: 'Aumenta el impulso a 12 minutos diarios de aceleración 10x.',
    iconName: 'Clock',
  },
  {
    id: 'mega-tesla-10',
    name: 'Mega-Tesla (Nivel 10)',
    category: 'defense',
    village: 'builder_base',
    level: 10,
    durationSeconds: 7 * 86400, // 7 días
    description: 'Poderoso rayo concentrado, requisito clásico para desbloquear a B.O.B.',
    iconName: 'Zap',
  },
  {
    id: 'roaster-10',
    name: 'Calcinador (Nivel 10)',
    category: 'defense',
    village: 'builder_base',
    level: 10,
    durationSeconds: 6 * 86400, // 6 días
    description: 'Lanza ráfagas continuas de fuego contra tropas de masa.',
    iconName: 'Flame',
  },
  {
    id: 'battle-machine-35',
    name: 'Máquina Bélica (Nivel 35)',
    category: 'hero',
    village: 'builder_base',
    level: 35,
    durationSeconds: 5 * 86400, // 5 días
    description: 'El meca del Maestro Constructor con martillo eléctrico recargable.',
    iconName: 'Wrench',
  },
  {
    id: 'gem-mine-10',
    name: 'Mina de Gemas (Nivel 10)',
    category: 'resource',
    village: 'builder_base',
    level: 10,
    durationSeconds: 5 * 86400, // 5 días
    description: 'Genera gemas constantemente. Se beneficia al 10x de la Torre del Reloj.',
    iconName: 'Gem',
  },
];
