import React, {useMemo, useEffect,useState} from "react";
import { Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./App.css";

import AuthContext from "./context/AuthContext";
import {setToken, getToken, removeToken} from "./api/token"

import Header from "./components/Header/Header";
import BrandsBar from "./components/BrandsBar/BrandsBar";
import HomeBody from "./components/HomeBody/HomeBody";
import ProductPage from "./components/ProductPage/ProductPage";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        user: jwtDecode(token),
      })
    } else {
      setAuth(null)
    }
    setReloadUser(false)
  }, [reloadUser])

  const login  = (token) => {
    setToken(token);
    setAuth({
      token,
      user : jwtDecode(token).id 
    })
  };

  const logout = () => {
    if(auth) {
      removeToken();
      setAuth(null);
      window.location.href = "/";
    }
  };

  const data = useMemo(() => (
    {
      auth,
      login,
      logout,
      setReloadUser,
    }
  ), [auth]);

  if (auth === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={data}>
      <div className="App">
        <Header />
        <BrandsBar />
        <div className="container">
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/products" element={<Products limit={20} />} />
            <Route path="/:brand" element={<Products brand={true} />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/" element={<HomeBody />} />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
