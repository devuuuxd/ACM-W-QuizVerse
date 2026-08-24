/**
 * @typedef {'ACM-W' | 'ARTIFICIAL INTELLIGENCE' | 'COMPUTING HISTORY' | 'ETHICS & SOCIETY' | 'ALGORITHMS'} QuestionCategory
 * @typedef {'Easy' | 'Medium' | 'Hard'} DifficultyLevel
 * 
 * @typedef {Object} Question
 * @property {number} id
 * @property {QuestionCategory} category
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 * @property {string} explanation
 * @property {DifficultyLevel} difficulty
 * @property {string[]} [tags]
 * 
 * @typedef {Object} UserAnswer
 * @property {number} questionId
 * @property {number | null} selectedIndex
 * @property {boolean} isCorrect
 * @property {boolean} flagged
 * 
 * @typedef {Object} QuizStats
 * @property {number} score
 * @property {number} maxScore
 * @property {number} totalQuestions
 * @property {number} correctCount
 * @property {number} incorrectCount
 * @property {number} unansweredCount
 * @property {number} accuracyPercentage
 * @property {number} timeTakenSeconds
 * @property {number} bestStreak
 * @property {PerformanceTier} tier
 * 
 * @typedef {Object} PerformanceTier
 * @property {string} title
 * @property {string} badge
 * @property {string} rankName
 * @property {string} description
 * 
 * @typedef {Object} LeaderboardEntry
 * @property {string} id
 * @property {string} playerName
 * @property {string} avatarInitials
 * @property {number} score
 * @property {number} accuracy
 * @property {number} timeTakenSeconds
 * @property {string} createdAt
 * @property {boolean} [isLocal]
 * 
 * @typedef {Object} QuizConfig
 * @property {number} timeLimitSeconds
 * @property {boolean} shuffleQuestions
 * @property {boolean} shuffleOptions
 */

export const DEFAULT_QUIZ_CONFIG = {
  timeLimitSeconds: 300, 
  shuffleQuestions: true,
  shuffleOptions: true,
};
