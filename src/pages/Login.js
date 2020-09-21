import React, { useState, useEffect } from "react";

const Login = ({ log, setLog }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
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
        onClick={() => setLog(!log)} // some sort of back end api request
        value="login"
      />
    </div>
  );
};

export default Login;
