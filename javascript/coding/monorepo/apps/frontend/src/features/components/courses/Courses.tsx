import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CourseMetadata } from '../../../types';
import './Courses.css';
import { useGetCourses } from './getCoursesHook';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseMetadata[]>([]);

  useGetCourses(setCourses);

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
        to={`/course-new`}
        className="course-card"
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
