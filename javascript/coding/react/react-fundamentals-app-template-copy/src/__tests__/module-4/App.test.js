import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  deleteCourseThunk,
  getCoursesThunk,
} from "../../store/thunks/coursesThunk";
import { getAuthorsThunk } from "../../store/thunks/authorsThunk";
import { getUserThunk } from "../../store/thunks/userThunk";

jest.mock("../../store/thunks/coursesThunk", () => ({
  deleteCourseThunk: jest.fn(),
  getCoursesThunk: jest.fn(),
}));
jest.mock("../../store/thunks/authorsThunk", () => ({
  getAuthorsThunk: jest.fn(),
}));
jest.mock("../../store/thunks/userThunk", () => ({
  getUserThunk: jest.fn(),
}));

const courses = [
  {
    title: "Test Title",
    description: "Test Description",
    authors: [1, 2],
    duration: 60,
    creationDate: "20/03/2012",
    id: "1",
  },
  {
    title: "Test Title 2",
    description: "Test Description 2",
    authors: [1, 2],
    duration: 60,
    creationDate: "20/03/2012",
    id: "2",
  },
  {
    title: "Test Title 3",
    description: "Test Description 3",
    authors: [1, 2],
    duration: 60,
    creationDate: "20/03/2012",
    id: "3",
  },
];

const authors = [
  {
    id: 1,
    name: "Test Name 1",
  },
  {
    id: 2,
    name: "Test Name 2",
  },
];

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  authors,
  courses,
  user: {
    name: "Den",
    role: "admin",
  },
});

describe("App", () => {
  beforeEach(() => {
    getCoursesThunk.mockReturnValue({
      type: "courses/setCourses",
      payload: courses,
    });
    getAuthorsThunk.mockReturnValue({
      type: "authors/setAuthors",
      payload: authors,
    });
    deleteCourseThunk.mockReturnValue({
      type: "courses/deleteCourse",
      payload: 1,
    });
    getUserThunk.mockReturnValue({
      type: "user/setUserData",
      payload: 1,
    });
  });

  test('should render Login component when "token" is not present in localStorage and route "/"', () => {
    localStorage.removeItem("token");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/If you don't have an account you/i)
    ).toBeInTheDocument();
  });

  test("should switch to registration page from login page on registration link click", () => {
    localStorage.removeItem("token");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/If you don't have an account you/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/registration/i));

    expect(screen.queryByText(/name/i)).toBeInTheDocument();
  });

  test('should render Registration component if route "/registration"', () => {
    localStorage.removeItem("token");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/registration"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/name/i)).toBeInTheDocument();
    expect(screen.queryByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).toBeInTheDocument();
  });

  test("should switch to login page from registration page on login link click", () => {
    localStorage.removeItem("token");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/registration"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/name/i)).toBeInTheDocument();
    expect(screen.queryByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", /login/i));

    expect(screen.queryByText(/name/i)).not.toBeInTheDocument();
  });

  test('should render Courses component when token is present in localStorage and if url "/"', () => {
    localStorage.setItem("token", "token");
    const store = mockStore({
      authors,
      courses,
      user: {
        name: "Den",
        role: "admin",
        token: "token",
        isAuth: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const courseElements = screen.getAllByTestId("courseCard");

    expect(courseElements[0]).toBeInTheDocument();
  });

  test('should render CourseForm component if role admin and url "/courses/add"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/add"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId("createCourseButton")).toBeInTheDocument();
  });

  test('should not renders CourseForm component if role non-admin and navigate to courses page "/"', () => {
    const store = mockStore({
      authors,
      courses,
      user: {
        name: "Den",
        role: "",
        isAuth: true,
        token: "token",
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/add"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId("createCourseButton")).not.toBeInTheDocument();
    const courseElements = screen.getAllByTestId("courseCard");

    expect(courseElements[0]).toBeInTheDocument();
  });
  test('should render "CourseForm" (update mode) component if role admin and url "/courses/update/:courseId"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/update/1"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId("descriptionTextArea")).toBeInTheDocument();
  });

  test('should NOT renders "CourseForm" (update mode) component if role non-admin and navigate to courses page "/"', () => {
    const store = mockStore({
      authors,
      courses,
      user: {
        name: "Den",
        role: "",
        isAuth: true,
        token: "token",
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/update/1"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId("descriptionTextArea")).not.toBeInTheDocument();
    const courseElements = screen.getAllByTestId("courseCard");

    expect(courseElements[0]).toBeInTheDocument();
  });

  test('should render CourseInfo component with data-testid="courseInfo" when route "/courses/:courseId"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/1"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("courseInfo")).toBeInTheDocument();
  });

  test('should remove course on Delete button with data-testid="delete" click (deleteCourseThunk should be called with course id)', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.queryAllByTestId(/delete/i)[0]);
    expect(deleteCourseThunk).toHaveBeenCalled();
  });

  test("should call getUserThunk on main page with token in localStorage", async () => {
    localStorage.setItem("token", "token");
    const store = mockStore({
      authors,
      courses,
      user: {
        name: "Den",
        role: "admin",
        token: "token",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(getUserThunk).toHaveBeenCalled();
  });
});
