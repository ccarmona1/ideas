import React from 'react';

export const CoursesLoading: React.FC = () => (
  <div className="courses-loading">
    <span>Cargando cursos...</span>
  </div>
);

export const CoursesError: React.FC<{ error: string; onRetry: () => void }> = ({
  error,
  onRetry,
}) => (
  <div className="courses-error">
    <h2>Error loading courses</h2>
    <p>{error}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export const CoursesEmpty: React.FC = () => (
  <div className="courses-empty">
    <h2>No courses available</h2>
    <p>Please check back later.</p>
  </div>
);
