import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { CreateAuthor } from "../../components/CourseForm/components/CreateAuthor";

import { createAuthorThunk } from "../../store/thunks/authorsThunk";

jest.mock("../../store/thunks/authorsThunk", () => ({
  createAuthorThunk: jest.fn(),
}));

const mockStore = configureMockStore();
const store = mockStore({ user: { token: "token" } });

describe("CreateAuthor component", () => {
  it('should dispatch createAuthorThunk on "CREATE AUTHOR" button click', () => {
    createAuthorThunk.mockReturnValue({
      type: "authors/saveAuthor",
      payload: {},
    });
    render(
      <Provider store={store}>
        <CreateAuthor />
      </Provider>
    );

    const nameInput = screen.queryByTestId("createAuthorInput");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    // Click the "Create Author" button
    const createButton = screen.queryByText(/create author/i);
    fireEvent.click(createButton);

    expect(createAuthorThunk).toHaveBeenCalled();
  });
});
