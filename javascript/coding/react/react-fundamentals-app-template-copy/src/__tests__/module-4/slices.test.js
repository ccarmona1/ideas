import configureMockStore from "redux-mock-store";
import { setAuthors, saveAuthor } from "../../store/slices/authorsSlice";
import {
  setCourses,
  saveCourse,
  deleteCourse,
} from "../../store/slices/coursesSlice";
import { setUserData, removeUserData } from "../../store/slices/userSlice";

describe("slices", () => {
  const mockStore = configureMockStore();

  describe("authorsSlice", () => {
    it("should set authors with setAuthors action", () => {
      const initialState = [];
      const authors = [
        { id: 1, name: "Author 1" },
        { id: 2, name: "Author 2" },
      ];
      const store = mockStore(initialState);

      store.dispatch(setAuthors(authors));

      const actions = store.getActions();
      const expectedAction = {
        type: "authors/setAuthors",
        payload: authors,
      };
      expect(actions).toEqual([expectedAction]);
    });

    it("should save a new author with saveAuthor action payload {}", () => {
      const initialState = [{ id: 1, name: "Author 1" }];
      const newAuthor = { id: 2, name: "Author 2" };
      const store = mockStore(initialState);

      store.dispatch(saveAuthor(newAuthor));

      const actions = store.getActions();
      const expectedAction = {
        type: "authors/saveAuthor",
        payload: newAuthor,
      };
      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("coursesSlice", () => {
    it("should set courses with setCourses action", () => {
      const courses = [
        { id: 1, title: "Course 1" },
        { id: 2, title: "Course 2" },
      ];
      const store = mockStore({ courses });

      store.dispatch(setCourses(courses));

      const actions = store.getActions();
      const expectedAction = {
        type: "courses/setCourses",
        payload: courses,
      };
      expect(actions).toEqual([expectedAction]);
    });

    it("should save a new course with saveCourse action", () => {
      const initialState = [];
      const newCourse = { id: 1, title: "New Course" };
      const store = mockStore({ courses: initialState });

      store.dispatch(saveCourse(newCourse));

      const actions = store.getActions();
      const expectedAction = {
        type: "courses/saveCourse",
        payload: newCourse,
      };
      expect(actions).toEqual([expectedAction]);
    });

    it("should delete a course with deleteCourse action", () => {
      const initialState = [
        { id: 1, title: "Course 1" },
        { id: 2, title: "Course 2" },
      ];
      const courseIdToDelete = 1;
      const store = mockStore({ courses: initialState });

      store.dispatch(deleteCourse(courseIdToDelete));

      const actions = store.getActions();
      const expectedAction = {
        type: "courses/deleteCourse",
        payload: courseIdToDelete,
      };
      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("userSlice", () => {
    it("should set user data with setUserData action", () => {
      const initialState = {
        isAuth: false,
        name: "",
        email: "",
        token: "",
      };
      const userData = {
        isAuth: true,
        name: "John Doe",
        email: "johndoe@example.com",
        token: "sample-token",
      };

      const store = mockStore(initialState);

      store.dispatch(setUserData(userData));

      const actions = store.getActions();
      const expectedAction = {
        type: "user/setUserData",
        payload: userData,
      };
      expect(actions).toEqual([expectedAction]);
    });

    it("should remove user data with removeUserData action", () => {
      const initialState = {
        isAuth: true,
        name: "John Doe",
        email: "johndoe@example.com",
        token: "sample-token",
      };

      const store = mockStore(initialState);

      store.dispatch(removeUserData());

      const actions = store.getActions();
      const expectedAction = {
        type: "user/removeUserData",
      };
      expect(actions).toEqual([expectedAction]);
    });
  });
});
