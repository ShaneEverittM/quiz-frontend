import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login, checkLogin, logout } from "../api/api";
import Cookies from "js-cookie";

const Login = ({ setLog, log }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(log);
  const [loginFail, setLoginFail] = useState(false);

  const handleLogin = async (name, pass) => {
    let res = await login(name, pass);
    if (res) {
      setLog(true);
      Cookies.set("token", res.id);
      Cookies.set("user_id", res.id);
      setRedirect(true);
    } else {
      setLoginFail(true);
    }
  };
  const handleLogout = async () => {
    await logout();
    setLog(false);
    Cookies.remove("token");
  };
  return (
    <div>
      {redirect ? <Redirect to={"profile"} /> : ""}

      <div style={{ display: "flex", flexDirection: "column" }}>
        login:
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <input
          type="submit"
          onClick={() => handleLogin(userName, password)} // some sort of back end api request
          value="login"
        />
        <input
          type="submit"
          onClick={() => checkLogin(Cookies.get("token") || 0)} // some sort of back end api request
          value="bad"
        />
        {/* <input
          type="submit"
          onClick={() => handleLogout()} // some sort of back end api request
          value="logout"
        /> */}
      </div>
      <>{loginFail ? "invalid username or password" : ""}</>

      <div>
        {" "}
        Not registered? <a href="/register"> Sign up here!</a>
      </div>
    </div>
  );
};

export default Login;
