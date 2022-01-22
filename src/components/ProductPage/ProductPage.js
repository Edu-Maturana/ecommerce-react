import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

import "./ProductPage.css";
import { getProduct } from "../../api/products";
import useCart from "../../hooks/useCart";

export default function ProductPage() {
  
  const id = window.location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { addProduct } = useCart();

  useEffect(() => {
    getProduct(id).then((res) => {
      setProduct(res.data.product);
      setLoading(false);
    });
  }, []);

  return (
    <div className="product-page">
      {loading ? (
        <h4>Loading product...</h4>
      ) : (
        <>
          <div className="product-info">
            <div className="image-section">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="data-section">
              <p className="route">
                <Link to="/">Products / </Link>
                {product.name}
              </p>
              <h4 className="product-name">{product.name}</h4>
              <h6 className="product-brand">{product.brand} </h6>
              <p className="product-description">{product.description} </p>
              <p className="product-price">${product.price} USD</p>
              <button className="buy" onClick={() => addProduct(product.id)}>Add to cart</button>
            </div>
          </div>
          <div className="video-wrapper">
            <h3>Product video</h3>
            <ReactPlayer
              className="product-video"
              width="100%"
              height="100%"
              url={product.video}
              controls
            />
          </div>
        </>
      )}
    </div>
  );
}
