import React from "react";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("PrivateRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children when the user has the admin role (use getUserRoleSelector inside PrivateRoute component)", () => {
    useSelector.mockReturnValue("admin");

    const { getByTestId } = render(
      <MemoryRouter>
        <PrivateRoute>
          <div data-testid="children">Children Component</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    const childrenComponent = getByTestId("children");
    expect(childrenComponent).toBeInTheDocument();
  });

  it("should NOT render children when the user role non-admin", () => {
    useSelector.mockReturnValue(undefined);

    const { queryByTestId } = render(
      <MemoryRouter>
        <PrivateRoute>
          <div data-testid="children">Children Component</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    const childrenComponent = queryByTestId("children");
    expect(childrenComponent).toBeNull();
  });
});
