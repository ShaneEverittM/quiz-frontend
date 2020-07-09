import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink
        exact
        activeClassName="current-tab"
        className="navbar-content"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        activeClassName="current-tab"
        className="navbar-content"
        to="/quiz/new"
      >
        Create Quiz
      </NavLink>
      <NavLink
        activeClassName="current-tab"
        className="navbar-content"
        to="/placeholder"
      >
        navbar-option#2
      </NavLink>
      <NavLink
        activeClassName="current-tab"
        className="navbar-content"
        to="/placeholder"
      >
        navbar-option#3
      </NavLink>
    </div>
  );
};

export default Navbar;
