import React from "react";
import "../styles.css";
const NewQuestion = ({ selectedItem, onSelect, questionNum, text }) => {
  return (
    <div>
      <h4
        className={`${questionNum === selectedItem ? "selected" : ""}`}
        onClick={() => onSelect(questionNum)}
      >
        #{questionNum + 1}: {text}
      </h4>
    </div>
  );
};

export default NewQuestion;
