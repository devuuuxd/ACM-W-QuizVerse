import { Bookmark, BookmarkCheck } from 'lucide-react';
import OptionGrid from './OptionGrid';
import QuizFooter from './QuizFooter';

export default function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isFlagged,
  onSelectAnswer,
  onToggleFlag,
  onPrev,
  onNext,
  onSubmit,
}) {
  if (!question) return null;

  return (
    <div className="mx-auto max-w-quiz px-4">
      <div className="rounded-card border border-gray-200/80 bg-white p-6 shadow-card transition-all duration-300 sm:p-8 md:p-10">
        {/* Top meta row: Category pill, Difficulty pill, Flag button */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block rounded-md border border-gray-200 bg-gray-50/80 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-gray-600">
              {question.category || 'ACM-W'}
            </span>
            {question.difficulty && (
              <span
                className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-medium ${
                  question.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                    : question.difficulty === 'Hard'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200/70'
                    : 'bg-blue-50 text-blue-700 border border-blue-200/70'
                }`}
              >
                {question.difficulty}
              </span>
            )}
          </div>

          {/* Bookmark / Flag for review button */}
          <button
            type="button"
            onClick={onToggleFlag}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
              isFlagged
                ? 'bg-amber-50 text-amber-700 border border-amber-200 font-semibold'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
            title={isFlagged ? 'Flagged for review' : 'Flag this question for later review'}
            aria-pressed={isFlagged}
          >
            {isFlagged ? (
              <>
                <BookmarkCheck className="h-3.5 w-3.5 text-amber-600" />
                <span>Flagged</span>
              </>
            ) : (
              <>
                <Bookmark className="h-3.5 w-3.5 text-gray-400" />
                <span>Flag for review</span>
              </>
            )}
          </button>
        </div>

        {/* Question Heading */}
        <h2 className="mb-7 font-serif text-lg font-medium leading-snug tracking-tight text-navy sm:text-xl md:text-[22px]">
          {question.question}
        </h2>

        {/* Options Grid */}
        <OptionGrid
          options={question.options}
          selectedAnswer={selectedAnswer}
          onSelect={onSelectAnswer}
        />

        {/* Card Footer Navigation */}
        <QuizFooter
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          hasSelectedAnswer={selectedAnswer !== undefined}
          onPrev={onPrev}
          onNext={onNext}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
