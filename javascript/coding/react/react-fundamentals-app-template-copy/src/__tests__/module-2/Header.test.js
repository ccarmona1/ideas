import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../../components/Header/Header";
import { MemoryRouter } from "react-router";

describe("Header component", () => {
  test("should render logo (<img /> tag)", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const imageElement = screen.getByRole("img");

    expect(imageElement).toBeInTheDocument();
  });

  test('should not render logout button without "token" in localStorage', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutButtonElement = screen.queryByRole("button");

    expect(logoutButtonElement).not.toBeInTheDocument();
  });

  test('should immediately remove "token" from localStorage on "LOGOUT" button click', () => {
    localStorage.setItem("token", "token");
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutButtonElement = screen.getByRole("button");

    fireEvent.click(logoutButtonElement);

    expect(localStorage.getItem("token")).toBeFalsy();
  });
});
