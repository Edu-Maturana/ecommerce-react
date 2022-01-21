import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import "./AddressShipping.css";

import { getUserData, editAddress } from "../../api/user";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

export default function AddressShipping() {
  const [address, setAddress] = useState(null);
  const { auth, setReloadUser } = useAuth();

  useEffect(() => {
    getUserData().then((res) => {
      const { address } = res.data.user;
      setAddress(address);
    });
  }, [auth]);

  return (
    <div>
      <h2>Shipping address</h2>
      {address ? (
        <div className="address-info">
          <p>Street: {address.street}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>Zip: {address.zip}</p>
        </div>
      ) : (
        <Formik
          initialValues={{
            street: "",
            city: "",
            state: "",
            zip: "",
          }}
          onSubmit={(values) => {
            editAddress(values).then((res) => {
              console.log(res);
              setReloadUser(true);
              localStorage.setItem("address", JSON.stringify(values));
            });
            toast.success("Address saved");
          }}
        >
          <Form className="address-form">
            <div className="form-group">
              <label className="Label">Street</label>
              <Field type="text" name="street" className="form-control" />
            </div>
            <div className="form-group">
              <label className="Label">City</label>
              <Field type="text" name="city" className="form-control" />
            </div>
            <div className="form-group">
              <label className="Label">State</label>
              <Field type="text" name="state" className="form-control" />
            </div>
            <div className="form-group">
              <label className="Label">Zip</label>
              <Field type="text" name="zip" className="form-control" />
            </div>
            <button type="submit" className="Submit">
              Save address
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
}
