import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CourseInfo } from "../../components/CourseInfo";
import { formatCreationDate, getCourseDuration } from "../../helpers";

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
  { id: "df32994e-b23d-497c-9e4d-84e4dc02882f", name: "name1" },
  { id: "27cc3006-e93a-4748-8ca8-73d06aa93b6d", name: "name2" },
  { id: "f762978b-61eb-4096-812b-ebde22838167", name: "name3" },
];

describe("CourseInfo", () => {
  test("should renders correct title (find correct course from coursesList based on showCourseId prop) ", () => {
    render(
      <CourseInfo
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        showCourseId="1"
      />
    );

    const courseTitle = screen.getByRole("heading", { level: 1 });

    expect(courseTitle.textContent).toBe("Course 1");
  });

  test("should renders correct description", () => {
    render(
      <CourseInfo
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        showCourseId="1"
      />
    );

    const courseDescription = screen.getByText("Course 1 description");

    expect(courseDescription).toBeInTheDocument();
  });

  test("should renders correct course duration (use getCourseDuration)", () => {
    render(
      <CourseInfo
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        showCourseId="1"
      />
    );

    const courseDuration = screen.queryByText(getCourseDuration(60));

    expect(courseDuration).toBeInTheDocument();
  });

  test("should renders correct course creation date (use formatCreationDate)", () => {
    render(
      <CourseInfo
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        showCourseId="1"
      />
    );

    const courseCreationDate = screen.getByText(
      formatCreationDate(mockedCoursesList[0].creationDate)
    );
    expect(courseCreationDate).toBeInTheDocument();
  });

  test("should renders correct course authors names (find a course in the coursesList and match data from course authors and authorsList prop)", () => {
    render(
      <CourseInfo
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        showCourseId="1"
      />
    );

    const authorNames = screen
      .getAllByRole("listitem")
      .map((li) => li.textContent);

    expect(authorNames).toEqual(["name2", "name3"]);
  });

  test("should render `BACK` button correctly", () => {
    render(
      <CourseInfo
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        showCourseId="1"
      />
    );

    const backButton = screen.getByRole("button");

    expect(backButton).toBeInTheDocument();
  });

  test("should call onBack handler on Back button click", () => {
    const onBack = jest.fn();
    render(
      <CourseInfo
        coursesList={mockedCoursesList}
        authorsList={authorsList}
        showCourseId="1"
        onBack={onBack}
      />
    );

    const backButton = screen.queryByText(/back/i);
    fireEvent.click(backButton);
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
