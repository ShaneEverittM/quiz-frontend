import React from "react";
import { Link } from "react-router-dom";
import Quiz from "../components/Quiz";
import "./CategoryPreview.css";

let CategoryPreview = ({ quizList, categoryName, user, deleteButton }) => {
  return (
    <div>
      <p className="quiz-category">
        <span style={{ marginLeft: "20px", fontStyle: "italic" }}>
          {categoryName}
        </span>
      </p>

      <div className="quiz-preview background-design">
        {quizList.map((quizObj, i) => {
          return (
            <div style={{ display: "grid" }} key={quizObj.id}>
              {user ? deleteButton(quizObj.id, i) : ""}
              <Link
                to={`/takequiz/${quizObj.id}`}
                id={quizObj.id}
                key={i}
                className="quiz-container"
              >
                <Quiz title={quizObj.name} description={quizObj.description} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPreview;
