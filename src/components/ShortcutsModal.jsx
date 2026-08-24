import { Keyboard, X } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['1', '2', '3', '4'], description: 'Select option 1, 2, 3, or 4' },
    { keys: ['A', 'B', 'C', 'D'], description: 'Select option A, B, C, or D' },
    { keys: ['←', 'P'], description: 'Navigate to previous question' },
    { keys: ['→', 'N'], description: 'Navigate to next question' },
    { keys: ['F'], description: 'Toggle flag for review on current question' },
    { keys: ['Ctrl', 'Enter'], description: 'Open submit confirmation dialog' },
    { keys: ['?'], description: 'Toggle this keyboard shortcuts dialog' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 text-navy">
              <Keyboard className="h-4 w-4" />
            </div>
            <h3 id="shortcuts-modal-title" className="text-base font-bold text-navy">
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors"
            aria-label="Close shortcuts dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100 my-3">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between py-2.5 text-xs">
              <span className="text-gray-600">{s.description}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <span
                    key={i}
                    className="inline-block min-w-[22px] rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 text-center font-mono text-[11px] font-semibold text-navy shadow-2xs"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-gray-100 pt-3 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-navy py-2 text-xs font-semibold text-white hover:bg-navy-light transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
