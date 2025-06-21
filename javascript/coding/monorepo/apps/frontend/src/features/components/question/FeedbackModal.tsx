import React from 'react';
import './FeedbackModal.css';

export interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  answer: string;
  explanation: string;
  invalidOptions: Record<string, string>;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  answer,
  explanation,
  invalidOptions,
}) => {
  if (!open) return null;
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <h2>Respuesta incorrecta</h2>
        <div>
          <strong>Respuesta correcta:</strong> {answer}
        </div>
        <div>
          <strong>Explicación:</strong> {explanation}
        </div>
        <div style={{ marginTop: '1em' }}>
          <strong>Opciones inválidas:</strong>
          <ul>
            {Object.entries(invalidOptions).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
