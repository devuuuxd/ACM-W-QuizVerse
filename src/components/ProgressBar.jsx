import QuizTimer from './QuizTimer';

export default function ProgressBar({
  currentIndex,
  totalQuestions,
  streak = 0,
  score = 0,
  selectedAnswers = {},
  flaggedQuestions = {},
  questions = [],
  timer,
  onJumpToQuestion,
}) {
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="mx-auto max-w-quiz px-4 pb-4 sm:px-6">
      {/* Top row: question counter + status pills */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Question <span className="font-bold text-navy">{currentIndex + 1}</span> of{' '}
          <span className="font-bold text-navy">{totalQuestions}</span>
          <span className="ml-2 font-normal text-gray-400">
            ({answeredCount}/{totalQuestions} answered)
          </span>
        </p>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {timer && <QuizTimer timer={timer} />}
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
            Streak <strong className="text-navy">{streak}</strong>
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
            Score <strong className="text-navy">{score} pts</strong>
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div className="relative h-[2px] w-full rounded-full bg-gray-200">
        {/* Filled bar */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-navy transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Interactive Question Jump Dot Markers */}
        <div className="absolute -top-[4px] left-0 right-0 flex items-center justify-between">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const q = questions[i];
            const isAnswered = q && selectedAnswers[q.id] !== undefined;
            const isFlagged = q && Boolean(flaggedQuestions[q.id]);
            const isCurrent = i === currentIndex;

            let dotClasses = 'bg-gray-300 hover:bg-gray-400';
            if (isCurrent) {
              dotClasses = 'bg-navy ring-4 ring-navy/20 scale-125';
            } else if (isFlagged) {
              dotClasses = 'bg-amber-500 ring-2 ring-amber-200';
            } else if (isAnswered) {
              dotClasses = 'bg-navy';
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => onJumpToQuestion && onJumpToQuestion(i)}
                className={`relative block h-2.5 w-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy ${dotClasses}`}
                title={`Jump to Question ${i + 1}${isAnswered ? ' (Answered)' : ' (Unanswered)'}${
                  isFlagged ? ' [Flagged]' : ''
                }`}
                aria-label={`Jump to Question ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
