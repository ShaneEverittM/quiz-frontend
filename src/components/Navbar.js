import React from "react";
import { NavLink } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink
        exact
        activeClassName="current-tab"
        className="navbar-content"
        to="/"
      >
        This is a navbar
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
