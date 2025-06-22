import React, { useState, useRef } from 'react';
import './Explanation.css';
import type { QuestionMetadata } from '../course/Course';

export interface ExplanationProps {
  question: QuestionMetadata;
  selectedOption: number;
  onNext: () => void;
}

const Explanation: React.FC<ExplanationProps> = ({
  question,
  selectedOption,
  onNext,
}) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);
  const selectedLetter = ['a', 'b', 'c', 'd'][selectedOption];

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
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
          onNext();
        }, 300);
      } else {
        setDragY(0);
      }
    }
  };

  return (
    <div
      className={`explanation-container${isDragging ? ' dragging' : ''}`}
      style={{ transform: `translateY(${dragY}px)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="region"
      aria-label="Explicación de la respuesta"
    >
      <div className="explanation-header">
        <h2>Respuesta incorrecta</h2>
      </div>

      <div className="explanation-content">
        <h3>{question.question}</h3>

        <div className="answer-summary">
          <div className="selected-answer incorrect">
            <strong>Tu respuesta:</strong> {question.options[selectedOption]}
          </div>

          <div className="correct-answer">
            <strong>Respuesta correcta:</strong>{' '}
            {question.options[correctIndex]}
          </div>
        </div>

        <div className="explanation-section">
          <h4>Explicación:</h4>
          <p>{question.explanation}</p>
        </div>

        {question.invalidOptions &&
          selectedLetter &&
          question.invalidOptions[
            selectedLetter as keyof typeof question.invalidOptions
          ] && (
            <div className="invalid-option-section">
              <h4>¿Por qué esta opción es incorrecta?</h4>
              <p>
                {
                  question.invalidOptions[
                    selectedLetter as keyof typeof question.invalidOptions
                  ]
                }
              </p>
            </div>
          )}
      </div>

      <div className="explanation-footer">
        <div className="swipe-hint">Arrastra hacia arriba para continuar</div>
      </div>
    </div>
  );
};

export default Explanation;
