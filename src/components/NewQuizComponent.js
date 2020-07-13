import React, { useState } from "react";
import "./NewQuizComponent.css";

const NewQuizComponent = ({
  text,
  handleAdd,
  type,
  desc,
  head,
  buttonText,
}) => {
  let [description, setDescription] = useState(desc);
  let [resultHeader, setHeader] = useState(head);

  const submit = () => {
    if ((description && description.trimStart()) || resultHeader) {
      setDescription("");
      setHeader("");
      handleAdd(description, resultHeader);
    }
  };

  const enterToSubmit = (e) => {
    //this may not work on every browser/keyboard combo
    if (e.key.toLowerCase() === "enter") submit();
  };
  const resultInput = () => {
    return (
      <div className="input-container">
        <label htmlFor="header">Title</label>
        <input
          type="text"
          value={resultHeader ? resultHeader : ""}
          onChange={(e) => setHeader(e.target.value)}
          onKeyPress={(e) => {
            enterToSubmit(e);
          }}
        />
      </div>
    );
  };
  const standardInput = () => {
    return (
      <div className="input-container">
        <label htmlFor="input">{text}</label>
        <textarea
          onKeyPress={(e) => {
            enterToSubmit(e);
          }}
          id="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="add-button"
          onClick={() => {
            submit();
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  };
  return (
    <div>
      {type === "results" ? resultInput() : ""}
      {standardInput()}
    </div>
  );
};

export default NewQuizComponent;
