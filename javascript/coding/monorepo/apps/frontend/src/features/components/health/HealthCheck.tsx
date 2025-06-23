import React, { useEffect, useState } from 'react';
import { backendService } from '../../../services/backend';
import BlockingSpinner from '../common/BlockingSpinner';

interface HealthCheckProps {
  children: React.ReactNode;
}

/**
 * Health Check Guard Component
 * Ensures the backend is available before rendering the main application
 * Blocks UI with a spinner until health check passes
 */
export const HealthCheck: React.FC<HealthCheckProps> = ({ children }) => {
  const [isHealthy, setIsHealthy] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 2000; // 2 seconds

  useEffect(() => {
    const performHealthCheck = async () => {
      try {
        setIsChecking(true);
        setError(null);

        const healthy = await backendService.healthCheck();

        if (healthy) {
          setIsHealthy(true);
          setIsChecking(false);
        } else {
          throw new Error('Health check returned non-200 status');
        }
      } catch (err) {
        console.error('Health check failed:', err);

        if (retryCount < MAX_RETRIES) {
          setRetryCount((prev) => prev + 1);
          setTimeout(performHealthCheck, RETRY_DELAY);
        } else {
          setError('Unable to connect to backend after multiple attempts');
          setIsChecking(false);
        }
      }
    };

    performHealthCheck();
  }, [retryCount]);

  if (error) {
    return (
      <div className="health-check-error">
        <div className="health-check-error__content">
          <h2>Connection Error</h2>
          <p>{error}</p>
          <button
            onClick={() => {
              setRetryCount(0);
              setError(null);
            }}
            className="health-check-error__retry-button"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (isChecking || !isHealthy) {
    const message =
      retryCount > 0
        ? `Connecting to backend... (Attempt ${retryCount + 1}/${
            MAX_RETRIES + 1
          })`
        : 'Checking backend connection...';

    return <BlockingSpinner message={message} overlay={true} />;
  }

  return <>{children}</>;
};
