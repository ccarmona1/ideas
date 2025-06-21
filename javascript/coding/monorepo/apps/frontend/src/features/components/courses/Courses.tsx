import { type FunctionComponent, useState } from 'react';

interface Course {
  id: string;
  title: string;
}

export const Courses: FunctionComponent = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Pure JavaScript',
    },
    {
      id: '2',
      title: 'Typescript',
    },
  ]);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        padding: '1rem',
        justifyContent: 'center',
      }}
    >
      {courses.map((course) => (
        <div
          key={course.id}
          style={{
            flex: '1 1 250px',
            minWidth: 220,
            maxWidth: 350,
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            fontSize: '1.1rem',
            boxSizing: 'border-box',
          }}
        >
          {course.title}
        </div>
      ))}
    </div>
  );
};
export default Courses;
