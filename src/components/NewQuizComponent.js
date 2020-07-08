import React, { useState } from "react";

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
    console.log("description: ", description);
    if ((description && description.trimStart()) || resultHeader) {
      setDescription("");
      setHeader("");
      handleAdd(description, resultHeader);
    }
  };

  const resultInput = () => {
    return (
      <div>
        <label htmlFor="header">Title</label>
        <input
          type="text"
          value={resultHeader ? resultHeader : ""}
          onChange={(e) => setHeader(e.target.value)}
        />
      </div>
    );
  };
  const standardInput = () => {
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
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
