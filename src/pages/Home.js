import React, { useEffect, useState } from "react";
import CategoryPreview from "../components/CategoryPreview";
import "./Home.css";
import { getQuizPreviews } from "../api/api.js";

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
      <CategoryPreview
        quizList={quizzes}
        categoryName="Top quizzes last hour"
      />
      <CategoryPreview
        quizList={quizzes}
        categoryName="Picked esspecially for you"
      />
      <CategoryPreview quizList={quizzes} categoryName="Our spiciest quizzes" />
    </div>
  );
};

export default Home;
