import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BrandsBar.css";

import { getBrands } from "../../api/brands";

export default function BrandsBar() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrands().then((res) => {
      setBrands(res.data.brands);
      setLoading(false);
    });
  }, []);

  return (
    <div className="brands-bar">
        <ul className="brands-bar-list">
            {loading ? (
                null
            ) : (
                brands.map((brand) => {
                    return (
                            <Link to={`/${brand.name}`} key={brand.name} className="brand-link">{brand.name}</Link>
                    );
                }
                )
            )}
        </ul>
    </div>
    );
}