/**
 * Local storage persistence layer for offline operation, demo mode, and fallback storage.
 */

const STORAGE_KEYS = {
  LEADERBOARD: 'acmw_quiz_leaderboard_v1',
  LAST_PLAYER: 'acmw_quiz_last_player_v1',
  SETTINGS: 'acmw_quiz_settings_v1',
};

/**
 * Initial curated leaderboard data to demonstrate rich UI functionality out-of-the-box.
 * @type {import('../types/quiz').LeaderboardEntry[]}
 */
export const INITIAL_MOCK_LEADERBOARD = [
  {
    id: 'mock-1',
    playerName: 'Ada Lovelace',
    avatarInitials: 'AL',
    score: 120,
    accuracy: 100,
    timeTakenSeconds: 105,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    isLocal: true,
  },
  {
    id: 'mock-2',
    playerName: 'Grace Hopper',
    avatarInitials: 'GH',
    score: 110,
    accuracy: 92,
    timeTakenSeconds: 132,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    isLocal: true,
  },
  {
    id: 'mock-3',
    playerName: 'Margaret Hamilton',
    avatarInitials: 'MH',
    score: 110,
    accuracy: 92,
    timeTakenSeconds: 148,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isLocal: true,
  },
  {
    id: 'mock-4',
    playerName: 'Fei-Fei Li',
    avatarInitials: 'FL',
    score: 100,
    accuracy: 83,
    timeTakenSeconds: 120,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    isLocal: true,
  },
  {
    id: 'mock-5',
    playerName: 'Anita Borg',
    avatarInitials: 'AB',
    score: 90,
    accuracy: 75,
    timeTakenSeconds: 165,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    isLocal: true,
  },
];

/**
 * Retrieves the local leaderboard list, sorted by score descending, then time ascending.
 * @returns {import('../types/quiz').LeaderboardEntry[]}
 */
export function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_MOCK_LEADERBOARD));
      return INITIAL_MOCK_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return INITIAL_MOCK_LEADERBOARD;
    return sortLeaderboard(parsed);
  } catch (err) {
    console.warn('[LocalStorage] Error reading leaderboard:', err);
    return INITIAL_MOCK_LEADERBOARD;
  }
}

/**
 * Saves a new score entry to local storage.
 * @param {Omit<import('../types/quiz').LeaderboardEntry, 'id' | 'createdAt'>} entry
 * @returns {import('../types/quiz').LeaderboardEntry}
 */
export function saveLocalScore(entry) {
  try {
    const current = getLocalLeaderboard();
    const newEntry = {
      ...entry,
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      isLocal: true,
    };
    const updated = sortLeaderboard([newEntry, ...current]).slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.warn('[LocalStorage] Error saving score:', err);
    return {
      ...entry,
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isLocal: true,
    };
  }
}

/**
 * Clears local leaderboard records (resets to defaults).
 */
export function resetLocalLeaderboard() {
  try {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_MOCK_LEADERBOARD));
    return INITIAL_MOCK_LEADERBOARD;
  } catch (err) {
    console.warn('[LocalStorage] Error resetting leaderboard:', err);
    return INITIAL_MOCK_LEADERBOARD;
  }
}

/**
 * Retrieves the cached player name.
 * @returns {string}
 */
export function getStoredPlayerName() {
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_PLAYER) || '';
  } catch {
    return '';
  }
}

/**
 * Saves the player name for subsequent sessions.
 * @param {string} name
 */
export function storePlayerName(name) {
  try {
    if (name) localStorage.setItem(STORAGE_KEYS.LAST_PLAYER, name.trim());
  } catch {
   
  }
}

/**
 * Sorts leaderboard entries by highest score, then lowest time taken, then newest date.
 * @param {import('../types/quiz').LeaderboardEntry[]} list
 * @returns {import('../types/quiz').LeaderboardEntry[]}
 */
export function sortLeaderboard(list) {
  return [...list].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (a.timeTakenSeconds !== b.timeTakenSeconds) {
      return a.timeTakenSeconds - b.timeTakenSeconds;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
