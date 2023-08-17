import "@testing-library/jest-dom";

// import { useRouter } from "next/navigation";
import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Search } from "./search";

const mockOnSearchSubmit = jest.fn(
  (data: { keyword: string; type: string }) => {
    return Promise.resolve({ data: { keyword: "", type: "" } });
  }
);

describe("Search component", () => {
  it("should render the component with default values", () => {
    render(<Search onSearchSubmit={mockOnSearchSubmit} />);

    // expect(screen.getByTestId("search-filter")).toHaveValue("Films");
    expect(screen.getByTestId("search-field")).toHaveValue("");
    expect(screen.getByTestId("submit-button")).toBeVisible();
  });

  // Define a test case for typing in the input field
  it("should type in the input field when user enters text", async () => {
    // Render the component with the mock function as prop
    render(<Search onSearchSubmit={mockOnSearchSubmit} />);

    // Get the input element by test id
    const input = screen.getByTestId("search-field");

    // Expect the input element to have an empty value
    expect(input).toHaveValue("");

    // Type in some text in the input element
    await userEvent.type(input, "Breaking Bad");

    // Expect the input element to have the new value of "Breaking Bad"
    expect(input).toHaveValue("Breaking Bad");
  });

  it("should submit the form when user clicks on button", async () => {
    // Render the component with the mock function as prop
    render(<Search onSearchSubmit={mockOnSearchSubmit} />);

    const input = screen.getByTestId("search-field");
    fireEvent.change(input, { target: { value: "luke" } });

    // Click on the button element
    await userEvent.click(screen.getByTestId("submit-button"));

    // Expect the mock function to be called once with the form data
    expect(mockOnSearchSubmit).toHaveBeenCalledTimes(1);

    // expect(mockOnSearchSubmit).toBeCalledWith({"keyword": "luke", "type": ""})
  });
});
