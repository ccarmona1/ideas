import { useEffect, useRef, useState } from 'react';
import type { QuestionMetadata } from '../course/Course';
import './Question.css';

export const Question: React.FunctionComponent<{
  question: QuestionMetadata;
  onCorrect: () => void;
  onNext?: () => void;
  disabled?: boolean;
}> = ({ question, onCorrect, onNext, disabled }) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [answeredIncorrectly, setAnsweredIncorrectly] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;

  useEffect(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
    setAnsweredIncorrectly(false);
    setDragOffset(0);
    setDragging(false);
  }, [question]);

  useEffect(() => {
    if (isCorrect && !answeredCorrectly) {
      setAnsweredCorrectly(true);
      onCorrect();
    } else if (
      selectedOption !== undefined &&
      !isCorrect &&
      !answeredIncorrectly
    ) {
      setAnsweredIncorrectly(true);
    }
  }, [
    isCorrect,
    answeredCorrectly,
    selectedOption,
    answeredIncorrectly,
    onCorrect,
  ]);

  // Swipe/drag up para avanzar tras respuesta incorrecta + animación
  useEffect(() => {
    if (!answeredIncorrectly || !onNext) return;
    const el = containerRef.current;
    if (!el) return;
    let startY: number | null = null;
    let draggingLocal = false;

    // Touch events (mobile)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startY = e.touches[0].clientY;
        draggingLocal = true;
        setDragging(true);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!draggingLocal || startY === null) return;
      const currentY = e.touches[0].clientY;
      const offset = Math.min(0, currentY - startY);
      setDragOffset(offset);
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!draggingLocal || startY === null) return;
      const endY = e.changedTouches[0].clientY;
      if (startY - endY > 50) {
        setDragOffset(-100);
        setTimeout(() => {
          setDragOffset(0);
          setDragging(false);
          onNext();
        }, 150);
      } else {
        setDragOffset(0);
        setDragging(false);
      }
      startY = null;
      draggingLocal = false;
    };

    // Mouse events (desktop)
    const handleMouseDown = (e: MouseEvent) => {
      startY = e.clientY;
      draggingLocal = true;
      setDragging(true);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingLocal || startY === null) return;
      const currentY = e.clientY;
      const offset = Math.min(0, currentY - startY);
      setDragOffset(offset);
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (!draggingLocal || startY === null) return;
      const endY = e.clientY;
      if (startY - endY > 50) {
        setDragOffset(-100);
        setTimeout(() => {
          setDragOffset(0);
          setDragging(false);
          onNext();
        }, 150);
      } else {
        setDragOffset(0);
        setDragging(false);
      }
      startY = null;
      draggingLocal = false;
    };

    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove);
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
    };
  }, [answeredIncorrectly, onNext]);

  return (
    <div
      ref={containerRef}
      className={`question-container${dragging ? ' dragging' : ''}`}
      style={{
        transform: `translateY(${dragOffset}px)`,
        transition: dragging ? 'none' : 'transform 0.2s',
      }}
    >
      <h1>{question.question}</h1>
      <ul className="question-list">
        {question.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="question-option"
                value={option}
                checked={selectedOption === index}
                onChange={() => {
                  if (!answeredCorrectly && !disabled) setSelectedOption(index);
                }}
                disabled={disabled || answeredCorrectly}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>

      {selectedOption !== undefined && isCorrect === false && (
        <div>
          Correct answer: {question.answer} <br />
          Explanation: {question.explanation} <br />
          {Object.entries(question.invalidOptions).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
          <div className="question-feedback">
            Arrastra hacia arriba para continuar con la siguiente pregunta.
          </div>
        </div>
      )}
    </div>
  );
};
