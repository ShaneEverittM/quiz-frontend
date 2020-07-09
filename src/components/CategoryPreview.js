import React from "react";
import { Link } from "react-router-dom";
import Quiz from "../components/Quiz";
import "./CategoryPreview.css";

let CategoryPreview = ({ quizList, categoryName }) => {
  return (
    <div>
      <p className="quiz-category">{categoryName}</p>
      <div className="quiz-preview">
        {quizList.map((quizObj, i) => {
          return (
            <Link
              to={`/takequiz/${quizObj.id}`}
              id={quizObj.id}
              key={i}
              className="quiz-container"
            >
              <Quiz title={quizObj.name} description={quizObj.description} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPreview;
