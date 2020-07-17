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
      <h4 style={{ textAlign: "center  " }}>{question}</h4>
      <div style={{ display: "flex" }}>
        {answers.map((answer, index) => {
          return (
            <div
              onClick={() => handleSelect(index)}
              className={`quiz-box shadow ${
                selection === index ? "" : "unselected"
              }`}
              key={index}
            >
              {answer.description}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
