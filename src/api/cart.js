import { toast } from "react-toastify";
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