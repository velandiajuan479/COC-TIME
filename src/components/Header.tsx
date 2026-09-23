import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { googleSignIn, logout } from '../services/firebaseAuth';
import { VillageType } from '../types/coc';
import { Castle, Clock, FileSpreadsheet, LogIn, LogOut, Sparkles, Shield } from 'lucide-react';

interface HeaderProps {
  village: VillageType;
  onVillageChange: (village: VillageType) => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  onOpenSheetsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  village,
  onVillageChange,
  currentUser,
  onUserChange,
  onOpenSheetsModal,
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        onUserChange(res.user);
      }
    } catch (err) {
      console.error('Error logging in:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onUserChange(null);
  };

  return (
    <header className="border-b border-amber-900/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 py-3 sm:px-6 shadow-xl sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title & Branding */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-lg shadow-amber-900/40 border border-amber-300/40">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded-full border border-amber-500/50">
                10x
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                  Clash of Clans
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                  Calculador 10x
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                Pócima del Constructor <span className="text-amber-400">&</span> Torre del Reloj
              </h1>
            </div>
          </div>

          {/* Mobile Sheets CTA */}
          <button
            onClick={onOpenSheetsModal}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
            title="Exportar a Google Sheets"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Sheets</span>
          </button>
        </div>

        {/* Village Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onVillageChange('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              village === 'home'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Castle className="w-4 h-4 text-amber-200" />
            <span>Aldea Principal</span>
            <span className="text-[10px] opacity-75 font-mono">(Pócimas)</span>
          </button>

          <button
            onClick={() => onVillageChange('builder_base')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              village === 'builder_base'
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-md shadow-cyan-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-200" />
            <span>Base del Constructor</span>
            <span className="text-[10px] opacity-75 font-mono">(Torre Reloj)</span>
          </button>
        </div>

        {/* Google Workspace & Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenSheetsModal}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-950/40 border border-emerald-400/30 active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>Exportar a Google Sheets</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Usuario'}
                  className="w-6 h-6 rounded-full border border-amber-400/40"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <span className="text-xs font-semibold text-slate-300 max-w-[110px] truncate">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>{isLoggingIn ? 'Conectando...' : 'Conectar Google'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
