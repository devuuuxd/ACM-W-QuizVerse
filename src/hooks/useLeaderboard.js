import { useState, useEffect, useCallback } from 'react';
import {
  fetchLeaderboard,
  submitQuizAttempt,
  isSupabaseConnected,
} from '../services/supabase';
import {
  resetLocalLeaderboard,
  getStoredPlayerName,
  storePlayerName,
} from '../services/storage';

export default function useLeaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local');
  const [lastSubmittedId, setLastSubmittedId] = useState(null);

  const isConnected = isSupabaseConnected();

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchLeaderboard();
      setEntries(res.entries);
      setSource(res.source);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
      setError('Unable to load leaderboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const submitScore = useCallback(
    async ({ playerName, avatarInitials, score, accuracy, timeTakenSeconds }) => {
      setSubmitting(true);
      setError(null);
      try {
        storePlayerName(playerName);
        const res = await submitQuizAttempt({
          playerName,
          avatarInitials,
          score,
          accuracy,
          timeTakenSeconds,
        });

        if (res.success && res.entry) {
          setLastSubmittedId(res.entry.id);
          
          await loadLeaderboard();
          return { success: true, entry: res.entry };
        }
        return { success: false, error: 'Submission failed' };
      } catch (err) {
        console.error('Error submitting score:', err);
        setError('Failed to submit score.');
        return { success: false, error: err.message };
      } finally {
        setSubmitting(false);
      }
    },
    [loadLeaderboard]
  );

  const resetLocal = useCallback(() => {
    const defaultData = resetLocalLeaderboard();
    setEntries(defaultData);
    setSource('local');
  }, []);

  return {
    entries,
    loading,
    submitting,
    error,
    source,
    isConnected,
    lastSubmittedId,
    defaultPlayerName: getStoredPlayerName(),
    submitScore,
    reload: loadLeaderboard,
    resetLocal,
  };
}
