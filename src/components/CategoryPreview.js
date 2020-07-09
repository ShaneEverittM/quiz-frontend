import React from "react";
import { Link } from "react-router-dom";
import Quiz from "../components/Quiz";
import "./CategoryPreview.css";

let CategoryPreview = ({ quizList, categoryName }) => {
  return (
    <div>
      <p className="quiz-category">{categoryName}</p>
      <div className="quiz-preview">
        {quizList.map((quizName, i) => {
          return (
            <Link
              to={`/takequiz/${i}`}
              id="1"
              key={i}
              className="quiz-container"
            >
              <Quiz
                title={quizName}
                description="How well do you know you latin place holder text?? Test your knowledge now!"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPreview;
