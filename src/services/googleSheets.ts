import { SimulationResult, BuilderSlot, UpgradePreset } from '../types/coc';
import { formatDuration } from '../utils/cocCalculations';
import { getAccessToken } from './firebaseAuth';

export interface ExportSheetsParams {
  selectedUpgrade: UpgradePreset | { name: string; durationSeconds: number };
  simulation: SimulationResult;
  builders: BuilderSlot[];
  customNote?: string;
}

export interface ExportResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
}

export const exportSimulationToGoogleSheets = async (
  params: ExportSheetsParams
): Promise<ExportResult> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No hay sesión de Google activa. Por favor inicia sesión primero.');
  }

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const sheetTitle = `Clash of Clans - Plan de Aceleración (${now.toISOString().slice(0, 10)})`;

  // 1. Create a new Spreadsheet via Google Sheets API v4
  const createResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: sheetTitle,
      },
      sheets: [
        {
          properties: {
            title: 'Resumen y Cálculos',
            gridProperties: {
              frozenRowCount: 2,
            },
          },
        },
        {
          properties: {
            title: 'Cola de Constructores',
            gridProperties: {
              frozenRowCount: 2,
            },
          },
        },
      ],
    }),
  });

  if (!createResponse.ok) {
    const errorData = await createResponse.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message ||
        `Error al crear la hoja de cálculo (HTTP ${createResponse.status})`
    );
  }

  const sheetData = await createResponse.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl;

  // 2. Prepare Tab 1: Resumen y Cálculos
  const summaryValues = [
    ['CLASH OF CLANS - REPORTE DE EFICIENCIA DE PÓCIMAS Y TORRE DEL RELOJ'],
    ['Generado el:', dateFormatted, '', 'ID:', spreadsheetId],
    [],
    ['MÉTRICA / PARÁMETRO', 'VALOR SIMULADO', 'DETALLE / NOTAS'],
    ['Mejora Seleccionada', params.selectedUpgrade.name, 'Objetivo principal de la simulación'],
    ['Tiempo Base Original', formatDuration(params.simulation.originalSeconds), `${params.simulation.originalSeconds} segundos`],
    ['Pócimas del Constructor Usadas', params.simulation.builderPotionsUsed, '1h a velocidad 10x por pócima (ahorro de 9h por constructor)'],
    ['Constructores Activos', params.simulation.activeBuildersCount, 'Constructores trabajando simultáneamente'],
    ['Horas Ahorradas por Constructor', `${params.simulation.builderPotionsHoursSavedPerBuilder} hrs`, 'Ahorro individual por pócimas'],
    ['Horas Totales Ahorradas en la Aldea', `${params.simulation.totalVillageHoursSaved} hrs`, 'Suma de ahorro acumulado en todos los constructores'],
    ['Nivel Torre del Reloj', params.simulation.clockTowerLevel > 0 ? `Nivel ${params.simulation.clockTowerLevel}` : 'Desactivada / No aplica', `Impulso de ${params.simulation.clockTowerBoostMinutes} min a 10x`],
    ['Impulsos Torre Programados', params.simulation.clockTowerDaysScheduled, 'Impulsos gratuitos (cada 22h) o pócimas aplicados'],
    ['Tiempo Ahorrado por Torre del Reloj', formatDuration(params.simulation.clockTowerTotalTimeSavedSeconds), `${Math.round(params.simulation.clockTowerTotalTimeSavedSeconds / 60)} minutos ahorrados`],
    ['TIEMPO FINAL DE MEJORA', formatDuration(params.simulation.finalDurationSeconds), `Reducción del ${params.simulation.percentageReduced}%`],
    ['AHORRO TOTAL DE TIEMPO', formatDuration(params.simulation.totalTimeSavedSeconds), 'Tiempo recortado al edificio seleccionado'],
    [],
    ['ANÁLISIS ECONÓMICO Y DE GEMAS', '', ''],
    ['Costo en Gemas de Pócimas (Mercader)', `${params.simulation.builderPotionGemCost} gemas`, '285 gemas por pócima en la tienda del mercader'],
    ['Valor Equivalente en Gemas Aceleradas', `${params.simulation.gemValueEquivalent} gemas`, 'Costo que cobraría Supercell por gemear el tiempo ahorrado'],
    ['Ganancia / Ahorro Neto de Gemas', `${params.simulation.netGemProfit} gemas`, params.simulation.netGemProfit >= 0 ? '¡Altamente rentable!' : 'Uso individual'],
    ['Multiplicador de Eficiencia (ROI)', `${params.simulation.gemRoiMultiplier}x`, 'Relación valor obtenido vs gemas invertidas'],
    [],
    ['IMPACTO EN RECURSOS (BASE DEL CONSTRUCTOR)', '', ''],
    ['Oro del Constructor Extra', `+${params.simulation.extraBuilderGold.toLocaleString()}`, 'Producción adicional por aceleración 10x de recolectores'],
    ['Elixir del Constructor Extra', `+${params.simulation.extraBuilderElixir.toLocaleString()}`, 'Producción adicional de recolectores'],
    ['Gemas Extra (Mina de Gemas)', `+${params.simulation.extraGemMineGems} gemas`, 'Gemas adicionales extraídas durante los impulsos de la torre'],
  ];

  if (params.customNote) {
    summaryValues.push([], ['Notas del Jugador:', params.customNote]);
  }

  // 3. Prepare Tab 2: Cola de Constructores
  const buildersValues = [
    ['COLA DE CONSTRUCTORES Y ASIGNACIÓN DE MEJORAS'],
    ['Constructor', 'Estado', 'Mejora Asignada', 'Tiempo Base', 'Tiempo con Aceleración', 'Ahorro Individual'],
    ...params.builders.map((b) => {
      const remainingWithBoost = Math.max(
        0,
        b.durationSeconds - params.simulation.builderPotionsHoursSavedPerBuilder * 3600
      );
      const saved = b.durationSeconds - remainingWithBoost;
      return [
        b.name,
        b.isActive ? 'Activo' : 'Inactivo',
        b.upgradeName,
        formatDuration(b.durationSeconds),
        b.isActive ? formatDuration(remainingWithBoost) : '-',
        b.isActive ? formatDuration(saved) : '-',
      ];
    }),
  ];

  // 4. Send Values to Google Sheets
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data: [
          {
            range: "'Resumen y Cálculos'!A1:C" + summaryValues.length,
            values: summaryValues,
          },
          {
            range: "'Cola de Constructores'!A1:F" + buildersValues.length,
            values: buildersValues,
          },
        ],
      }),
    }
  );

  return {
    spreadsheetId,
    spreadsheetUrl,
    title: sheetTitle,
  };
};
