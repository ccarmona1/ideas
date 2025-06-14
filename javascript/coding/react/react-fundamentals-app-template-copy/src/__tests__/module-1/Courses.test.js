import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Courses } from "../../components/Courses/Courses";

describe("Courses component", () => {
  const mockedCoursesList = [
    {
      id: "1",
      title: "Course 1",
      description: "Course 1 description",
      creationDate: "2022-01-01",
      duration: 60,
      authors: [
        "27cc3006-e93a-4748-8ca8-73d06aa93b6d",
        "f762978b-61eb-4096-812b-ebde22838167",
      ],
    },
    {
      id: "2",
      title: "Course 2",
      description: "Course 2 description",
      creationDate: "2022-02-01",
      duration: 90,
      authors: ["df32994e-b23d-497c-9e4d-84e4dc02882f"],
    },
  ];
  const authorsList = [
    { id: "df32994e-b23d-497c-9e4d-84e4dc02882f", name: "name" },
    { id: "27cc3006-e93a-4748-8ca8-73d06aa93b6d", name: "name" },
    { id: "f762978b-61eb-4096-812b-ebde22838167", name: "name" },
  ];
  const onAddClick = jest.fn();

  test("should render list of courses from coursesList prop", () => {
    render(
      <Courses
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        onAddClick={onAddClick}
        handleShowCourse={(id) => {}}
      />
    );

    const courseElements = screen.getAllByTestId("courseCard");

    expect(courseElements[0]).toBeInTheDocument();
    expect(courseElements).toHaveLength(2);
  });

  test("should render 'ADD NEW COURSE' button", () => {
    render(
      <Courses
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        onAddClick={onAddClick}
        handleShowCourse={(id) => {}}
      />
    );

    const button = screen.getByText(/Add new/i);

    expect(button).toBeInTheDocument();
  });

  test("should render EmptycoursesList component if no courses (with 'Your List Is Empty' text and button with data-testid='addCourse')", () => {
    render(
      <Courses
        coursesList={[]}
        authorsList={authorsList}
        onAddClick={onAddClick}
        handleShowCourse={(id) => {}}
      />
    );

    const emptyText = screen.queryByText(/Your List Is Empty/i);
    const addButtonElement = screen.getByTestId("addCourse");

    expect(emptyText).toBeInTheDocument();
    expect(addButtonElement).toBeInTheDocument();
  });
});
