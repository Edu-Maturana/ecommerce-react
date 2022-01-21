import React,{useState} from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import environment from "../../config";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { payCart } from "../../api/cart";
import useCart from "../../hooks/useCart";

import "./Payment.css";

const stripePromise = loadStripe(environment.stripePublicKey);

export default function Payment(props) {
  const { totalPrice } = props;

  return (
    <div className="payment">
      <h2>Payment</h2>
      <div className="data-stripe">
        <Elements stripe={stripePromise}>
          <PaymentForm totalPrice={totalPrice} />
        </Elements>
      </div>
    </div>
  );
}

function PaymentForm(props) {
  const { totalPrice } = props;
  const { getProducts } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const { auth } = useAuth();
  const { address } = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  const products = getProducts();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    console.log(result);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      const response = await payCart(
        result.token,
        products,
        auth.user.id,
        address,
        totalPrice
      );
      if (response.error) {
        toast.error(response.error.message);
      } else {
        toast.success("Payment successful");
        setLoading(false);
      }
    }
  };
  return address ? (
    <form onSubmit={handleSubmit}>
      <CardElement className="card-element" />
      <button type="submit" className="submit-pay" disabled={!stripe}>
        {
          loading ? <img className="loading" src={environment.loading} alt="loading" /> : "Pay"} 
      </button>
    </form>
  ) : (
    <p>Please add an address</p>
  );
}
