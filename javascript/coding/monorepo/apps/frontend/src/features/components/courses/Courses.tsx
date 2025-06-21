import { type FunctionComponent } from 'react';
import './Courses.css';
import { Link } from 'react-router-dom';
import type { CourseMetadata } from '../../../App';

interface CoursesProps {
  courses: CourseMetadata[];
}

export const Courses: FunctionComponent<CoursesProps> = ({ courses }) => {
  return (
    <div className="courses-container">
      {courses.map((course) => (
        <Link to={'/course/' + course.id} key={course.id}>
          <div className="course-card">{course.title}</div>
        </Link>
      ))}
    </div>
  );
};
export default Courses;
