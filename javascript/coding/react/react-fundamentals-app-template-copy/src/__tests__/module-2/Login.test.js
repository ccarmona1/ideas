import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import * as services from "../../services";

beforeEach(() => {
  jest.spyOn(services, "login").mockImplementation(
    jest.fn(() =>
      Promise.resolve({
        successful: true,
        result: "token123",
        user: {
          name: "John Doe",
        },
      })
    )
  );

  jest.spyOn(global, "fetch").mockImplementation(
    jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            result: "token",
            user: {
              name: "John Doe",
            },
          }),
      })
    )
  );
});

describe("Login", () => {
  test("should render login form with 2 inputs, registration info text and link", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.queryByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).toBeInTheDocument();
    expect(screen.queryByText(/an account you/i)).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  test("should submits login form calls login service with entered email and password", async () => {
    render(
      <MemoryRouter>
        <Login setName={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/email/i).querySelector("input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.queryByText(/password/i).querySelector("input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(services.login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    await waitFor(() => expect(localStorage.getItem("token")).toBe("token123"));
  });

  test('should set "token" to localstorage after login submit', async () => {
    render(
      <MemoryRouter>
        <Login setName={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/email/i).querySelector("input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.queryByText(/password/i).querySelector("input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(services.login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    await waitFor(() => expect(localStorage.getItem("token")).toBe("token123"));
  });

  test('should render the "Password is required" validation message and NOT call login service', async () => {
    render(
      <MemoryRouter>
        <Login setName={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/email/i).querySelector("input"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText(/password is required/i)).toBeInTheDocument();
    expect(services.login).not.toHaveBeenCalled();
  });
  test('should render the "Email is required" validation message and NOT call login service', async () => {
    render(
      <MemoryRouter>
        <Login setName={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/password/i).querySelector("input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText(/email is required/i)).toBeInTheDocument();
    expect(services.login).not.toHaveBeenCalled();
  });
});
