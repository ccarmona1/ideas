import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { CreateAuthor } from "../../components/CourseForm/components/CreateAuthor";
import { saveAuthor } from "../../store/slices/authorsSlice";

const mockStore = configureMockStore();
const store = mockStore({});

describe("CreateAuthor component", () => {
  it('should add a new author to the store when "CREATE AUTHOR" button is clicked (saveAuthor action from authorsSlice should be called with payload {id,name})', () => {
    const { container } = render(
      <Provider store={store}>
        <CreateAuthor />
      </Provider>
    );

    const nameInput = container.querySelector("input");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    // Click the "Create Author" button
    const createButton = screen.queryByText(/create author/i);
    fireEvent.click(createButton);

    // Check if the saveAuthor was dispatched with the correct author object
    const expectedAuthor = {
      name: "John Doe",
    };
    const mockedAction = saveAuthor(expectedAuthor);
    const actions = store.getActions();

    expect(actions[0].type).toBe(mockedAction.type);
    expect(actions[0].payload.name).toEqual(mockedAction.payload.name);
  });
});
