import React, { useState } from "react";
import { register } from "../api/api";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import "./Login.css";

//TODO refactor with login
const Register = ({ setLog }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [confpassword, setConfpassword] = useState("");

  const validData = () => {
    return (
      userName &&
      password &&
      password === confpassword &&
      userName.length >= 4 &&
      password.length >= 4
    );
  };

  const submit = async () => {
    if (validData()) {
      let res = await register(userName, password);
      console.log("res: ", res);
      if (res) {
        Cookies.set("token", res.id);
        Cookies.set("user_id", res.id);
        setLog(true);
        setRedirect(true);
      }
    }
  };

  return (
    <div>
      {redirect ? <Redirect to={"profile"} /> : ""}
      <div className="search-box">
        <label htmlFor="usernameField">username</label>
        <input
          className="login-input"
          id="usernameField"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <label htmlFor="passwordField">password</label>
        <input
          className="login-input"
          id="passwordField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <label htmlFor="confPassword">Confirm password</label>
        <input
          className="login-input"
          id="confPassword"
          value={confpassword}
          onChange={(e) => setConfpassword(e.target.value)}
          type="password"
        />
        <button
          className="login-button"
          onClick={() => submit()} // some sort of back end api request
        >
          Register
        </button>
        <div>
          Already registered? <a href="/login"> Sign in here!</a>
        </div>
      </div>
      {confpassword && confpassword !== password
        ? "passwords do not match"
        : ""}
    </div>
  );
};

export default Register;
