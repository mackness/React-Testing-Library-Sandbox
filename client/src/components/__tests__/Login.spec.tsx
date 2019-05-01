import "react-testing-library/cleanup-after-each";
import * as React from "react";
import { createSerializer } from "jest-emotion";
import * as emotion from "emotion";
import { MockedProvider } from "react-apollo/test-utils";
import { render } from "react-testing-library";
import Login, { LOGIN_USER } from "../Login";

expect.addSnapshotSerializer(createSerializer(emotion));

let mocks: any;
beforeEach(() => {
  mocks = [
    {
      request: {
        query: LOGIN_USER,
        variables: {
          email: "m@te.co"
        }
      },
      error: null,
      result: {
        data: {
          login: (k: any) => k
        }
      }
    }
  ];
});

jest.mock("../LoginForm", () => () => <span>login form</span>);

describe("components", () => {
  describe("Login", () => {
    it("should mount without crashing", () => {
      const { container } = render(
        <MockedProvider mocks={mocks}>
          <Login />
        </MockedProvider>
      );
      expect(container).toBeDefined();
    });

    it("should render the title with the correct text content", () => {
      const { getByText } = render(
        <MockedProvider mocks={mocks}>
          <Login />
        </MockedProvider>
      );
      expect(getByText(/Pokèdex/i)).toBeDefined();
    });

    // as a note this snapshot test should contain human readable css properties
    // thanks to the emotion snapshot serializer
    it("should pass snapshot test", () => {
      const { container } = render(
        <MockedProvider mocks={mocks}>
          <Login />
        </MockedProvider>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
