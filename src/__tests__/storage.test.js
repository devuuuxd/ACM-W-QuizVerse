import { describe, it, expect, beforeEach } from 'vitest';
import {
  getLocalLeaderboard,
  saveLocalScore,
  sortLeaderboard,
  resetLocalLeaderboard,
  INITIAL_MOCK_LEADERBOARD,
} from '../services/storage';

describe('Storage & Offline Persistence Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns seeded mock leaderboard on first visit when localStorage is empty', () => {
    const list = getLocalLeaderboard();
    expect(list.length).toBeGreaterThanOrEqual(INITIAL_MOCK_LEADERBOARD.length);
    expect(list[0].playerName).toBe('Ada Lovelace');
  });

  it('saves new score and ranks it appropriately in local storage', () => {
    saveLocalScore({
      playerName: 'Alan Turing',
      avatarInitials: 'AT',
      score: 130, 
      accuracy: 100,
      timeTakenSeconds: 90,
    });

    const list = getLocalLeaderboard();
    expect(list[0].playerName).toBe('Alan Turing');
    expect(list[0].score).toBe(130);
  });

  it('sorts leaderboard by score DESC, then timeTakenSeconds ASC', () => {
    const raw = [
      { id: '1', playerName: 'Player A', score: 80, timeTakenSeconds: 120, createdAt: '' },
      { id: '2', playerName: 'Player B', score: 100, timeTakenSeconds: 150, createdAt: '' },
      { id: '3', playerName: 'Player C', score: 100, timeTakenSeconds: 90, createdAt: '' },
    ];

    const sorted = sortLeaderboard(raw);
    expect(sorted[0].playerName).toBe('Player C'); 
    expect(sorted[1].playerName).toBe('Player B'); 
    expect(sorted[2].playerName).toBe('Player A'); 
  });

  it('resets leaderboard to defaults when requested', () => {
    saveLocalScore({
      playerName: 'Temp User',
      avatarInitials: 'TU',
      score: 50,
      accuracy: 50,
      timeTakenSeconds: 200,
    });

    const resetList = resetLocalLeaderboard();
    expect(resetList.some((e) => e.playerName === 'Temp User')).toBe(false);
  });
});
