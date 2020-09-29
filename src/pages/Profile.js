import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import { logout, checkLogin, getUserQuizzes } from "../api/api";
import CategoryPreview from "../components/CategoryPreview";

import "./Profile.css";
import "../styles.css";
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
    <div className="profile-container">
      {redirect ? <Redirect to={"login"} /> : ""}
      <button
        className="logout-button"
        type="submit"
        onClick={() => handleLogout()} // some sort of back end api request
      >
        Logout
      </button>

      {
        <CategoryPreview
          quizList={quizzes}
          categoryName="Your Quizzes"
          admin={true}
        />
      }
    </div>
  );
};

export default Profile;
