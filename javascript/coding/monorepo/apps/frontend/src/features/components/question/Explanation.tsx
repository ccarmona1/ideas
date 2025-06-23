import React from 'react';
import './Explanation.css';
import { SimpleDragHint } from '../common/SimpleDragHint';
import type { QuestionMetadata } from '../../../types';

export interface ExplanationProps {
  question: QuestionMetadata;
  selectedOption: number;
  onDragAction?: () => void;
  canDrag?: boolean;
  onContainerDragStart?: () => void;
  onDragMove?: (deltaY: number, opacity: number) => void;
  onDragEnd?: () => void;
}

const Explanation: React.FC<ExplanationProps> = ({
  question,
  selectedOption,
  onDragAction,
  canDrag,
  onContainerDragStart,
  onDragMove,
  onDragEnd,
}) => {
  const correctIndex = ['a', 'b', 'c', 'd'].indexOf(question.answer);
  const selectedLetter = ['a', 'b', 'c', 'd'][selectedOption];

  return (
    <div className="question-container explanation-container">
      <h1>Respuesta incorrecta</h1>

      <div className="answer-summary">
        <div className="selected-answer incorrect">
          <strong>Tu respuesta:</strong>
          <div>{question.options[selectedOption]}</div>
        </div>

        <div className="correct-answer">
          <strong>Respuesta correcta:</strong>
          <div>{question.options[correctIndex]}</div>
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
        <SimpleDragHint
          text="Arrastra o haz click aquí para continuar"
          onAction={() => onDragAction?.()}
          canDrag={canDrag}
          onDragStart={onContainerDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      </div>
    </div>
  );
};

export default Explanation;
