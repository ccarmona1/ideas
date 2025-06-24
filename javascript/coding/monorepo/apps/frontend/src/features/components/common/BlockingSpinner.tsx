import React from 'react';
import './BlockingSpinner.css';

interface BlockingSpinnerProps {
  message?: string;
  overlay?: boolean;
}

export const BlockingSpinner: React.FC<BlockingSpinnerProps> = ({
  message = 'Loading...',
  overlay = true,
}) => {
  return (
    <div
      className={`blocking-spinner ${
        overlay ? 'blocking-spinner--overlay' : ''
      }`}
    >
      <div className="blocking-spinner__content">
        <div className="blocking-spinner__spinner" aria-label="Loading">
          <div className="blocking-spinner__dot"></div>
          <div className="blocking-spinner__dot"></div>
          <div className="blocking-spinner__dot"></div>
        </div>
        <p className="blocking-spinner__message">{message}</p>
      </div>
    </div>
  );
};

export default BlockingSpinner;
