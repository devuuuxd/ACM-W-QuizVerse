import { AlertCircle, CheckCircle, Bookmark, HelpCircle } from 'lucide-react';

export default function SubmitConfirmModal({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredCount,
  flaggedCount,
  onClose,
  onConfirm,
  onJumpToQuestion,
  questions,
  selectedAnswers,
}) {
  if (!isOpen) return null;

  const isAllAnswered = unansweredCount === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              isAllAnswered ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            }`}
          >
            {isAllAnswered ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 id="confirm-modal-title" className="text-base font-semibold text-navy">
              {isAllAnswered ? 'Ready to submit your quiz?' : 'Incomplete submission warning'}
            </h3>
            <p className="text-[12px] text-gray-500">
              {isAllAnswered
                ? 'All questions answered. Once submitted, your score will be computed.'
                : `You still have ${unansweredCount} unanswered ${unansweredCount === 1 ? 'question' : 'questions'}.`}
            </p>
          </div>
        </div>

        {/* Status Grid */}
        <div className="my-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3">
            <span className="text-xl font-bold text-navy">{answeredCount}</span>
            <span className="block text-[10.5px] uppercase tracking-wider text-gray-400">Answered</span>
          </div>
          <div
            className={`rounded-xl border p-3 ${
              unansweredCount > 0
                ? 'border-amber-200 bg-amber-50/60 text-amber-900'
                : 'border-gray-100 bg-gray-50/70 text-gray-400'
            }`}
          >
            <span
              className={`text-xl font-bold ${
                unansweredCount > 0 ? 'text-amber-700' : 'text-gray-400'
              }`}
            >
              {unansweredCount}
            </span>
            <span className="block text-[10.5px] uppercase tracking-wider">Unanswered</span>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3">
            <span className="text-xl font-bold text-navy">{flaggedCount}</span>
            <span className="block text-[10.5px] uppercase tracking-wider text-gray-400">Flagged</span>
          </div>
        </div>

        {/* Unanswered warning chips */}
        {unansweredCount > 0 && (
          <div className="mb-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3.5 text-left">
            <p className="text-[12px] font-medium text-amber-900 mb-2 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-amber-700" />
              Unanswered questions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((q, i) => {
                if (selectedAnswers[q.id] === undefined) {
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onJumpToQuestion(i);
                      }}
                      className="rounded-md border border-amber-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
                    >
                      Q{i + 1} →
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
          >
            Review Answers
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-navy px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-navy-light active:scale-95 transition-all"
          >
            Confirm &amp; Submit
          </button>
        </div>
      </div>
    </div>
  );
}
