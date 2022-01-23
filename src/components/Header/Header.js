import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import CartIcon from "../CartIcon/CartIcon";
import useAuth from "../../hooks/useAuth";
import { getUserData } from "../../api/user";

export default function Header() {
  const [user, setUser] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    if (auth) {
      getUserData().then((res) => {
        setUser(res.data.user);
      });
    }
  }, [auth]);

  return (
    <div className="Header">
      <Link className="logo" to="/">
        LaptopShop
      </Link>
      <div className="right">
        <CartIcon />
        {auth ? (
          <div className="user">
            <Link to="/profile" className="Button profile">
              <img
                className="user-icon"
                src="https://cupeybowling.com/wp-content/uploads/2021/05/940-9406687_already-a-proact-user-employee-icon-white-png.png"
                alt="account"
              />
            </Link>
            <Link to="/" onClick={logout} className="Button login">
              <img
                className="logout-icon"
                src="http://icons.iconarchive.com/icons/icons8/windows-8/512/User-Interface-Logout-icon.png"
                alt="logout"
              />
            </Link>
          </div>
        ) : (
          <div className="right">
            <Link to="/signup" className="Button signup">
              Signup
            </Link>
            <Link to="/login" className="Button login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
