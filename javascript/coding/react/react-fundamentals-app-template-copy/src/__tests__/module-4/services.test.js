import {
  createCourse,
  deleteCourseService,
  getAuthors,
  getCourses,
  getCurrentUser,
  updateCourseService,
} from "../../services";

describe("services", () => {
  describe("getCourses", () => {
    beforeEach(() => {
      // Reset the fetch mock before each test
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should return the courses when the response is successful (call fetch with path - "http://localhost:4000/courses/all" method - "GET", headers - "Content-Type": "application/json")', async () => {
      const mockCourses = [
        { id: 1, title: "Course 1" },
        { id: 2, title: "Course 2" },
      ];
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockCourses),
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const courses = await getCourses();

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/courses/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(courses).toEqual(mockCourses);
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(getCourses()).rejects.toThrow();
    });
  });

  describe("getAuthors", () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should return the authors when the response is successful (call fetch with path - "http://localhost:4000/authors/all" method - "GET", headers - "Content-Type": "application/json")', async () => {
      const mockAuthors = [
        { id: 1, name: "Author 1" },
        { id: 2, name: "Author 2" },
      ];
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockAuthors),
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const authors = await getAuthors();

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/authors/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(authors).toEqual(mockAuthors);
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(getAuthors()).rejects.toThrow();
    });
  });

  describe("getCurrentUser", () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should return the current user when the response is successful (getCurrentUser with token arg call fetch with path - "http://localhost:4000/users/me" method - "GET", headers - "Content-Type": "application/json", Authorization: token)', async () => {
      const mockUser = { name: "test" };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      };
      const token = "token";

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const user = await getCurrentUser(token);

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      expect(user).toEqual(mockUser);
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(getCurrentUser("token")).rejects.toThrow();
    });
  });
  describe("updateCourseService", () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should update course when the response is successful (updateCourseService with updatedData and token args call fetch with path - "http://localhost:4000/courses/{updatedData.id}" method - "PUT", headers - "Content-Type": "application/json", Authorization: token, body - updatedData)', async () => {
      const expectedCourse = {
        title: "title",
        description: "desc",
        duration: 10,
        authors: [],
        id: 1,
      };
      const mockCourse = {
        ...expectedCourse,
        id: 1,
      };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(expectedCourse),
      };
      const token = "token";

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const course = await updateCourseService(mockCourse, token);

      expect(fetch).toHaveBeenCalledWith(
        `http://localhost:4000/courses/${mockCourse.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(expectedCourse),
        }
      );
      expect(course).toEqual(expectedCourse);
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(updateCourseService({}, "token")).rejects.toThrow();
    });
  });
  describe("deleteCourseService", () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should delete course when the response is successful (deleteCourseService with courseId and token args call fetch with path - "http://localhost:4000/courses/{courseId}" method - "DELETE", headers - "Content-Type": "application/json", Authorization: token)', async () => {
      const courseId = 1;
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      };
      const token = "token";

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await deleteCourseService(courseId, token);

      expect(fetch).toHaveBeenCalledWith(
        `http://localhost:4000/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(deleteCourseService(1, "token")).rejects.toThrow();
    });
  });
  describe("createCourse", () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should create course when the response is successful (createCourse with data and token args call fetch with path - "http://localhost:4000/courses/add" method - "POST", headers - "Content-Type": "application/json", Authorization: token), body - data', async () => {
      const mockCourse = {
        title: "title",
        description: "desc",
        duration: 10,
        authors: [],
      };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ ...mockCourse, id: 2 }),
      };
      const token = "token";

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const newCourse = await createCourse(mockCourse, token);

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/courses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(mockCourse),
      });

      expect(newCourse).toEqual({ ...mockCourse, id: 2 });
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(createCourse({}, "token")).rejects.toThrow();
    });
  });
});
