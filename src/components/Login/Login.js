import React from "react";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";

import "./Login.css";

export default function Login() {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="login-form">
          <h2 className="title">Log in</h2>
          <label className="Label" htmlFor="email">
            Email
          </label>
          <Field className="Input" type="email" name="email" />
          <label className="Label" htmlFor="password">
            Password
          </label>
          <Field className="Input" type="password" name="password" />
          <button className="Submit" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
