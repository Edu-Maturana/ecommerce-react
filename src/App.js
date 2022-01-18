import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import BrandsBar from "./components/BrandsBar/BrandsBar";
import HomeBody from "./components/HomeBody/HomeBody";
import ProductPage from "./components/ProductPage/ProductPage";

function App() {
  return (
    <div className="App">
      <Header />
      <BrandsBar />
      <Routes>
        <Route path="/products/:id" element={<ProductPage/>} />
        <Route path="/" element={<HomeBody/>} />
      </Routes>
    </div>
  );
}

export default App;
