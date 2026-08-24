import { describe, it, expect } from 'vitest';
import {
  calculateScore,
  calculateBestStreak,
  calculateAccuracy,
  formatTime,
  formatTimeHuman,
  getPerformanceTier,
  shuffleArray,
  shuffleQuestionOptions,
  getCategoryBreakdown,
  validatePlayerName,
  extractInitials,
} from '../utils/quizUtils';

describe('quizUtils - Core Quiz Logic', () => {
  it('calculates score correctly (10 points per correct answer)', () => {
    const answers = [
      { isCorrect: true },
      { isCorrect: false },
      { isCorrect: true },
      { isCorrect: true },
    ];
    expect(calculateScore(answers, 10)).toBe(30);
    expect(calculateScore([], 10)).toBe(0);
    expect(calculateScore(null, 10)).toBe(0);
  });

  it('calculates best consecutive streak correctly', () => {
    const answers = [
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
    ];
    expect(calculateBestStreak(answers)).toBe(3);
    expect(calculateBestStreak([])).toBe(0);
  });

  it('calculates accuracy percentage accurately with rounding', () => {
    expect(calculateAccuracy(8, 10)).toBe(80);
    expect(calculateAccuracy(1, 3)).toBe(33);
    expect(calculateAccuracy(0, 10)).toBe(0);
    expect(calculateAccuracy(10, 0)).toBe(0);
  });

  it('formats time to MM:SS correctly', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(300)).toBe('05:00');
    expect(formatTime(14)).toBe('00:14');
  });

  it('formats human time correctly', () => {
    expect(formatTimeHuman(125)).toBe('2m 5s');
    expect(formatTimeHuman(45)).toBe('45s');
    expect(formatTimeHuman(120)).toBe('2m');
  });

  it('evaluates performance tiers based on percentage', () => {
    expect(getPerformanceTier(100).rankName).toBe('ACM Fellow Tier');
    expect(getPerformanceTier(85).rankName).toBe('Distinguished Scholar');
    expect(getPerformanceTier(65).rankName).toBe('Senior Contender');
    expect(getPerformanceTier(45).rankName).toBe('Knowledge Apprentice');
    expect(getPerformanceTier(20).rankName).toBe('Academic Candidate');
  });

  it('extracts avatar initials properly', () => {
    expect(extractInitials('Jane Smith')).toBe('JS');
    expect(extractInitials('Alan Mathison Turing')).toBe('AT');
    expect(extractInitials('Ada')).toBe('AD');
    expect(extractInitials('')).toBe('AW');
  });

  it('validates player name lengths and characters', () => {
    expect(validatePlayerName('Jane').valid).toBe(true);
    expect(validatePlayerName('J').valid).toBe(false);
    expect(validatePlayerName('').valid).toBe(false);
    expect(validatePlayerName('   Ada Lovelace   ').sanitized).toBe('Ada Lovelace');
  });

  it('shuffles array without modifying original or losing elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);
    expect(shuffled).toHaveLength(original.length);
    expect(shuffled.sort()).toEqual(original.sort());
  });

  it('shuffles question options while remapping correctIndex properly', () => {
    const question = {
      id: 1,
      category: 'ACM-W',
      question: 'Test question?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctIndex: 2, 
      explanation: 'Test',
      difficulty: 'Easy',
    };

    const shuffledQuestion = shuffleQuestionOptions(question);
    expect(shuffledQuestion.options).toHaveLength(4);
    expect(shuffledQuestion.options[shuffledQuestion.correctIndex]).toBe('Option C');
  });

  it('computes category breakdowns accurately', () => {
    const questions = [
      { id: 1, category: 'ACM-W' },
      { id: 2, category: 'ACM-W' },
      { id: 3, category: 'AI' },
    ];
    const userAnswers = [
      { questionId: 1, isCorrect: true },
      { questionId: 2, isCorrect: false },
      { questionId: 3, isCorrect: true },
    ];

    const breakdown = getCategoryBreakdown(questions, userAnswers);
    expect(breakdown).toHaveLength(2);

    const acmw = breakdown.find((b) => b.category === 'ACM-W');
    expect(acmw.total).toBe(2);
    expect(acmw.correct).toBe(1);
    expect(acmw.percentage).toBe(50);

    const ai = breakdown.find((b) => b.category === 'AI');
    expect(ai.total).toBe(1);
    expect(ai.correct).toBe(1);
    expect(ai.percentage).toBe(100);
  });
});
