import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";

import React, { DOMElement } from "react";
import { Provider } from "react-redux";

import { render, fireEvent } from "react-testing-library";

import LoginForm from "../LoginForm";
import configureStore from "../../store/configureStore";

const store = configureStore();

const submitHandler = jest.fn(event => {});

// jest uses jsdom interally to mock out the browser enviornment. jsdom has
// not implemented HTMLFormElement.prototype.submit and when we submit the form
// in this test we get a large unwelcome error message to that effect. To avoid that we will
// use a mock version of the console in this test. This should only effect this test
// since we are cleanig up after ourselves.
beforeEach(() => {
  jest.spyOn(console, "error");
  (console as any).error.mockImplementation(() => {});
});

afterEach(() => {
  (console as any).error.mockRestore();
});

describe("component", () => {
  describe("LoginForm", () => {
    it("can render redux with defaults", () => {
      const { container } = render(
        <Provider store={store}>
          <LoginForm submitHandler={submitHandler} />
        </Provider>
      );

      expect(container).toBeDefined();
    });

    it("should match the reference snapshot", () => {
      const { container, debug } = render(
        <Provider store={store}>
          <LoginForm submitHandler={submitHandler} />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });

    it("should allow the uesr to type in the email input", () => {
      const { getByLabelText } = render(
        <Provider store={store}>
          <LoginForm submitHandler={submitHandler} />
        </Provider>
      );

      const email = "msol@te.co";

      const emailInput: any = getByLabelText(/email/i);

      fireEvent.change(emailInput, { target: { value: email } });

      expect(emailInput.value).toEqual(email);
    });

    it("should call the submit handler with the correct parameters", () => {
      HTMLFormElement.prototype.submit = () => {};

      const { getByText, getByLabelText } = render(
        <Provider store={store}>
          <LoginForm submitHandler={submitHandler} />
        </Provider>
      );

      const email = "msol@te.co";

      const emailInput: any = getByLabelText(/email/i);

      fireEvent.change(emailInput, { target: { value: email } });

      const submitButton = getByText(/Log In/i);

      fireEvent.click(submitButton);

      expect(submitHandler).toBeCalledTimes(1);
      expect(submitHandler.length).toStrictEqual(1);
    });

    it("renders the correct properties on the field element", () => {
      const { container, getByValue, debug } = render(
        <Provider store={store}>
          <LoginForm submitHandler={submitHandler} />
        </Provider>
      );

      const inputElement: any = getByValue("");
      expect(inputElement.value).toStrictEqual("");
      expect(inputElement.name).toStrictEqual("email");
      expect(inputElement.required).toStrictEqual(true);
      expect(inputElement.type).toStrictEqual("text");
      expect(inputElement.id).toStrictEqual("email-input");
    });
  });
});
