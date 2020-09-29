import React from "react";
import { Link } from "react-router-dom";
import Quiz from "../components/Quiz";
import "./CategoryPreview.css";
import { deleteQuiz } from "../api/api";
let CategoryPreview = ({ quizList, categoryName, admin }) => {
  let handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete?\nThis cannot be undone")
    )
      deleteQuiz();
  };
  return (
    <div>
      <p className="quiz-category">{categoryName}</p>
      <div className="quiz-preview">
        {quizList.map((quizObj, i) => {
          return (
            <div style={{ display: "grid" }} id={quizObj.id}>
              {admin ? (
                <span
                  role="img"
                  aria-label="trash"
                  className="previewIcon"
                  onClick={() => handleDelete(quizObj.id)}
                >
                  🗑️
                </span>
              ) : (
                ""
              )}
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
