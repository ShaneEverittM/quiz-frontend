import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import { logout, getUserQuizzes, deleteQuiz } from "../api/api";
import CategoryPreview from "../components/CategoryPreview";

import "./Profile.css";
import "../styles.css";

class Profile extends React.Component {
  state = {
    redirect: false,
    quizzes: [],
    user_id: Cookies.get("token"),
  };
  async componentDidMount() {
    try {
      let { data } = await getUserQuizzes(this.state.user_id);
      if (data) this.setState({ quizzes: data });
      console.log("data: ", data);
    } catch (e) {
      console.log(e);
    }
  }

  handleLogout = async () => {
    await logout();
    this.props.setLog(false);
    Cookies.remove("token");
    this.setState({ redirect: true });
  };

  handleDelete = (id, pos) => {
    if (
      window.confirm("Are you sure you want to delete?\nThis cannot be undone")
    ) {
      deleteQuiz(id, this.state.user_id);
      let quizzes = this.state.quizzes;
      quizzes.splice(pos, 1);
      console.log("_: ", quizzes);
      this.setState(quizzes);
    }
  };

  deleteButton = (id, pos) => {
    return (
      <span
        role="img"
        aria-label="trash"
        className="previewIcon"
        onClick={() => this.handleDelete(id, pos)}
      >
        🗑️
      </span>
    );
  };

  render() {
    return (
      <div className="profile-container">
        {this.state.redirect ? <Redirect to={"login"} /> : ""}
        <button
          className="logout-button"
          type="submit"
          onClick={() => this.handleLogout()}
        >
          Logout
        </button>

        {
          <CategoryPreview
            quizList={this.state.quizzes}
            categoryName="Your Quizzes"
            user={this.state.user_id}
            deleteButton={this.deleteButton}
          />
        }
      </div>
    );
  }
}

export default Profile;
