import React, { useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import { logout, checkLogin } from "../api/api";
import CategoryPreview from "../components/CategoryPreview";

const Profile = ({ setLog, log }) => {
  //on mount check for user quizzes
  const [redirect, setRedirect] = useState(!log);

  const handleLogout = async () => {
    await logout();
    setLog(false);
    Cookies.remove("token");
    setRedirect(true);
  };

  return (
    <div>
      {redirect ? <Redirect to={"login"} /> : ""}
      <input
        type="submit"
        onClick={() => handleLogout()} // some sort of back end api request
        value="logout"
      />
      <input
        type="submit"
        onClick={() => checkLogin(Cookies.get("token") || 0)} // some sort of back end api request
        value="bad"
      />
      {/* api request for user's quizzes
          <CategoryPreview />
      */}
    </div>
  );
};

export default Profile;
