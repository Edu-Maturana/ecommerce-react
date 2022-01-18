import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import "./Header.css";
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
        {
          user ? (
            <div className="user">
              <Link to="/myprofile" className="Button profile">My profile</Link>
              <Link to="/" onClick={logout} className="Button login">Logout</Link>
            </div>
          ) : (
            <div className="right">
              <Link to="/signup" className="Button signup">Signup</Link>
              <Link to="/login" className="Button login">Login</Link>
            </div>
          )
      
        }
      </div>
    </div>
  );
}
