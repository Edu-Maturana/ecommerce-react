import React, { useMemo, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

import "./App.css";

import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";
import { setToken, getToken, removeToken } from "./api/token";
import {
  getProductsCart,
  addProductToCart,
  countProductsCart,
  clearCart,
  removeProductFromCart,
} from "./api/cart";

import Header from "./components/Header/Header";
import BrandsBar from "./components/BrandsBar/BrandsBar";
import HomeBody from "./components/HomeBody/HomeBody";
import ProductPage from "./components/ProductPage/ProductPage";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import MyProfile from "./components/MyProfile/MyProfile";
import CartPage from "./components/CartPage/CartPage";
import { getUserData } from "./api/user";

function App() {
  const [auth, setAuth] = useState(undefined);
  const [totalProducts, setTotalProducts] = useState(0);
  const [reloadUser, setReloadUser] = useState(false);
  const [reloadCart, setReloadCart] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUserData().then((res) => {
        setAuth({
          token,
          user: res.data.user,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProducts(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      user: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      clearCart();
      setAuth(null);
      window.location.href = "/";
    }
  };

  const data = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const addProductCart = (product) => {
    const token = getToken();
    if (token) {
      addProductToCart(product);
      setReloadCart(true);
    } else {
      toast.warning("You must be registered to add products to cart");
    }
  };

  const removeProductCart = (product) => {
    const token = getToken();
    if (token) {
      removeProductFromCart(product);
      setReloadCart(true);
    }
  };

  const cartData = useMemo(
    () => ({
      products: totalProducts,
      addProduct: (product) => addProductCart(product),
      getProducts: getProductsCart,
      removeProduct: (product) => removeProductCart(product),
      clearCart: () => clearCart(),
    }),
    [auth, totalProducts]
  );

  if (auth === undefined) {
    return null;
  }
  return (
    <AuthContext.Provider value={data}>
      <CartContext.Provider value={cartData}>
        <div className="App">
          <ToastContainer position="top-center" />
          <Header />
          <BrandsBar />
          <div className="container">
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/:brand" element={<Products brand={true} />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<HomeBody />} />
            </Routes>
          </div>
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
