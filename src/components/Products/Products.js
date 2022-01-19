import React, { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { getProducts } from "../../api/products";

import "./Products.css";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  let brand = "";
  if (props.brand) {
    brand = pathname.split("/")[1];
  }

  useEffect(() => {
    getProducts(props.limit, brand).then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [props.limit, brand]);

  return (
    <div className="products">
      {loading ? (
        <h4>Loading products...</h4>
      ) : (
        products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="product"
          >
            <img src={product.image} alt={product.name} />
            <h4 className="name">{product.name}</h4>
            <p className="price">${product.price} USD</p>
          </Link>
        ))
      )}
    </div>
  );
}

export default memo(Products);
