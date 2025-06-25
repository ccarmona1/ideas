import React from 'react';
import { Link } from 'react-router-dom';

const CourseError: React.FC = () => (
  <div className="course-error">
    <h2>Error loading course</h2>
    <p>Ha ocurrido un error al cargar las preguntas del curso.</p>
    <Link to="/" className="course-error__back-button">
      ← Back to courses
    </Link>
  </div>
);

export default CourseError;
