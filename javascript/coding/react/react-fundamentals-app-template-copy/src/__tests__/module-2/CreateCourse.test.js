import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { CourseForm } from "../../components/CourseForm/CourseForm";
import { MemoryRouter } from "react-router";

describe("CourseForm", () => {
  const mockAuthors = [
    { id: "1", name: "Author 1" },
    { id: "2", name: "Author 2" },
  ];

  const mockCourseForm = jest.fn();
  const mockCreateAuthor = jest.fn();

  beforeEach(() => {
    mockCourseForm.mockClear();
    mockCreateAuthor.mockClear();
  });

  it("should create a new course with the entered data in all field`s (createCourse prop should be called on createCourseButton click)", () => {
    render(
      <MemoryRouter>
        <CourseForm
          authorsList={mockAuthors}
          createCourse={mockCourseForm}
          createAuthor={mockCreateAuthor}
        />
      </MemoryRouter>
    );

    const titleInput = screen.getByTestId("titleInput");
    const durationInput = screen.getByTestId("durationInput");
    const descriptionTextArea = screen.getByTestId("descriptionTextArea");
    const addAuthorButton = screen.getAllByTestId("addAuthor")[0];
    const createCourseButton = screen.getByTestId("createCourseButton");

    fireEvent.change(titleInput, { target: { value: "Course Title" } });
    fireEvent.change(durationInput, { target: { value: "20" } });
    fireEvent.click(addAuthorButton);
    fireEvent.change(descriptionTextArea, {
      target: { value: "Course Description" },
    });

    fireEvent.click(createCourseButton);

    expect(mockCourseForm).toHaveBeenCalled();
  });

  it("should not create a new course with the empty data (createCourse prop should NOT be called on createCourseButton click)", () => {
    render(
      <MemoryRouter>
        <CourseForm
          authorsList={mockAuthors}
          createCourse={mockCourseForm}
          createAuthor={mockCreateAuthor}
        />
      </MemoryRouter>
    );

    const createCourseButton = screen.getByTestId("createCourseButton");

    fireEvent.click(createCourseButton);

    expect(mockCourseForm).not.toHaveBeenCalled();
  });

  it("should add an author to the course when CreateAuthor component creates a new author (createAuthor prop should be called on createAuthorButton click)", () => {
    render(
      <MemoryRouter>
        <CourseForm
          authorsList={mockAuthors}
          createCourse={mockCourseForm}
          createAuthor={mockCreateAuthor}
        />
      </MemoryRouter>
    );

    const createAuthorButton = screen.getByTestId("createAuthorButton");
    const nameInput = screen.getByTestId("createAuthorInput");

    fireEvent.change(nameInput, { target: { value: "John" } });

    fireEvent.click(createAuthorButton);

    expect(mockCreateAuthor).toHaveBeenCalled();
  });

  it('should render the course authors with data-testid="authorItem" in the course authors list', () => {
    const mockCourseAuthors = ["1", "2"];
    render(
      <MemoryRouter>
        <CourseForm
          authorsList={mockAuthors}
          createCourse={mockCourseForm}
          createAuthor={mockCreateAuthor}
        />
      </MemoryRouter>
    );

    const courseAuthorItems = screen.getAllByTestId("authorItem");
    expect(courseAuthorItems.length).toBe(mockCourseAuthors.length);
  });
  it('should display the "Authors list is empty" message when there are no authors is selected for the course', () => {
    render(
      <MemoryRouter>
        <CourseForm
          authorsList={[]}
          createCourse={mockCourseForm}
          createAuthor={mockCreateAuthor}
        />
      </MemoryRouter>
    );
    const emptyText = screen.queryByText(/list is empty/i);

    expect(emptyText).toBeInTheDocument();
  });
});
