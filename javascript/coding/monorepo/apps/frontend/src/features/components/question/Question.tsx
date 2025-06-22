import React, { useState, useRef } from 'react';
import './Question.css';
import type { QuestionMetadata } from '../course/Course';

export interface QuestionProps {
  question: QuestionMetadata;
  onCorrect: () => void;
  onIncorrect?: () => void;
  onNext?: () => void;
  onShowExplanation?: (
    question: QuestionMetadata,
    selectedOption: number
  ) => void;
  disabled?: boolean;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onCorrect,
  onIncorrect,
  onNext,
  onShowExplanation,
  disabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;

  // NUEVO: obtener el índice de la respuesta correcta
  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);

  const handleSelectOption = (index: number) => {
    if (!answeredCorrectly && !disabled) {
      setSelectedOption(index);
      if (['a', 'b', 'c', 'd'][index] === question.answer) {
        setAnsweredCorrectly(true);
        onCorrect();
      } else {
        if (onIncorrect) onIncorrect();
        // No mostramos modal, solo marcamos como incorrecta
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (selectedOption !== undefined && isCorrect === false) {
      setIsDragging(true);
      dragStartY.current = e.clientY;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && dragStartY.current !== null) {
      const deltaY = e.clientY - dragStartY.current;
      setDragY(deltaY < 0 ? deltaY : 0);
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (dragY < -200) {
        setDragY(-500);
        setTimeout(() => {
          setDragY(0);
          setSelectedOption(undefined);
          // Cuando hay una respuesta incorrecta, mostrar explicación
          if (selectedOption !== undefined && !isCorrect && onShowExplanation) {
            onShowExplanation(question, selectedOption);
          } else if (onNext) {
            onNext();
          }
        }, 300);
      } else {
        setDragY(0);
      }
    }
  };

  return (
    <div
      className={`question-container${isDragging ? ' dragging' : ''}`}
      style={{ transform: `translateY(${dragY}px)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="region"
      aria-label="Pregunta"
    >
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
      {selectedOption !== undefined && !isCorrect && (
        <div className="question-feedback">
          Arrastra hacia arriba para ver la explicación
        </div>
      )}
    </div>
  );
};

export default Question;
