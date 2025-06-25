import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import BlockingSpinner from '../../../components/common/BlockingSpinner';
import { useGetCourses } from '../../hooks/useGetCourses';

export const Courses: React.FC = () => {
  const { data: courses, loading, error } = useGetCourses();

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
