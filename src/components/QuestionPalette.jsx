import { Bookmark } from 'lucide-react';

export default function QuestionPalette({
  questions,
  currentIndex,
  selectedAnswers,
  flaggedQuestions,
  onSelectQuestion,
  onSubmitRequest,
}) {
  const total = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="mx-auto max-w-quiz px-4 pt-6">
      <div className="rounded-xl border border-gray-200/70 bg-white/70 backdrop-blur-xs p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Question Navigator
            </span>
            <span className="text-[10px] text-gray-400">
              ({answeredCount}/{total} completed)
            </span>
          </div>

          {answeredCount === total && (
            <button
              type="button"
              onClick={onSubmitRequest}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 underline transition-colors"
            >
              All Answered · Ready to Submit →
            </button>
          )}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isFlagged = Boolean(flaggedQuestions[q.id]);

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                className={`relative flex h-8 w-full items-center justify-center rounded-lg border text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'border-navy bg-navy text-white shadow-xs ring-2 ring-navy/20 scale-105'
                    : isAnswered
                    ? 'border-navy/30 bg-navy/5 text-navy hover:bg-navy/10'
                    : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600'
                }`}
                aria-label={`Go to Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}${
                  isFlagged ? ' (Flagged)' : ''
                }`}
                title={`Question ${idx + 1}: ${q.category}${isFlagged ? ' [Flagged]' : ''}`}
              >
                <span>{idx + 1}</span>

                {/* Flag bookmark dot */}
                {isFlagged && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 text-[8px] text-white">
                    <Bookmark className="h-2 w-2 fill-current" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
