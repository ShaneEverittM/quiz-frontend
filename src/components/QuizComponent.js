import React, { useState } from "react";
import NewQuizComponent from "./NewQuizComponent";
import "./QuizComponent.css";

const QuizComponent = ({
  handleDelete,
  selectedItem,
  onSelect,
  leadsTo,
  pos,
  text,
  handleEdit,
  type,
}) => {
  let [editMode, setEditMode] = useState(false);
  const onEditSubmit = (desc, qNum, header) => {
    handleEdit(desc, qNum, header);
    setEditMode(!editMode);
  };
  const edit = () => {
    return (
      <div>
        <NewQuizComponent
          text="Edit"
          handleAdd={onEditSubmit}
          type={type}
          desc={text.description}
          head={text.header}
          buttonText="Update"
        />
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div className="inline">
        <span
          role="img"
          aria-label="trash"
          className="container-item icon"
          onClick={() => handleDelete(pos)}
        >
          🗑️
        </span>
        <span
          role="img"
          aria-label="pencil"
          className="container-item icon"
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>
    );
  };
  const display = () => {
    let letter = "Q";
    if (type === "activeAnswers") letter = "A";
    else if (type === "results") letter = "R";
    let selected = pos === selectedItem;
    console.log("type: ", type);
    return (
      <div>
        <div className="quiz-component-container">
          <div
            className={`selectable ${selected ? "selected " : ""}`}
            onClick={() => onSelect(pos)}
          >
            {letter}
            {pos + 1}: {text.header ? text.header : text.description}{" "}
            {leadsTo != null ? `→ result #${leadsTo + 1}` : ""}
            {selected ? renderMenu() : ""}
          </div>{" "}
          <span className="result-description">
            {text.header && selected && text.description
              ? "description: " + text.description
              : ""}
          </span>
        </div>
      </div>
    );
  };
  return <div>{editMode ? edit() : display()}</div>;
};

export default QuizComponent;
