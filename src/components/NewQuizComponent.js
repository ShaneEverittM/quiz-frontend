import React, { useState } from "react";

const NewQuizComponent = ({ text, questionNum, handleAdd }) => {
  let [newText, setNewText] = useState("");
  const submit = () => {
    setNewText(newText);
    if (newText.trimStart()) {
      setNewText("");
      handleAdd(newText, questionNum);
    }
  };
  return (
    <div>
      <label htmlFor="question">{text}</label>
      <br />
      <textarea
        onKeyPress={(e) => {
          //this may not work on every browser/keyboard combo
          if (e.key.toLowerCase() === "enter") submit();
        }}
        id="question"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
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

export default NewQuizComponent;
