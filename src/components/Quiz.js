import React from "react";
import "./Quiz.css";

const Quiz = ({ title, description }) => {
  return (
    <div className="quiz-box">
      <div className="quiz-box-items">
        <h3>{title}</h3>
      </div>
      <div className="quiz-box-items">
        <p>{description}</p>{" "}
      </div>
    </div>
  );
};

export default Quiz;
