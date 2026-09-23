import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { googleSignIn } from '../services/firebaseAuth';
import { exportSimulationToGoogleSheets, ExportResult } from '../services/googleSheets';
import { SimulationResult, BuilderSlot, UpgradePreset } from '../types/coc';
import {
  FileSpreadsheet,
  X,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Table,
} from 'lucide-react';

interface SheetsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  selectedUpgrade: UpgradePreset | { name: string; durationSeconds: number };
  simulation: SimulationResult;
  builders: BuilderSlot[];
}

export const SheetsExportModal: React.FC<SheetsExportModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  selectedUpgrade,
  simulation,
  builders,
}) => {
  const [customNote, setCustomNote] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        onUserChange(res.user);
      }
    } catch (err: any) {
      console.error('Error signing in:', err);
      setErrorMessage(
        err?.message || 'Error al iniciar sesión con Google. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleConfirmExport = async () => {
    setIsExporting(true);
    setErrorMessage(null);
    try {
      const result = await exportSimulationToGoogleSheets({
        selectedUpgrade,
        simulation,
        builders,
        customNote: customNote.trim() || undefined,
      });
      setExportResult(result);
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMessage(
        err?.message || 'Error al exportar a Google Sheets. Verifica tus permisos.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              Exportar Plan a Google Sheets
            </h3>
            <p className="text-xs text-slate-400">
              Crea una hoja de cálculo estructurada con todos los cálculos de tiempo y recursos.
            </p>
          </div>
        </div>

        {exportResult ? (
          /* Success Screen */
          <div className="py-4 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">
                ¡Hoja de Cálculo Creada Exitosamente!
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                Tu reporte con el plan de pócimas del constructor y la torre del reloj ya está disponible en tu Google Drive.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-left text-xs font-mono text-slate-400">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Título del documento:</span>
              <span className="text-emerald-400 font-semibold">{exportResult.title}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <a
                href={exportResult.spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950 transition-all"
              >
                <span>Abrir en Google Sheets</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation and Form Screen */
          <div className="space-y-4">
            {/* Description of what will be created */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Table className="w-4 h-4 text-emerald-400" />
                Se exportarán los siguientes datos:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px] pl-1">
                <li>
                  <strong>Pestaña 1 (Resumen):</strong> Mejora ({selectedUpgrade.name}), Pócimas ({simulation.builderPotionsUsed}), Torre del Reloj (Lvl {simulation.clockTowerLevel}), Horas Ahorradas ({simulation.totalVillageHoursSaved}h), Retorno de Gemas ({simulation.gemRoiMultiplier}x).
                </li>
                <li>
                  <strong>Pestaña 2 (Cola):</strong> Detalle individual de los {builders.length} constructores y sus tiempos acelerados.
                </li>
                <li>
                  <strong>Impacto de Recursos:</strong> Gemas extra de la mina y oro/elixir recolectados.
                </li>
              </ul>
            </div>

            {/* Custom Notes input */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Nota personal o nombre de clan (opcional):
              </label>
              <input
                type="text"
                placeholder="Ej. Plan para Liga de Guerras de Clanes (CWL)"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Auth State & Official Google Button */}
            {!currentUser ? (
              <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3.5 text-center space-y-3">
                <p className="text-xs text-amber-200">
                  Para guardar el documento en tu Google Drive personal, necesitas iniciar sesión con Google:
                </p>

                {/* Google Sign-In Material Button */}
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isLoggingIn}
                  className="inline-flex items-center justify-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 mx-auto"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>{isLoggingIn ? 'Iniciando sesión...' : 'Sign in with Google'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs">
                <span className="text-slate-400">Cuenta conectada:</span>
                <span className="font-semibold text-emerald-400 truncate max-w-[200px]">
                  {currentUser.email}
                </span>
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="flex items-start gap-2 bg-red-950/40 border border-red-500/40 rounded-xl p-3 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmExport}
                disabled={!currentUser || isExporting}
                className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950 transition-all active:scale-95"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creando Hoja...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Confirmar y Exportar a Google Sheets</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
