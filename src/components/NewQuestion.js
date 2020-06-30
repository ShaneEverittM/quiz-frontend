import React from "react";
import "../styles.css";
const NewQuestion = ({ selectedQuestion, select, questionNum, question }) => {
  return (
    <div>
      <h4
        className={`${questionNum === selectedQuestion ? "selected" : ""}`}
        onClick={() => select(questionNum)}
      >
        {question}
      </h4>
    </div>
  );
};

export default NewQuestion;
