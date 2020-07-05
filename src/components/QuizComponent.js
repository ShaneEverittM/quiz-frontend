import React from "react";
import "../styles.css";
const QuizComponent = ({
  handleDelete,
  selectedItem,
  onSelect,
  leadsTo,
  pos,
  text,
}) => {
  return (
    <div>
      <h4 className={`${pos === selectedItem ? "selected" : ""}`}>
        <div onClick={() => onSelect(pos)}>
          #{pos + 1}: {text} {leadsTo != null ? `->result #${leadsTo + 1}` : ""}
        </div>
      </h4>{" "}
      <div onClick={() => handleDelete(pos)}>X</div>
    </div>
  );
};

export default QuizComponent;
