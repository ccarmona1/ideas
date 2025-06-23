import React from 'react';
import './Explanation.css';
import { DragHint } from '../common/DragHint';
import type { QuestionMetadata, DragHandlers } from '../../../types';

export interface ExplanationProps {
  question: QuestionMetadata;
  selectedOption: number;
  onDragAction?: () => void;
  dragHandlers?: DragHandlers;
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
        <DragHint
          text="Arrastra o haz click aquí para continuar"
          onAction={onDragAction}
          dragHandlers={dragHandlers}
          canDrag={canDrag}
        />
      </div>
    </div>
  );
};

export default Explanation;
