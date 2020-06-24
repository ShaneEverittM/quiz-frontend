import React, { useState } from "react";
import "../styles.css";

let Answer = ({ answers, onSelect, questionNum }) => {
  let [selection, setSelection] = useState(-1);

  const handleSelect = (i) => {
    setSelection(i);
    onSelect(i, questionNum);
  };

  return (
    <div>
      {console.log(answers)}
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

export default Answer;
