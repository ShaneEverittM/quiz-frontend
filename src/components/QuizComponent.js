import React, { useState } from "react";
import "../styles.css";
const QuizComponent = ({
  handleDelete,
  selectedItem,
  onSelect,
  leadsTo,
  pos,
  text,
}) => {
  let [editMode, setEditMode] = useState(false);

  if (editMode) return "";
  else
    return (
      <div>
        <div onClick={() => handleDelete(pos)}>🗑️</div>
        <div onClick={() => setEditMode(!editMode)}>✏️</div>

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

export default QuizComponent;
