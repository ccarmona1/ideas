import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import type { CourseMetadata } from '../../../types';

export interface CoursesProps {
  courses: CourseMetadata[];
}

export const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
    <div className="courses-container">
      {courses.map((course) => (
        <Link
          to={`/course/${course.id}`}
          key={course.id}
          className="course-card"
          role="button"
          aria-label={`Ir al curso ${course.title}`}
        >
          <h3>{course.title}</h3>
          <p>Advanced questions</p>
          <span className="course-arrow">→</span>
        </Link>
      ))}
    </div>
  );
};

export default Courses;
