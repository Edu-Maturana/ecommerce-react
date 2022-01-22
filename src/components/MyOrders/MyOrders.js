import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";

import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => {
      const { orders } = res.data;
      setOrders(orders);
    });
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      <div className="orders">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="order" key={order.id}>
              <b>Order ID: {order.id}</b>
              <p>Date: {order.createdAt}</p>
              <p>
                Total: <b>${order.total}</b>
              </p>
            </div>
          ))
        ) : (
          <p>You have no orders</p>
        )}
      </div>
    </div>
  );
}
