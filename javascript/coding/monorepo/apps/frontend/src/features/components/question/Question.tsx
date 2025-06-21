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
  const containerRef = useRef<HTMLDivElement>(null);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;

  useEffect(() => {
    setSelectedOption(undefined);
    setAnsweredCorrectly(false);
    setAnsweredIncorrectly(false);
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

  // Swipe/drag up para avanzar tras respuesta incorrecta
  useEffect(() => {
    if (!answeredIncorrectly || !onNext) return;
    const el = containerRef.current;
    if (!el) return;
    let startY: number | null = null;
    let dragging = false;

    // Touch events (mobile)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startY = e.touches[0].clientY;
        dragging = true;
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!dragging || startY === null) return;
      const endY = e.changedTouches[0].clientY;
      if (startY - endY > 50) {
        onNext();
      }
      startY = null;
      dragging = false;
    };

    // Mouse events (desktop)
    const handleMouseDown = (e: MouseEvent) => {
      startY = e.clientY;
      dragging = true;
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (!dragging || startY === null) return;
      const endY = e.clientY;
      if (startY - endY > 50) {
        onNext();
      }
      startY = null;
      dragging = false;
    };

    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUp);
    };
  }, [answeredIncorrectly, onNext]);

  return (
    <div ref={containerRef} className="question-container">
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
