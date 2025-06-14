import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CourseInfo } from "../../components/CourseInfo";
import { formatCreationDate, getCourseDuration } from "../../helpers";
import { MemoryRouter } from "react-router";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const useParamsResponse = { courseId: "1" };

const store = mockStore({
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
      title: "Test Title 1",
      description: "Test Description 1",
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
    name: "Den",
  },
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => useParamsResponse,
}));

describe("CourseInfo", () => {
  test("should render correct title (find correct course from coursesList (use getCoursesSelector inside <CourseInfo />) based on courseId param (use useParams hook))", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      </Provider>
    );

    const courseTitle = screen.getByRole("heading", { level: 1 });

    expect(courseTitle.textContent).toBe("Test Title 1");
  });

  test("should render correct description", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      </Provider>
    );

    const courseDescription = screen.getByText("Test Description 1");

    expect(courseDescription).toBeInTheDocument();
  });

  test("should render correct course duration (use getCourseDuration)", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      </Provider>
    );

    const courseDuration = screen.queryByText(getCourseDuration(60));

    expect(courseDuration).toBeInTheDocument();
  });

  test("should render correct course creation date (use formatCreationDate)", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      </Provider>
    );

    const courseCreationDate = screen.getByText(
      formatCreationDate(store.getState().courses[0].creationDate)
    );
    expect(courseCreationDate).toBeInTheDocument();
  });

  test("should render correct course authors names (match authors of current course (use getCoursesSelector inside <CourseInfo />) and all authors (use getAuthorsSelector inside <CourseInfo />))", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      </Provider>
    );

    const authorNames = screen
      .getAllByRole("listitem")
      .map((li) => li.textContent);

    expect(authorNames).toEqual(["Test Name 1", "Test Name 2"]);
  });

  test('should render "BACK" as a <Link /> to="/courses"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseInfo />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByRole("link", { name: "Back" });
    expect(backButton).toHaveAttribute("href", "/courses");
  });
});
