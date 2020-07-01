import React, { useState } from "react";

const QuizComponent = ({ text, questionNum, handleAdd }) => {
  let [questionText, setQuestionText] = useState("");
  const submit = () => {
    setQuestionText("");
    handleAdd(questionText, questionNum);
  };
  return (
    <div>
      <label htmlFor="question">{text}</label>
      <br />
      <input
        onKeyPress={(e) => {
          //this may noy work on every browser/keyboard combo
          if (e.key.toLowerCase() === "enter") submit();
        }}
        type="text"
        id="question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <button
        onClick={() => {
          submit();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default QuizComponent;
