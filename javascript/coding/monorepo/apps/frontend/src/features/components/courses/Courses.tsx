import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import { useGetCourses } from '../../hooks/useGetCourses';
import { CoursesLoading, CoursesError, CoursesEmpty } from './CoursesState';

export const Courses: React.FC = () => {
  const { data: courses, loading, error } = useGetCourses();

  if (loading) return <CoursesLoading />;
  if (error)
    return (
      <CoursesError error={error} onRetry={() => window.location.reload()} />
    );
  if (!courses || courses.length === 0) return <CoursesEmpty />;

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
