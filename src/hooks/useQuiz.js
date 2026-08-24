import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchQuizQuestions } from '../services/supabase';
import useTimer from './useTimer';
import {
  calculateScore,
  calculateBestStreak,
  calculateAccuracy,
  getPerformanceTier,
  getCategoryBreakdown,
  shuffleArray,
  shuffleQuestionOptions,
} from '../utils/quizUtils';
import { DEFAULT_QUIZ_CONFIG } from '../types/quiz';

export default function useQuiz(config = DEFAULT_QUIZ_CONFIG) {
  const [rawQuestions, setRawQuestions] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [dataSource, setDataSource] = useState('local');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  

  const [phase, setPhase] = useState('quiz'); 
  const [isConfirmingSubmit, setIsConfirmingSubmit] = useState(false);
  const [submissionTime, setSubmissionTime] = useState(0);
  const [autoSubmittedByTimer, setAutoSubmittedByTimer] = useState(false);

  
  const loadQuestions = useCallback(async () => {
    setLoadingQuestions(true);
    try {
      const res = await fetchQuizQuestions();
      setRawQuestions(res.questions);
      setDataSource(res.source);

      
      let processed = res.questions;
      if (config.shuffleQuestions) {
        processed = shuffleArray(processed);
      }
      if (config.shuffleOptions) {
        processed = processed.map(shuffleQuestionOptions);
      }
      
      setActiveQuestions(processed.slice(0, 10));
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setLoadingQuestions(false);
    }
  }, [config.shuffleQuestions, config.shuffleOptions]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  
  const handleFinalSubmit = useCallback(
    (isAuto = false) => {
      setIsConfirmingSubmit(false);
      setAutoSubmittedByTimer(isAuto);
      setPhase('results');
    },
    []
  );

  
  const timer = useTimer(config.timeLimitSeconds || 300, () => {
    
    handleFinalSubmit(true);
  });

  
  useEffect(() => {
    if (!loadingQuestions && activeQuestions.length > 0 && phase === 'quiz') {
      timer.start();
    } else {
      timer.pause();
    }
  }, [loadingQuestions, activeQuestions.length, phase, timer.start, timer.pause]);

  
  useEffect(() => {
    if (phase === 'results') {
      setSubmissionTime(timer.elapsedSeconds);
      timer.pause();
    }
  }, [phase, timer.elapsedSeconds, timer.pause]);

  const totalQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[currentIndex] || null;
  const currentAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const isCurrentFlagged = currentQuestion ? Boolean(flaggedQuestions[currentQuestion.id]) : false;

  
  const selectAnswer = useCallback(
    (optionIndex) => {
      if (!currentQuestion || phase !== 'quiz') return;
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionIndex,
      }));
    },
    [currentQuestion, phase]
  );

  
  const toggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  }, [currentQuestion]);

  
  const goToQuestion = useCallback(
    (index) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
      }
    },
    [totalQuestions]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      
      setIsConfirmingSubmit(true);
    }
  }, [currentIndex, totalQuestions]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const openSubmitConfirmation = useCallback(() => {
    setIsConfirmingSubmit(true);
  }, []);

  const closeSubmitConfirmation = useCallback(() => {
    setIsConfirmingSubmit(false);
  }, []);

  const confirmSubmit = useCallback(() => {
    handleFinalSubmit(false);
  }, [handleFinalSubmit]);

  
  const restartQuiz = useCallback(() => {
    let processed = rawQuestions;
    if (config.shuffleQuestions) {
      processed = shuffleArray(processed);
    }
    if (config.shuffleOptions) {
      processed = processed.map(shuffleQuestionOptions);
    }
    setActiveQuestions(processed.slice(0, 10));
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsConfirmingSubmit(false);
    setAutoSubmittedByTimer(false);
    setSubmissionTime(0);
    timer.reset(config.timeLimitSeconds || 300);
    setPhase('quiz');
  }, [rawQuestions, config, timer]);

  
  const answeredCount = useMemo(() => {
    return activeQuestions.filter((q) => selectedAnswers[q.id] !== undefined).length;
  }, [activeQuestions, selectedAnswers]);

  const unansweredCount = totalQuestions - answeredCount;

  
  const { resultsList, stats, categoryStats } = useMemo(() => {
    if (activeQuestions.length === 0) {
      return { resultsList: [], stats: null, categoryStats: [] };
    }

    const answersList = activeQuestions.map((q) => {
      const selected = selectedAnswers[q.id];
      const isAnswered = selected !== undefined;
      const isCorrect = isAnswered && selected === q.correctIndex;
      return {
        questionId: q.id,
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        selectedIndex: selected,
        isAnswered,
        isCorrect,
        flagged: Boolean(flaggedQuestions[q.id]),
      };
    });

    const correctCount = answersList.filter((a) => a.isCorrect).length;
    const incorrectCount = answersList.filter((a) => a.isAnswered && !a.isCorrect).length;
    const score = calculateScore(answersList, 10);
    const maxScore = totalQuestions * 10;
    const accuracy = calculateAccuracy(correctCount, totalQuestions);
    const bestStreak = calculateBestStreak(answersList);
    const tier = getPerformanceTier(accuracy);
    const catStats = getCategoryBreakdown(activeQuestions, answersList);

    const calculatedStats = {
      score,
      maxScore,
      totalQuestions,
      correctCount,
      incorrectCount,
      unansweredCount: totalQuestions - (correctCount + incorrectCount),
      accuracyPercentage: accuracy,
      timeTakenSeconds: submissionTime || timer.elapsedSeconds,
      bestStreak,
      tier,
    };

    return {
      resultsList: answersList,
      stats: calculatedStats,
      categoryStats: catStats,
    };
  }, [
    activeQuestions,
    selectedAnswers,
    flaggedQuestions,
    totalQuestions,
    submissionTime,
    timer.elapsedSeconds,
  ]);

  return {
    
    questions: activeQuestions,
    currentQuestion,
    currentIndex,
    totalQuestions,
    loadingQuestions,
    dataSource,

    
    selectedAnswers,
    currentAnswer,
    flaggedQuestions,
    isCurrentFlagged,
    answeredCount,
    unansweredCount,

    
    phase,
    isConfirmingSubmit,
    autoSubmittedByTimer,

    
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    openSubmitConfirmation,
    closeSubmitConfirmation,
    confirmSubmit,
    restartQuiz,

    
    timer,

    
    resultsList,
    stats,
    categoryStats,
  };
}
