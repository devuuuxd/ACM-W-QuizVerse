import { useState } from 'react';
import { Trophy, Keyboard, Database, HardDrive } from 'lucide-react';
import { isSupabaseConnected } from '../services/supabase';

export default function Header({
  onOpenLeaderboard,
  onOpenShortcuts,
  avatarInitials = 'JS',
}) {
  const isDbConnected = isSupabaseConnected();
  const [showDbInfo, setShowDbInfo] = useState(false);

  return (
    <header className="relative z-30 w-full border-b border-gray-200/80 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left — Brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[11px] font-semibold text-white shadow-sm transition-transform hover:scale-105"
            aria-hidden="true"
          >
            AW
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight text-navy tracking-tight">
              ACM-W QuizVerse
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
              AI &amp; Computing · Knowledge Arena
            </div>
          </div>
        </div>

        {/* Right — DB Status Pill, Shortcuts, Leaderboard, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Database connection badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDbInfo((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                isDbConnected
                  ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/70'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              title={
                isDbConnected
                  ? 'Connected to Supabase Cloud Database'
                  : 'Running in Local Storage Demo Mode (Supabase not configured)'
              }
              aria-label="Database Status"
            >
              {isDbConnected ? (
                <>
                  <Database className="h-3 w-3 text-emerald-600" />
                  <span className="hidden md:inline">Supabase Connected</span>
                  <span className="md:hidden">DB Online</span>
                </>
              ) : (
                <>
                  <HardDrive className="h-3 w-3 text-gray-500" />
                  <span className="hidden md:inline">Demo Mode (Local)</span>
                  <span className="md:hidden">Local</span>
                </>
              )}
            </button>

            {/* DB Info Tooltip Popover */}
            {showDbInfo && (
              <div className="absolute right-0 top-9 z-50 w-72 rounded-xl border border-gray-200 bg-white p-3.5 shadow-xl text-left">
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-navy">
                    Database Architecture
                  </span>
                  <button
                    onClick={() => setShowDbInfo(false)}
                    className="text-gray-400 hover:text-navy text-xs"
                  >
                    ✕
                  </button>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-gray-600">
                  {isDbConnected
                    ? 'Connected to real Supabase PostgreSQL database for dynamic questions and live leaderboard synchronization.'
                    : 'Currently operating in LocalStorage Mode. All score submissions and high scores persist in your browser. Add Supabase keys to .env to enable cloud sync.'}
                </p>
              </div>
            )}
          </div>

          {/* Leaderboard button */}
          <button
            type="button"
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-navy shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
            aria-label="View Leaderboard"
          >
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="hidden sm:inline">Leaderboard</span>
          </button>

          {/* Keyboard shortcuts trigger */}
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-300 hover:text-navy active:scale-95"
            title="Keyboard Shortcuts (?)"
            aria-label="Keyboard Shortcuts"
          >
            <Keyboard className="h-4 w-4" />
          </button>

          {/* User initials avatar */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-[11px] font-bold text-navy border border-navy/15"
            title="Active Candidate Session"
          >
            {avatarInitials}
          </div>
        </div>
      </div>
    </header>
  );
}
