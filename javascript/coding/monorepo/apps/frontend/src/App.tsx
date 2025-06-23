import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Course from './features/components/course/Course';
import Courses from './features/components/courses/Courses';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Courses />}></Route>
        <Route path="/course/:courseName" element={<Course />}></Route>
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
