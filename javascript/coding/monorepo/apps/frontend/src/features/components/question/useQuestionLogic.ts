import { useState, useEffect } from 'react';
import type { QuestionMetadata } from '../../../types';

export interface UseQuestionLogicProps {
  question: QuestionMetadata;
  onCorrect: () => void;
  onIncorrect?: () => void;
  onDragStart?: (selectedOption: number | undefined, isCorrect: boolean) => void;
  disabled?: boolean;
}

export interface UseQuestionLogicResult {
  selectedOption: number | undefined;
  answeredCorrectly: boolean;
  isReady: boolean;
  isCorrect: boolean;
  correctIndex: number;
  handleSelectOption: (index: number) => void;
}

export function useQuestionLogic({
  question,
  onCorrect,
  onIncorrect,
  onDragStart,
  disabled,
}: UseQuestionLogicProps): UseQuestionLogicResult {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;
  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);

  useEffect(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
    setIsReady(false);
    if (onDragStart) {
      onDragStart(undefined, false);
    }
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [question.question, onDragStart]);

  const handleSelectOption = (index: number) => {
    if (!answeredCorrectly && !disabled && isReady) {
      setSelectedOption(index);
      const isOptionCorrect = ['a', 'b', 'c', 'd'][index] === question.answer;
      if (onDragStart) {
        onDragStart(index, isOptionCorrect);
      }
      if (isOptionCorrect) {
        setAnsweredCorrectly(true);
        setTimeout(() => onCorrect(), 800);
      } else {
        if (onIncorrect) onIncorrect();
      }
    }
  };

  return {
    selectedOption,
    answeredCorrectly,
    isReady,
    isCorrect,
    correctIndex,
    handleSelectOption,
  };
}
