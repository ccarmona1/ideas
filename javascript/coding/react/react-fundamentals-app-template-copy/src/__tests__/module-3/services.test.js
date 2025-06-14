import { getAuthors, getCourses } from "../../services";

describe("services", () => {
  describe("getCourses", () => {
    beforeEach(() => {
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
});
