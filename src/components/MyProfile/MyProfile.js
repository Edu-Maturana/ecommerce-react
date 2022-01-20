import React, { useState, useEffect } from "react";

import "./MyProfile.css";

import useAuth from "../../hooks/useAuth";
import { getUserData } from "../../api/user";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      getUserData().then((res) => {
        setUser(res.data.user);
        setLoading(false);
      });
    }
    setLoading(false);
  }, [auth]);

  return (
    <div className="MyProfile">
      {!loading && user ? (
        <div className="user-data">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-email">{user.email}</p>
        </div>
      ) : (
        <h2>...</h2>
      )}
    </div>
  );
}
