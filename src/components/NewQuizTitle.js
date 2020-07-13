import React, { useState, useEffect } from "react";
import "./NewQuizTitle.css";
//TODO style
const NewQuizTitle = ({ quizHeader, updateName }) => {
  let [headerObj, setHeader] = useState(quizHeader);
  let [editMode, toggleEditMode] = useState(false);

  useEffect(() => {
    setHeader(quizHeader);
  }, [quizHeader]);

  const enterToSubmit = (e) => {
    //this may not work on every browser/keyboard combo
    if (e.key.toLowerCase() === "enter") submit();
  };
  const renderQuizName = () => {
    return (
      <div className="quiz-title-container">
        <h2>{headerObj.name ? headerObj.name : "Double Click to Edit"}</h2>
        <p>{headerObj.description}</p>
      </div>
    );
  };
  const submit = () => {
    toggleEditMode(false);
    updateName(headerObj);
  };
  const renderEdit = () => {
    return (
      <div>
        <textarea
          className="title-input"
          id="quizName"
          placeholder="title"
          value={headerObj.name}
          onChange={(e) =>
            setHeader({
              name: e.target.value,
              description: headerObj.description,
            })
          }
          onKeyPress={(e) => {
            enterToSubmit(e);
          }}
        />
        <textarea
          className="title-input"
          placeholder="description"
          id="quizDesc"
          value={headerObj.description}
          onChange={(e) =>
            setHeader({
              name: headerObj.name,
              description: e.target.value,
            })
          }
          onKeyPress={(e) => {
            enterToSubmit(e);
          }}
        />
        <button
          className="update-btn"
          onClick={() => {
            submit();
          }}
        >
          &#10003;
          {/* checkmark */}
        </button>
      </div>
    );
  };

  return (
    <div className="quiz-title">
      <div>
        <div
          onDoubleClick={() => {
            toggleEditMode(!editMode);
          }}
        >
          {editMode ? renderEdit() : renderQuizName()}
        </div>
      </div>
    </div>
  );
};

export default NewQuizTitle;
