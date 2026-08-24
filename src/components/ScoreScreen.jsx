import { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Award,
  BarChart2,
  RefreshCw,
  Send,
  Sparkles,
  HelpCircle,
  Filter,
} from 'lucide-react';
import { formatTimeHuman, extractInitials, validatePlayerName } from '../utils/quizUtils';
import useLeaderboard from '../hooks/useLeaderboard';

export default function ScoreScreen({
  stats,
  resultsList = [],
  categoryStats = [],
  onReset,
  autoSubmitted = false,
}) {
  const [activeTab, setActiveTab] = useState('review'); 
  const [filterReview, setFilterReview] = useState('all'); 

  
  const {
    entries: leaderboardEntries,
    submitting,
    submitScore,
    lastSubmittedId,
    defaultPlayerName,
  } = useLeaderboard();

  const [candidateName, setCandidateName] = useState(defaultPlayerName || 'Jane Smith');
  const [avatarInitials, setAvatarInitials] = useState(extractInitials(defaultPlayerName || 'Jane Smith'));
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [userRank, setUserRank] = useState(null);

  if (!stats) return null;

  const {
    score,
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    accuracyPercentage,
    timeTakenSeconds,
    bestStreak,
    tier,
  } = stats;

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCandidateName(val);
    setAvatarInitials(extractInitials(val));
    if (submitError) setSubmitError('');
  };

  const handleLeaderboardSubmit = async (e) => {
    e.preventDefault();
    const validation = validatePlayerName(candidateName);
    if (!validation.valid) {
      setSubmitError(validation.error || 'Please enter a valid name.');
      return;
    }

    const res = await submitScore({
      playerName: validation.sanitized,
      avatarInitials: avatarInitials || 'AW',
      score,
      accuracy: accuracyPercentage,
      timeTakenSeconds,
    });

    if (res.success) {
      setSubmitSuccess(true);
      
      const rankIdx = leaderboardEntries.findIndex(
        (entry) => entry.score <= score && entry.timeTakenSeconds >= timeTakenSeconds
      );
      setUserRank(rankIdx >= 0 ? rankIdx + 1 : 1);
    } else {
      setSubmitError(res.error || 'Unable to submit score. Please try again.');
    }
  };

  
  const filteredResults = resultsList.filter((item) => {
    if (filterReview === 'correct') return item.isCorrect;
    if (filterReview === 'incorrect') return !item.isCorrect;
    if (filterReview === 'flagged') return item.flagged;
    return true;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      {}
      {autoSubmitted && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-center text-sm font-medium text-amber-900 shadow-sm">
          ⏰ <strong>Time Expired:</strong> Your answers were automatically submitted when the countdown reached zero.
        </div>
      )}

      {}
      <div className="rounded-card border border-gray-200/80 bg-white p-6 shadow-card sm:p-10">
        {}
        <div className="text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Recruitment Challenge · Round 1 Results
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-navy sm:text-4xl">
            Candidate Evaluation
          </h2>

          {}
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/[0.03] px-4 py-1.5 shadow-sm">
            <span className="text-base">{tier.badge}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-navy">
              {tier.rankName}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-600">{tier.title}</span>
          </div>

          <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
            {tier.description}
          </p>
        </div>

        {}
        <div className="my-8 grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          {}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Correct Answers</span>
              </div>
              <span className="font-bold text-navy text-sm">
                {correctCount} / {totalQuestions}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Incorrect / Skipped</span>
              </div>
              <span className="font-bold text-navy text-sm">
                {incorrectCount + unansweredCount}
              </span>
            </div>
          </div>

          {}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-navy bg-navy/[0.02] shadow-sm">
              <span className="text-4xl font-extrabold tracking-tight text-navy">
                {score}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
                Points
              </span>
            </div>
            <span className="mt-3 text-xs font-semibold text-gray-500">
              {accuracyPercentage}% Overall Accuracy
            </span>
          </div>

          {}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Time Taken</span>
              </div>
              <span className="font-bold text-navy text-sm">
                {formatTimeHuman(timeTakenSeconds)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Flame className="h-4 w-4 text-amber-500" />
                <span>Max Streak</span>
              </div>
              <span className="font-bold text-navy text-sm">
                {bestStreak} in a row
              </span>
            </div>
          </div>
        </div>

        {}
        <div className="my-6 rounded-2xl border border-navy/15 bg-cream p-5 text-left">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center gap-2 py-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-navy">
                Official Score Recorded on the Leaderboard!
              </p>
              <p className="text-xs text-gray-600">
                {candidateName} ({score} pts · {accuracyPercentage}% accuracy)
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeaderboardSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
                <div>
                  <h4 className="text-sm font-semibold text-navy">
                    Submit Score to Chapter Leaderboard
                  </h4>
                  <p className="text-xs text-gray-500">
                    Record your name and score in the candidate hall of fame.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="h-7 w-7 rounded-full bg-navy text-white text-[10px] font-bold flex items-center justify-center">
                    {avatarInitials || 'AW'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <input
                  type="text"
                  value={candidateName}
                  onChange={handleNameChange}
                  placeholder="Enter your name (e.g. Jane Doe)"
                  maxLength={32}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-navy placeholder:text-gray-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                  aria-label="Candidate Name"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-navy px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-navy-light disabled:opacity-50 active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Save to Leaderboard'}</span>
                </button>
              </div>
              {submitError && (
                <p className="text-xs text-red-600">{submitError}</p>
              )}
            </form>
          )}
        </div>

        {}
        <div className="flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow active:scale-95 focus-visible:ring-2 focus-visible:ring-navy"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retake Challenge (New Questions &amp; Shuffle)</span>
          </button>
        </div>
      </div>

      {}
      <div className="mt-10">
        <div className="mb-6 flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('review')}
            className={`border-b-2 px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === 'review'
                ? 'border-navy text-navy'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Detailed Question Review ({resultsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`border-b-2 px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === 'categories'
                ? 'border-navy text-navy'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Category Performance
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leaderboard')}
            className={`border-b-2 px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === 'leaderboard'
                ? 'border-navy text-navy'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Top Leaderboard
          </button>
        </div>

        {}
        {activeTab === 'review' && (
          <div className="space-y-4">
            {}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Filter className="h-3 w-3" /> Filter:
              </span>
              {[
                { key: 'all', label: `All (${resultsList.length})` },
                { key: 'correct', label: `Correct (${correctCount})` },
                { key: 'incorrect', label: `Incorrect (${incorrectCount + unansweredCount})` },
              ].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilterReview(f.key)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filterReview === f.key
                      ? 'bg-navy text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {}
            <div className="space-y-4 pt-2">
              {filteredResults.map((item, idx) => {
                const userChoice = item.selectedIndex !== undefined ? item.options[item.selectedIndex] : null;
                const correctChoice = item.options[item.correctIndex];

                return (
                  <div
                    key={item.questionId}
                    className={`rounded-xl border p-5 transition-all bg-white shadow-sm ${
                      item.isCorrect ? 'border-emerald-200' : 'border-red-200'
                    }`}
                  >
                    {}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Q{idx + 1} · {item.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          ({item.difficulty})
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.isCorrect
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {item.isCorrect ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" /> Correct (+10 pts)
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3.5 w-3.5" />{' '}
                            {item.isAnswered ? 'Incorrect' : 'Unanswered'}
                          </>
                        )}
                      </span>
                    </div>

                    {}
                    <h3 className="font-serif text-base font-medium text-navy mb-4">
                      {item.question}
                    </h3>

                    {}
                    <div className="space-y-2 text-xs">
                      {}
                      <div
                        className={`rounded-lg p-3 ${
                          item.isCorrect
                            ? 'bg-emerald-50/70 border border-emerald-200/80 text-emerald-950'
                            : 'bg-red-50/70 border border-red-200/80 text-red-950'
                        }`}
                      >
                        <span className="font-bold">Your selection: </span>
                        <span>{userChoice || 'None (Question skipped)'}</span>
                      </div>

                      {}
                      {!item.isCorrect && (
                        <div className="rounded-lg bg-emerald-50/70 border border-emerald-200/80 p-3 text-emerald-950">
                          <span className="font-bold">Correct answer: </span>
                          <span>{correctChoice}</span>
                        </div>
                      )}
                    </div>

                    {}
                    {item.explanation && (
                      <div className="mt-3.5 rounded-lg border border-gray-200/70 bg-gray-50/80 p-3.5 text-xs leading-relaxed text-gray-700">
                        <span className="font-semibold text-navy block mb-1">
                          💡 Academic Explanation:
                        </span>
                        {item.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryStats.map((cat) => (
              <div
                key={cat.category}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy">
                    {cat.category}
                  </span>
                  <span className="text-xs font-bold text-navy">
                    {cat.correct} / {cat.total} ({cat.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-navy rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {}
        {activeTab === 'leaderboard' && (
          <div className="rounded-card border border-gray-200 bg-white overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Candidate Hall of Fame
              </span>
              <span className="text-xs text-gray-500">
                Top Candidates Ranked
              </span>
            </div>
            <div className="divide-y divide-gray-100 text-sm">
              {leaderboardEntries.slice(0, 10).map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-4 ${
                    entry.id === lastSubmittedId ? 'bg-navy/[0.04] font-semibold' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        index === 0
                          ? 'bg-amber-100 text-amber-800'
                          : index === 1
                          ? 'bg-gray-200 text-gray-800'
                          : index === 2
                          ? 'bg-amber-800/10 text-amber-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 text-[10px] font-bold text-navy">
                      {entry.avatarInitials || 'AW'}
                    </div>
                    <div>
                      <span className="text-navy font-medium">{entry.playerName}</span>
                      {entry.id === lastSubmittedId && (
                        <span className="ml-2 text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Your Attempt
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-right">
                    <div>
                      <span className="font-bold text-navy">{entry.score} pts</span>
                      <span className="block text-[11px] text-gray-400">
                        {entry.accuracy}% acc
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:inline">
                      {formatTimeHuman(entry.timeTakenSeconds)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
