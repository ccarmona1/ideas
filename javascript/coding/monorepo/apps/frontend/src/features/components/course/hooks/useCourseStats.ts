import { useMemo } from 'react';
import type { QuestionMetadata } from '../../../../types';

export interface UseCourseStats {
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
  remaining: number;
}

export function useCourseStats(params: {
  questionQueue: QuestionMetadata[];
  currentQuestionIndex: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
}): UseCourseStats {
  const {
    questionQueue,
    currentQuestionIndex,
    correctCount,
    incorrectCount,
    skippedCount,
  } = params;
  return useMemo(() => {
    const total = questionQueue.length;
    const remaining = total - currentQuestionIndex;
    const accuracy =
      correctCount + incorrectCount > 0
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
        : 0;
    return {
      total,
      correct: correctCount,
      incorrect: incorrectCount,
      skipped: skippedCount,
      accuracy,
      remaining,
    };
  }, [
    questionQueue.length,
    currentQuestionIndex,
    correctCount,
    incorrectCount,
    skippedCount,
  ]);
}
