import React, { useState, useEffect, memo } from "react";

import "./CartPage.css";
import { getProduct } from "../../api/products";
import useCart from "../../hooks/useCart";
import AddressShipping from "../AddressShipping/AddressShipping";

export default function CartPage() {
  const { getProducts } = useCart();
  const products = getProducts();
  const [reloadCart, setReloadCart] = useState(false);

  return !products || products.length === 0 ? (
    <EmptyCart />
  ) : (
     
    <Cart products={products} reloadCart={reloadCart} setReloadCart={setReloadCart} />
  );
}

function EmptyCart() {
  return (
    <div className="cart-empty">
      <h2>Your cart is empty</h2>
      <p>You have no items in your cart.</p>
    </div>
  );
}

function Cart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const [productsData, setProductsData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const {removeProduct} = useCart();

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      let totalPriceTemp = 0;
      for await (const product of products) {
        const data = await getProduct(product);
        productsTemp.push(data);
        totalPriceTemp += data.data.product.price;
      }
      setProductsData(productsTemp);
      setTotalPrice(totalPriceTemp);
    })();
  }, [reloadCart, products]);

  const removeProductFromCart = (product) => {
    removeProduct(product);
    setReloadCart(true);
    console.log(product);
  };

  return (
    <div className="cart-page">
      <h2>Your cart</h2>
      <div className="cart-items">
        {productsData &&
          productsData.map((item) => (
            <div className="cart-item"  key={item.data.product.id}>
                <img
                  src={item.data.product.image}
                  alt={item.data.product.name}
                  className="item-img"
                />
                <div className="cart-item-info">
                  <h3 className="item-name">{item.data.product.name}</h3>
                  <p className="item-price">${item.data.product.price}</p>
                </div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX/AAD/////fX3/5+f/zMz/ZWX/Pj7/lpb/39//XFz/xsb/Ly//ODj/CQn/ra3/q6v/2Nj/8/P/YWH/jo7/+fn/gYH/6ur/9vb/hYX/0ND/pqb/T0//4+P/m5v/t7f/oaH/kZH/VVX/Jyf/Rkb/FBT/cHD/Hh7/trb/QUH/iYn/c3P/OTn/x8f/vr7/ExP/d3cUPOnCAAAFoklEQVR4nO3daXuqSBAFYBAV1wQUcQP3JUZN/v+/G2NuFmmqGlm6iXPO5xqm3itBaNqnDDOPeJ4zH1RyTXhyvVx6M7IfwgtmTaOIrCeNYRmEjXm7EN9HNoexdqF3nhbm+0j72dUrdO1docBLKg2dQn/ULRpoGD1Hn9A9FO+7pGlpE86VAA1jm+VvMYuwqghoGBM9QvdFmdDIcLXJIFR1jn6kp0X4plBoBBqEZ5VAY6BB2FMq7GgQFnc3GpfdSbmwWvjt2k26tnLhROmF5nJ7qly4UHBH+jtb5cK+WqBRe3hh6u98CCH8/wpX62XznizXkjuIkgnXh73ju3elce6za5KlEr6N0q0BBjbzOZZJuJqnXXTwzvRDdYmEb6nvIC85k59iiYQZHscvIVfvyiNcZVzArZdemO0jNM2w9MKntAf8F7/0wkzr09eOyi5Me7zvrB5eSHxfPJDw8T9DCO8NhGQgTB0I7w2EZCBMnccXKrtrsxpsrAoh9Pn/ThqL+AyXkoYCapNfvNCZ9Lf8+maPWlDp3bVMGnNg4p3WTnLg2mheTSz07WJ34xWV+ihuf1iM0Clmt6iKvMySCKtqX9Dnm664iCIInY7uLrOlJRMOX3W3mDGd6EJRVHjS3WHmhBLh373KfKXLCz3d/eWQKits6W4vhxxYoa27vRwyYIUD3e3lEF440t1eDuGFE93t5RBe6OhuL4eErNBUvB+viAS88O//IR5NXhjobjBzorfewrPFs+4OM+Y1upohCN2//ZW4FN5Bi0/A/kDx/uY80xR3gsSsYvjzv/oQvDvEbHWJXWsbh9SuljJndWjFrSjGryZ6jfE+tK85HOXHno7sQ7IHy+XI7lPrhTHHlFeu3j/btJ+qTvx2OnqN2vtMIP1tzMJyh97QtSYbWWXFv1b68t+EjYLPyidZYf30r1HSIV2Ft2r8/2Lzc/EK+NLOz2qmz1e+/Oze9CRLt/X4ZeAchevfp4ZHLfV/5OY6zn4nLW+uF9wxFQg7txcvf0m3crurljn527dN++yfSeHC6M9Xz9S1oRtdApsRb2AMox+pbHG/sCpauBZeFFCbfKfRb6ohddydH6l03zUKD8IlbEFUij9bol5AToVK7rG8aKH4G2vq993RU88098TJdxAq6RO6cGHMexCLqBQ3f1eJvp+FyhZzF1lmoUO844IQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYTwYYQx3RDzE2OEJ2KCx7xUQrGbM1E5EiqfiCksFaGSmteiQlgRRp1R86fESTrUPNAXoZIbYla0sD2OllNDb47RTnxqFN0mOmGJnfxW+ESrfmQe34KsrEQGJ9HzsXuRDtjpcsXPXZvdFI+J6+Mlm9ur0okafWUYu0nSYyoR7s6/ah1u0N3x9z/GmBuX2Nl7CStVCI3u5GuKmPu0ZivbYfBdyc/8a4dfc/aGM8k0TQVCw6iFLcv1q/MtNwHummbYClx/PNlKZ7n27OsxJ++ySiXCy2k1bU7riSbQXiqXdemsy6/Ko7xSkVBjIIQQQv3JQehudSPYrIU747uF5DNAOdIMZP3LhQvdCDbRG/o0QupJtRxZSPuXCx3+blNvVvschOarbgaTZXR4cCrhrMSnqTiEN43Qo4dt605beiVNJDTHuiFkosO+0wpNbjC2zrSTNJ9I6DFLsjpjyVtPKDStMhI30lvSO4Rmg19Y0ZF2K1nrCYWmU7ZHjGlCYGKhac2ZGe7qM4qujGcXmp4z0M36Tu0kvDDJQXh5VHTsMlxxdpWx/F4tnfASz2+FFZ3pzyxP+sB0k/8ASk/dhfkzmdkAAAAASUVORK5CYII="
                alt="delete"
                className="delete-item"
                onClick={() => removeProductFromCart(item.data.product.id)}
              />
            </div>
          ))}
          <p className="total-price">Total price: <b>${totalPrice}</b></p>
          <AddressShipping />
      </div>
    </div>
  );
}
