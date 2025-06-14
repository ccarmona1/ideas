import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "../../components/Header/Header";

describe("Header component", () => {
  test("should render logo (<img /> tag)", () => {
    render(<Header />);

    const imageElement = screen.getByRole("img");

    expect(imageElement).toBeInTheDocument();
  });

  test("should render logout button", () => {
    render(<Header />);

    const logoutButtonElement = screen.getByRole("button");

    expect(logoutButtonElement).toBeInTheDocument();
  });
});
