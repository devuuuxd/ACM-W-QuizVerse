import { useState, useEffect, useRef, useCallback } from 'react';
import { formatTime } from '../utils/quizUtils';


export default function useTimer(initialSeconds = 300, onExpire) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const onExpireRef = useRef(onExpire);

  
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  
  useEffect(() => {
    setTimeRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          if (onExpireRef.current) {
            onExpireRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(
    (newSeconds = initialSeconds) => {
      setIsRunning(false);
      setTimeRemaining(newSeconds);
    },
    [initialSeconds]
  );

  const isWarning = timeRemaining > 0 && timeRemaining <= 60;
  const isCritical = timeRemaining > 0 && timeRemaining <= 20;
  const progressPercent = initialSeconds > 0 ? (timeRemaining / initialSeconds) * 100 : 0;
  const elapsedSeconds = Math.max(0, initialSeconds - timeRemaining);

  return {
    timeRemaining,
    elapsedSeconds,
    isRunning,
    isWarning,
    isCritical,
    formattedTime: formatTime(timeRemaining),
    progressPercent,
    start,
    pause,
    reset,
  };
}
