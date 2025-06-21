import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import type { CourseMetadata } from '../../../App';

export interface CoursesProps {
  courses: CourseMetadata[];
}

export const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
    <div className="courses-container">
      {courses.map((course) => (
        <Link to={`/course/${course.id}`} key={course.id}>
          <div
            className="course-card"
            tabIndex={0}
            role="button"
            aria-label={`Ir al curso ${course.title}`}
          >
            {course.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Courses;
