import React from "react";
import CategoryPreview from "../components/CategoryPreview";
import "./Home.css";

let quiz_list = ["quiz1", "quiz2", "quiz3", "quiz4"];
const Home = () => {
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
