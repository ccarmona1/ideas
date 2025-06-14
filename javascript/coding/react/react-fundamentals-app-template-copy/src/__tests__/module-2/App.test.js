import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

describe("App", () => {
  test('should render Login component when "token" is not present in localStorage and route "/"', () => {
    localStorage.removeItem("token");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/If you don't have an account you/i)
    ).toBeInTheDocument();
  });

  test('should switch to registration page from login page on "Registration" link click', () => {
    localStorage.removeItem("token");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/If you don't have an account you/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/registration/i));

    expect(screen.queryByText(/name/i)).toBeInTheDocument();
  });

  test('should render Registration component when route "/registration"', () => {
    localStorage.removeItem("token");
    render(
      <MemoryRouter initialEntries={["/registration"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText(/name/i)).toBeInTheDocument();
    expect(screen.queryByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).toBeInTheDocument();
  });

  test('should switch to login page from registration page on "Login" link click', () => {
    localStorage.removeItem("token");
    render(
      <MemoryRouter initialEntries={["/registration"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText(/name/i)).toBeInTheDocument();
    expect(screen.queryByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: /login/i }));

    expect(screen.queryByText(/name/i)).not.toBeInTheDocument();
  });

  test('should render CourseCard components with data-testid="courseCard" when token is present in localStorage and route "/"', () => {
    localStorage.setItem("token", "token");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const courseElements = screen.getAllByTestId("courseCard");

    expect(courseElements[0]).toBeInTheDocument();
  });

  test('should render CourseForm component with "CREATE COURSE" button with data-testid="createCourseButton" if route "/courses/add"', () => {
    render(
      <MemoryRouter initialEntries={["/courses/add"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("createCourseButton")).toBeInTheDocument();
  });

  test('should render CourseInfo component with data-testid="courseInfo" when route "/courses/:courseId"', () => {
    render(
      <MemoryRouter
        initialEntries={["/courses/de5aaa59-90f5-4dbc-b8a9-aaf205c551ba"]}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("courseInfo")).toBeInTheDocument();
  });

  test('should render CourseInfo with data-testid="courseInfo" component after "SHOW COURSE" button click', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.queryAllByText(/show/i)[0]);

    expect(screen.getByTestId("courseInfo")).toBeInTheDocument();
  });

  test('should render list of courses with data-testid="courseCard" after "BACK" button click on CourseInfo page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.queryAllByText(/show/i)[0]);
    expect(screen.getByTestId("courseInfo")).toBeInTheDocument();

    fireEvent.click(screen.queryAllByText(/back/i)[0]);
    expect(screen.getAllByTestId("courseCard").length).toBeGreaterThanOrEqual(
      1
    );
  });
});
