import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { CourseCard } from "../../components/Courses/components/CourseCard";

const mockStore = configureMockStore();
const course = {
  title: "Test Title",
  description: "Test Description",
  authors: [1, 2],
  duration: 60,
  creationDate: "20/03/2012",
  id: 1,
};

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
  courses: [course],
});

describe("CourseCard component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Provider store={store}>
          <CourseCard course={course} />
        </Provider>
      </Router>
    );
  });

  it('should render the Delete (with data-testid="deleteCourse") and Update (with data-testid="updateCourse") buttons', () => {
    const deleteButton = screen.queryByTestId("deleteCourse");
    const updateButton = screen.queryByTestId("updateCourse");

    expect(deleteButton).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });
});
