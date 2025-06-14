import { createUser, login } from "../../services";

describe("services", () => {
  describe("createUser", () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should create new user on createUser (call fetch with path - "http://localhost:4000/register" method - "POST", body - {name, password, email}, headers - "Content-Type": "application/json")', async () => {
      const mockUser = { name: "John", password: "pass" };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await createUser(mockUser);

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(mockUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(createUser()).rejects.toThrow();
    });
  });

  describe("login", () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should return user data on login (call fetch with path - "http://localhost:4000/login" method - "POST", body - {name, password}, headers - "Content-Type": "application/json")', async () => {
      const userData = { name: "John", password: "pass" };
      const mockUser = { token: "token" };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const resp = await login(userData);

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(resp).toEqual(mockUser);
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      const mockResponse = {
        ok: false,
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(login()).rejects.toThrow();
    });
  });
});
