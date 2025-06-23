import React, { useState, useEffect } from 'react';
import './Question.css';
import { SimpleDragHint } from '../common/SimpleDragHint';
import type { QuestionMetadata } from '../../../types';

export interface QuestionProps {
  question: QuestionMetadata;
  onCorrect: () => void;
  onIncorrect?: () => void;
  onSkip?: () => void;
  onDragStart?: (
    selectedOption: number | undefined,
    isCorrect: boolean
  ) => boolean;
  onDragAction?: () => void;
  canDrag?: boolean;
  disabled?: boolean;
  onContainerDragStart?: () => void;
  onDragMove?: (deltaY: number, opacity: number) => void;
  onDragEnd?: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onCorrect,
  onIncorrect,
  onSkip,
  onDragStart,
  onDragAction,
  canDrag,
  disabled,
  onContainerDragStart,
  onDragMove,
  onDragEnd,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;
  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);

  useEffect(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
  }, [question.question]);

  useEffect(() => {
    if (onDragStart) {
      onDragStart(selectedOption, isCorrect);
    }
  }, [selectedOption, isCorrect]);

  const handleSelectOption = (index: number) => {
    if (!answeredCorrectly && !disabled) {
      setSelectedOption(index);
      if (['a', 'b', 'c', 'd'][index] === question.answer) {
        setAnsweredCorrectly(true);
        setTimeout(() => onCorrect(), 800);
      } else {
        if (onIncorrect) onIncorrect();
      }
    }
  };

  return (
    <div className="question-container">
      <h1>{question.question}</h1>
      <ul className="question-list">
        {question.options.map((option, index) => {
          let btnClass = 'option-btn';

          if (selectedOption === index) {
            btnClass += ' selected';
            if (selectedOption !== undefined) {
              btnClass += isCorrect ? ' answer-correct' : ' answer-incorrect';
            }
          }

          if (
            selectedOption !== undefined &&
            !isCorrect &&
            index === correctIndex
          ) {
            btnClass += ' answer-correct';
          }

          return (
            <li key={index}>
              <button
                type="button"
                className={btnClass}
                onClick={() => handleSelectOption(index)}
                disabled={answeredCorrectly || disabled}
                aria-pressed={selectedOption === index}
                aria-label={`Opción ${String.fromCharCode(
                  65 + index
                )}: ${option}`}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>

      {selectedOption !== undefined && !isCorrect && (
        <div className="explanation-footer">
          <SimpleDragHint
            text="Arrastra o haz click aquí para ver la explicación"
            onAction={() => onDragAction?.()}
            canDrag={canDrag}
            onDragStart={onContainerDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
          />
        </div>
      )}

      {selectedOption === undefined && onSkip && (
        <div className="explanation-footer">
          <SimpleDragHint
            text="Arrastra o haz click aquí para responder después"
            onAction={() => onDragAction?.()}
            canDrag={canDrag}
            onDragStart={onContainerDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
          />
        </div>
      )}
    </div>
  );
};

export default Question;
