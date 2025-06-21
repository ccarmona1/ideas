import './App.css';
import Courses from './features/components/courses/Courses';
import Header from './features/components/header/Header';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Courses />} />
    </Route>
  )
);

function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        minHeight: '100vh',
      }}
    >
      <Header />
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
