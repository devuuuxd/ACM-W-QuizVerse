import { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProgressBar from './components/ProgressBar';
import QuizCard from './components/QuizCard';
import QuestionPalette from './components/QuestionPalette';
import SubmitConfirmModal from './components/SubmitConfirmModal';
import LeaderboardModal from './components/LeaderboardModal';
import ShortcutsModal from './components/ShortcutsModal';
import ScoreScreen from './components/ScoreScreen';
import Footer from './components/Footer';
import BackgroundDecoration from './components/BackgroundDecoration';
import useQuiz from './hooks/useQuiz';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

export default function App() {
  const quiz = useQuiz();

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  useKeyboardShortcuts({
    onSelectOption: (optIdx) => {
      if (quiz.phase === 'quiz') {
        quiz.selectAnswer(optIdx);
      }
    },
    onNext: () => {
      if (quiz.phase === 'quiz') {
        quiz.nextQuestion();
      }
    },
    onPrev: () => {
      if (quiz.phase === 'quiz') {
        quiz.prevQuestion();
      }
    },
    onToggleFlag: () => {
      if (quiz.phase === 'quiz') {
        quiz.toggleFlag();
      }
    },
    onSubmit: () => {
      if (quiz.phase === 'quiz') {
        quiz.openSubmitConfirmation();
      }
    },
    onToggleShortcuts: () => {
      setIsShortcutsOpen((prev) => !prev);
    },
    enabled: quiz.phase === 'quiz' && !quiz.isConfirmingSubmit && !isLeaderboardOpen,
  });

  const handleJumpToQuestion = useCallback(
    (index) => {
      quiz.goToQuestion(index);
    },
    [quiz]
  );

  return (
    <div className="relative min-h-screen selection:bg-navy/10 selection:text-navy">
      <BackgroundDecoration />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <Header
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 pb-8" id="main-content">
          {quiz.loadingQuestions ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent mb-4" />
              <p className="font-serif text-lg text-navy">Preparing Recruitment Challenge...</p>
              <p className="text-xs text-gray-400 mt-1">Loading questions and verifying session</p>
            </div>
          ) : quiz.phase === 'quiz' ? (
            <>
              <Hero />

              <ProgressBar
                currentIndex={quiz.currentIndex}
                totalQuestions={quiz.totalQuestions}
                streak={quiz.stats?.bestStreak || 0}
                score={quiz.stats?.score || 0}
                selectedAnswers={quiz.selectedAnswers}
                flaggedQuestions={quiz.flaggedQuestions}
                questions={quiz.questions}
                timer={quiz.timer}
                onJumpToQuestion={handleJumpToQuestion}
              />

              <QuizCard
                question={quiz.currentQuestion}
                currentIndex={quiz.currentIndex}
                totalQuestions={quiz.totalQuestions}
                selectedAnswer={quiz.currentAnswer}
                isFlagged={quiz.isCurrentFlagged}
                onSelectAnswer={quiz.selectAnswer}
                onToggleFlag={quiz.toggleFlag}
                onPrev={quiz.prevQuestion}
                onNext={quiz.nextQuestion}
                onSubmit={quiz.openSubmitConfirmation}
              />

              <QuestionPalette
                questions={quiz.questions}
                currentIndex={quiz.currentIndex}
                selectedAnswers={quiz.selectedAnswers}
                flaggedQuestions={quiz.flaggedQuestions}
                onSelectQuestion={handleJumpToQuestion}
                onSubmitRequest={quiz.openSubmitConfirmation}
              />
            </>
          ) : (
            <div className="pt-8 md:pt-12">
              <ScoreScreen
                stats={quiz.stats}
                resultsList={quiz.resultsList}
                categoryStats={quiz.categoryStats}
                onReset={quiz.restartQuiz}
                autoSubmitted={quiz.autoSubmittedByTimer}
              />
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* Confirmation & Dialog Modals */}
      <SubmitConfirmModal
        isOpen={quiz.isConfirmingSubmit}
        totalQuestions={quiz.totalQuestions}
        answeredCount={quiz.answeredCount}
        unansweredCount={quiz.unansweredCount}
        flaggedCount={Object.values(quiz.flaggedQuestions).filter(Boolean).length}
        onClose={quiz.closeSubmitConfirmation}
        onConfirm={quiz.confirmSubmit}
        onJumpToQuestion={handleJumpToQuestion}
        questions={quiz.questions}
        selectedAnswers={quiz.selectedAnswers}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
