import React, { useEffect, useState } from "react";
import CategoryPreview from "../components/CategoryPreview";
import "./Home.css";
import { getQuizPreviews } from "../api/api.js";
const NUM_QUIZZES_IN_CATEGORY = 6;

const Home = () => {
  let [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getQuizPreviews();
      setQuizzes(data);
    }
    fetchData();
  }, []);
  return (
    <div className="home-container">
      <div className="category-container">
        <div className="barthing"></div>
        <CategoryPreview
          quizList={quizzes.slice(0, NUM_QUIZZES_IN_CATEGORY)}
          categoryName="Top Quizzes by our Best"
        />
      </div>
      <div className="category-container">
        <div className="barthing"></div>
        <CategoryPreview
          quizList={quizzes.slice(
            NUM_QUIZZES_IN_CATEGORY,
            2 * NUM_QUIZZES_IN_CATEGORY
          )}
          categoryName="Picked esspecially for you (and everyone else)"
        />
      </div>{" "}
      <div className="category-container">
        <div className="barthing"></div>
        <CategoryPreview
          quizList={quizzes.slice(
            2 * NUM_QUIZZES_IN_CATEGORY,
            3 * NUM_QUIZZES_IN_CATEGORY
          )}
          categoryName="Our spiciest quizzes"
        />
      </div>
    </div>
  );
};

export default Home;
