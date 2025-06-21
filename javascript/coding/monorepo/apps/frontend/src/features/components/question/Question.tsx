import { useState, useRef } from 'react';
import './Question.css';
import type { QuestionMetadata } from '../course/Course';

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
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;

  // Lógica para manejar respuesta correcta
  const handleSelectOption = (index: number) => {
    if (!answeredCorrectly && !disabled) {
      setSelectedOption(index);
      if (['a', 'b', 'c', 'd'][index] === question.answer) {
        setAnsweredCorrectly(true);
        if (onCorrect) onCorrect();
      }
    }
  };

  // Handlers para drag
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (selectedOption !== undefined && isCorrect === false) {
      setIsDragging(true);
      dragStartY.current = e.clientY;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && dragStartY.current !== null) {
      const deltaY = e.clientY - dragStartY.current;
      setDragY(deltaY < 0 ? deltaY : 0); // Solo permitir arrastre hacia arriba
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (dragY < -100) {
        // Si se arrastró suficiente hacia arriba
        setDragY(-500); // animar fuera de pantalla
        setTimeout(() => {
          setDragY(0);
          setSelectedOption(undefined);
          if (onNext) onNext();
        }, 300);
      } else {
        setDragY(0); // volver a posición original
      }
    }
  };

  return (
    <div
      className={`question-container${isDragging ? ' dragging' : ''}`}
      style={{
        transform: `translateY(${dragY}px)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
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
                onChange={() => handleSelectOption(index)}
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
