import React, { useState } from "react";
import { useFormik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { SignUp, LogIn } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import "../Login/Login.css";

import { Link } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object(validateForm()),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await SignUp(values);
        if (response.status === 201) {
          toast.success("Signup Successful");
          login(response.data.token);
        }
        LogIn(values.email, values.password);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    },
  });

  return (
    <div className="Login">
      <Form className="login-form">
        <h2 className="title">Sign Up</h2>
        <div className="form-group">
          <label className="Label">Name</label>
          <Field
            type="text"
            name="name"
            className="Input"
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <label className="Label">Email</label>
          <Field
            type="text"
            name="email"
            className="Input"
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <label className="Label">Password</label>
          <Field
            type="password"
            name="password"
            className="Input"
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <button type="submit" loading={loading} className="Submit">
            {loading ? "..." : "Submit"}
          </button>
          <Link to="/login">
            <p className="link">Already have an account? Login</p>
          </Link>
        </div>
      </Form>
    </div>
  );
}

function validateForm() {
  return {
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  };
}
