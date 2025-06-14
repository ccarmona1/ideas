import React from "react";
import configureMockStore from "redux-mock-store";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Header } from "../../components/Header";
import { Provider } from "react-redux";
import { removeUserData } from "../../store/slices/userSlice";

const mockStore = configureMockStore();
const getStore = (token = "") =>
  mockStore({
    user: {
      token,
      name: "User Name",
      isAuth: !!token,
    },
  });
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/mock/path" }),
}));

describe("Header", () => {
  it("should display user name from store (use getUserNameSelector)", () => {
    localStorage.setItem("token", "token");
    const store = getStore("token");

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

  it('should remove user data from store on "LOGOUT" button click (removeUserData action from userSlice should be called)', () => {
    localStorage.setItem("token", "test token");
    const store = getStore("test token", true);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    const logoutButton = screen.queryByRole("button");
    fireEvent.click(logoutButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(removeUserData());
  });

  it('should delete token from the localStorage on "LOGOUT" button click (immediately in logout button clickHandler)', () => {
    localStorage.setItem("token", "test token");
    const store = getStore("test token", true);

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
