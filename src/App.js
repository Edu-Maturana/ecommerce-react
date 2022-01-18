import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";


import Header from "./components/Header/Header";
import BrandsBar from "./components/BrandsBar/BrandsBar";
import HomeBody from "./components/HomeBody/HomeBody";
import ProductPage from "./components/ProductPage/ProductPage";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <BrandsBar />
      <div className="container">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/products" element={<Products limit={20} />} />
        <Route path="/:brand" element={<Products brand={true}/>} />
        <Route path="/products/:id" element={<ProductPage/>} />
        <Route path="/" element={<HomeBody/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
