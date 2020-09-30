import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ log }) => {
  return (
    <div className="header">
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
          to="/browse"
        >
          Browse
        </NavLink>
        <NavLink
          activeClassName="current-tab"
          className="navbar-content"
          to="/search"
        >
          Search
        </NavLink>
        {log == "false" || !log ? ( // I hate javascript
          <NavLink
            activeClassName="current-tab"
            className="navbar-content"
            to="/login"
          >
            Login
          </NavLink>
        ) : (
          <NavLink
            activeClassName="current-tab"
            className="navbar-content"
            to="/profile"
          >
            Your profile
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
