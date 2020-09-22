import React, { useState } from "react";
import { register } from "../api/api";

const Register = ({ log, setLog }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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

  const submit = () => {
    if (validData()) register(userName, password);
  };
  return (
    <div>
      <div>
        login:
        <label htmlFor="usernameField">username</label>
        <input
          id="usernameField"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <label htmlFor="passwordField">password</label>
        <input
          id="passwordField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <label htmlFor="confPassword">Confirm password</label>
        <input
          id="confPassword"
          value={confpassword}
          onChange={(e) => setConfpassword(e.target.value)}
          type="password"
        />
        <input
          type="submit"
          onClick={() => submit()} // some sort of back end api request
          value="register"
        />
      </div>
      {confpassword && confpassword !== password
        ? "passwords do not match"
        : ""}
      <div>
        Already registered? <a href="/login"> Sign in here!</a>
      </div>
    </div>
  );
};

export default Register;
