import configureMockStore from "redux-mock-store";
import {
  createAuthorThunk,
  getAuthorsThunk,
} from "../../store/thunks/authorsThunk";
import {
  updateCourseThunk,
  deleteCourseThunk,
  createCourseThunk,
  getCoursesThunk,
} from "../../store/thunks/coursesThunk";
import { getUserThunk, logoutThunk } from "../../store/thunks/userThunk";
import {
  createAuthor,
  getAuthors,
  createCourse,
  deleteCourseService,
  getCourses,
  updateCourseService,
  getCurrentUser,
  logout,
} from "../../services";

jest.mock("../../services", () => ({
  createAuthor: jest.fn(),
  getAuthors: jest.fn(),
  createCourse: jest.fn(),
  deleteCourseService: jest.fn(),
  getCourses: jest.fn(),
  updateCourseService: jest.fn(),
  getCurrentUser: jest.fn(),
  logout: jest.fn(),
}));

describe("thunks", () => {
  describe("authorThunks", () => {
    describe("createAuthorThunk", () => {
      const mockStore = configureMockStore();
      const initialState = [{ id: 1, name: "Author 1" }];
      const store = mockStore(initialState);

      it("should dispatch saveAuthor action with the created author data", async () => {
        const token = "exampleToken";
        const newAuthor = { id: 123, name: "John Doe" };

        createAuthor.mockResolvedValue({ successful: true, result: newAuthor });

        await createAuthorThunk(newAuthor, token)(store.dispatch);

        const actions = store.getActions();
        const expectedAction = {
          type: "authors/saveAuthor",
          payload: newAuthor,
        };
        expect(actions).toEqual([expectedAction]);
        expect(createAuthor).toHaveBeenCalled();
      });
    });

    describe("getAuthorsThunk", () => {
      const mockStore = configureMockStore();
      const initialState = [{ id: 1, name: "Author 1" }];
      const store = mockStore(initialState);
      it("should dispatch setAuthors action with the authors data", async () => {
        const fetchedAuthors = [
          { id: 123, name: "Author 1" },
          { id: 456, name: "Author 2" },
        ];

        getAuthors.mockResolvedValue({
          successful: true,
          result: fetchedAuthors,
        });

        const actions = store.getActions();
        await getAuthorsThunk()(store.dispatch);
        const expectedAction = {
          type: "authors/setAuthors",
          payload: fetchedAuthors,
        };
        expect(actions).toEqual([expectedAction]);
        expect(getAuthors).toHaveBeenCalled();
      });
    });
  });
  describe("coursesThunks", () => {
    describe("updateCourseThunk", () => {
      const mockStore = configureMockStore();
      const initialState = [{ id: 1, title: "Course 1" }];
      const store = mockStore(initialState);

      it("should dispatch updateCourse action with the updated course data", async () => {
        const newCourse = { id: 123, title: "John Doe" };

        updateCourseService.mockResolvedValue({
          successful: true,
          result: newCourse,
        });

        await updateCourseThunk(newCourse)(store.dispatch);

        const actions = store.getActions();
        const expectedAction = {
          type: "courses/updateCourse",
          payload: newCourse,
        };
        expect(actions).toEqual([expectedAction]);
        expect(updateCourseService).toHaveBeenCalled();
      });
    });
    describe("deleteCourseThunk", () => {
      const mockStore = configureMockStore();
      const initialState = [{ id: 1, title: "Course 1" }];
      const store = mockStore(initialState);

      it("should dispatch deleteCourse action with the course id", async () => {
        const id = 123;

        deleteCourseService.mockResolvedValue({ successful: true, result: id });

        await deleteCourseThunk(id)(store.dispatch);

        const actions = store.getActions();
        const expectedAction = {
          type: "courses/deleteCourse",
          payload: id,
        };
        expect(actions).toEqual([expectedAction]);
        expect(deleteCourseService).toHaveBeenCalled();
      });
    });
    describe("createCourseThunk", () => {
      const mockStore = configureMockStore();
      const initialState = [{ id: 1, title: "Course 1" }];
      const store = mockStore(initialState);

      it("should dispatch saveCourse action with the course data", async () => {
        const newCourse = { newCourse: 1, title: "Course 1" };

        createCourse.mockResolvedValue({ successful: true, result: newCourse });

        await createCourseThunk(newCourse)(store.dispatch);

        const actions = store.getActions();
        const expectedAction = {
          type: "courses/saveCourse",
          payload: newCourse,
        };
        expect(actions).toEqual([expectedAction]);
        expect(createCourse).toHaveBeenCalled();
      });
    });
    describe("getCoursesThunk", () => {
      const mockStore = configureMockStore();
      const initialState = [{ id: 1, title: "Course 1" }];
      const store = mockStore(initialState);

      it("should dispatch setCourses action with the courses data", async () => {
        const newCourse = { newCourse: 1, title: "Course 1" };

        getCourses.mockResolvedValue({ successful: true, result: newCourse });

        await getCoursesThunk(newCourse)(store.dispatch);

        const actions = store.getActions();
        const expectedAction = {
          type: "courses/setCourses",
          payload: newCourse,
        };
        expect(actions).toEqual([expectedAction]);
        expect(getCourses).toHaveBeenCalled();
      });
    });
  });
  describe("userThunks", () => {
    describe("getUserThunk", () => {
      const mockStore = configureMockStore();
      const initialState = {
        isAuth: false,
        name: "",
        email: "",
        token: "",
      };
      const store = mockStore(initialState);

      it("should dispatch setUserData action with the user data", async () => {
        const userData = {
          name: "name",
          email: "email",
          token: "token",
          role: "role",
        };

        getCurrentUser.mockResolvedValue({
          successful: true,
          result: userData,
        });

        await getUserThunk("token")(store.dispatch);

        const actions = store.getActions();
        const expectedAction = {
          type: "user/setUserData",
          payload: userData,
        };
        expect(actions[0].type).toBe(expectedAction.type);
        expect(actions[0].payload.name).toBe(expectedAction.payload.name);
        expect(actions[0].payload.id).toBe(expectedAction.payload.id);
        expect(actions[0].payload.role).toBe(expectedAction.payload.role);

        expect(getCurrentUser).toHaveBeenCalled();
      });
    });
    describe("logoutThunk", () => {
      const mockStore = configureMockStore();
      const initialState = {
        isAuth: false,
        name: "",
        email: "",
        token: "",
      };
      const store = mockStore(initialState);

      it("should dispatch removeUserData action", async () => {
        logout.mockResolvedValue();

        await logoutThunk()(store.dispatch);

        const actions = store.getActions();
        const expectedAction = {
          type: "user/removeUserData",
        };
        expect(actions).toEqual([expectedAction]);
        expect(logout).toHaveBeenCalled();
      });
    });
  });
});
