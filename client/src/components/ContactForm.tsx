import React from "react";
import { Field, reduxForm, SubmitHandler } from "redux-form";

interface ContactFormProps {
  handleSubmit: SubmitHandler;
}

let ContactForm = (props: ContactFormProps): JSX.Element => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

//@ts-ignore
ContactForm = reduxForm({
  form: "contact"
})(ContactForm);

export default ContactForm;
