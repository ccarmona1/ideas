import { useState } from 'react';
import './App.css';
import Courses from './features/components/courses/Courses';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Course from './features/components/course/Course';
import type { CourseMetadata } from './types';

function App() {
  const [courses] = useState<CourseMetadata[]>([
    {
      id: '1',
      title: 'Pure JavaScript',
    },
    {
      id: '2',
      title: 'Typescript',
    },
  ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Courses courses={courses} />}></Route>
        <Route
          path="/course/:courseId"
          element={<Course courses={courses} />}
        ></Route>
      </Route>
    )
  );

  return (
    <div className="app-root">
      <main className="app-main">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
