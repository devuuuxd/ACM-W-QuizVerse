import { createClient } from '@supabase/supabase-js';
import questionsFallback from '../data/questions';
import {
  getLocalLeaderboard,
  saveLocalScore,
  sortLeaderboard,
} from './storage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


const isConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project') &&
    supabaseAnonKey.length > 20
);


export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : null;


export function isSupabaseConnected() {
  return isConfigured && supabase !== null;
}


export async function fetchQuizQuestions() {
  if (!isSupabaseConnected() || !supabase) {
    return { questions: questionsFallback, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('[Supabase] Questions query returned empty or failed. Using fallback dataset.', error);
      return { questions: questionsFallback, source: 'local' };
    }

    
    const mapped = data.map((row) => ({
      id: row.id,
      category: row.category,
      question: row.question,
      options: row.options,
      correctIndex: row.correct_index !== undefined ? row.correct_index : row.correctIndex,
      explanation: row.explanation || '',
      difficulty: row.difficulty || 'Medium',
      tags: row.tags || [],
    }));

    return { questions: mapped, source: 'supabase' };
  } catch (err) {
    console.warn('[Supabase] Exception fetching questions, using fallback:', err);
    return { questions: questionsFallback, source: 'local' };
  }
}


export async function submitQuizAttempt(payload) {
  
  const localEntry = saveLocalScore(payload);

  if (!isSupabaseConnected() || !supabase) {
    return { success: true, entry: localEntry, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([
        {
          player_name: payload.playerName,
          avatar_initials: payload.avatarInitials,
          score: payload.score,
          accuracy: payload.accuracy,
          time_taken_seconds: payload.timeTakenSeconds,
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('[Supabase] Error inserting score record:', error);
      return { success: true, entry: localEntry, source: 'local' };
    }

    const remoteEntry = {
      id: String(data.id),
      playerName: data.player_name,
      avatarInitials: data.avatar_initials,
      score: data.score,
      accuracy: data.accuracy,
      timeTakenSeconds: data.time_taken_seconds,
      createdAt: data.created_at || new Date().toISOString(),
      isLocal: false,
    };

    return { success: true, entry: remoteEntry, source: 'supabase' };
  } catch (err) {
    console.warn('[Supabase] Exception submitting score:', err);
    return { success: true, entry: localEntry, source: 'local' };
  }
}


export async function fetchLeaderboard() {
  if (!isSupabaseConnected() || !supabase) {
    return { entries: getLocalLeaderboard(), source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .order('time_taken_seconds', { ascending: true })
      .limit(30);

    if (error || !data) {
      console.warn('[Supabase] Leaderboard query error, fallback to local storage:', error);
      return { entries: getLocalLeaderboard(), source: 'local' };
    }

    const mapped = data.map((row) => ({
      id: String(row.id),
      playerName: row.player_name,
      avatarInitials: row.avatar_initials || 'AW',
      score: row.score,
      accuracy: row.accuracy,
      timeTakenSeconds: row.time_taken_seconds,
      createdAt: row.created_at,
      isLocal: false,
    }));

    return { entries: sortLeaderboard(mapped), source: 'supabase' };
  } catch (err) {
    console.warn('[Supabase] Exception fetching leaderboard:', err);
    return { entries: getLocalLeaderboard(), source: 'local' };
  }
}
