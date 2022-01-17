import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  return (
    <div className="Header">
      <Link className="logo" to="/">LaptopShop</Link>
      <div className="right">
        <Link to='/signup' className="Button signup">Sign Up</Link>
        <Link to='login' className="Button login">Login</Link>
      </div>
    </div>
  );
}
