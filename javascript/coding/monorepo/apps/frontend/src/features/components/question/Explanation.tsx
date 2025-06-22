import React from 'react';
import './Explanation.css';
import type { QuestionMetadata } from '../course/Course';

export interface ExplanationProps {
  question: QuestionMetadata;
  selectedOption: number;
  onDragAction?: () => void;
  dragHandlers?: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (e?: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: (e?: React.PointerEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  };
  canDrag?: boolean;
}

const Explanation: React.FC<ExplanationProps> = ({
  question,
  selectedOption,
  onDragAction,
  dragHandlers,
  canDrag,
}) => {
  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);
  const selectedLetter = ['a', 'b', 'c', 'd'][selectedOption];

  return (
    <div className="question-container">
      <h1>Respuesta incorrecta</h1>

      <div className="answer-summary">
        <div className="selected-answer incorrect">
          <strong>Tu respuesta:</strong> {selectedLetter.toUpperCase()}){' '}
          {question.options[selectedOption]}
        </div>

        <div className="correct-answer">
          <strong>Respuesta correcta:</strong> {question.answer.toUpperCase()}){' '}
          {question.options[correctIndex]}
        </div>
      </div>

      <div className="explanation-content">
        <h2>Explicación</h2>
        <p>{question.explanation}</p>

        {selectedLetter in (question.invalidOptions || {}) && (
          <div className="invalid-reason">
            <h3>¿Por qué es incorrecta tu respuesta?</h3>
            <p>
              {
                question.invalidOptions?.[
                  selectedLetter as keyof typeof question.invalidOptions
                ]
              }
            </p>
          </div>
        )}
      </div>

      <div className="explanation-footer">
        <div
          className="drag-hint drag-hint-interactive"
          onClick={onDragAction}
          onPointerDown={
            canDrag && dragHandlers ? dragHandlers.onPointerDown : undefined
          }
          onPointerMove={
            canDrag && dragHandlers ? dragHandlers.onPointerMove : undefined
          }
          onPointerUp={
            canDrag && dragHandlers ? dragHandlers.onPointerUp : undefined
          }
          onPointerLeave={
            canDrag && dragHandlers ? dragHandlers.onPointerLeave : undefined
          }
          onTouchStart={
            canDrag && dragHandlers ? dragHandlers.onTouchStart : undefined
          }
          onTouchMove={
            canDrag && dragHandlers ? dragHandlers.onTouchMove : undefined
          }
          onTouchEnd={
            canDrag && dragHandlers ? dragHandlers.onTouchEnd : undefined
          }
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onDragAction?.();
            }
          }}
        >
          Arrastra o haz click aquí para continuar
        </div>
      </div>
    </div>
  );
};

export default Explanation;
