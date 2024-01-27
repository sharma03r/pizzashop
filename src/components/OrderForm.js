// components/OrderForm.js
import React, { useState } from "react";
import "./OrderForm.css";

const OrderForm = ({ onSubmit, maxOrdersReached }) => {
  const [order, setOrder] = useState({
    type: "",
    size: "",
    base: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(order);
    setOrder({ type: "", size: "", base: "" });
  };

  return (
    <div className="order-form">
      <h2>Place Your Pizza Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={order.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        <div>
          <label htmlFor="size">Size:</label>
          <select
            id="size"
            name="size"
            value={order.size}
            onChange={handleChange}
          >
            <option value="">Select Size</option>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
        </div>
        <div>
          <label htmlFor="base">Base:</label>
          <select
            id="base"
            name="base"
            value={order.base}
            onChange={handleChange}
          >
            <option value="">Select Base</option>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </div>
        <button type="submit" disabled={maxOrdersReached}>
          Place Order
        </button>
      </form>
      {maxOrdersReached && (
        <p className="max-orders-msg">Not taking any order for now</p>
      )}
    </div>
  );
};

export default OrderForm;
