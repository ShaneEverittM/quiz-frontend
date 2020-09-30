import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../api/api";
import Cookies from "js-cookie";

import "./Login.css";

const Login = ({ setLog, log }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(log);
  const [loginFail, setLoginFail] = useState(false);
  const [buttonText, setButtonText] = useState("Login");

  const handleLogin = async (name, pass) => {
    setButtonText("loading...");
    let res = await login(name.toLowerCase(), pass.toLowerCase());
    if (res) {
      setLog(true);
      Cookies.set("token", res.id);
      Cookies.set("user_id", res.id);
      setRedirect(true);
    } else {
      setButtonText("Login");
      setLoginFail(true);
    }
  };

  return (
    <div>
      {redirect ? <Redirect to={"profile"} /> : ""}

      <div className="search-box">
        login:
        <input
          className="login-input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button
          className="login-button"
          onClick={() => handleLogin(userName, password)} // some sort of back end api request
        >
          {buttonText}
        </button>
        <div>
          {" "}
          Not registered? <a href="/register"> Sign up here!</a>
        </div>
        {loginFail ? "invalid username or password" : ""}
      </div>
    </div>
  );
};

export default Login;
