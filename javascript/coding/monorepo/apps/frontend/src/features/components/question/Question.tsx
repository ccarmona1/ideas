import React, { useState, useEffect } from 'react';
import './Question.css';
import { DragHint } from '../common/DragHint';
import type { QuestionMetadata, DragHandlers } from '../../../types';

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
  dragHandlers?: DragHandlers;
  canDrag?: boolean;
  disabled?: boolean;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onCorrect,
  onIncorrect,
  onSkip,
  onDragStart,
  onDragAction,
  dragHandlers,
  canDrag,
  disabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;

  // NUEVO: obtener el índice de la respuesta correcta
  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);

  // Resetear estado cuando cambia la pregunta
  useEffect(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
  }, [question.question]);

  // Notificar al componente padre sobre el estado de arrastre
  useEffect(() => {
    if (onDragStart) {
      onDragStart(selectedOption, isCorrect);
    }
  }, [selectedOption, isCorrect]); // Remover onDragStart de dependencias para evitar bucles

  const handleSelectOption = (index: number) => {
    if (!answeredCorrectly && !disabled) {
      setSelectedOption(index);
      if (['a', 'b', 'c', 'd'][index] === question.answer) {
        setAnsweredCorrectly(true);

        // Agregar un delay para mostrar el feedback visual antes de la transición
        setTimeout(() => {
          onCorrect();
        }, 800); // Dar tiempo para que se vea la animación de éxito
      } else {
        if (onIncorrect) onIncorrect();
        // No mostramos modal, solo marcamos como incorrecta
      }
    }
  };

  return (
    <div className="question-container">
      <h1>{question.question}</h1>
      <ul className="question-list">
        {question.options.map((option, index) => {
          let btnClass = 'option-btn';

          // Si la opción es la seleccionada
          if (selectedOption === index) {
            btnClass += ' selected';
            if (selectedOption !== undefined) {
              btnClass += isCorrect ? ' answer-correct' : ' answer-incorrect';
            }
          }

          // Si la opción es la correcta y el usuario seleccionó una incorrecta
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

      {/* Mostrar hint de arrastre basado en el estado */}
      {selectedOption !== undefined && !isCorrect && (
        <div className="explanation-footer">
          <DragHint
            text="Arrastra o haz click aquí para ver la explicación"
            onAction={onDragAction}
            dragHandlers={dragHandlers}
            canDrag={canDrag}
          />
        </div>
      )}

      {selectedOption === undefined && onSkip && (
        <div className="explanation-footer">
          <DragHint
            text="Arrastra o haz click aquí para responder después"
            onAction={onDragAction}
            dragHandlers={dragHandlers}
            canDrag={canDrag}
          />
        </div>
      )}
    </div>
  );
};

export default Question;
