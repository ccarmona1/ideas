import React from 'react';
import { Link } from 'react-router-dom';
import BlockingSpinner from '../../../components/common/BlockingSpinner';

export const CourseNotFound: React.FC = () => (
  <div className="course-container">
    <div className="course-header">
      <Link to="/" className="course-back-button">
        <span className="back-button-text">Volver a cursos</span>
      </Link>
    </div>
    <div className="course-not-found">
      <h1>Cargando...</h1>
    </div>
  </div>
);

export const CourseLoadingState: React.FC = () => (
  <BlockingSpinner message="Loading course questions..." overlay={false} />
);

export const CourseEmptyState: React.FC = () => (
  <div className="course-empty">
    <h2>No hay preguntas en este curso</h2>
    <p>Intenta con otro curso.</p>
  </div>
);
