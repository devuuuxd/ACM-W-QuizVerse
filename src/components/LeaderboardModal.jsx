import { useState } from 'react';
import { Trophy, Search, RefreshCw, X, Database, HardDrive, Trash2 } from 'lucide-react';
import { formatTimeHuman, formatDate } from '../utils/quizUtils';
import useLeaderboard from '../hooks/useLeaderboard';

export default function LeaderboardModal({ isOpen, onClose }) {
  const { entries, loading, source, isConnected, reload, resetLocal } = useLeaderboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filteredEntries = entries.filter((e) =>
    e.playerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClear = () => {
    if (confirmClear) {
      resetLocal();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderboard-modal-title"
    >
      <div className="flex h-[85vh] max-h-[640px] w-full max-w-2xl flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 id="leaderboard-modal-title" className="text-base font-bold text-navy">
                Candidate Hall of Fame
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <span>ACM-W Recruitment Challenge Leaderboard</span>
                <span className="text-gray-300">·</span>
                <span className="flex items-center gap-1 font-medium text-emerald-700">
                  {isConnected ? (
                    <>
                      <Database className="h-3 w-3" /> Supabase Live
                    </>
                  ) : (
                    <>
                      <HardDrive className="h-3 w-3 text-gray-500" /> Local Storage
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reload}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-navy hover:bg-gray-50 transition-colors"
              title="Refresh Leaderboard"
              aria-label="Refresh Leaderboard"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-navy hover:bg-gray-50 transition-colors"
              aria-label="Close Leaderboard Modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name..."
              className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-4 text-xs text-navy placeholder:text-gray-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>
        </div>

        {/* Entries Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-14 w-full animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center text-center">
              <Trophy className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-600">No matching candidates found</p>
              <p className="text-xs text-gray-400">Complete the quiz and submit your score to appear here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredEntries.map((entry, index) => {
                const rank = index + 1;
                const isTop1 = rank === 1;
                const isTop2 = rank === 2;
                const isTop3 = rank === 3;

                return (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                      isTop1
                        ? 'border-amber-200 bg-amber-50/40 shadow-xs'
                        : isTop2
                        ? 'border-gray-300 bg-gray-50/60'
                        : isTop3
                        ? 'border-amber-700/20 bg-amber-50/20'
                        : 'border-gray-200/80 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Rank & Candidate Info */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                          isTop1
                            ? 'bg-amber-400 text-amber-950 shadow-xs'
                            : isTop2
                            ? 'bg-gray-300 text-gray-900'
                            : isTop3
                            ? 'bg-amber-700/20 text-amber-900'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {rank}
                      </span>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy">
                        {entry.avatarInitials || 'AW'}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-navy">
                            {entry.playerName}
                          </span>
                          {entry.isLocal && (
                            <span className="rounded bg-gray-100 px-1.5 py-0.2 text-[9px] font-medium text-gray-500">
                              Local
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-right sm:gap-6">
                      <div>
                        <span className="text-sm font-extrabold text-navy">
                          {entry.score} pts
                        </span>
                        <span className="block text-[11px] text-gray-500">
                          {entry.accuracy}% accuracy
                        </span>
                      </div>
                      <div className="hidden text-right sm:block">
                        <span className="text-xs font-medium text-gray-600">
                          {formatTimeHuman(entry.timeTakenSeconds)}
                        </span>
                        <span className="block text-[10px] text-gray-400">Duration</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 px-6 py-3 text-xs text-gray-500">
          <span>{entries.length} Total Submissions</span>
          {!isConnected && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>{confirmClear ? 'Confirm Reset Defaults?' : 'Reset Local Leaderboard'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
