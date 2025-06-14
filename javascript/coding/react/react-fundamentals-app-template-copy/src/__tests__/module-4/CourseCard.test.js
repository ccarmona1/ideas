import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { CourseCard } from "../../components/Courses/components/CourseCard";
import thunk from "redux-thunk";
import { deleteCourseThunk } from "../../store/thunks/coursesThunk";

jest.mock("../../store/thunks/coursesThunk", () => ({
  deleteCourseThunk: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const courses = [
  {
    title: "Test Title",
    description: "Test Description",
    authors: [1, 2],
    duration: 60,
    creationDate: "20/03/2012",
    id: 1,
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

const store = mockStore({
  authors,
  courses,
  user: { role: "admin", token: "" },
});

describe("CourseCard component", () => {
  it('should render the Delete (with data-testid="deleteCourse") and Update (with data-testid="updateCourse") buttons for admin', () => {
    render(
      <Router>
        <Provider store={store}>
          <CourseCard course={courses[0]} />
        </Provider>
      </Router>
    );
    const deleteButton = screen.queryByTestId("deleteCourse");
    const updateButton = screen.queryByTestId("updateCourse");

    expect(deleteButton).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  it('should NOT render the Delete (with data-testid="deleteCourse") and Update (with data-testid="updateCourse") buttons for non-admin', () => {
    const store = mockStore({
      authors,
      courses,
      user: { role: "" },
    });
    render(
      <Router>
        <Provider store={store}>
          <CourseCard course={courses[0]} />
        </Provider>
      </Router>
    );
    const deleteButton = screen.queryByTestId("deleteCourse");
    const updateButton = screen.queryByTestId("updateCourse");

    expect(deleteButton).not.toBeInTheDocument();
    expect(updateButton).not.toBeInTheDocument();
  });

  it('should render update button with data-testid="updateCourse" as <Link/>', () => {
    render(
      <Router>
        <Provider store={store}>
          <CourseCard course={courses[0]} />
        </Provider>
      </Router>
    );
    const updateButton = screen.queryByTestId("updateCourse");

    expect(updateButton.closest("a")).toBeInTheDocument();
  });

  it("should dispatch deleteCourseThunk on delete button click", () => {
    deleteCourseThunk.mockReturnValue({
      type: "courses/deleteCourse",
      payload: 1,
    });

    render(
      <Router>
        <Provider store={store}>
          <CourseCard course={courses[0]} />
        </Provider>
      </Router>
    );
    const deleteButton = screen.queryByTestId("deleteCourse");
    fireEvent.click(deleteButton);

    expect(deleteCourseThunk).toHaveBeenCalled();
  });
});
