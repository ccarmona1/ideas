import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { CourseForm } from "../../components/CourseForm";

import {
  updateCourseThunk,
  createCourseThunk,
} from "../../store/thunks/coursesThunk";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureMockStore();
const store = mockStore({
  courses: [
    {
      id: "1",
      title: "1",
      creationDate: "1",
      duration: "1",
      description: "1",
      authors: [1],
    },
  ],
  authors: [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
  ],
  user: { role: "admin", token: "token" },
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/mock/path" }),
}));

jest.mock("../../store/thunks/coursesThunk", () => ({
  createCourseThunk: jest.fn(),
  updateCourseThunk: jest.fn(),
}));

describe("CourseForm", () => {
  beforeEach(() => {
    createCourseThunk.mockReturnValue({
      type: "courses/saveCourse",
      payload: {},
    });
    updateCourseThunk.mockReturnValue({
      type: "courses/updateCourse",
      payload: {},
    });
  });

  it('should dispatch createCourseThunk on "CREATE COURSE" button with data-testid="createCourseButton" click ', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CourseForm />
        </Provider>
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

    expect(createCourseThunk).toHaveBeenCalled();
  });

  it('should dispatch updateCourseThunk on "CREATE COURSE" button with data-testid="createCourseButton" if route="/courses/update/:courseId"', () => {
    render(
      <MemoryRouter initialEntries={["/courses/update/1"]}>
        <Provider store={store}>
          <CourseForm />
        </Provider>
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

    expect(createCourseThunk).toHaveBeenCalled();
  });
});
