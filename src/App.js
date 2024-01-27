// App.js
import React, { useState } from "react";
import OrderForm from "./components/OrderForm";
import MainDisplay from "./components/MainDisplay";
import Navbar from "./components/NavBar"; // Import the Navbar component
import "./App.css";

function App() {
  const [ordersInProgress, setOrdersInProgress] = useState([]);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [maxOrdersReached, setMaxOrdersReached] = useState(false);

  const handleOrderSubmit = (newOrder) => {
    if (ordersInProgress.length >= 10) {
      setMaxOrdersReached(true);
      return;
    }

    // Initialize stage timestamp for "Order Placed" stage
    const orderWithTimestamp = {
      ...newOrder,
      id: Date.now(),
      stage: "Order Placed",
      timestamp: Date.now(),
    };
    setOrdersInProgress([...ordersInProgress, orderWithTimestamp]);
  };

  const handleStageChange = (orderId, newStage) => {
    const updatedOrders = ordersInProgress.map((order) => {
      if (order.id === orderId) {
        // Update timestamp when order enters a new stage
        return { ...order, stage: newStage, timestamp: Date.now() };
      }
      return order;
    });
    setOrdersInProgress(updatedOrders);
    if (newStage === "Order Picked") {
      setTotalDeliveries(totalDeliveries + 1);
    }
  };

  return (
    <div className="App">
      <Navbar /> {/* Include the Navbar component */}
      <OrderForm
        onSubmit={handleOrderSubmit}
        maxOrdersReached={maxOrdersReached}
      />
      <MainDisplay
        ordersInProgress={ordersInProgress}
        totalDeliveries={totalDeliveries}
        onStageChange={handleStageChange}
      />
    </div>
  );
}

export default App;
