import React, { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      login:
      {console.log(userName)}
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
        onClick={() => console.log(userName, password)}
        value="login"
      />
    </div>
  );
};

export default Login;
