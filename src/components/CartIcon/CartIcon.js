import React from "react";

import "./CartIcon.css";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const {products} = useCart();

  return (
    <Link to="/cart" className="cart">
      
      {
        products > 0 ? (
          <div className="total">{products}</div>
        ) : (
          null
        )
      }
      <img
        src="https://img.icons8.com/ios/50/000000/shopping-cart.png"
        alt="cart"
      />
    </Link>
  );
}
