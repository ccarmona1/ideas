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
  onSkip?: () => void;
  disabled?: boolean;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onCorrect,
  onIncorrect,
  onNext,
  onShowExplanation,
  onSkip,
  disabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    // Permitir arrastre cuando hay una respuesta incorrecta O cuando no hay respuesta seleccionada (para saltar)
    if (
      (selectedOption !== undefined && isCorrect === false) ||
      (selectedOption === undefined && onSkip)
    ) {
      if (!isAnimating) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        dragStartY.current = e.clientY;

        // Optimización para móvil
        if (containerRef.current) {
          containerRef.current.style.willChange = 'transform';
          containerRef.current.style.touchAction = 'none'; // Prevenir scroll
        }
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && dragStartY.current !== null) {
      e.preventDefault();
      e.stopPropagation();
      const deltaY = e.clientY - dragStartY.current;
      // Añadir resistencia al arrastre hacia abajo
      const resistanceFactor = deltaY > 0 ? 0.3 : 1;
      setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
    }
  };

  const handlePointerUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      setIsDragging(false);
      setIsAnimating(true);

      // Limpiar optimización
      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
        containerRef.current.style.touchAction = 'auto';
      }

      const threshold = -120; // Threshold más sensible para móvil

      if (dragY < threshold) {
        // Animación de salida
        setDragY(-window.innerHeight);
        setTimeout(() => {
          setDragY(0);
          setIsAnimating(false);

          // Determinar qué acción tomar basado en el estado
          if (selectedOption !== undefined && !isCorrect && onShowExplanation) {
            // Hay respuesta incorrecta -> mostrar explicación
            onShowExplanation(question, selectedOption);
          } else if (selectedOption === undefined && onSkip) {
            // No hay respuesta -> saltar pregunta
            onSkip();
          } else if (onNext) {
            // Caso por defecto
            onNext();
          }

          // Resetear estado si es skip
          if (selectedOption === undefined) {
            setSelectedOption(undefined);
          }
        }, 350);
      } else {
        // Animación de vuelta (spring back)
        setDragY(0);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }
  };

  // Manejo de touch events mejorado para móvil
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Permitir arrastre cuando hay una respuesta incorrecta O cuando no hay respuesta seleccionada (para saltar)
    if (
      (selectedOption !== undefined && isCorrect === false) ||
      (selectedOption === undefined && onSkip)
    ) {
      if (!isAnimating) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        setIsDragging(true);
        dragStartY.current = touch.clientY;

        if (containerRef.current) {
          containerRef.current.style.willChange = 'transform';
          containerRef.current.style.touchAction = 'none';
        }
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && dragStartY.current !== null) {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      const deltaY = touch.clientY - dragStartY.current;
      const resistanceFactor = deltaY > 0 ? 0.3 : 1;
      setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);
      setIsAnimating(true);

      // Limpiar optimización
      if (containerRef.current) {
        containerRef.current.style.willChange = 'auto';
        containerRef.current.style.touchAction = 'auto';
      }

      const threshold = -100; // Threshold más sensible para touch

      if (dragY < threshold) {
        // Animación de salida
        setDragY(-window.innerHeight);
        setTimeout(() => {
          setDragY(0);
          setIsAnimating(false);

          // Determinar qué acción tomar basado en el estado
          if (selectedOption !== undefined && !isCorrect && onShowExplanation) {
            // Hay respuesta incorrecta -> mostrar explicación
            onShowExplanation(question, selectedOption);
          } else if (selectedOption === undefined && onSkip) {
            // No hay respuesta -> saltar pregunta
            onSkip();
          } else if (onNext) {
            // Caso por defecto
            onNext();
          }

          // Resetear estado si es skip
          if (selectedOption === undefined) {
            setSelectedOption(undefined);
          }
        }, 350);
      } else {
        // Animación de vuelta (spring back)
        setDragY(0);
        setTimeout(() => setIsAnimating(false), 300);
      }
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
          : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
