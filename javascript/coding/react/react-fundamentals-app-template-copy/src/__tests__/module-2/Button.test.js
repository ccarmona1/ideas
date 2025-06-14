import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "../../common/Button";

describe("Button component", () => {
  test("should render button with provided buttonText prop value", () => {
    const handleClickMock = jest.fn();
    render(<Button buttonText="Hello" handleClick={handleClickMock} />);
    const buttonElement = screen.getByText("Hello");

    expect(buttonElement).toBeInTheDocument();
  });

  test("should call provided handleClick callback prop", () => {
    const handleClickMock = jest.fn();
    render(<Button handleClick={handleClickMock} buttonText="Click me" />);
    const buttonElement = screen.getByText("Click me");

    fireEvent.click(buttonElement);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});
