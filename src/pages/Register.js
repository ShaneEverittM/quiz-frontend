import React, { useState } from "react";
import { register } from "../api/api";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import "./Login.css";

//TODO input verification
const Register = ({ setLog }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [confpassword, setConfpassword] = useState("");
  const [usernameFeedback, setUsernameFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [buttonText, setButtonText] = useState("Register");
  const [showPass, setShowPass] = useState(false);
  const validData = () => {
    return (
      validateEmail(userName) &&
      password &&
      password === confpassword &&
      userName.length >= 4 &&
      password.length >= 4
    );
  };
  const validateEmail = (email) => {
    // shamelessly stolen from stackoverflow
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };
  const submit = async () => {
    if (validData()) {
      setButtonText("loading...");
      let res = await register(userName.toLowerCase(), password.toLowerCase());
      if (res.data && res.data.length !== 0) {
        Cookies.set("token", res.data);
        setLog(true);
        setRedirect(true);
      } else {
        setButtonText("Register");
        setUsernameFeedback("Something went Wrong, please try again later");
      }
    } else setUsernameFeedback("Error in email");
  };
  const updateUserName = (input) => {
    setUserName(input);
    if (input.length < 4)
      setUsernameFeedback("Username must be atleast 4 characters Long\n");
    else setUsernameFeedback("");
  };
  const updatePassword = (input) => {
    setPassword(input);
    if (input.length < 4)
      setPasswordFeedback("Password must be atleast 4 characters Long\n");
    else setPasswordFeedback("");
  };
  return (
    <div>
      {redirect ? <Redirect to={"profile"} /> : ""}
      <div className="search-box">
        <label htmlFor="usernameField">email</label>
        <input
          className="login-input"
          placeholder="name@example.domain"
          id="usernameField"
          value={userName}
          onChange={(e) => {
            updateUserName(e.target.value);
          }}
          type="email"
        />
        <label htmlFor="passwordField">password</label>
        <input
          className="login-input"
          id="passwordField"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
          type={showPass ? "text" : "password"}
        />
        <label htmlFor="confPassword">Confirm password</label>
        <input
          className="login-input"
          id="confPassword"
          value={confpassword}
          onChange={(e) => setConfpassword(e.target.value)}
          type={showPass ? "text" : "password"}
        />
        <button className="login-input" onClick={() => setShowPass(!showPass)}>
          {showPass ? "hide" : "show"} password
        </button>
        <button
          className="login-button"
          onClick={() => submit()} // some sort of back end api request
        >
          {buttonText}
        </button>
        <div>{usernameFeedback}</div>
        <div>{passwordFeedback}</div>
        {confpassword && confpassword !== password
          ? "Passwords do not match"
          : ""}
        <div>
          Already registered? <a href="/login"> Sign in here!</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
