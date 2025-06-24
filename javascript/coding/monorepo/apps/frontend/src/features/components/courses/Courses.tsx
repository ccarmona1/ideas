import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import BlockingSpinner from '../common/BlockingSpinner';
import { useCourses } from '../../hooks/courses/useCourses';

export const Courses: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { courses, loading, error } = useCourses(apiUrl);

  if (loading) {
    return <BlockingSpinner message="Loading courses..." overlay={false} />;
  }

  if (error) {
    return (
      <div className="courses-error">
        <h2>Error loading courses</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="courses-empty">
        <h2>No courses available</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="courses-container">
      {courses.map((course) => (
        <Link
          to={`/course/${course.name}`}
          key={course.sha}
          className="course-card"
          role="button"
          aria-label={`Ir al curso ${course.name}`}
        >
          <h3>{course.name}</h3>
          <p>Advanced questions</p>
          <span className="course-arrow">→</span>
        </Link>
      ))}
      <Link
        to={`/new-course`}
        className="course-card course-card-create"
        role="button"
        aria-label={`Crear nuevo curso`}
      >
        <h3>Crear nuevo examen</h3>
        <p>Usando Gemini AI</p>
        <span className="course-arrow">→</span>
      </Link>
    </div>
  );
};

export default Courses;
