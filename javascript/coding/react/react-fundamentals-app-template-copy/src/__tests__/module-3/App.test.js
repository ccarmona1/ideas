import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { deleteCourse } from "../../store/slices/coursesSlice";

const mockStore = configureMockStore();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/mock/path" }),
}));

const getStore = (token = "") =>
  mockStore({
    authors: [
      {
        id: 1,
        name: "Test Name 1",
      },
      {
        id: 2,
        name: "Test Name 2",
      },
    ],
    courses: [
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
    ],
    user: {
      token,
      name: "Den",
      isAuth: !!token,
    },
  });

describe("App", () => {
  const store = getStore();

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

  test('should switch to registration page from login page on "Registration" link click', () => {
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

  test('should render Registration component when route "/registration" and "token" not present', () => {
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

  test('should switch to login page from registration page on "Login" link click', () => {
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

  test('should render CourseCard components with data-testid="courseCard" from store when "token" is present in localStorage and route "/"', () => {
    const store = getStore("token");
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

  test('should render CourseForm component with "CREATE COURSE" button with data-testid="createCourseButton" if route "/courses/add"', () => {
    const store = getStore("token");

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/add"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("createCourseButton")).toBeInTheDocument();
  });

  test('should render CourseInfo component with data-testid="courseInfo" when route "/courses/:courseId"', () => {
    const store = getStore("token");

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/1"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("courseInfo")).toBeInTheDocument();
  });

  test('should remove course on Delete button with data-testid="delete" click (deleteCourse action form coursesSlice should be called with course id)', async () => {
    const store = getStore("token");

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.queryAllByTestId(/delete/i)[0]);

    const actions = store.getActions();
    expect(actions).toContainEqual(deleteCourse("1"));
  });
});
