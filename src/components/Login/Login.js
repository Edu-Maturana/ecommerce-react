import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { LogIn } from "../../api/auth";

import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  return (
    <div className="Login">
      <ToastContainer />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          LogIn({
            email: values.email,
            password: values.password,
          })
            .then((res) => {
              console.log(res);
              setLoading(true);
              //window.location.href = "/";
              login(res.token);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Invalid credentials");
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <h2 className="title">Log In</h2>
            <div className="form-group">
              <label className="Label">Email</label>
              <Field type="email" name="email" className="Input" />
            </div>
            <div className="form-group">
              <label className="Label">Password</label>
              <Field type="password" name="password" className="Input" />
            </div>
            <button type="submit" loading={loading} className="Submit" disabled={isSubmitting}>
              {
                loading ? "..." : "Submit"
              }
            </button>
            <Link to="/signup">
              <p className="link">Don't have an account? Sign up</p>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}
