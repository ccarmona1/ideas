import React from 'react';
import type { UseCourseStats } from '../../hooks/course/useCourseStats';

interface CourseCompletionProps {
  stats: UseCourseStats;
  courseName: string;
}

const CourseCompletion: React.FC<CourseCompletionProps> = ({
  stats,
  courseName,
}) => (
  <div className="course-completion">
    <h2>🎉 ¡Cuestionario completado!</h2>
    <p>
      Has terminado todas las preguntas de <strong>{courseName}</strong>
    </p>
    <div className="completion-stats">
      <div className="stat-item">
        <span className="stat-value">{stats.correct}</span>
        <span className="stat-label">Correctas</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.incorrect}</span>
        <span className="stat-label">Incorrectas</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{stats.skipped}</span>
        <span className="stat-label">Saltadas</span>
      </div>
      <div className="stat-item accuracy">
        <span className="stat-value">{stats.accuracy}%</span>
        <span className="stat-label">Precisión</span>
      </div>
    </div>
  </div>
);

export default CourseCompletion;
