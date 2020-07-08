import React, { useState } from "react";
import NewQuizComponent from "./NewQuizComponent";
import "../styles.css";

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
          text="edit"
          handleAdd={onEditSubmit}
          type={type}
          desc={text.description}
          head={text.header}
          buttonText="Update"
        />
        <div
          onClick={() => {
            setEditMode(!editMode);
          }}
        ></div>
      </div>
    );
  };
  const display = () => {
    return (
      <div>
        {pos === selectedItem ? (
          <div>
            <div onClick={() => handleDelete(pos)}>🗑️</div>
            <div onClick={() => setEditMode(!editMode)}>✏️</div>
          </div>
        ) : (
          ""
        )}

        <div onClick={() => onSelect(pos)}>
          <h4 className={`${pos === selectedItem ? "selected" : ""}`}>
            #{pos + 1}: {text.header ? text.header : text.description}{" "}
            {leadsTo != null ? `->result #${leadsTo + 1}` : ""}
          </h4>{" "}
          <h6>{text.header ? text.description : ""}</h6>
        </div>
      </div>
    );
  };
  return <div>{editMode ? edit() : display()}</div>;
};

export default QuizComponent;
