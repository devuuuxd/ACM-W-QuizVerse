import { Timer, AlertTriangle } from 'lucide-react';

export default function QuizTimer({ timer }) {
  const { formattedTime, isWarning, isCritical, progressPercent } = timer;

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[11px] font-medium transition-all ${
        isCritical
          ? 'border-red-400 bg-red-50 text-red-700 animate-pulse ring-2 ring-red-200'
          : isWarning
          ? 'border-amber-300 bg-amber-50 text-amber-800'
          : 'border-gray-200 bg-white text-gray-600'
      }`}
      role="timer"
      aria-label={`Time remaining: ${formattedTime}`}
      aria-live="off"
    >
      {isCritical ? (
        <AlertTriangle className="h-3 w-3 text-red-600" />
      ) : (
        <Timer className={`h-3 w-3 ${isWarning ? 'text-amber-600' : 'text-gray-400'}`} />
      )}
      <span className="font-mono font-semibold tracking-tight">{formattedTime}</span>
    </div>
  );
}
