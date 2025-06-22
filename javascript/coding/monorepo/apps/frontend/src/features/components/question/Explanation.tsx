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
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);
  const selectedLetter = ['a', 'b', 'c', 'd'][selectedOption];

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isAnimating) {
      e.preventDefault();
      setIsDragging(true);
      dragStartY.current = e.clientY;

      if (containerRef.current) {
        containerRef.current.style.willChange = 'transform';
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && dragStartY.current !== null) {
      e.preventDefault();
      const deltaY = e.clientY - dragStartY.current;
      const resistanceFactor = deltaY > 0 ? 0.3 : 1;
      setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsAnimating(true);

      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
      }

      const threshold = -120;

      if (dragY < threshold) {
        setDragY(-window.innerHeight);
        setTimeout(() => {
          onNext();
        }, 300);
      } else {
        setDragY(0);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isAnimating) {
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartY.current = touch.clientY;

      if (containerRef.current) {
        containerRef.current.style.willChange = 'transform';
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && dragStartY.current !== null) {
      e.preventDefault();
      const touch = e.touches[0];
      const deltaY = touch.clientY - dragStartY.current;
      const resistanceFactor = deltaY > 0 ? 0.3 : 1;
      setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`question-container${isDragging ? ' dragging' : ''}${
        isAnimating ? ' animating' : ''
      }`}
      style={{
        transform: `translateY(${dragY}px)`,
        transition: isDragging
          ? 'none'
          : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerUp}
      role="region"
      aria-label="Explicación de la respuesta"
    >
      <h1>Respuesta incorrecta</h1>

      <h2>{question.question}</h2>

      <div className="answer-summary">
        <div className="selected-answer incorrect">
          <strong>Tu respuesta:</strong> {question.options[selectedOption]}
        </div>

        <div className="correct-answer">
          <strong>Respuesta correcta:</strong> {question.options[correctIndex]}
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

      {selectedOption !== undefined && (
        <div className="explanation-footer">
          <div className="drag-hint">Arrastra hacia arriba para continuar</div>
        </div>
      )}
    </div>
  );
};

export default Explanation;
