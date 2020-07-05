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
  console.log(text);
  return (
    <div>
      <div onClick={() => onSelect(pos)}>
        <h4 className={`${pos === selectedItem ? "selected" : ""}`}>
          #{pos + 1}: {text.header ? text.header : text.description}{" "}
          {leadsTo != null ? `->result #${leadsTo + 1}` : ""}
        </h4>{" "}
        <h6>{text.header ? text.description : ""}</h6>
      </div>
      <div onClick={() => handleDelete(pos)}>X</div>
    </div>
  );
};

export default QuizComponent;
