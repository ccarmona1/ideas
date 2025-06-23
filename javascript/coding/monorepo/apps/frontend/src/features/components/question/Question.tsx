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
    // Limpiar el estado de drag cuando cambia la pregunta
    if (onDragStart) {
      onDragStart(undefined, false);
    }
  }, [question.question, onDragStart]);

  // Remover el useEffect que llamaba automáticamente onDragStart
  // Ahora solo se llamará cuando el usuario seleccione una opción

  const handleSelectOption = (index: number) => {
    if (!answeredCorrectly && !disabled) {
      setSelectedOption(index);
      const isOptionCorrect = ['a', 'b', 'c', 'd'][index] === question.answer;
      
      // Llamar a onDragStart solo después de que el usuario seleccione
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
