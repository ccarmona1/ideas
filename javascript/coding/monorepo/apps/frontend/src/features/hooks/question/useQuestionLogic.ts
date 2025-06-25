import type { QuestionDTO } from '@tester/types';
import { useState, useEffect, useCallback } from 'react';

const OPTIONS = ['a', 'b', 'c', 'd'] as const;

type OptionIndex = number | undefined;

interface UseQuestionLogicProps {
  question: QuestionDTO;
  onCorrect: () => void;
  onIncorrect?: () => void;
  onDragStart?: (selectedOption: OptionIndex, isCorrect: boolean) => void;
  disabled?: boolean;
}

interface UseQuestionLogicResult {
  selectedOption: OptionIndex;
  answeredCorrectly: boolean;
  isReady: boolean;
  isCorrect: boolean;
  correctIndex: number;
  handleSelectOption: (index: number) => void;
}

function useReadyTimer(setIsReady: (ready: boolean) => void, deps: unknown[]) {
  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, deps);
}

export function useQuestionLogic({
  question,
  onCorrect,
  onIncorrect,
  onDragStart,
  disabled,
}: UseQuestionLogicProps): UseQuestionLogicResult {
  const [selectedOption, setSelectedOption] = useState<OptionIndex>(undefined);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isCorrect =
    selectedOption !== undefined && OPTIONS[selectedOption] === question.answer;
  const correctIndex = OPTIONS.indexOf(
    question.answer as (typeof OPTIONS)[number]
  );

  useEffect(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
    if (onDragStart) onDragStart(undefined, false);
  }, [question.question, onDragStart]);

  useReadyTimer(setIsReady, [question.question]);

  const handleSelectOption = useCallback(
    (index: number) => {
      if (!answeredCorrectly && !disabled && isReady) {
        setSelectedOption(index);
        const isOptionCorrect = OPTIONS[index] === question.answer;
        if (onDragStart) onDragStart(index, isOptionCorrect);
        if (isOptionCorrect) {
          setAnsweredCorrectly(true);
          setTimeout(() => onCorrect(), 800);
        } else {
          if (onIncorrect) onIncorrect();
        }
      }
    },
    [
      answeredCorrectly,
      disabled,
      isReady,
      onCorrect,
      onIncorrect,
      onDragStart,
      question.answer,
    ]
  );

  return {
    selectedOption,
    answeredCorrectly,
    isReady,
    isCorrect,
    correctIndex,
    handleSelectOption,
  };
}
