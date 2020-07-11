import React, { useState } from "react";
//TODO style
const NewQuizTitle = ({ updateName }) => {
  let [headerObj, setHeader] = useState({ name: "", description: "" });
  let [editMode, toggleEditMode] = useState(false);

  const renderQuizName = () => {
    return (
      <div>
        <h2>{headerObj.name ? headerObj.name : "Double Click to Edit"}</h2>
        <p>{headerObj.description}</p>
      </div>
    );
  };

  const renderEdit = () => {
    return (
      <div>
        <textarea
          id="quizName"
          value={headerObj.name}
          onChange={(e) =>
            setHeader({
              name: e.target.value,
              description: headerObj.description,
            })
          }
        />
        <br />
        <textarea
          id="quizDesc"
          value={headerObj.description}
          onChange={(e) =>
            setHeader({
              name: headerObj.name,
              description: e.target.value,
            })
          }
        />
        <button
          onClick={() => {
            toggleEditMode(false);
            updateName(headerObj);
            console.log("headerObj: ", headerObj);
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
