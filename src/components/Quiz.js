import React from "react";
import "./Quiz.css";

const Quiz = ({ title, description }) => {
  return (
    <div className="quiz-box">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Quiz;
