import React, { useState, useRef } from 'react';
import './Question.css';
import type { QuestionMetadata } from '../course/Course';
import FeedbackModal from './FeedbackModal';

export interface QuestionProps {
  question: QuestionMetadata;
  onCorrect: () => void;
  onNext?: () => void;
  disabled?: boolean;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onCorrect,
  onNext,
  disabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);

  const isCorrect =
    selectedOption !== undefined &&
    ['a', 'b', 'c', 'd'][selectedOption] === question.answer;

  const handleSelectOption = (index: number) => {
    if (!answeredCorrectly && !disabled) {
      setSelectedOption(index);
      if (['a', 'b', 'c', 'd'][index] === question.answer) {
        setAnsweredCorrectly(true);
        onCorrect();
      } else {
        setShowModal(true);
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (selectedOption !== undefined && isCorrect === false && !showModal) {
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
          if (onNext) onNext();
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
          if (selectedOption === index) {
            if (selectedOption !== undefined) {
              btnClass += isCorrect ? ' correct' : ' incorrect';
            }
            btnClass += ' selected';
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
      {selectedOption !== undefined && !isCorrect && !showModal && (
        <div
          className="question-feedback"
          style={{ marginTop: '1.5em', textAlign: 'center' }}
        >
          Arrastra hacia arriba para la siguiente pregunta
        </div>
      )}
      <FeedbackModal
        open={showModal}
        onClose={() => setShowModal(false)}
        answer={question.answer}
        explanation={question.explanation}
        invalidOptions={question.invalidOptions}
      />
    </div>
  );
};

export default Question;
