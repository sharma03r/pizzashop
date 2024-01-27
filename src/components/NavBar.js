// components/Navbar.js
import React from "react";
import "./NavBar.css";
import logo from "../images/slice.jpg";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Slices Logo" />
        <h1>Slices</h1>
      </div>
    </nav>
  );
};

export default Navbar;
