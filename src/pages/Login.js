import React, { useState } from "react";
import { login, checkLogin, logout } from "../api/api";

const Login = ({ log, setLog }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
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
          onClick={() => login(userName, password)} // some sort of back end api request
          value="login"
        />
        <input
          type="submit"
          onClick={() => checkLogin(1)} // some sort of back end api request
          value="bad"
        />
        <input
          type="submit"
          onClick={() => logout()} // some sort of back end api request
          value="logout"
        />
      </div>

      <div>
        {" "}
        Not registered? <a href="/register"> Sign up here!</a>
      </div>
    </div>
  );
};

export default Login;
