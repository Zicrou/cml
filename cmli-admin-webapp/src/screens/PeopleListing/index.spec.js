import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import React from "react";
import * as reactRedux from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PeopleListing from "./index";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const build = (custom) => {
  render(
    <BrowserRouter>
      <PeopleListing />
    </BrowserRouter>
  );
};

describe("renders correctly", () => {
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
  });
  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });
  const useSelectorMock = reactRedux.useSelector;
  const useDispatchMock = reactRedux.useDispatch;
  const mockStore = {
    getUsers: {
      status: 200,
      data: {
        items: [
          {
            sys: {
              id: 2,
              type: "User",
              createdAt: "2022-02-19T19:35:20.613Z",
              updatedAt: "2022-02-19T21:13:42.104Z",
            },
            email: "alexia.rutherford@hammes-franecki.org",
            lookingFor: "wife",
            attendedEvents: 0,
            personName: "Jamie Quitzon",
            dateOfBirth: "2000-09-11",
            previouslyMarried: null,
            demographicImage: {
              orignal: "nil",
              thumb: "nil",
            },
          },
        ],
      },
    },
  };

  it("should display the title correctly", async () => {
    build();

    expect(screen.getByTestId("people-listing")).toHaveTextContent(
      "People Search"
    );
    expect(screen.getByText("Jamie Quitzon")).toBeInTheDocument();
  });
});
