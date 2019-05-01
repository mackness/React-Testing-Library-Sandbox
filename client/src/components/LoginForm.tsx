import React from "react";
import { Field, reduxForm } from "redux-form";

interface LoginFormProps {
  submitHandler: (event: any) => void;
}

let LoginForm: any = ({ submitHandler }: LoginFormProps): JSX.Element => {
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="email-input">email</label>
      <Field
        required
        id="email-input"
        label="email"
        name="email"
        component="input"
        type="text"
      />
      <button type="submit">Log In</button>
    </form>
  );
};

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

export default LoginForm;
