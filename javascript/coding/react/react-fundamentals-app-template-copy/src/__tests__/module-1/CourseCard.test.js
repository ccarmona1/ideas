import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CourseCard } from "../../components/Courses/components/CourseCard/CourseCard";

describe("CourseCard component", () => {
  const course = {
    id: "1",
    title: "Course Title",
    description: "Course Description",
    creationDate: "08/03/2021",
    duration: 60,
    authors: [
      "27cc3006-e93a-4748-8ca8-73d06aa93b6d",
      "f762978b-61eb-4096-812b-ebde22838167",
    ],
  };
  const authorsList = [
    { id: "df32994e-b23d-497c-9e4d-84e4dc02882f", name: "name1" },
    { id: "27cc3006-e93a-4748-8ca8-73d06aa93b6d", name: "name2" },
    { id: "f762978b-61eb-4096-812b-ebde22838167", name: "name3" },
  ];

  test("should render correct title from course prop", () => {
    render(<CourseCard course={course} authorsList={authorsList} />);

    const titleElement = screen.getByText("Course Title");

    expect(titleElement).toBeInTheDocument();
  });

  test("should render correct description from course prop", () => {
    render(<CourseCard course={course} authorsList={authorsList} />);
    const descriptionElement = screen.getByText("Course Description");
    expect(descriptionElement).toBeInTheDocument();
  });

  test("should render correct duration (use getCourseDuration e.g. duration: 60 => 01:00 hour)", () => {
    render(<CourseCard course={course} authorsList={authorsList} />);

    const durationElement = screen.getByText(/01:00 hour/);

    expect(durationElement).toBeInTheDocument();
  });

  test("should render correct date (use formatCreationDate e.g. creationDate: 08/03/2021 => 08.03.2021)", () => {
    render(<CourseCard course={course} authorsList={authorsList} />);

    const creationDateElement = screen.getByText(/08.03.2021/);

    expect(creationDateElement).toBeInTheDocument();
  });

  test("should render authors list (match data from props course.authors and authorsList)", () => {
    render(<CourseCard course={course} authorsList={authorsList} />);

    const creationDateElement = screen.getByText(/name2, name3/);

    expect(creationDateElement).toBeInTheDocument();
  });

  test("should render 'SHOW COURSE' button", () => {
    render(<CourseCard course={course} authorsList={authorsList} />);

    const creationDateElement = screen.getByText(/Show course/i);

    expect(creationDateElement).toBeInTheDocument();
  });
});
