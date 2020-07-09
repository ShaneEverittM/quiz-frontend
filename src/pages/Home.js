import React, { useEffect } from "react";
import CategoryPreview from "../components/CategoryPreview";
import "./Home.css";
import { getQuizPreviews } from "../api/api.js";

let quiz_list = ["quiz1", "quiz2", "quiz3", "quiz1", "quiz2", "quiz3"];
const Home = () => {
  useEffect(() => {
    quiz_list = getQuizPreviews();
  });
  return (
    <div className="home-container">
      <CategoryPreview
        quizList={quiz_list}
        categoryName="Top quizzes last hour"
      />
      <CategoryPreview
        quizList={quiz_list}
        categoryName="Picked esspecially for you"
      />
      <CategoryPreview
        quizList={quiz_list}
        categoryName="Our spiciest quizzes"
      />
    </div>
  );
};

export default Home;
