import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ log }) => {
  {
    console.log("log: ", log);
  }
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
        {
          // Conditionally render login/logout
        }
        <NavLink
          activeClassName="current-tab"
          className="navbar-content"
          to="/login"
        >
          {log == true ? "login" : "logout"}
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
