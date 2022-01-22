import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { SignUp, LogIn } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import "../Login/Login.css";

import { Link } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  return (
    <div className="Login">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          SignUp({
            name: values.name,
            email: values.email,
            password: values.password,
          })
            .then((res) => {
              console.log(res);
              toast.success("Sign up successfully");
              setLoading(true);
              LogIn({
                email: values.email,
                password: values.password,
              }).then((res) => {
                login(res.token);
              });

              setTimeout(() => {
                window.location.href = "/";
              }, 1500);
            })
            .catch((err) => {
              console.log(err);
              if (err.response.data.message === "User already exists") {
                toast.error("User already exists");
              } else {
                toast.error(
                  "Sign up failed, assure you have entered all fields correctly"
                );
              }
            });

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <h2 className="title">Sign Up</h2>
            <div className="form-group">
              <label className="Label">Name</label>
              <Field type="text" name="name" className="Input" />
              <label className="Label">Email</label>
              <Field type="text" name="email" className="Input" />
              <label className="Label">Password</label>
              <Field type="password" name="password" className="Input" />
              <button
                type="submit"
                loading={loading}
                className="Submit"
                disabled={isSubmitting}
              >
                {loading ? "..." : "Submit"}
              </button>
              <Link to="/login">
                <p className="link">Already have an account? Login</p>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
