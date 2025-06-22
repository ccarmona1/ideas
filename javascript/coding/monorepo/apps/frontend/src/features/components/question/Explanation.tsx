import React from 'react';
import './Explanation.css';
import type { QuestionMetadata } from '../course/Course';

export interface ExplanationProps {
  question: QuestionMetadata;
  selectedOption: number;
}

const Explanation: React.FC<ExplanationProps> = ({
  question,
  selectedOption,
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
        <div className="drag-hint">Arrastra hacia arriba para continuar</div>
      </div>
    </div>
  );
};

export default Explanation;
