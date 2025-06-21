import React from 'react';

interface FeedbackModalProps {
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Respuesta incorrecta</h2>
        <div>
          <strong>Correct answer:</strong> {answer}
        </div>
        <div>
          <strong>Explanation:</strong> {explanation}
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
