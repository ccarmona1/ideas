import React from 'react';
import { Link } from 'react-router-dom';

const CourseEmpty: React.FC = () => (
  <div className="course-empty">
    <h2>No questions available</h2>
    <p>This course doesn't have any questions yet.</p>
    <Link to="/" className="course-empty__back-button">
      ← Back to courses
    </Link>
  </div>
);

export default CourseEmpty;
