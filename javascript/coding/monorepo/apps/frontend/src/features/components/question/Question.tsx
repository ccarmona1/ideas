import React from 'react';
import './Question.css';
import { SimpleDragHint } from '../../../components/common/SimpleDragHint';
import { useQuestionLogic } from '../../hooks/question/useQuestionLogic';
import type { QuestionDTO } from '@tester/types';

export interface QuestionProps {
  question: QuestionDTO;
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

export const Question: React.FC<QuestionProps> = (props) => {
  const {
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
  } = props;

  const {
    selectedOption,
    answeredCorrectly,
    isReady,
    isCorrect,
    correctIndex,
    handleSelectOption,
  } = useQuestionLogic({
    question,
    onCorrect,
    onIncorrect,
    onDragStart,
    disabled,
  });

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
                disabled={answeredCorrectly || disabled || !isReady}
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
