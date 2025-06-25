import { useCallback, useEffect, useState } from 'react';
import type { QuestionMetadata } from '../../../../types';
import { useGetQuestions } from '../../../../hooks/useGetQuestions';

export interface UseCourseNavigationResult {
  questionQueue: QuestionMetadata[];
  currentQuestionIndex: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  showingExplanation: boolean;
  explanationData: {
    question: QuestionMetadata;
    selectedOption: number;
  } | null;
  questionTransition: 'entering' | 'exiting' | 'idle';
  currentViewMode: 'question' | 'explanation' | 'completed';
  canDrag: boolean;
  isProcessingAction: boolean;
  lastQuestionState: {
    hasSelectedOption: boolean;
    isCorrect: boolean;
    selectedOptionIndex: number;
  } | null;
  handleSkipQuestion: () => void;
  handleShowExplanation: (
    question: QuestionMetadata,
    selectedOption: number
  ) => void;
  handleNextFromExplanation: () => void;
  executeAction: () => void;
  handleCorrect: (index: number) => void;
  handleIncorrect: () => void;
  handleDragStart: (
    selectedOption: number | undefined,
    isCorrect: boolean
  ) => boolean;
  isCompleted: boolean;
  accuracy: number;
  setCurrentViewMode: (mode: 'question' | 'explanation' | 'completed') => void;
  setCurrentQuestionIndex: (index: number) => void;
  setQuestionQueue: (queue: QuestionMetadata[]) => void;
}

export function useCourseNavigation(
  courseName: string
): UseCourseNavigationResult {
  const { data: questionsData } = useGetQuestions(courseName);
  const [questionQueue, setQuestionQueue] = useState<QuestionMetadata[]>([]);

  useEffect(() => {
    if (questionsData && questionsData.length > 0) {
      setQuestionQueue(questionsData);
    }
  }, [questionsData]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [showingExplanation, setShowingExplanation] = useState(false);
  const [explanationData, setExplanationData] = useState<{
    question: QuestionMetadata;
    selectedOption: number;
  } | null>(null);
  const [questionTransition, setQuestionTransition] = useState<
    'entering' | 'exiting' | 'idle'
  >('idle');
  const [currentViewMode, setCurrentViewMode] = useState<
    'question' | 'explanation' | 'completed'
  >('question');
  const [canDrag, setCanDrag] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [lastQuestionState, setLastQuestionState] = useState<{
    hasSelectedOption: boolean;
    isCorrect: boolean;
    selectedOptionIndex: number;
  } | null>(null);

  const handleSkipQuestion = useCallback(() => {
    setSkippedCount((c) => c + 1);
    const currentQuestion = questionQueue[currentQuestionIndex];
    const newQueue = [
      ...questionQueue.slice(0, currentQuestionIndex),
      ...questionQueue.slice(currentQuestionIndex + 1),
      currentQuestion,
    ];
    setQuestionQueue(newQueue);
    if (currentQuestionIndex >= newQueue.length - 1) {
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex, newQueue.length - 1)
      );
    }
    setLastQuestionState(null);
    setCanDrag(false);
    setQuestionTransition('entering');
    setTimeout(() => setQuestionTransition('idle'), 100);
  }, [questionQueue, currentQuestionIndex]);

  const handleShowExplanation = useCallback(
    (question: QuestionMetadata, selectedOption: number) => {
      setExplanationData({ question, selectedOption });
      setCurrentViewMode('explanation');
      setShowingExplanation(true);
      setQuestionTransition('entering');
      setTimeout(() => setQuestionTransition('idle'), 100);
    },
    []
  );

  const handleNextFromExplanation = useCallback(() => {
    setTimeout(() => {
      setCurrentViewMode('question');
      setShowingExplanation(false);
      setExplanationData(null);
      setLastQuestionState(null);
      setCanDrag(false);
      if (currentQuestionIndex < questionQueue.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      setQuestionTransition('entering');
      setTimeout(() => setQuestionTransition('idle'), 100);
    }, 50);
  }, [currentQuestionIndex, questionQueue.length]);

  const executeAction = useCallback(() => {
    if (isProcessingAction) return;
    setIsProcessingAction(true);
    if (currentViewMode === 'explanation') {
      handleNextFromExplanation();
    } else if (currentViewMode === 'question') {
      const currentQuestion = questionQueue[currentQuestionIndex];
      if (lastQuestionState) {
        if (
          lastQuestionState.hasSelectedOption &&
          !lastQuestionState.isCorrect
        ) {
          handleShowExplanation(
            currentQuestion,
            lastQuestionState.selectedOptionIndex
          );
        } else if (!lastQuestionState.hasSelectedOption) {
          handleSkipQuestion();
        }
      } else {
        handleSkipQuestion();
      }
    }
    setTimeout(() => setIsProcessingAction(false), 500);
  }, [
    currentViewMode,
    lastQuestionState,
    questionQueue,
    currentQuestionIndex,
    isProcessingAction,
    handleNextFromExplanation,
    handleShowExplanation,
    handleSkipQuestion,
  ]);

  const handleCorrect = useCallback(
    (index: number) => {
      setCorrectCount((c) => c + 1);
      setLastQuestionState(null);
      setCanDrag(false);
      setTimeout(() => {
        if (index < questionQueue.length - 1) {
          setCurrentQuestionIndex(index + 1);
        }
        setQuestionTransition('entering');
        setTimeout(() => setQuestionTransition('idle'), 100);
      }, 200);
    },
    [questionQueue.length]
  );

  const handleIncorrect = useCallback(() => {
    setIncorrectCount((c) => c + 1);
  }, []);

  const handleDragStart = useCallback(
    (selectedOption: number | undefined, isCorrect: boolean) => {
      const shouldAllowDrag =
        (selectedOption !== undefined && !isCorrect) ||
        selectedOption === undefined;
      setCanDrag(shouldAllowDrag);
      setLastQuestionState({
        hasSelectedOption: selectedOption !== undefined,
        isCorrect: isCorrect,
        selectedOptionIndex: selectedOption ?? -1,
      });
      return shouldAllowDrag;
    },
    []
  );

  const isCompleted = currentQuestionIndex >= questionQueue.length;
  const totalAnswered = correctCount + incorrectCount;
  const accuracy =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  useEffect(() => {
    if (isCompleted) {
      setCurrentViewMode('completed');
    } else if (showingExplanation) {
      setCurrentViewMode('explanation');
    } else {
      setCurrentViewMode('question');
    }
  }, [isCompleted, showingExplanation]);

  useEffect(() => {
    setLastQuestionState(null);
    setCanDrag(false);
    setIsProcessingAction(false);
    if (currentViewMode === 'explanation') {
      setCanDrag(true);
    } else if (currentViewMode === 'completed') {
      setCanDrag(false);
    }
  }, [currentQuestionIndex, currentViewMode]);

  return {
    questionQueue,
    currentQuestionIndex,
    correctCount,
    incorrectCount,
    skippedCount,
    showingExplanation,
    explanationData,
    questionTransition,
    currentViewMode,
    canDrag,
    isProcessingAction,
    lastQuestionState,
    handleSkipQuestion,
    handleShowExplanation,
    handleNextFromExplanation,
    executeAction,
    handleCorrect,
    handleIncorrect,
    handleDragStart,
    isCompleted,
    accuracy,
    setCurrentViewMode,
    setCurrentQuestionIndex,
    setQuestionQueue,
  };
}
