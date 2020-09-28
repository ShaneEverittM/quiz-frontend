import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import { logout, checkLogin, getUserQuizzes } from "../api/api";
import CategoryPreview from "../components/CategoryPreview";

const Profile = ({ setLog, log }) => {
  //on mount check for user quizzes
  const [redirect, setRedirect] = useState(!log);
  const [quizzes, setQuizzes] = useState([]);

  const handleLogout = async () => {
    await logout();
    setLog(false);
    Cookies.remove("token");
    setRedirect(true);
  };
  useEffect(() => {
    //TODO make it stop crashing
    async function fetchData() {
      try {
        let { data } = await getUserQuizzes(Cookies.get("token"));
        if (data) setQuizzes(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

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
      {<CategoryPreview quizList={quizzes} categoryName="Your Quizzes" />}
    </div>
  );
};

export default Profile;
