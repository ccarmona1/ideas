import React from "react";
import configureMockStore from "redux-mock-store";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Header } from "../../components/Header";
import { Provider } from "react-redux";
import { logoutThunk } from "../../store/thunks/userThunk";

jest.mock("../../store/thunks/userThunk", () => ({
  logoutThunk: jest.fn(),
}));

const mockStore = configureMockStore();
const store = mockStore({
  user: {
    name: "User Name",
    isAuth: true,
    token: "token",
  },
});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/mock/path" }),
}));

describe("Header", () => {
  beforeEach(() => {
    logoutThunk.mockReturnValue({
      type: "user/removeUserData",
    });
  });

  it("should display user name from store (use getUserNameSelector)", () => {
    localStorage.setItem("token", "token");

    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    const name = getByText("User Name");

    expect(name).toBeInTheDocument();
  });

  it('should remove user data from store on "LOGOUT" button click (logoutThunk should be dispatched)', () => {
    localStorage.setItem("token", "test token");
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    const logoutButton = screen.queryByRole("button");
    fireEvent.click(logoutButton);

    expect(logoutThunk).toHaveBeenCalled();
  });

  it("should delete token from the localStorage (immediately in logout button clickHandler)", () => {
    localStorage.setItem("token", "test token");
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    expect(localStorage.getItem("token")).toBe("test token");
    const logoutButton = screen.queryByRole("button");
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeFalsy();
  });
});
