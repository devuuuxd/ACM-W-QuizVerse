/**
 * Pure utility functions for quiz calculation, shuffling, formatting, and performance tier analysis.
 */

/**
 * Calculates score based on number of correct answers.
 * @param {Array<{ isCorrect: boolean }>} answers
 * @param {number} pointsPerQuestion
 * @returns {number}
 */
export function calculateScore(answers, pointsPerQuestion = 10) {
  if (!Array.isArray(answers)) return 0;
  const correctCount = answers.filter((a) => a && a.isCorrect).length;
  return correctCount * pointsPerQuestion;
}

/**
 * Calculates the longest streak of consecutive correct answers in the attempt.
 * @param {Array<{ isCorrect: boolean }>} answers
 * @returns {number}
 */
export function calculateBestStreak(answers) {
  if (!Array.isArray(answers) || answers.length === 0) return 0;
  let best = 0;
  let current = 0;
  for (const a of answers) {
    if (a && a.isCorrect) {
      current++;
      if (current > best) best = current;
    } else {
      current = 0;
    }
  }
  return best;
}

/**
 * Computes accuracy percentage (rounded integer).
 * @param {number} correctCount
 * @param {number} totalCount
 * @returns {number}
 */
export function calculateAccuracy(correctCount, totalCount) {
  if (!totalCount || totalCount <= 0) return 0;
  return Math.round((correctCount / totalCount) * 100);
}

/**
 * Formats seconds into MM:SS format.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatTime(totalSeconds) {
  if (typeof totalSeconds !== 'number' || isNaN(totalSeconds) || totalSeconds < 0) {
    return '00:00';
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Formats time in natural human text (e.g., "1m 45s" or "32s").
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatTimeHuman(totalSeconds) {
  if (typeof totalSeconds !== 'number' || isNaN(totalSeconds) || totalSeconds <= 0) {
    return '0s';
  }
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  if (mins > 0 && secs > 0) return `${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m`;
  return `${secs}s`;
}

/**
 * Formats ISO date string to readable short date.
 * @param {string | Date} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  try {
    const d = new Date(dateInput);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recent';
  }
}

/**
 * Generates 2-letter uppercase initials from player name.
 * @param {string} name
 * @returns {string}
 */
export function extractInitials(name) {
  if (!name || typeof name !== 'string') return 'AW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase() || 'AW';
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Implements Fisher-Yates shuffle algorithm.
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffles the options of a single question and updates correctIndex appropriately.
 * @param {import('../types/quiz').Question} question
 * @returns {import('../types/quiz').Question}
 */
export function shuffleQuestionOptions(question) {
  if (!question || !Array.isArray(question.options)) return question;
  const originalOptions = question.options;
  const correctOptionText = originalOptions[question.correctIndex];

  const shuffledOptions = shuffleArray(originalOptions);
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

  return {
    ...question,
    options: shuffledOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

/**
 * Evaluates performance tier and feedback badge based on percentage.
 * @param {number} percentage
 * @returns {import('../types/quiz').PerformanceTier}
 */
export function getPerformanceTier(percentage) {
  if (percentage === 100) {
    return {
      rankName: 'ACM Fellow Tier',
      badge: '🏆',
      title: 'Flawless Masterclass',
      description:
        'Exemplary comprehension across ACM-W initiatives, AI principles, and computing ethics.',
    };
  }
  if (percentage >= 80) {
    return {
      rankName: 'Distinguished Scholar',
      badge: '🎖️',
      title: 'Outstanding Performance',
      description:
        'Demonstrates comprehensive knowledge of artificial intelligence and ACM community values.',
    };
  }
  if (percentage >= 60) {
    return {
      rankName: 'Senior Contender',
      badge: '💡',
      title: 'Commendable Effort',
      description:
        'Solid foundational understanding with strong potential for recruitment advancement.',
    };
  }
  if (percentage >= 40) {
    return {
      rankName: 'Knowledge Apprentice',
      badge: '📚',
      title: 'Foundational Knowledge',
      description:
        'Good grasp of essential concepts; review the detailed explanations below to strengthen weak areas.',
    };
  }
  return {
    rankName: 'Academic Candidate',
    badge: '🌱',
    title: 'Keep Exploring',
    description:
      'Every expert begins here. Study the question review below and attempt Round 1 again.',
  };
}

/**
 * Groups questions and user answers by category to compute category performance.
 * @param {import('../types/quiz').Question[]} questions
 * @param {import('../types/quiz').UserAnswer[]} userAnswers
 * @returns {Array<{ category: string, total: number, correct: number, percentage: number }>}
 */
export function getCategoryBreakdown(questions, userAnswers) {
  if (!Array.isArray(questions) || !Array.isArray(userAnswers)) return [];

  const answerMap = new Map(userAnswers.map((a) => [a.questionId, a]));
  const categoryStats = {};

  questions.forEach((q) => {
    const cat = q.category || 'GENERAL';
    if (!categoryStats[cat]) {
      categoryStats[cat] = { category: cat, total: 0, correct: 0 };
    }
    categoryStats[cat].total += 1;

    const ans = answerMap.get(q.id);
    if (ans && ans.isCorrect) {
      categoryStats[cat].correct += 1;
    }
  });

  return Object.values(categoryStats).map((stat) => ({
    ...stat,
    percentage: Math.round((stat.correct / stat.total) * 100),
  }));
}

/**
 * Validates player name for leaderboard submission.
 * @param {string} name
 * @returns {{ valid: boolean, error?: string, sanitized: string }}
 */
export function validatePlayerName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required', sanitized: '' };
  }
  const sanitized = name.trim().replace(/[<>]/g, '');
  if (sanitized.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters', sanitized };
  }
  if (sanitized.length > 32) {
    return { valid: false, error: 'Name must be 32 characters or fewer', sanitized: sanitized.slice(0, 32) };
  }
  return { valid: true, sanitized };
}
