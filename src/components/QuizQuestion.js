import React, { useState } from "react";
import "../styles.css";

let QuizQuestion = ({ answers, onSelect, questionNum, question }) => {
  let [selection, setSelection] = useState(-1);

  const handleSelect = (i) => {
    setSelection(i);
    onSelect(i, questionNum);
  };

  return (
    <div>
      <h4>{question}</h4>
      {answers.map((answer, index) => {
        return (
          <div
            onClick={() => handleSelect(index)}
            className={`quiz-box ${selection === index ? "" : "unselected"}`}
            key={index}
          >
            {answer.description}
          </div>
        );
      })}
    </div>
  );
};

export default QuizQuestion;
