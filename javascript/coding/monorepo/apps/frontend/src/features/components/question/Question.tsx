import React, { useState } from 'react';
import './Question.css';
import type { QuestionMetadata } from '../course/Course';

export interface QuestionProps {
  question: QuestionMetadata;
  onCorrect: () => void;
  onIncorrect?: () => void;
  onSkip?: () => void;
  onDragStart?: (
    selectedOption: number | undefined,
    isCorrect: boolean
  ) => boolean;
  disabled?: boolean;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onCorrect,
  onIncorrect,
  onSkip,
  onDragStart,
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

  // Notificar al componente padre sobre el estado de arrastre
  React.useEffect(() => {
    if (onDragStart) {
      onDragStart(selectedOption, isCorrect);
    }
  }, [selectedOption, isCorrect, onDragStart]);

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
          <div className="drag-hint">
            Arrastra hacia arriba para ver la explicación
          </div>
        </div>
      )}

      {selectedOption === undefined && onSkip && (
        <div className="explanation-footer">
          <div className="drag-hint">
            Arrastra hacia arriba para responder después
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
