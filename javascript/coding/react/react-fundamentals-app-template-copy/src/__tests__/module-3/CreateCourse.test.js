import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { CourseForm } from "../../components/CourseForm";
import { saveCourse } from "../../store/slices/coursesSlice";

const mockStore = configureMockStore();
const store = mockStore({
  authors: [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
  ],
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/mock/path" }),
}));

describe("CourseForm", () => {
  it('should add new course to the store on "CREATE COURSE" button with data-testid="createCourseButton" click (saveCourse action from coursesSlice should be called with payload {title,description,duration,authors}', () => {
    render(
      <Provider store={store}>
        <Router>
          <CourseForm />
        </Router>
      </Provider>
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

    const course = {
      title: "Course Title",
      description: "Course Description",
      duration: 20,
      authors: [1],
    };

    const mockedAction = saveCourse(course);
    const actions = store.getActions();

    expect(actions[0].type).toBe(mockedAction.type);
    expect(actions[0].payload.title).toEqual(mockedAction.payload.title);
    expect(actions[0].payload.description).toEqual(
      mockedAction.payload.description
    );
    expect(actions[0].payload.duration).toEqual(mockedAction.payload.duration);
    expect(actions[0].payload.authors).toEqual(mockedAction.payload.authors);
  });
});
