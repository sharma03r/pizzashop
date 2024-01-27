// components/MainDisplay.js
import React, { useState, useEffect } from "react";
import "./MainDisplay.css";

const MainDisplay = ({ ordersInProgress, totalDeliveries, onStageChange }) => {
  const [stageTimestamps, setStageTimestamps] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate time difference for each order in each stage except "Order Picked"
      const updatedTimestamps = {};
      ordersInProgress.forEach((order) => {
        if (order.stage !== "Order Picked") {
          updatedTimestamps[order.id] = Date.now() - stageTimestamps[order.id];
        }
      });
      setStageTimestamps(updatedTimestamps);
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [ordersInProgress]);

  const handleStageChange = (orderId, newStage) => {
    const updatedOrders = ordersInProgress.map((order) => {
      if (order.id === orderId) {
        // Update timestamp when order enters a new stage
        const updatedStageTimestamps = {
          ...stageTimestamps,
          [order.id]: Date.now(),
        };
        setStageTimestamps(updatedStageTimestamps);
        return { ...order, stage: newStage };
      }
      return order;
    });
    onStageChange(orderId, newStage);
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="main-display">
      <h2>Main Display</h2>
      <p>Total Pizza Delivered Today: {totalDeliveries}</p>
      <div className="order-columns">
        {["Order Placed", "Order in Making", "Order Ready", "Order Picked"].map(
          (stage) => (
            <div key={stage} className="column">
              <h3>{stage}</h3>
              {ordersInProgress
                .filter((order) => order.stage === stage)
                .map((order) => (
                  <div
                    key={order.id}
                    className={`order-card ${
                      stage !== "Order Picked" &&
                      stageTimestamps[order.id] > 180000 // 3 minutes in milliseconds
                        ? "red"
                        : ""
                    }`}
                  >
                    <p>Order ID: {order.id}</p>
                    <p>Type: {order.type}</p>
                    <p>Size: {order.size}</p>
                    <p>Base: {order.base}</p>
                    {stage !== "Order Picked" && (
                      <p>
                        Time in {stage}:{" "}
                        {formatTime(stageTimestamps[order.id] || 0)}
                      </p>
                    )}
                    <button
                      onClick={() =>
                        handleStageChange(order.id, getNextStage(stage))
                      }
                    >
                      Next
                    </button>
                    {stage !== "Order Picked" && (
                      <button
                        onClick={() =>
                          handleStageChange(order.id, "Order Placed")
                        }
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

const getNextStage = (currentStage) => {
  switch (currentStage) {
    case "Order Placed":
      return "Order in Making";
    case "Order in Making":
      return "Order Ready";
    case "Order Ready":
      return "Order Picked";
    default:
      return currentStage;
  }
};

export default MainDisplay;
