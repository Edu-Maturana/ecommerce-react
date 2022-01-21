import { toast } from "react-toastify";
import axios from "axios";
import environment from "../config";

export function getProductsCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  } else {
    const cartArray = cart.split(",");
    return cartArray;
  }
}

export function addProductToCart(product) {
  const cart = getProductsCart();

  if (!cart) {
    localStorage.setItem("cart", product);
    toast.success("Product added to cart");
  } else {
    const ProductFound = cart.find((item) => item === product);
    if (ProductFound) {
      toast.warning("Product already added to cart");
    } else {
      cart.push(product);
      localStorage.setItem("cart", cart);
      toast.success("Product added to cart");
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return cart.length;
  }
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function removeProductFromCart(product) {
  const cart = getProductsCart();
  const newCart = cart.filter((item) => item !== product);
  localStorage.setItem("cart", newCart);

  if (newCart.length === 0) {
    localStorage.removeItem("cart");
  }
}

export function payCart(token, products, userId, address, totalPrice) {
  try {
    const url = `${environment.apiUrl}orders/payment`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    
    const data = {
      token,
      products,
      userId,
      addressShipping: address,
      total: totalPrice,
    };
    const response = axios.post(url, data, config);
    return response;
  } catch (error) {
    console.log(error);
  }
}
