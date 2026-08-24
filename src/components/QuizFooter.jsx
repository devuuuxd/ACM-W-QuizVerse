import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function QuizFooter({
  currentIndex,
  totalQuestions,
  hasSelectedAnswer,
  onPrev,
  onNext,
  onSubmit,
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${
          isFirst
            ? 'cursor-not-allowed opacity-30 text-gray-400'
            : 'border border-gray-200 bg-white text-navy shadow-sm hover:border-gray-300 hover:bg-gray-50 active:scale-95'
        }`}
        aria-label="Previous Question"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Previous</span>
      </button>

      {/* Helper text */}
      <p className="hidden text-[12px] italic text-gray-400 sm:block">
        {hasSelectedAnswer
          ? 'Answer selected. You can navigate or change choices anytime.'
          : 'Select one answer to continue.'}
      </p>

      {/* Next or Submit Button */}
      <div className="flex items-center gap-2">
        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            className="flex items-center gap-1.5 rounded-lg bg-navy px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow active:scale-95 focus-visible:ring-2 focus-visible:ring-navy"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Submit Quiz</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className={`flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-[13px] font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-navy ${
              hasSelectedAnswer
                ? 'bg-navy text-white shadow-sm hover:bg-navy-light hover:shadow active:scale-95'
                : 'border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <span>Next Question</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
