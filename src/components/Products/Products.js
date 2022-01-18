import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";

import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);
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
            <button className="add-to-cart">Add to cart</button>
          </Link>
        ))
      )}
    </div>
  );
}
